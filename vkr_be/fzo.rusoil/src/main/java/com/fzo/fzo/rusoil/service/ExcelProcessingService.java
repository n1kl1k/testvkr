package com.fzo.fzo.rusoil.service;

import com.fzo.fzo.rusoil.model.ExcelFile;
import com.fzo.fzo.rusoil.repository.ExcelFileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExcelProcessingService {

    private final ExcelFileRepository excelFileRepo;

    public void processAndSaveExcel(MultipartFile file, String description) throws IOException {
        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null) {
            throw new IOException("Имя файла отсутствует");
        }

        String jsonData;
        int totalSheets;
        int totalRows;
        int totalColumns;

        // Определяем тип файла
        boolean isCsv = originalFileName.toLowerCase().endsWith(".csv");

        if (isCsv) {
            Map<String, Object> result = processFileAsCsv(file);
            jsonData = (String) result.get("jsonData");
            totalRows = (int) result.get("totalRows");
            totalColumns = (int) result.get("totalColumns");
            totalSheets = 1;
        } else {
            Map<String, Object> result = processFileAsExcel(file);
            jsonData = (String) result.get("jsonData");
            totalSheets = (int) result.get("totalSheets");
            totalRows = (int) result.get("totalRows");
            totalColumns = (int) result.get("totalColumns");
        }

        log.info("Обработан файл: {}, строк: {}, колонок: {}, JSON длина: {}",
                originalFileName, totalRows, totalColumns, jsonData.length());

        // Создаем и сохраняем файл
        ExcelFile excelFile = new ExcelFile();
        excelFile.setFileName("excel_" + System.currentTimeMillis() +
                (isCsv ? ".csv" : ".xlsx"));
        excelFile.setOriginalFileName(originalFileName);
        excelFile.setJsonData(jsonData);
        excelFile.setTotalSheets(totalSheets);
        excelFile.setTotalRows(totalRows);
        excelFile.setTotalColumns(totalColumns);
        excelFile.setDescription(description);

        // Если это первый файл, делаем его активным
        if (excelFileRepo.count() == 0) {
            excelFile.setActive(true);
        }

        excelFileRepo.save(excelFile);

        log.info("Файл сохранен в БД с ID: {}", excelFile.getId());
    }

    private Map<String, Object> processFileAsExcel(MultipartFile file) throws IOException {
        Workbook workbook = WorkbookFactory.create(file.getInputStream());

        // Считаем только НЕпустые листы
        int nonEmptySheets = 0;
        for (int i = 0; i < workbook.getNumberOfSheets(); i++) {
            Sheet sheet = workbook.getSheetAt(i);
            if (sheet.getPhysicalNumberOfRows() > 0) {
                nonEmptySheets++;
            }
        }

        if (nonEmptySheets == 0) {
            workbook.close();
            throw new IOException("Файл не содержит данных");
        }

        List<List<String>> allData = new ArrayList<>();
        int totalRows = 0;
        int maxColumns = 0;

        // Обрабатываем только НЕпустые листы
        for (int sheetIndex = 0; sheetIndex < workbook.getNumberOfSheets(); sheetIndex++) {
            Sheet sheet = workbook.getSheetAt(sheetIndex);

            // Пропускаем пустые листы
            if (sheet.getPhysicalNumberOfRows() == 0) {
                continue;
            }

            String sheetName = sheet.getSheetName();

            // Добавляем заголовок листа
            List<String> sheetHeader = new ArrayList<>();
            sheetHeader.add("📄 ЛИСТ: " + sheetName);

            // Определяем количество колонок в этом листе
            int sheetMaxColumns = 0;
            for (Row row : sheet) {
                if (row != null) {
                    sheetMaxColumns = Math.max(sheetMaxColumns, row.getLastCellNum());
                }
            }

            // Заполняем остальные ячейки заголовка пустыми значениями
            for (int i = 1; i < sheetMaxColumns; i++) {
                sheetHeader.add("");
            }

            allData.add(sheetHeader);
            totalRows++;
            maxColumns = Math.max(maxColumns, sheetMaxColumns);

            // Обрабатываем только первые 200 строк каждого листа (для производительности)
            int rowCount = 0;
            for (Row row : sheet) {
                if (rowCount++ > 200) break; // Ограничиваем количество строк

                List<String> rowData = new ArrayList<>();
                boolean rowHasData = false;

                // Обрабатываем только первые 50 колонок
                int maxColsToProcess = Math.min(sheetMaxColumns, 50);
                for (int colIndex = 0; colIndex < maxColsToProcess; colIndex++) {
                    Cell cell = row.getCell(colIndex, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
                    String cellValue = getCellValueAsString(cell);

                    // Проверяем, есть ли данные в ячейке
                    if (!cellValue.trim().isEmpty()) {
                        rowHasData = true;
                    }

                    rowData.add(cellValue);
                }

                // Если в строке есть данные, добавляем ее
                if (rowHasData) {
                    allData.add(rowData);
                    totalRows++;
                }
            }

            // Добавляем разделитель между листами
            if (sheetIndex < workbook.getNumberOfSheets() - 1) {
                List<String> separator = new ArrayList<>();
                for (int i = 0; i < maxColumns; i++) {
                    separator.add("");
                }
                allData.add(separator);
                totalRows++;
            }
        }

        workbook.close();

        // Если данных нет, выбрасываем исключение
        if (allData.isEmpty()) {
            throw new IOException("Файл не содержит значимых данных");
        }

        // Нормализуем все строки до одинаковой длины
        for (List<String> row : allData) {
            while (row.size() < maxColumns) {
                row.add("");
            }
            if (row.size() > maxColumns) {
                row = row.subList(0, maxColumns);
            }
        }

        // Конвертируем в JSON
        String jsonData = convertToJson(allData);

        Map<String, Object> result = new HashMap<>();
        result.put("jsonData", jsonData);
        result.put("totalSheets", nonEmptySheets);
        result.put("totalRows", allData.size());
        result.put("totalColumns", maxColumns);

        log.info("Excel файл обработан: {} строк, {} колонок, {} листов",
                allData.size(), maxColumns, nonEmptySheets);

        return result;
    }

    private Map<String, Object> processFileAsCsv(MultipartFile file) throws IOException {
        String content = new String(file.getBytes(), "UTF-8");
        String[] lines = content.split("\\r?\\n");

        List<List<String>> allData = new ArrayList<>();
        int maxColumns = 0;

        // Добавляем заголовок файла
        List<String> fileHeader = new ArrayList<>();
        fileHeader.add("📄 CSV ФАЙЛ: " + file.getOriginalFilename());
        allData.add(fileHeader);

        // Обрабатываем строки CSV
        for (String line : lines) {
            line = line.trim();
            if (!line.isEmpty()) {
                List<String> row = parseCsvLine(line);
                allData.add(row);
                maxColumns = Math.max(maxColumns, row.size());
            }
        }

        // Нормализуем все строки до одинаковой длины
        for (List<String> row : allData) {
            while (row.size() < maxColumns) {
                row.add("");
            }
        }

        // Конвертируем в JSON
        String jsonData = convertToJson(allData);

        Map<String, Object> result = new HashMap<>();
        result.put("jsonData", jsonData);
        result.put("totalSheets", 1);
        result.put("totalRows", allData.size());
        result.put("totalColumns", maxColumns);

        return result;
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");
                    return sdf.format(cell.getDateCellValue());
                }
                double num = cell.getNumericCellValue();
                if (num == Math.floor(num)) {
                    return String.valueOf((int) num);
                }
                return String.valueOf(num);
            case BOOLEAN:
                return cell.getBooleanCellValue() ? "true" : "false";
            case FORMULA:
                try {
                    return String.valueOf(cell.getNumericCellValue());
                } catch (Exception e) {
                    try {
                        return cell.getStringCellValue();
                    } catch (Exception ex) {
                        return cell.getCellFormula();
                    }
                }
            case BLANK:
                return "";
            default:
                return "";
        }
    }

    private List<String> parseCsvLine(String line) {
        List<String> result = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;

        for (int i = 0; i < line.length(); i++) {
            char ch = line.charAt(i);

            if (ch == '"') {
                if (i + 1 < line.length() && line.charAt(i + 1) == '"') {
                    current.append('"');
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (ch == ',' && !inQuotes) {
                result.add(current.toString().trim());
                current = new StringBuilder();
            } else {
                current.append(ch);
            }
        }

        result.add(current.toString().trim());
        return result;
    }

    private String convertToJson(List<List<String>> data) {
        StringBuilder json = new StringBuilder("[");

        for (int i = 0; i < data.size(); i++) {
            List<String> row = data.get(i);
            json.append("[");

            for (int j = 0; j < row.size(); j++) {
                String value = row.get(j);
                // Экранируем специальные символы JSON
                String escaped = value
                        .replace("\\", "\\\\")
                        .replace("\"", "\\\"")
                        .replace("\n", "\\n")
                        .replace("\r", "\\r")
                        .replace("\t", "\\t");

                json.append("\"").append(escaped).append("\"");

                if (j < row.size() - 1) {
                    json.append(",");
                }
            }

            json.append("]");

            if (i < data.size() - 1) {
                json.append(",");
            }
        }

        json.append("]");
        return json.toString();
    }
}
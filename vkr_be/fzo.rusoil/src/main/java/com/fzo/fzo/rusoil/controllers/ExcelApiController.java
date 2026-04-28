package com.fzo.fzo.rusoil.controllers;

import com.fzo.fzo.rusoil.model.ExcelFile;
import com.fzo.fzo.rusoil.repository.ExcelFileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/excel")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class ExcelApiController {

    private final ExcelFileRepository excelFileRepo;

    @GetMapping("/active")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> getActiveExcelData() {
        log.info("📥 GET /api/excel/active - запрос активного файла");

        try {
            // 1. Ищем активный файл
            Optional<ExcelFile> activeFile = excelFileRepo.findByActiveTrue();

            if (activeFile.isPresent()) {
                ExcelFile file = activeFile.get();
                log.info("✅ Найден активный файл: ID={}, Name={}, Active={}",
                        file.getId(), file.getOriginalFileName(), file.getActive());
                return ResponseEntity.ok(file);
            }

            log.warn("⚠️ Активный файл не найден. Ищем последний файл...");

            // 2. Если активного нет, берем последний
            Optional<ExcelFile> latestFile = excelFileRepo.findFirstByOrderByUploadDateDesc();

            if (latestFile.isPresent()) {
                ExcelFile file = latestFile.get();
                log.info("📄 Используем последний файл как активный: ID={}, Name={}",
                        file.getId(), file.getOriginalFileName());

                // ДОБАВЛЯЕМ ФЛАГ, ЧТО ЭТО НЕ АКТИВНЫЙ, А ПОСЛЕДНИЙ
                Map<String, Object> response = new HashMap<>();
                response.put("id", file.getId());
                response.put("originalFileName", file.getOriginalFileName());
                response.put("fileName", file.getFileName());
                response.put("jsonData", file.getJsonData());
                response.put("totalSheets", file.getTotalSheets());
                response.put("totalRows", file.getTotalRows());
                response.put("totalColumns", file.getTotalColumns());
                response.put("uploadDate", file.getUploadDate());
                response.put("description", file.getDescription());
                response.put("active", false); // Явно указываем, что это не активный файл
                response.put("isFallback", true); // Флаг, что это резервный вариант
                response.put("message", "Активный файл не найден. Используется последний загруженный файл.");

                return ResponseEntity.ok(response);
            }

            log.warn("❌ В БД нет файлов Excel");
            return createErrorResponse(404, "Нет загруженных файлов Excel");

        } catch (Exception e) {
            log.error("❌ Ошибка в /api/excel/active", e);
            return createErrorResponse(500, "Внутренняя ошибка сервера: " + e.getMessage());
        }
    }

    @GetMapping("/latest")
    public ResponseEntity<?> getLatestExcelData() {
        log.info("📥 GET /api/excel/latest");

        try {
            Optional<ExcelFile> latestFile = excelFileRepo.findFirstByOrderByUploadDateDesc();

            if (latestFile.isPresent()) {
                return ResponseEntity.ok(latestFile.get());
            }

            return createErrorResponse(404, "Нет загруженных файлов");

        } catch (Exception e) {
            log.error("❌ Ошибка в /api/excel/latest", e);
            return createErrorResponse(500, "Внутренняя ошибка сервера");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllFiles() {
        log.info("📥 GET /api/excel/all");

        try {
            List<ExcelFile> files = excelFileRepo.findAll();
            return ResponseEntity.ok(files);
        } catch (Exception e) {
            log.error("❌ Ошибка в /api/excel/all", e);
            return createErrorResponse(500, "Внутренняя ошибка сервера");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExcelData(@PathVariable Long id) {
        log.info("📥 GET /api/excel/{}", id);

        try {
            Optional<ExcelFile> file = excelFileRepo.findById(id);

            if (file.isPresent()) {
                return ResponseEntity.ok(file.get());
            }

            return createErrorResponse(404, "Файл не найден");

        } catch (Exception e) {
            log.error("❌ Ошибка в /api/excel/{}", id, e);
            return createErrorResponse(500, "Внутренняя ошибка сервера");
        }
    }

    // Тестовый endpoint для проверки работы
    @GetMapping("/test")
    public ResponseEntity<?> testApi() {
        log.info("📥 GET /api/excel/test");

        Map<String, Object> response = new HashMap<>();

        try {
            // Проверяем подключение к БД
            long fileCount = excelFileRepo.count();
            response.put("status", "OK");
            response.put("message", "API работает");
            response.put("timestamp", LocalDateTime.now().toString());
            response.put("total_files", fileCount);

            // Информация о файлах
            List<ExcelFile> files = excelFileRepo.findAll();
            List<Map<String, Object>> filesInfo = new ArrayList<>();

            for (ExcelFile file : files) {
                Map<String, Object> fileInfo = new HashMap<>();
                fileInfo.put("id", file.getId());
                fileInfo.put("name", file.getOriginalFileName());
                fileInfo.put("active", file.getActive() != null ? file.getActive() : false);
                fileInfo.put("upload_date", file.getUploadDate());
                fileInfo.put("rows", file.getTotalRows());
                fileInfo.put("columns", file.getTotalColumns());
                fileInfo.put("sheets", file.getTotalSheets());
                filesInfo.add(fileInfo);
            }

            response.put("files", filesInfo);

            log.info("✅ Тест API успешен. Файлов: {}", fileCount);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("❌ Ошибка теста API", e);
            response.put("status", "ERROR");
            response.put("message", "Ошибка: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    // Создание mock данных для тестирования
    @GetMapping("/mock")
    public ResponseEntity<?> getMockData() {
        log.info("📥 GET /api/excel/mock");

        try {
            Map<String, Object> mockData = new HashMap<>();

            mockData.put("id", 999L);
            mockData.put("originalFileName", "test_mock.xlsx");
            mockData.put("fileName", "mock_file.xlsx");
            mockData.put("totalSheets", 2);
            mockData.put("totalRows", 20);
            mockData.put("totalColumns", 6);
            mockData.put("uploadDate", LocalDateTime.now().toString());
            mockData.put("active", true);
            mockData.put("description", "Mock данные для тестирования");

            // Создаем простые тестовые данные
            List<List<String>> excelData = new ArrayList<>();

            // Лист 1
            List<String> sheet1Header = new ArrayList<>(Arrays.asList("📄 ЛИСТ: Тестовый лист 1", "", "", "", "", ""));
            excelData.add(sheet1Header);

            // Заголовки
            excelData.add(Arrays.asList("ID", "Имя", "Фамилия", "Должность", "Отдел", "Статус"));

            // Данные
            for (int i = 1; i <= 8; i++) {
                List<String> row = Arrays.asList(
                        String.valueOf(i),
                        "Имя" + i,
                        "Фамилия" + i,
                        "Должность " + i,
                        "Отдел " + ((i % 3) + 1),
                        i % 2 == 0 ? "Э" : "П"
                );
                excelData.add(row);
            }

            // Разделитель между листами
            excelData.add(Arrays.asList("", "", "", "", "", ""));

            // Лист 2
            List<String> sheet2Header = new ArrayList<>(Arrays.asList("📄 ЛИСТ: Второй лист", "", "", "", "", ""));
            excelData.add(sheet2Header);
            excelData.add(Arrays.asList("Дата", "Событие", "Тип", "Время", "Место", "Примечание"));

            for (int i = 1; i <= 6; i++) {
                List<String> row = Arrays.asList(
                        "2024-01-" + (10 + i),
                        "Событие " + i,
                        i % 3 == 0 ? "К" : (i % 3 == 1 ? "У" : "="),
                        "10:00",
                        "Аудитория " + i,
                        "Тестовое событие"
                );
                excelData.add(row);
            }

            // Конвертируем в JSON без ObjectMapper
            mockData.put("jsonData", convertToJson(excelData));

            log.info("✅ Mock данные созданы");
            return ResponseEntity.ok(mockData);

        } catch (Exception e) {
            log.error("❌ Ошибка создания mock данных", e);
            return createErrorResponse(500, "Ошибка создания тестовых данных");
        }
    }

    private ResponseEntity<Map<String, String>> createErrorResponse(int status, String message) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        error.put("status", String.valueOf(status));
        error.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.status(status).body(error);
    }

    // Простая конвертация в JSON без ObjectMapper
    private String convertToJson(List<List<String>> data) {
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < data.size(); i++) {
            json.append("[");
            List<String> row = data.get(i);
            for (int j = 0; j < row.size(); j++) {
                json.append("\"").append(escapeJson(row.get(j))).append("\"");
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

    private String escapeJson(String str) {
        if (str == null) return "";
        return str.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}
package com.fzo.fzo.rusoil.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fzo.fzo.rusoil.model.ExcelFile;
import com.fzo.fzo.rusoil.repository.ExcelFileRepository;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Sort;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.nio.file.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/excel")
public class ExcelApiController {

    private static final String UPLOAD_DIR = "/app/public/";
    private static final String META_FILE = "/app/public/.current-excel-name";
    private final ExcelFileRepository excelFileRepo;

    @GetMapping("/list")
    public ResponseEntity<List<Map<String, Object>>> listFiles() {
        return ResponseEntity.ok(
            excelFileRepo.findAll(Sort.by(Sort.Direction.DESC, "uploadDate"))
                .stream()
                .map(f -> {
                    Map<String, Object> m = new java.util.LinkedHashMap<>();
                    m.put("id", f.getId());
                    m.put("originalFileName", f.getOriginalFileName());
                    m.put("description", f.getDescription());
                    m.put("uploadDate", f.getUploadDate().toString());
                    m.put("active", f.getActive());
                    return m;
                })
                .toList()
        );
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws IOException {
        ExcelFile file = excelFileRepo.findById(id).orElseThrow();
        Path path = Paths.get("/app/public/" + file.getOriginalFileName());
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + file.getOriginalFileName() + "\"")
            .body(resource);
    }
    @PostMapping("/upload")
    public ResponseEntity<String> uploadExcel(@RequestParam("file") MultipartFile file) {
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String filename = file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + filename);
            Files.write(path, file.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

            // Запоминаем имя файла
            Files.writeString(Paths.get(META_FILE), filename);

            log.info("Excel файл обновлён: {}", filename);
            return ResponseEntity.ok(filename);
        } catch (Exception e) {
            log.error("Ошибка загрузки Excel", e);
            return ResponseEntity.badRequest().body("Ошибка: " + e.getMessage());
        }
    }

    @GetMapping("/current-name")
    public ResponseEntity<String> getCurrentName() {
        try {
            Path meta = Paths.get(META_FILE);
            if (!Files.exists(meta)) {
                // Если мета-файла нет — ищем любой xls/xlsx в папке
                try (var stream = Files.list(Paths.get(UPLOAD_DIR))) {
                    return stream
                        .filter(p -> p.toString().endsWith(".xls") || p.toString().endsWith(".xlsx"))
                        .findFirst()
                        .map(p -> ResponseEntity.ok(p.getFileName().toString()))
                        .orElse(ResponseEntity.notFound().build());
                }
            }
            return ResponseEntity.ok(Files.readString(meta).trim());
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
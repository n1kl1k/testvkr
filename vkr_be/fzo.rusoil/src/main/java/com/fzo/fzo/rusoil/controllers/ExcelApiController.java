package com.fzo.fzo.rusoil.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@Slf4j
@RestController
@RequestMapping("/api/excel")
public class ExcelApiController {

    private static final String UPLOAD_DIR = "/app/public/";
    private static final String META_FILE = "/app/public/.current-excel-name";

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
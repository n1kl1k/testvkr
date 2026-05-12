package com.fzo.fzo.rusoil.controllers;

import com.fzo.fzo.rusoil.model.Document;
import com.fzo.fzo.rusoil.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @GetMapping
    public List<Document> getAll() {
        return documentService.findAll();
    }

    @GetMapping("/{id}")
    public Document getOne(@PathVariable Long id) {
        return documentService.findById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Document create(
            @RequestParam String title,
            @RequestParam(required = false, defaultValue = "") String description,
            @RequestParam(required = false, defaultValue = "0") Integer sortOrder,
            @RequestParam(required = false) MultipartFile file) {
        return documentService.save(null, title, description, sortOrder, file);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Document update(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam(required = false, defaultValue = "") String description,
            @RequestParam(required = false, defaultValue = "0") Integer sortOrder,
            @RequestParam(required = false) MultipartFile file) {
        return documentService.save(id, title, description, sortOrder, file);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        documentService.delete(id);
        return ResponseEntity.ok().build();
    }

    // Скачивание файла через бэкенд (чтобы браузер скачивал, а не открывал)
    @GetMapping("/{id}/file")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
        Document doc = documentService.findById(id);
        if (doc.getFilePath() == null) return ResponseEntity.notFound().build();

        Resource resource = new FileSystemResource(Paths.get(doc.getFilePath()));
        if (!resource.exists()) return ResponseEntity.notFound().build();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + doc.getFileName() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
package com.fzo.fzo.rusoil.service;

import com.fzo.fzo.rusoil.model.Document;
import com.fzo.fzo.rusoil.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository repo;

    // Путь внутри контейнера — смонтирован из ./uploads
    private static final String UPLOAD_DIR = "/app/uploads/documents/";

    public List<Document> findAll() {
        return repo.findAllByOrderBySortOrderAsc();
    }

    public Document findById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    public Document save(Long id, String title, String description,
                         Integer sortOrder, MultipartFile file) {
        Document doc = id != null ? findById(id) : new Document();
        doc.setTitle(title);
        doc.setDescription(description);
        doc.setSortOrder(sortOrder != null ? sortOrder : 0);

        if (file != null && !file.isEmpty()) {
            try {
                Path dir = Paths.get(UPLOAD_DIR);
                Files.createDirectories(dir);

                // удаляем старый файл
                if (doc.getFilePath() != null) {
                    Files.deleteIfExists(Paths.get(doc.getFilePath()));
                }

                String uniqueName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path dest = dir.resolve(uniqueName);
                file.transferTo(dest);

                doc.setFileName(file.getOriginalFilename());
                doc.setFilePath(dest.toString());
            } catch (IOException e) {
                throw new RuntimeException("Ошибка загрузки файла", e);
            }
        }
        return repo.save(doc);
    }

    public void delete(Long id) {
        Document doc = findById(id);
        if (doc.getFilePath() != null) {
            try { Files.deleteIfExists(Paths.get(doc.getFilePath())); }
            catch (IOException ignored) {}
        }
        repo.delete(doc);
    }
}
package com.fzo.fzo.rusoil.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "document")
@Data
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description; // HTML-текст (из Quill)

    private String fileName;   // оригинальное имя файла
    private String filePath;
    @Column(name = "sort_order")   // путь на диске
    private Integer sortOrder =0; // порядок сортировки

    private LocalDateTime createdAt = LocalDateTime.now();
}
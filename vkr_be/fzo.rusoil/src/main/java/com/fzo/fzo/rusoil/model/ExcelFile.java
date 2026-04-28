package com.fzo.fzo.rusoil.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "excel_files")
@Data
public class ExcelFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String originalFileName;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String jsonData;

    @Column(nullable = false)
    private Integer totalSheets;

    @Column(nullable = false)
    private Integer totalRows;

    @Column(nullable = false)
    private Integer totalColumns;

    @Column(nullable = false)
    private LocalDateTime uploadDate = LocalDateTime.now();

    @Column
    private String description;

    @Column(nullable = false)
    private Boolean active = false; // Добавляем поле для активного файла
}
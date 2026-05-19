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
    private String description;

    private String fileName;  
    private String filePath;
    @Column(name = "sort_order")   
    private Integer sortOrder =0; 

    private LocalDateTime createdAt = LocalDateTime.now();
}
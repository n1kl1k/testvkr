package com.fzo.fzo.rusoil.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Data
@Setter
@Getter
public class News {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String shortText;

    @Column(columnDefinition = "TEXT")
    private String fullText;
    private LocalDate date = LocalDate.now();

}
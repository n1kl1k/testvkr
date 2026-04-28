package com.fzo.fzo.rusoil.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cards")
public class Cards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String cardTitle;

    @Column(length = 100)
    private String img;

    @Column(length = 250)
    private String profile;

    @Column(length = 250)
    private String graduating;

    @Column(length = 100)
    private String contacts;

    @Column(length = 100)
    private String duration;

    @OneToOne(mappedBy = "cards",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY)
    private AdditionalInfo additionalInfo;
}
package com.fzo.fzo.rusoil.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "requirments")
@Data
public class Requirments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "additionalInfo_id")
    private AdditionalInfo additionalInfo;

    @Column(length = 200)
    private String basePlan;

    @Column(length = 200)
    private String spoPlan;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Requirments)) return false;
        Requirments requirments = (Requirments) o;
        return id != null && id.equals(requirments.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

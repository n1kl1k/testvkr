package com.fzo.fzo.rusoil.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name ="partners")
@Data
public class Partners {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "additionalInfo_id")
    private AdditionalInfo additionalInfo;

    @Column(length = 50)
    private String partners;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Partners)) return false;
        Partners partners = (Partners) o;
        return id != null && id.equals(partners.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

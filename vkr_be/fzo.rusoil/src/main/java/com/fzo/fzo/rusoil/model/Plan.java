package com.fzo.fzo.rusoil.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@Entity
@Table(name ="plan")
@Data
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "additionalInfo_id")
    private AdditionalInfo additionalInfo;
    @Column(name = "paid",precision = 3,scale = 0)
    private  BigDecimal paid;
    @Column(name = "budget",precision = 3,scale = 0)
    private BigDecimal budget;
    @Column(length = 12)
    private String score;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Plan)) return false;
        Plan plan = (Plan) o;
        return id != null && id.equals(plan.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

package com.fzo.fzo.rusoil.dto;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Data
public class PlanDto {
    private BigDecimal paid;
    private BigDecimal budget;
    private String score;

    public PlanDto(BigDecimal paid, BigDecimal budget, String score){
        this.paid = paid;
        this.budget = budget;
        this.score = score;
    }
}


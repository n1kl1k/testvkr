package com.fzo.fzo.rusoil.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

@Data
public class RequirmentDto {
    private String basePlan;
    private String spoPlan;


    public RequirmentDto(String basePlan, String spoPlan) {
        this.basePlan = basePlan;
        this.spoPlan = spoPlan;
    }
}

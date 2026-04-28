package com.fzo.fzo.rusoil.dto;

import com.fzo.fzo.rusoil.model.Plan;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Data
@Setter
@Getter
@RequiredArgsConstructor
public class WatchCardsDto {
    private Long cardId;
    private String title;
    private String profile;
    private String graduating;
    private String contacts;
    private String duration;
    private String additionalTitle;
    private String additionalInfo;
    private Set<String> activities;
    private Set<String> partners;
    private Set<RequirmentDto> requirements;
    private Set<PlanDto> plans;
}

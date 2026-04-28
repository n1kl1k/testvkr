package com.fzo.fzo.rusoil.service;

import com.fzo.fzo.rusoil.dto.CreateCardsDto;
import com.fzo.fzo.rusoil.dto.PlanDto;
import com.fzo.fzo.rusoil.dto.RequirmentDto;
import com.fzo.fzo.rusoil.dto.WatchCardsDto;
import com.fzo.fzo.rusoil.model.*;
import jakarta.servlet.http.Part;
import org.apache.commons.math3.analysis.function.Add;
import org.apache.logging.log4j.Logger;
import com.fzo.fzo.rusoil.repository.CardsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.smartcardio.Card;
import java.awt.*;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardsService {

    private final CardsRepository cardRepo;

    public WatchCardsDto getCardById(Long id) {
        Cards card = cardRepo.findByIdWithAdditionalInfo(id)
                .orElseThrow(() -> new RuntimeException("Card not found"));
        return mapToDto(card);
    }
    public Set<WatchCardsDto> getCardDetails() {
        Set<Cards> cards = cardRepo.findAllWithAdditionalInfo();
        System.out.println("size from findAllWithAdditionalInfo: " + cards.size());
        return cards.stream()
                .map(this::mapToDto)
                .collect(Collectors.toSet());
    }

    @Transactional
    public WatchCardsDto mapToDto(Cards cards){
        WatchCardsDto dto = new WatchCardsDto();

        dto.setCardId(cards.getId());
        dto.setTitle(cards.getCardTitle());
        dto.setProfile(cards.getProfile());
        dto.setGraduating(cards.getGraduating());
        dto.setContacts(cards.getContacts());
        dto.setDuration(cards.getDuration());

        AdditionalInfo ai = cards.getAdditionalInfo();
        if(ai !=null){
            dto.setAdditionalTitle(ai.getTitle());
            dto.setAdditionalInfo(ai.getInfo());
            if (ai.getActivityList() !=null) {
                dto.setActivities(ai.getActivityList()
                        .stream()
                        .map(Activity::getActivity)
                        .collect(Collectors.toSet()));
            }
            if(ai.getPartnersList() != null) {
                dto.setPartners(ai.getPartnersList()
                        .stream()
                        .map(Partners::getPartners)
                        .collect(Collectors.toSet()));
            }
            if (ai.getPlanList() != null) {
                dto.setPlans(ai.getPlanList()
                        .stream()
                        .map(p -> new PlanDto(p.getBudget(), p.getPaid(), p.getScore()))
                        .collect(Collectors.toSet()));
            }
            if (ai.getRequirmentsList() != null) {
                dto.setRequirements(ai.getRequirmentsList()
                        .stream()
                        .map(r -> new RequirmentDto(r.getBasePlan(), r.getSpoPlan()))
                        .collect(Collectors.toSet()));
            }
        }

        return dto;
    }
    @Transactional
    public CreateCardsDto getCards(Long cardId){
        Cards card = cardRepo.findById(cardId).orElseThrow();
        CreateCardsDto dto = new CreateCardsDto();
        dto.setCardId(card.getId());
        dto.setTitle(card.getCardTitle());
        dto.setProfile(card.getProfile());
        dto.setGraduating(card.getGraduating());
        dto.setContacts(card.getContacts());
        dto.setDuration(card.getDuration());

        AdditionalInfo ai = card.getAdditionalInfo();

        if (ai!=null){
            dto.setAdditionalTitle(ai.getTitle());
            dto.setAdditionalInfo(ai.getInfo());

            dto.setActivities(ai.getActivityList()
                    .stream()
                    .map(Activity::getActivity)
                    .collect(Collectors.toSet()));
            dto.setPartners(ai.getPartnersList()
                    .stream()
                    .map(Partners::getPartners)
                    .collect(Collectors.toSet()));
            dto.setPlans(ai.getPlanList()
                    .stream()
                    .map(p -> new PlanDto(p.getBudget(),p.getPaid(),p.getScore()))
                    .collect(Collectors.toSet()));
            dto.setRequirements(ai.getRequirmentsList()
                    .stream()
                    .map(r ->new RequirmentDto(r.getBasePlan(),r.getSpoPlan()))
                    .collect(Collectors.toSet()));
        }
        return dto;

    }
    private Cards mapToEntity(CreateCardsDto dto) {
        Cards card = new Cards();
        card.setCardTitle(dto.getTitle());
        card.setProfile(dto.getProfile());
        card.setGraduating(dto.getGraduating());
        card.setContacts(dto.getContacts());
        card.setDuration(dto.getDuration());

        AdditionalInfo ai = new AdditionalInfo();
        ai.setTitle(dto.getTitle());
        ai.setInfo(dto.getAdditionalInfo());

        // связь
        card.setAdditionalInfo(ai);
        ai.setCards(card);

        if (dto.getActivities() != null) {
            dto.getActivities().forEach(a -> {
                Activity act = new Activity();
                act.setActivity(a);
                ai.addActivity(act);
            });
        }

        if (dto.getPartners() != null) {
            dto.getPartners().forEach(p -> {
                Partners partner = new Partners();
                partner.setPartners(p);
                ai.addPartners(partner);
            });
        }

        if (dto.getPlans() != null) {
            dto.getPlans().forEach(p -> {
                Plan plan = new Plan();
                plan.setBudget(p.getBudget());
                plan.setPaid(p.getPaid());
                plan.setScore(p.getScore());
                ai.addPlan(plan);
            });
        }

        if (dto.getRequirements() != null) {
            dto.getRequirements().forEach(r -> {
                Requirments req = new Requirments();
                req.setBasePlan(r.getBasePlan());
                req.setSpoPlan(r.getSpoPlan());
                ai.addRequirments(req);
            });
        }

        return card;
    }

    // 👉 А ВОТ ТУТ вызываешь
    @Transactional
    public Cards saveCards(CreateCardsDto dto) {

        Cards card;

        if (dto.getCardId() != null) {
            card = cardRepo.findById(dto.getCardId())
                    .orElseThrow(() -> new RuntimeException("Card not found"));

            updateEntity(card, dto);

        } else {
            card = mapToEntity(dto);
        }

        return cardRepo.save(card);
    }
    private void updateEntity(Cards card, CreateCardsDto dto) {

        card.setCardTitle(dto.getTitle());
        card.setProfile(dto.getProfile());
        card.setGraduating(dto.getGraduating());
        card.setContacts(dto.getContacts());
        card.setDuration(dto.getDuration());

        AdditionalInfo ai = card.getAdditionalInfo();
        AdditionalInfo tempAi = card.getAdditionalInfo();

        if (dto.getActivities() != null) {
            for (String a : dto.getActivities()) {
                Activity act = new Activity();
                act.setActivity(a);
                ai.addActivity(act);
            }
        }

        ai.setTitle(dto.getTitle());
        ai.setInfo(dto.getAdditionalInfo());

        // ❗ ВАЖНО: очищаем старые данные
        ai.getActivityList().clear();
        ai.getPartnersList().clear();
        ai.getPlanList().clear();
        ai.getRequirmentsList().clear();

        // ❗ и заново добавляем
        if (dto.getActivities() != null) {
            dto.getActivities().forEach(a -> {
                Activity act = new Activity();
                act.setActivity(a);
                ai.addActivity(act);
            });
        }

        if (dto.getPartners() != null) {
            dto.getPartners().forEach(p -> {
                Partners partner = new Partners();
                partner.setPartners(p);
                ai.addPartners(partner);
            });
        }

        if (dto.getPlans() != null) {
            dto.getPlans().forEach(p -> {
                Plan plan = new Plan();
                plan.setBudget(p.getBudget());
                plan.setPaid(p.getPaid());
                plan.setScore(p.getScore());
                ai.addPlan(plan);
            });
        }

        if (dto.getRequirements() != null) {
            dto.getRequirements().forEach(r -> {
                Requirments req = new Requirments();
                req.setBasePlan(r.getBasePlan());
                req.setSpoPlan(r.getSpoPlan());
                ai.addRequirments(req);
            });
        }
    }


}

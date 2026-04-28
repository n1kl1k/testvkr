package com.fzo.fzo.rusoil.controllers;

import com.fzo.fzo.rusoil.dto.CreateCardsDto;
import com.fzo.fzo.rusoil.dto.WatchCardsDto;
import com.fzo.fzo.rusoil.model.Cards;
import com.fzo.fzo.rusoil.service.CardsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CardsController {

    private final CardsService cardsService;

    @GetMapping
    public Set<WatchCardsDto> getAll() {
        return cardsService.getCardDetails();
    }
    @GetMapping("/{id}/details")
    public WatchCardsDto getDetails(@PathVariable Long id) {
        return cardsService.getCardById(id);
    }
    @PostMapping("/save")
    @ResponseBody
    public ResponseEntity<Void> saveCardJson(@RequestBody CreateCardsDto command) {
        cardsService.saveCards(command);
        return ResponseEntity.ok().build();
    }
}
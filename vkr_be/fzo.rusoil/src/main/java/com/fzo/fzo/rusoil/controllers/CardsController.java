package com.fzo.fzo.rusoil.controllers;

import com.fzo.fzo.rusoil.dto.CreateCardsDto;
import com.fzo.fzo.rusoil.dto.WatchCardsDto;
import com.fzo.fzo.rusoil.model.Cards;
import com.fzo.fzo.rusoil.service.CardsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Paths;
import java.nio.file.*;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/cards")
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
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        cardsService.deleteCard(id);
        return ResponseEntity.ok().build();
}

@PostMapping("/upload-image")
public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
    try {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path path = Paths.get("uploads/cards/" + filename);
        Files.createDirectories(path.getParent());

        Files.write(path, file.getBytes());

        return ResponseEntity.ok("/uploads/cards/" + filename);

    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Ошибка загрузки");
    }
}
}
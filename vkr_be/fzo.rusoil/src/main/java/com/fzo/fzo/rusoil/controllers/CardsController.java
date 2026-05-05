package com.fzo.fzo.rusoil.controllers;

import com.fzo.fzo.rusoil.dto.CreateCardsDto;
import com.fzo.fzo.rusoil.dto.WatchCardsDto;
import com.fzo.fzo.rusoil.model.Cards;
import com.fzo.fzo.rusoil.service.CardsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import java.nio.file.*;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Slf4j
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
        String uploadDir = "/app/uploads/cards/";
        log.info("Начинаем загрузку файла. Dir: {}", uploadDir);
        
        // Создаём папку, если её нет
        Files.createDirectories(Paths.get(uploadDir));
        
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir + filename);
        log.info("Полный путь: {}", path.toString());
        
        Files.write(path, file.getBytes());
        log.info("Файл успешно сохранён, размер: {} байт", file.getSize());
        
        return ResponseEntity.ok("/uploads/cards/" + filename);
    } catch (Exception e) {
        log.error("Ошибка при загрузке файла", e);
        return ResponseEntity.badRequest().body("Ошибка загрузки: " + e.getMessage());
    }
}
}
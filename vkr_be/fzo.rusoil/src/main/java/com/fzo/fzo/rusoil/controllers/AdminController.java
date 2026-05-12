package com.fzo.fzo.rusoil.controllers;

import com.fzo.fzo.rusoil.dto.CreateCardsDto;
import com.fzo.fzo.rusoil.model.News;
import com.fzo.fzo.rusoil.repository.CardsRepository;
import com.fzo.fzo.rusoil.repository.NewsRepository;
import com.fzo.fzo.rusoil.service.CardsService;
import com.fzo.fzo.rusoil.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.nio.file.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
@Slf4j
public class AdminController {

    private static final String PUBLIC_DIR = "/app/public/";
    private static final String META_FILE = "/app/public/.current-excel-name";

    private final NewsRepository newsRepo;
    private final CardsRepository cardsRepo;
    private final CardsService cardsService;
    private final EmailService emailService;

    @GetMapping("/index")
    public String index() {
        return "admin/index";
    }

    @GetMapping
    public String adminPanel(Model model) {
        model.addAttribute("list", newsRepo.findAll());
        model.addAttribute("content", "admin/home :: content");
        return "admin/index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/news/index")
    public String newsIndex(Model model) {
        model.addAttribute("list", newsRepo.findAll());
        model.addAttribute("content", "admin/news/index :: content");
        return "admin/news/index";
    }

    @GetMapping("/news/add")
    public String addPage() {
        return "admin/news/add";
    }

    @PostMapping("/news/save")
    public String saveNews(@RequestParam String title,
                           @RequestParam String shortText,
                           @RequestParam String fullText) {
        News news = new News();
        news.setTitle(title);
        news.setShortText(shortText);
        news.setFullText(fullText);
        newsRepo.save(news);
        emailService.sendNewsToSubscribers(title, shortText, fullText);
        return "redirect:/admin/news/index";
    }

    @GetMapping("/news/edit/{id}")
    public String editPage(@PathVariable Long id, Model model) {
        model.addAttribute("news", newsRepo.findById(id).orElseThrow());
        return "admin/news/edit";
    }

    @PostMapping("/news/update/{id}")
    public String updateNews(@PathVariable Long id,
                             @RequestParam String title,
                             @RequestParam String shortText,
                             @RequestParam String fullText) {
        News news = newsRepo.findById(id).orElseThrow();
        news.setTitle(title);
        news.setShortText(shortText);
        news.setFullText(fullText);
        newsRepo.save(news);
        return "redirect:/admin/news/index";
    }

    @GetMapping("/delete/{id}")
    public String deleteNews(@PathVariable Long id) {
        newsRepo.deleteById(id);
        return "redirect:/admin/news/index";
    }

    // ===== EXCEL (без БД) =====

    @GetMapping("/excel")
    public String excelManager(Model model) {
        model.addAttribute("currentFile", getCurrentFileName());
        return "admin/excel/index";
    }

    @GetMapping("/excel/upload")
    public String uploadExcelPage() {
        return "admin/excel/upload";
    }

    @PostMapping("/excel/upload")
    public String uploadExcelFile(@RequestParam("file") MultipartFile file,
                                  RedirectAttributes redirectAttributes) {
        try {
            if (file.isEmpty()) {
                redirectAttributes.addFlashAttribute("error", "Файл пустой");
                return "redirect:/admin/excel/upload";
            }

            String filename = file.getOriginalFilename();
            if (filename == null || filename.isEmpty()) {
                redirectAttributes.addFlashAttribute("error", "Имя файла отсутствует");
                return "redirect:/admin/excel/upload";
            }

            String lower = filename.toLowerCase();
            if (!lower.endsWith(".xlsx") && !lower.endsWith(".xls") && !lower.endsWith(".csv")) {
                redirectAttributes.addFlashAttribute("error", "Только .xlsx, .xls или .csv");
                return "redirect:/admin/excel/upload";
            }

            Files.createDirectories(Paths.get(PUBLIC_DIR));

            // Удаляем старый файл
            String oldFile = getCurrentFileName();
            if (oldFile != null) {
                Files.deleteIfExists(Paths.get(PUBLIC_DIR + oldFile));
            }

            // Сохраняем новый
            Files.write(Paths.get(PUBLIC_DIR + filename), file.getBytes(),
                    StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

            // Обновляем мета-файл
            Files.writeString(Paths.get(META_FILE), filename);

            log.info("Excel файл обновлён: {}", filename);
            redirectAttributes.addFlashAttribute("success", "Файл загружен: " + filename);
            return "redirect:/admin/excel";

        } catch (Exception e) {
            log.error("Ошибка загрузки Excel", e);
            redirectAttributes.addFlashAttribute("error", "Ошибка: " + e.getMessage());
            return "redirect:/admin/excel/upload";
        }
    }

    @GetMapping("/excel/delete")
    public String deleteExcelFile(RedirectAttributes redirectAttributes) {
        try {
            String currentFile = getCurrentFileName();
            if (currentFile != null) {
                Files.deleteIfExists(Paths.get(PUBLIC_DIR + currentFile));
                Files.deleteIfExists(Paths.get(META_FILE));
                redirectAttributes.addFlashAttribute("success", "Файл удалён");
            } else {
                redirectAttributes.addFlashAttribute("error", "Нет активного файла");
            }
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Ошибка: " + e.getMessage());
        }
        return "redirect:/admin/excel";
    }

    private String getCurrentFileName() {
        try {
            Path meta = Paths.get(META_FILE);
            if (Files.exists(meta)) return Files.readString(meta).trim();
        } catch (Exception ignored) {}
        return null;
    }

    // ===== CARDS =====

    @GetMapping("/cards/index")
    public String cardsPage(Model model) {
        model.addAttribute("content", "admin/cards :: content");
        return "admin/cards/index";
    }

    @GetMapping("/create-form")
    public String createForm(Model model) {
        model.addAttribute("cardCommand", new CreateCardsDto());
        return "fragments/card-form :: form";
    }

    @GetMapping("/admin/documents")
    public String documentsPage() {
        return "admin/admin-documents";
    }
}
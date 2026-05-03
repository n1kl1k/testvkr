package com.fzo.fzo.rusoil.controllers;

import com.fzo.fzo.rusoil.dto.CreateCardsDto;
import com.fzo.fzo.rusoil.dto.WatchCardsDto;
import com.fzo.fzo.rusoil.model.Cards;
import com.fzo.fzo.rusoil.model.ExcelFile;
import com.fzo.fzo.rusoil.model.News;
import com.fzo.fzo.rusoil.repository.CardsRepository;
import com.fzo.fzo.rusoil.repository.ExcelFileRepository;
import com.fzo.fzo.rusoil.repository.NewsRepository;
import com.fzo.fzo.rusoil.service.CardsService;
import com.fzo.fzo.rusoil.service.EmailService;
import com.fzo.fzo.rusoil.service.ExcelProcessingService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import lombok.extern.slf4j.Slf4j;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
@Slf4j
public class AdminController {
    private final NewsRepository newsRepo;
    private final CardsRepository cardsRepo;
    private final ExcelFileRepository excelFileRepo;
    private final ExcelProcessingService excelProcessingService;
    private final CardsService cardsService;
    private final EmailService emailService;


    @GetMapping
    public String adminPanel(Model model) {
        model.addAttribute("list", newsRepo.findAll());
        model.addAttribute("content", "admin/home :: content"); // 👈 добавь
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
        emailService.sendNewsToSubscribers(title, shortText,fullText);
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



    @GetMapping("/excel")
    public String excelManager(Model model) {
        model.addAttribute("files", excelFileRepo.findAll());
        // Находим активный файл для отображения в шаблоне
        excelFileRepo.findByActiveTrue().ifPresent(activeFile -> {
            model.addAttribute("activeFileId", activeFile.getId());
        });
        return "admin/excel/index";
    }
    @GetMapping("/excel/test-api")
    @ResponseBody
    public String testApi() {
        long count = excelFileRepo.count();
        Optional<ExcelFile> activeFile = excelFileRepo.findByActiveTrue();
        Optional<ExcelFile> latestFile = excelFileRepo.findFirstByOrderByUploadDateDesc();

        return String.format(
                "Всего файлов: %d<br>" +
                        "Активный файл: %s<br>" +
                        "Последний файл: %s<br>" +
                        "<a href='/api/excel/active'>Проверить API /active</a><br>" +
                        "<a href='/api/excel/latest'>Проверить API /latest</a>",
                count,
                activeFile.map(f -> f.getOriginalFileName()).orElse("нет"),
                latestFile.map(f -> f.getOriginalFileName()).orElse("нет")
        );
    }
    @GetMapping("/excel/upload")
    public String uploadExcelPage() {
        return "admin/excel/upload";
    }

    @PostMapping("/excel/upload")
    public String uploadExcelFile(@RequestParam("file") MultipartFile file,
                                  @RequestParam(value = "description", required = false) String description,
                                  RedirectAttributes redirectAttributes) {

        try {
            if (file.isEmpty()) {
                redirectAttributes.addAttribute("error", "Файл пустой");
                return "redirect:/admin/excel/upload";
            }

            if (file.getOriginalFilename() == null || file.getOriginalFilename().isEmpty()) {
                redirectAttributes.addAttribute("error", "Имя файла отсутствует");
                return "redirect:/admin/excel/upload";
            }

            String filename = file.getOriginalFilename().toLowerCase();
            if (!filename.endsWith(".xlsx") && !filename.endsWith(".xls") && !filename.endsWith(".csv")) {
                redirectAttributes.addAttribute("error", "Неподдерживаемый формат. Используйте .xlsx, .xls или .csv");
                return "redirect:/admin/excel/upload";
            }

            log.info("Начинаем обработку файла: {}", filename);
            excelProcessingService.processAndSaveExcel(file, description);

            redirectAttributes.addFlashAttribute("success",
                    "Файл '" + file.getOriginalFilename() + "' успешно загружен!");

            return "redirect:/admin/excel";

        } catch (IOException e) {
            log.error("Ошибка IO при загрузке файла", e);
            redirectAttributes.addAttribute("error", "Ошибка чтения файла: " + e.getMessage());
            return "redirect:/admin/excel/upload";
        } catch (Exception e) {
            log.error("Неожиданная ошибка при загрузке файла", e);
            redirectAttributes.addAttribute("error",
                    "Ошибка обработки: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            return "redirect:/admin/excel/upload";
        }
    }

    @GetMapping("/excel/delete/{id}")
    public String deleteExcelFile(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            excelFileRepo.deleteById(id);
            redirectAttributes.addFlashAttribute("success", "Файл удален");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Ошибка удаления: " + e.getMessage());
        }
        return "redirect:/admin/excel";
    }

    @GetMapping("/excel/set-active/{id}")
    public String setActiveFile(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            // Сначала деактивируем все файлы
            excelFileRepo.deactivateAll();

            // Затем активируем выбранный файл
            excelFileRepo.findById(id).ifPresent(file -> {
                file.setActive(true);
                excelFileRepo.save(file);
            });

            redirectAttributes.addFlashAttribute("success",
                    "Файл установлен как активный. Теперь он отображается на сайте.");

            log.info("Файл с ID {} установлен как активный", id);

        } catch (Exception e) {
            log.error("Ошибка при установке активного файла", e);
            redirectAttributes.addFlashAttribute("error",
                    "Ошибка: " + e.getMessage());
        }
        return "redirect:/admin/excel";
    }




    @GetMapping("/create-form")
    public String createForm(Model model) {
        model.addAttribute("cardCommand", new CreateCardsDto());
        return "fragments/card-form :: form";
    }

    @GetMapping("/cards")
    public String cardsPage() {
        return "cards";
    }

}


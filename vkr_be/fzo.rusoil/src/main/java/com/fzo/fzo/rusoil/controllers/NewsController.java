package com.fzo.fzo.rusoil.controllers;

import com.fzo.fzo.rusoil.model.News;
import com.fzo.fzo.rusoil.repository.NewsRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsRepository repo;

    public NewsController(NewsRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<News> getAll() { return repo.findAll(); }

    @PostMapping
    public News add(@RequestBody News news) { return repo.save(news); }

    @PutMapping("/admin/news/edit/{id}")
    public News update(@PathVariable Long id, @RequestBody News news){
        news.setId(id);
        return repo.save(news);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){ repo.deleteById(id); }
}
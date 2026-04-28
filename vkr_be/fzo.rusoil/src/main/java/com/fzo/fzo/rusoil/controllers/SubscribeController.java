package com.fzo.fzo.rusoil.controllers;

import com.fzo.fzo.rusoil.model.Subscriber;
import com.fzo.fzo.rusoil.repository.SubscriberRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscribe")
@CrossOrigin(origins = "*")
public class SubscribeController {

    private final SubscriberRepository repo;

    public SubscribeController(SubscriberRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public void subscribe(@RequestBody Subscriber sub) {
        repo.save(sub);
    }
}

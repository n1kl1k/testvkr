package com.fzo.fzo.rusoil.repository;

import com.fzo.fzo.rusoil.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}
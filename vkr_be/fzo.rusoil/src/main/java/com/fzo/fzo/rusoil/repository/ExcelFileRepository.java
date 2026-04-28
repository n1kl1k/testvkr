package com.fzo.fzo.rusoil.repository;

import com.fzo.fzo.rusoil.model.ExcelFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ExcelFileRepository extends JpaRepository<ExcelFile, Long> {
    Optional<ExcelFile> findFirstByOrderByUploadDateDesc();
    Optional<ExcelFile> findByActiveTrue(); // Найти активный файл
    Optional<ExcelFile> findFirstByActiveTrue(); // Найти первый активный файл
    Optional<ExcelFile> findFirstByOrderByIdDesc();
    @Modifying
    @Transactional
    @Query("UPDATE ExcelFile e SET e.active = false WHERE e.active = true")
    void deactivateAll(); // Деактивировать все файлы
}
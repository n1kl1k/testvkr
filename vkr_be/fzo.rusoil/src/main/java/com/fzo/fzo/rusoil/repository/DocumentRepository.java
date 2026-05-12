package com.fzo.fzo.rusoil.repository;

import com.fzo.fzo.rusoil.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findAllByOrderBySortOrderAsc();
}

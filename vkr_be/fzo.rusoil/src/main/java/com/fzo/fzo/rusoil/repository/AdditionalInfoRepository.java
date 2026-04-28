package com.fzo.fzo.rusoil.repository;
import com.fzo.fzo.rusoil.model.AdditionalInfo;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdditionalInfoRepository extends JpaRepository<AdditionalInfo, Long> {

}
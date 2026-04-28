package com.fzo.fzo.rusoil.repository;

import com.fzo.fzo.rusoil.model.AdditionalInfo;
import com.fzo.fzo.rusoil.model.Cards;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface CardsRepository extends JpaRepository<Cards, Long> {


    @Query("SELECT c FROM Cards c WHERE c.id = :id")
    @EntityGraph(attributePaths = {"additionalInfo",
            "additionalInfo.activityList",
            "additionalInfo.planList",
            "additionalInfo.requirmentsList",
            "additionalInfo.partnersList"})
    Optional<Cards> findByIdWithAdditionalInfo(@Param("id") Long id);

    @Query("SELECT c FROM Cards c LEFT JOIN FETCH c.additionalInfo")
    @EntityGraph(attributePaths = {
            "additionalInfo",
            "additionalInfo.activityList",
            "additionalInfo.planList",
            "additionalInfo.requirmentsList",
            "additionalInfo.partnersList"
    })
    Set<Cards> findAllWithAdditionalInfo();
}

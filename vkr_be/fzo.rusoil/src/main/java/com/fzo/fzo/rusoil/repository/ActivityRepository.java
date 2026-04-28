package com.fzo.fzo.rusoil.repository;

import com.fzo.fzo.rusoil.model.Activity;
import org.hibernate.boot.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity,Long> {
}

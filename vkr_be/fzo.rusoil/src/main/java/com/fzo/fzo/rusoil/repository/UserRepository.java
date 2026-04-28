package com.fzo.fzo.rusoil.repository;

import com.fzo.fzo.rusoil.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

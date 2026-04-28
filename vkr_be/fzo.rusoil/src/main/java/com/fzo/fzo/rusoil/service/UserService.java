package com.fzo.fzo.rusoil.service;

import com.fzo.fzo.rusoil.model.User;
import com.fzo.fzo.rusoil.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;
@Service
public class UserService implements UserDetailsService {

    private final UserRepository repo;

    public UserService(UserRepository repo){
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username){
        User u = repo.findByUsername(username);
        if(u == null) throw new UsernameNotFoundException("User not found");

        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(u.getUsername());
        builder.password(u.getPassword());      // ожидание: пароль уже должен быть закодирован (BCrypt)
        builder.roles("ADMIN");             // роль без префикса "ROLE_"
        return builder.build();
    }
}

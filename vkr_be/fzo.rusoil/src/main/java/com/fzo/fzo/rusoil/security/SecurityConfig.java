package com.fzo.fzo.rusoil.security;

import com.fzo.fzo.rusoil.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@Configuration
public class SecurityConfig {

    private final UserService userService;

    public SecurityConfig(UserService userService){
        this.userService = userService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {})
                // Отключаем CSRF для упрощения загрузки файлов
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/admin/excel/upload")
                        .ignoringRequestMatchers("/api/**")
                )
                .authorizeHttpRequests(auth -> auth
                        // Разрешаем доступ к API и загрузке файлов
                        .requestMatchers("/admin/excel/**").hasRole("ADMIN")
                        .requestMatchers("/api/excel/**").permitAll() // или .hasRole("ADMIN")

                        // Разрешаем статические ресурсы
                        .requestMatchers("/login", "/css/**", "/js/**", "/images/**").permitAll()

                        // Разрешаем главную страницу
                        .requestMatchers("/", "/index").permitAll()

                        // Админские страницы требуют роли ADMIN
                        .requestMatchers("/admin/**").hasRole("ADMIN")

                        // Все остальные запросы разрешены (или добавьте .authenticated() для защиты)
                        .anyRequest().permitAll()
                )
                .formLogin(login -> login
                        .loginPage("/login")
                        .defaultSuccessUrl("/admin", true)
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Рекомендую использовать BCrypt для продакшена
        // return new BCryptPasswordEncoder();
        return NoOpPasswordEncoder.getInstance(); // пароль хранится в открытом виде
    }

    @Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }
}
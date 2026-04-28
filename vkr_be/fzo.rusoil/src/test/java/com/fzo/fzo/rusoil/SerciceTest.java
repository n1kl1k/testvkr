package com.fzo.fzo.rusoil;

import com.fzo.fzo.rusoil.model.User;
import com.fzo.fzo.rusoil.repository.UserRepository;
import com.fzo.fzo.rusoil.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repo;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldReturnUserDetailsWhenUserExists() {
        User u = new User();
        u.setUsername("alex");
        u.setPassword("encodedPassword123");

        when(repo.findByUsername("alex")).thenReturn(u);

        UserDetails details = userService.loadUserByUsername("alex");

        assertEquals("alex", details.getUsername());
        assertEquals("encodedPassword123", details.getPassword());

        assertTrue(details.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))); // ✔ роль с префиксом добавилась

        verify(repo).findByUsername("alex"); // метод реально вызывался
    }

    @Test
    void shouldThrowExceptionWhenUserNotFound() {
        when(repo.findByUsername("alex")).thenReturn(null);

        assertThrows(UsernameNotFoundException.class,
                () -> userService.loadUserByUsername("alex"));

        verify(repo).findByUsername("alex");
    }
}


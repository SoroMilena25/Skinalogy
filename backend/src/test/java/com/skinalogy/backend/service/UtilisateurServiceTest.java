package com.skinalogy.backend.service;

import com.skinalogy.backend.entity.Utilisateur;
import com.skinalogy.backend.repository.UtilisateurRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UtilisateurServiceTest {
    
    @Mock
    private UtilisateurRepository utilisateurRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @InjectMocks
    private UtilisateurService utilisateurService;
    
    @Test
    void testAuthenticateValidUser() {
        Utilisateur mockUser = new Utilisateur();
        mockUser.setEmail("mona.sallam@gmail.com");
        mockUser.setMdp("$2a$10$hashedPassword");
        
        when(utilisateurRepository.findByEmail("mona.sallam@gmail.com"))
            .thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("mona123", "$2a$10$hashedPassword"))
            .thenReturn(true);
        
        Optional<Utilisateur> result = utilisateurService.authenticate("mona.sallam@gmail.com", "mona123");
        
        assertTrue(result.isPresent());
        assertEquals("mona.sallam@gmail.com", result.get().getEmail());
    }
    
    @Test
    void testAuthenticateInvalidPassword() {
        Utilisateur mockUser = new Utilisateur();
        mockUser.setEmail("mona.sallam@gmail.com");
        mockUser.setMdp("$2a$10$hashedPassword");
        
        when(utilisateurRepository.findByEmail("mona.sallam@gmail.com"))
            .thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("wrongPassword", "$2a$10$hashedPassword"))
            .thenReturn(false);
        
        Optional<Utilisateur> result = utilisateurService.authenticate("mona.sallam@gmail.com", "wrongPassword");
        
        assertFalse(result.isPresent());
    }
    
    @Test
    void testPasswordHashing() {
        String rawPassword = "mona123";
        
        when(passwordEncoder.encode(rawPassword)).thenReturn("$2a$10$mockedHashedPassword");
        when(passwordEncoder.matches(rawPassword, "$2a$10$mockedHashedPassword")).thenReturn(true);
        
        String hashedPassword = passwordEncoder.encode(rawPassword);
        
        assertNotEquals(rawPassword, hashedPassword);
        assertTrue(passwordEncoder.matches(rawPassword, hashedPassword));
        assertTrue(hashedPassword.startsWith("$2a$"));
    }
}
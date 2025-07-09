package com.skinalogy.backend.service;

import com.skinalogy.backend.entity.Utilisateur;
import com.skinalogy.backend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {
    
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAllByOrderByNomAsc();
    }
    
    public Optional<Utilisateur> getUtilisateurById(Integer id) {
        return utilisateurRepository.findById(id);
    }
    
    public Optional<Utilisateur> getUtilisateurByEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }
    
    public boolean emailExists(String email) {
        return utilisateurRepository.existsByEmail(email);
    }
    
    public List<Utilisateur> searchUtilisateurs(String searchTerm) {
        return utilisateurRepository.findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(searchTerm, searchTerm);
    }
    
    public List<Utilisateur> getUtilisateursByRole(Integer role) {
        return utilisateurRepository.findByRole(role);
    }
    
    public Utilisateur createUtilisateur(Utilisateur utilisateur) {
        if (emailExists(utilisateur.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }
        
        if (utilisateur.getMdp() == null || utilisateur.getMdp().trim().isEmpty()) {
            throw new RuntimeException("Le mot de passe ne peut pas être vide");
        }
        
        String hashedPassword = passwordEncoder.encode(utilisateur.getMdp());
        utilisateur.setMdp(hashedPassword);
        
        return utilisateurRepository.save(utilisateur);
    }
    
    public Utilisateur updateUtilisateur(Integer id, Utilisateur utilisateurDetails) {
        return utilisateurRepository.findById(id)
                .map(utilisateur -> {

                    if (!utilisateur.getEmail().equals(utilisateurDetails.getEmail()) && 
                        emailExists(utilisateurDetails.getEmail())) {
                        throw new RuntimeException("Email déjà utilisé");
                    }
                    
                    utilisateur.setNom(utilisateurDetails.getNom());
                    utilisateur.setPrenom(utilisateurDetails.getPrenom());
                    utilisateur.setEmail(utilisateurDetails.getEmail());
                    
                    if (utilisateurDetails.getMdp() != null && !utilisateurDetails.getMdp().trim().isEmpty()) {
                        String hashedPassword = passwordEncoder.encode(utilisateurDetails.getMdp());
                        utilisateur.setMdp(hashedPassword);
                    }
                    
                    utilisateur.setRole(utilisateurDetails.getRole());
                    return utilisateurRepository.save(utilisateur);
                })
                .orElse(null);
    }
    
    public boolean deleteUtilisateur(Integer id) {
        return utilisateurRepository.findById(id)
                .map(utilisateur -> {
                    utilisateurRepository.delete(utilisateur);
                    return true;
                })
                .orElse(false);
    }
    
    public Optional<Utilisateur> authenticate(String email, String password) {
        return utilisateurRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getMdp()));
    }
    
    public boolean checkPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }
    
    public String hashPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    public Optional<Utilisateur> findById(Integer id) {
        return utilisateurRepository.findById(id);
    }

    public Utilisateur save(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }
}
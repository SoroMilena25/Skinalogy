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
    
    // Récupérer tous les utilisateurs
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAllByOrderByNomAsc();
    }
    
    // Récupérer un utilisateur par ID
    public Optional<Utilisateur> getUtilisateurById(Integer id) {
        return utilisateurRepository.findById(id);
    }
    
    // Récupérer un utilisateur par email
    public Optional<Utilisateur> getUtilisateurByEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }
    
    // Vérifier si un email existe
    public boolean emailExists(String email) {
        return utilisateurRepository.existsByEmail(email);
    }
    
    // Rechercher des utilisateurs
    public List<Utilisateur> searchUtilisateurs(String searchTerm) {
        return utilisateurRepository.findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(searchTerm, searchTerm);
    }
    
    // Récupérer les utilisateurs par rôle
    public List<Utilisateur> getUtilisateursByRole(Integer role) {
        return utilisateurRepository.findByRole(role);
    }
    
    // Créer un nouvel utilisateur avec mot de passe hashé
    public Utilisateur createUtilisateur(Utilisateur utilisateur) {
        // Vérifier si l'email existe déjà
        if (emailExists(utilisateur.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }
        
        // Vérifier que le mot de passe n'est pas null ou vide
        if (utilisateur.getMdp() == null || utilisateur.getMdp().trim().isEmpty()) {
            throw new RuntimeException("Le mot de passe ne peut pas être vide");
        }
        
        // Hasher le mot de passe avant de sauvegarder
        String hashedPassword = passwordEncoder.encode(utilisateur.getMdp());
        utilisateur.setMdp(hashedPassword);
        
        return utilisateurRepository.save(utilisateur);
    }
    
    // Mettre à jour un utilisateur
    public Utilisateur updateUtilisateur(Integer id, Utilisateur utilisateurDetails) {
        return utilisateurRepository.findById(id)
                .map(utilisateur -> {
                    // Vérifier si le nouvel email n'est pas déjà utilisé par un autre utilisateur
                    if (!utilisateur.getEmail().equals(utilisateurDetails.getEmail()) && 
                        emailExists(utilisateurDetails.getEmail())) {
                        throw new RuntimeException("Email déjà utilisé");
                    }
                    
                    utilisateur.setNom(utilisateurDetails.getNom());
                    utilisateur.setPrenom(utilisateurDetails.getPrenom());
                    utilisateur.setEmail(utilisateurDetails.getEmail());
                    
                    // Si un nouveau mot de passe est fourni, le hasher
                    if (utilisateurDetails.getMdp() != null && !utilisateurDetails.getMdp().trim().isEmpty()) {
                        String hashedPassword = passwordEncoder.encode(utilisateurDetails.getMdp());
                        utilisateur.setMdp(hashedPassword);
                    }
                    
                    utilisateur.setRole(utilisateurDetails.getRole());
                    return utilisateurRepository.save(utilisateur);
                })
                .orElse(null);
    }
    
    // Supprimer un utilisateur
    public boolean deleteUtilisateur(Integer id) {
        return utilisateurRepository.findById(id)
                .map(utilisateur -> {
                    utilisateurRepository.delete(utilisateur);
                    return true;
                })
                .orElse(false);
    }
    
    // Authentification avec vérification du mot de passe hashé
    public Optional<Utilisateur> authenticate(String email, String password) {
        return utilisateurRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getMdp()));
    }
    
    // Méthode utilitaire pour vérifier un mot de passe
    public boolean checkPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }
    
    // Méthode utilitaire pour hasher un mot de passe (si besoin externe)
    public String hashPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    // Trouver un utilisateur par ID
    public Optional<Utilisateur> findById(Integer id) {
        return utilisateurRepository.findById(id);
    }

    // Sauvegarder un utilisateur
    public Utilisateur save(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }
}
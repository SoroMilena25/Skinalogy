package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
    
    // Rechercher un utilisateur par email (unique)
    Optional<Utilisateur> findByEmail(String email);
    
    // Vérifier si un email existe déjà
    boolean existsByEmail(String email);
    
    // Rechercher des utilisateurs par nom ou prénom
    List<Utilisateur> findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(String nom, String prenom);
    
    // Récupérer les utilisateurs par rôle (0 = client, 1 = admin, etc.)
    List<Utilisateur> findByRole(Integer role);
    
    // Récupérer les utilisateurs triés par nom
    List<Utilisateur> findAllByOrderByNomAsc();
}
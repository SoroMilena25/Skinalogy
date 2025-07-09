package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
    
    Optional<Utilisateur> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<Utilisateur> findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(String nom, String prenom);
    
    List<Utilisateur> findByRole(Integer role);
    
    List<Utilisateur> findAllByOrderByNomAsc();
}
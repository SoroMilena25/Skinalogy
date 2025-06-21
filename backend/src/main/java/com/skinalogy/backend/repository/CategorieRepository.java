package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Integer> {
    
    // Rechercher une catégorie par nom
    Optional<Categorie> findByNom(String nom);
    
    // Rechercher des catégories contenant un texte
    List<Categorie> findByNomContainingIgnoreCase(String nom);
    
    // Récupérer les catégories triées par nom
    List<Categorie> findAllByOrderByNomAsc();
}
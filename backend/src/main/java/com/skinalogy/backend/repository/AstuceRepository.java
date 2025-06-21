package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Astuce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AstuceRepository extends JpaRepository<Astuce, Integer> {
    
    // Récupérer les astuces par produit
    List<Astuce> findByIdProduit(Integer idProduit);
    
    // Rechercher des astuces par titre
    List<Astuce> findByTitreContainingIgnoreCase(String titre);
    
    // Rechercher des astuces par contenu
    List<Astuce> findByTexteContainingIgnoreCase(String texte);
    
    // Rechercher des astuces par titre ou contenu
    List<Astuce> findByTitreContainingIgnoreCaseOrTexteContainingIgnoreCase(String titre, String texte);
    
    // Récupérer toutes les astuces triées par titre
    List<Astuce> findAllByOrderByTitreAsc();
}
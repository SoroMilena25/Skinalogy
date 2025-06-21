package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.TypePeau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TypePeauRepository extends JpaRepository<TypePeau, Integer> {
    
    // Rechercher un type de peau par nom
    Optional<TypePeau> findByNom(String nom);
    
    // Rechercher des types de peau contenant un texte
    List<TypePeau> findByNomContainingIgnoreCase(String nom);
    
    // Récupérer les types de peau triés par nom
    List<TypePeau> findAllByOrderByNomAsc();
}
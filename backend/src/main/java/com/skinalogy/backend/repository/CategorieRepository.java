package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Integer> {
    
    Optional<Categorie> findByNom(String nom);
    
    List<Categorie> findByNomContainingIgnoreCase(String nom);
    
    List<Categorie> findAllByOrderByNomAsc();
}
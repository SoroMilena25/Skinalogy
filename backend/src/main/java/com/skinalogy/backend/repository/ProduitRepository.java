package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Integer> {
    
    List<Produit> findByTopProduitTrue();
    
    List<Produit> findByIdeeCadeauTrue();
    
    List<Produit> findByIdCategorie(Integer idCategorie);
    
    List<Produit> findByIdTypePeau(Integer idTypePeau);
    
    List<Produit> findAllByOrderByPrixAsc();
    
    List<Produit> findAllByOrderByPrixDesc();
    
    List<Produit> findByNomContainingIgnoreCase(String nom);
    
    @Query("SELECT p FROM Produit p WHERE p.topProduit = true ORDER BY p.id LIMIT 3")
    List<Produit> findTop3TopProduits();
    
    @Query("SELECT p FROM Produit p WHERE p.ideeCadeau = true ORDER BY p.id LIMIT 2")
    List<Produit> findTop2IdeeCadeaux();
}



package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Integer> {
    
    // Récupérer les produits "Top du moment"
    List<Produit> findByTopProduitTrue();
    
    // Récupérer les idées cadeaux
    List<Produit> findByIdeeCadeauTrue();
    
    // Récupérer les produits par catégorie
    List<Produit> findByIdCategorie(Integer idCategorie);
    
    // Récupérer les produits par type de peau
    List<Produit> findByIdTypePeau(Integer idTypePeau);
    
    // Récupérer les produits par prix (ordre croissant)
    List<Produit> findAllByOrderByPrixAsc();
    
    // Récupérer les produits par prix (ordre décroissant)
    List<Produit> findAllByOrderByPrixDesc();
    
    // Recherche par nom (contient)
    List<Produit> findByNomContainingIgnoreCase(String nom);
    
    // Requête personnalisée pour les produits top du moment (limité à 3)
    @Query("SELECT p FROM Produit p WHERE p.topProduit = true ORDER BY p.id LIMIT 3")
    List<Produit> findTop3TopProduits();
    
    // Requête personnalisée pour les idées cadeaux (limité à 2)
    @Query("SELECT p FROM Produit p WHERE p.ideeCadeau = true ORDER BY p.id LIMIT 2")
    List<Produit> findTop2IdeeCadeaux();
}
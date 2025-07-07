package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Commander;
import com.skinalogy.backend.entity.CommanderId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommanderRepository extends JpaRepository<Commander, CommanderId> {
    
    // Récupérer toutes les commandes d'un utilisateur
    List<Commander> findByIdUtilisateur(Integer idUtilisateur);
    
    // Récupérer toutes les commandes d'une facture
    List<Commander> findByIdFacture(Integer idFacture);
    
    // Récupérer toutes les commandes d'un produit
    List<Commander> findByIdProduit(Integer idProduit);
    
    // Récupérer les commandes d'un utilisateur pour une facture spécifique
    List<Commander> findByIdUtilisateurAndIdFacture(Integer idUtilisateur, Integer idFacture);
    
    // Récupérer les commandes avec les détails des produits pour une facture
    @Query("SELECT c FROM Commander c " +
           "JOIN FETCH c.produit " +
           "WHERE c.idFacture = :idFacture")
    List<Commander> findCommandesWithProduitsByFacture(Integer idFacture);
    
    // Récupérer les commandes avec tous les détails pour un utilisateur
    @Query("SELECT c FROM Commander c " +
           "JOIN FETCH c.produit " +
           "JOIN FETCH c.facture " +
           "WHERE c.idUtilisateur = :idUtilisateur " +
           "ORDER BY c.facture.datePaiement DESC")
    List<Commander> findCommandesWithDetailsByUtilisateur(Integer idUtilisateur);
}
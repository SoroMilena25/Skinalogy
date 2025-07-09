package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Commander;
import com.skinalogy.backend.entity.CommanderId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommanderRepository extends JpaRepository<Commander, CommanderId> {
    
    List<Commander> findByIdUtilisateur(Integer idUtilisateur);
    
    List<Commander> findByIdFacture(Integer idFacture);
    
    List<Commander> findByIdProduit(Integer idProduit);
    
    List<Commander> findByIdUtilisateurAndIdFacture(Integer idUtilisateur, Integer idFacture);
    
    @Query("SELECT c FROM Commander c " +
           "JOIN FETCH c.produit " +
           "WHERE c.idFacture = :idFacture")
    List<Commander> findCommandesWithProduitsByFacture(Integer idFacture);
    
    @Query("SELECT c FROM Commander c " +
           "JOIN FETCH c.produit " +
           "JOIN FETCH c.facture " +
           "WHERE c.idUtilisateur = :idUtilisateur " +
           "ORDER BY c.facture.datePaiement DESC")
    List<Commander> findCommandesWithDetailsByUtilisateur(Integer idUtilisateur);
}
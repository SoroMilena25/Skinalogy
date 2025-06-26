package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Facture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Integer> {
    
    // Récupérer les factures par date (entre deux dates)
    List<Facture> findByDatePaiementBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Récupérer les factures triées par date décroissante (plus récentes en premier)
    List<Facture> findAllByOrderByDatePaiementDesc();
    
    // Récupérer les factures triées par montant décroissant
    List<Facture> findAllByOrderByTotalDesc();
    
    // Récupérer les factures supérieures à un montant
    List<Facture> findByTotalGreaterThan(Double montant);
    
    // Récupérer les factures inférieures à un montant
    List<Facture> findByTotalLessThan(Double montant);
    
    // Calculer le total des ventes sur une période
    @Query("SELECT SUM(f.total) FROM Facture f WHERE f.datePaiement BETWEEN :startDate AND :endDate")
    Double getTotalVentesPeriode(LocalDateTime startDate, LocalDateTime endDate);
    
    // Compter le nombre de factures sur une période
    @Query("SELECT COUNT(f) FROM Facture f WHERE f.datePaiement BETWEEN :startDate AND :endDate")
    Long countFacturesPeriode(LocalDateTime startDate, LocalDateTime endDate);
}
package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Facture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Integer> {
    
    List<Facture> findByDatePaiementBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    List<Facture> findAllByOrderByDatePaiementAsc();

    List<Facture> findAllByOrderByDatePaiementDesc();
    
    List<Facture> findAllByOrderByTotalDesc();
    
    List<Facture> findByTotalGreaterThan(Double montant);
    
    List<Facture> findByTotalLessThan(Double montant);
    
    @Query("SELECT SUM(f.total) FROM Facture f WHERE f.datePaiement BETWEEN :startDate AND :endDate")
    Double getTotalVentesPeriode(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT COUNT(f) FROM Facture f WHERE f.datePaiement BETWEEN :startDate AND :endDate")
    Long countFacturesPeriode(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT FUNCTION('MONTH', f.datePaiement) as mois, COUNT(f) as nombre FROM Facture f WHERE FUNCTION('YEAR', f.datePaiement) = :annee GROUP BY mois ORDER BY mois")
    List<Object[]> countFacturesByMonth(int annee);


}
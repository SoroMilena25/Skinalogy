package com.skinalogy.backend.service;

import com.skinalogy.backend.entity.Facture;
import com.skinalogy.backend.repository.FactureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FactureService {
    
    @Autowired
    private FactureRepository factureRepository;
    
    // Récupérer toutes les factures
    public List<Facture> getAllFactures() {
        return factureRepository.findAllByOrderByDatePaiementDesc();
    }
    
    // Récupérer une facture par ID
    public Optional<Facture> getFactureById(Integer id) {
        return factureRepository.findById(id);
    }
    
    // Récupérer les factures d'une période
    public List<Facture> getFacturesPeriode(LocalDateTime startDate, LocalDateTime endDate) {
        return factureRepository.findByDatePaiementBetween(startDate, endDate);
    }
    
    // Récupérer les factures d'aujourd'hui
    public List<Facture> getFacturesAujourdhui() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(23, 59, 59);
        return factureRepository.findByDatePaiementBetween(startOfDay, endOfDay);
    }
    
    // Récupérer les factures du mois
    public List<Facture> getFacturesMois() {
        LocalDate now = LocalDate.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).atStartOfDay();
        LocalDateTime endOfMonth = now.withDayOfMonth(now.lengthOfMonth()).atTime(23, 59, 59);
        return factureRepository.findByDatePaiementBetween(startOfMonth, endOfMonth);
    }
    
    // Récupérer les factures triées par montant
    public List<Facture> getFacturesByMontant() {
        return factureRepository.findAllByOrderByTotalDesc();
    }
    
    // Récupérer les grosses factures (montant > seuil)
    public List<Facture> getGrossesFactures(Double seuil) {
        return factureRepository.findByTotalGreaterThan(seuil);
    }
    
    // Créer une nouvelle facture
    public Facture createFacture(Facture facture) {
        if (facture.getDatePaiement() == null) {
            facture.setDatePaiement(LocalDateTime.now());  // ← Toujours mettre la date actuelle
        }
        return factureRepository.save(facture);
    }
    
    // Mettre à jour une facture
    public Facture updateFacture(Integer id, Facture factureDetails) {
        return factureRepository.findById(id)
                .map(facture -> {
                    facture.setDatePaiement(factureDetails.getDatePaiement());
                    facture.setTotal(factureDetails.getTotal());
                    return factureRepository.save(facture);
                })
                .orElse(null);
    }
    
    // Supprimer une facture
    public boolean deleteFacture(Integer id) {
        return factureRepository.findById(id)
                .map(facture -> {
                    factureRepository.delete(facture);
                    return true;
                })
                .orElse(false);
    }
    
    // Statistiques
    public Double getTotalVentesAujourdhui() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(23, 59, 59);
        Double total = factureRepository.getTotalVentesPeriode(startOfDay, endOfDay);
        return total != null ? total : 0.0;
    }
    
    public Double getTotalVentesMois() {
        LocalDate now = LocalDate.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).atStartOfDay();
        LocalDateTime endOfMonth = now.withDayOfMonth(now.lengthOfMonth()).atTime(23, 59, 59);
        Double total = factureRepository.getTotalVentesPeriode(startOfMonth, endOfMonth);
        return total != null ? total : 0.0;
    }
    
    public Long getNombreFacturesAujourdhui() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(23, 59, 59);
        return factureRepository.countFacturesPeriode(startOfDay, endOfDay);
    }
}
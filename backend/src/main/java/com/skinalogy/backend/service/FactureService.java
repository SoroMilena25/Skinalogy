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
    
    public List<Facture> getAllFactures() {
        return factureRepository.findAllByOrderByDatePaiementDesc();
    }
    
    public Optional<Facture> getFactureById(Integer id) {
        return factureRepository.findById(id);
    }
    
    public List<Facture> getFacturesPeriode(LocalDateTime startDate, LocalDateTime endDate) {
        return factureRepository.findByDatePaiementBetween(startDate, endDate);
    }
    
    public List<Facture> getFacturesAujourdhui() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(23, 59, 59);
        return factureRepository.findByDatePaiementBetween(startOfDay, endOfDay);
    }
    
    public List<Facture> getFacturesMois() {
        LocalDate now = LocalDate.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).atStartOfDay();
        LocalDateTime endOfMonth = now.withDayOfMonth(now.lengthOfMonth()).atTime(23, 59, 59);
        return factureRepository.findByDatePaiementBetween(startOfMonth, endOfMonth);
    }
    
    public List<Facture> getFacturesByMontant() {
        return factureRepository.findAllByOrderByTotalDesc();
    }
    
    public List<Facture> getGrossesFactures(Double seuil) {
        return factureRepository.findByTotalGreaterThan(seuil);
    }
    
    public Facture createFacture(Facture facture) {
        Facture saved = factureRepository.save(facture);
        System.out.println("Facture sauvegardée avec ID : " + saved.getId());
        return saved;
    }
    
    public Facture updateFacture(Integer id, Facture factureDetails) {
        return factureRepository.findById(id)
                .map(facture -> {
                    facture.setDatePaiement(factureDetails.getDatePaiement());
                    facture.setTotal(factureDetails.getTotal());
                    return factureRepository.save(facture);
                })
                .orElse(null);
    }
    
    public boolean deleteFacture(Integer id) {
        return factureRepository.findById(id)
                .map(facture -> {
                    factureRepository.delete(facture);
                    return true;
                })
                .orElse(false);
    }
    
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
    

    
    public List<Facture> getAllFacturesOrderByDatePaiementDesc() {
        return factureRepository.findAllByOrderByDatePaiementDesc();
    }
}
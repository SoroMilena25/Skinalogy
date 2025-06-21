package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.Facture;
import com.skinalogy.backend.service.FactureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/factures")
@CrossOrigin(origins = "http://localhost:3000")
public class FactureController {
    
    @Autowired
    private FactureService factureService;
    
    // GET /api/factures - Récupérer toutes les factures
    @GetMapping
    public List<Facture> getAllFactures() {
        return factureService.getAllFactures();
    }
    
    // GET /api/factures/{id} - Récupérer une facture par ID
    @GetMapping("/{id}")
    public ResponseEntity<Facture> getFactureById(@PathVariable Integer id) {
        return factureService.getFactureById(id)
                .map(facture -> ResponseEntity.ok().body(facture))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/factures/aujourd-hui - Récupérer les factures d'aujourd'hui
    @GetMapping("/aujourdhui")
    public List<Facture> getFacturesAujourdhui() {
        return factureService.getFacturesAujourdhui();
    }
    
    // GET /api/factures/mois - Récupérer les factures du mois
    @GetMapping("/mois")
    public List<Facture> getFacturesMois() {
        return factureService.getFacturesMois();
    }
    
    // GET /api/factures/periode?start=...&end=... - Récupérer les factures d'une période
    @GetMapping("/periode")
    public List<Facture> getFacturesPeriode(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return factureService.getFacturesPeriode(start, end);
    }
    
    // GET /api/factures/montant - Récupérer les factures triées par montant
    @GetMapping("/montant")
    public List<Facture> getFacturesByMontant() {
        return factureService.getFacturesByMontant();
    }
    
    // GET /api/factures/grosses/{seuil} - Récupérer les grosses factures
    @GetMapping("/grosses/{seuil}")
    public List<Facture> getGrossesFactures(@PathVariable Double seuil) {
        return factureService.getGrossesFactures(seuil);
    }
    
    // GET /api/factures/statistiques - Récupérer les statistiques
    @GetMapping("/statistiques")
    public Map<String, Object> getStatistiques() {
        return Map.of(
            "totalVentesAujourdhui", factureService.getTotalVentesAujourdhui(),
            "totalVentesMois", factureService.getTotalVentesMois(),
            "nombreFacturesAujourdhui", factureService.getNombreFacturesAujourdhui()
        );
    }
    
    // POST /api/factures - Créer une nouvelle facture
    @PostMapping
    public Facture createFacture(@RequestBody Facture facture) {
        return factureService.createFacture(facture);
    }
    
    // PUT /api/factures/{id} - Mettre à jour une facture
    @PutMapping("/{id}")
    public ResponseEntity<Facture> updateFacture(@PathVariable Integer id, @RequestBody Facture factureDetails) {
        Facture updatedFacture = factureService.updateFacture(id, factureDetails);
        return updatedFacture != null ? ResponseEntity.ok(updatedFacture) : ResponseEntity.notFound().build();
    }
    
    // DELETE /api/factures/{id} - Supprimer une facture
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFacture(@PathVariable Integer id) {
        return factureService.deleteFacture(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
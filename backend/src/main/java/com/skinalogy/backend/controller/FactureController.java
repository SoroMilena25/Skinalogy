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
import com.skinalogy.backend.repository.FactureRepository;
import java.util.HashMap;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/factures")
public class FactureController {
    
    @Autowired
    private FactureService factureService;

    @Autowired
    private FactureRepository factureRepository;
    
    @GetMapping
    public List<Facture> getAllFactures() {
        return factureService.getAllFactures();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Facture> getFactureById(@PathVariable Integer id) {
        return factureService.getFactureById(id)
                .map(facture -> ResponseEntity.ok().body(facture))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/aujourdhui")
    public List<Facture> getFacturesAujourdhui() {
        return factureService.getFacturesAujourdhui();
    }
    
    @GetMapping("/mois")
    public List<Facture> getFacturesMois() {
        return factureService.getFacturesMois();
    }
    
    @GetMapping("/periode")
    public List<Facture> getFacturesPeriode(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return factureService.getFacturesPeriode(start, end);
    }
    
    @GetMapping("/montant")
    public List<Facture> getFacturesByMontant() {
        return factureService.getFacturesByMontant();
    }

    @GetMapping("/grosses/{seuil}")
    public List<Facture> getGrossesFactures(@PathVariable Double seuil) {
        return factureService.getGrossesFactures(seuil);
    }
    
    @GetMapping("/statistiques")
    public Map<String, Object> getStatistiques() {
        return Map.of(
            "totalVentesAujourdhui", factureService.getTotalVentesAujourdhui(),
            "totalVentesMois", factureService.getTotalVentesMois(),
            "nombreFacturesAujourdhui", factureService.getNombreFacturesAujourdhui()
        );
    }
    
    @PostMapping
    public Facture createFacture(@RequestBody Facture facture) {
        return factureService.createFacture(facture);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Facture> updateFacture(@PathVariable Integer id, @RequestBody Facture factureDetails) {
        Facture updatedFacture = factureService.updateFacture(id, factureDetails);
        return updatedFacture != null ? ResponseEntity.ok(updatedFacture) : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFacture(@PathVariable Integer id) {
        return factureService.deleteFacture(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/stats-mensuelles")
    public List<Map<String, Object>> getStatsMensuelles(@RequestParam int annee) {
        List<Object[]> results = factureRepository.countFacturesByMonth(annee);
        String[] moisLabels = {"Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"};
        Map<Integer, Long> moisToCount = new HashMap<>();
        for (Object[] row : results) {
            moisToCount.put((Integer) row[0], (Long) row[1]);
        }
        List<Map<String, Object>> stats = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            Map<String, Object> map = new HashMap<>();
            map.put("mois", moisLabels[i-1]);
            map.put("nombre", moisToCount.getOrDefault(i, 0L));
            stats.add(map);
        }
        return stats;
    }
}
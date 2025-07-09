package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.Commander;
import com.skinalogy.backend.entity.Utilisateur;
import com.skinalogy.backend.entity.CommanderId;
import com.skinalogy.backend.entity.Facture;
import com.skinalogy.backend.service.CommanderService;
import com.skinalogy.backend.service.FactureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/commandes")
public class CommanderController {
    
    @Autowired
    private CommanderService commanderService;

    @Autowired
    private FactureService factureService;
    
    
    @GetMapping("/utilisateur/{id}")
    public List<Commander> getCommandesByUtilisateur(@PathVariable Integer id) {
        return commanderService.getCommandesByUtilisateur(id);
    }
    
    @GetMapping("/facture/{id}")
    public List<Commander> getCommandesByFacture(@PathVariable Integer id) {
        return commanderService.getCommandesByFacture(id);
    }
    
    @GetMapping("/produit/{id}")
    public List<Commander> getCommandesByProduit(@PathVariable Integer id) {
        return commanderService.getCommandesByProduit(id);
    }
    
    @PostMapping
    public Commander createCommande(@RequestBody Commander commande) {
        return commanderService.createCommande(commande);
    }
    
    @PostMapping("/process")
    public ResponseEntity<?> processCommande(@RequestBody Map<String, Object> request) {
        try {
            Integer idUtilisateur = (Integer) request.get("idUtilisateur");
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> itemsData = (List<Map<String, Object>>) request.get("items");
            
            List<CommanderService.CartItem> items = itemsData.stream()
                    .map(itemData -> new CommanderService.CartItem(
                            (Integer) itemData.get("idProduit"),
                            (Integer) itemData.get("quantite"),
                            new java.math.BigDecimal(itemData.get("prix").toString())
                    ))
                    .toList();
            
            Facture facture = commanderService.processCommande(idUtilisateur, items);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Commande traitée avec succès",
                    "factureId", facture.getId(),
                    "total", facture.getTotal()
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{idUtilisateur}/{idProduit}/{idFacture}")
    public ResponseEntity<Commander> updateCommande(
            @PathVariable Integer idUtilisateur,
            @PathVariable Integer idProduit,
            @PathVariable Integer idFacture,
            @RequestBody Commander commandeDetails) {
        
        CommanderId id = new CommanderId(idUtilisateur, idProduit, idFacture);
        Commander updatedCommande = commanderService.updateCommande(id, commandeDetails);
        
        return updatedCommande != null ? 
                ResponseEntity.ok(updatedCommande) : 
                ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{idUtilisateur}/{idProduit}/{idFacture}")
    public ResponseEntity<?> deleteCommande(
            @PathVariable Integer idUtilisateur,
            @PathVariable Integer idProduit,
            @PathVariable Integer idFacture) {
        
        CommanderId id = new CommanderId(idUtilisateur, idProduit, idFacture);
        return commanderService.deleteCommande(id) ? 
                ResponseEntity.ok().build() : 
                ResponseEntity.notFound().build();
    }
    
    @GetMapping
    public List<Map<String, Object>> getAllCommandes() {
        List<Facture> factures = factureService.getAllFacturesOrderByDatePaiementDesc();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Facture f : factures) {
            
            List<Commander> commandes = commanderService.getCommandesByFacture(f.getId());
            if (!commandes.isEmpty()) {
                Commander commande = commandes.get(0); 
                Utilisateur utilisateur = commande.getUtilisateur();
                Map<String, Object> map = new HashMap<>();
                map.put("orderNumber", f.getId());
                map.put("date", f.getDatePaiement());
                map.put("name", utilisateur != null ? utilisateur.getNom() : "");
                map.put("email", utilisateur != null ? utilisateur.getEmail() : "");
                result.add(map);
            }
        }
        return result;
    }
}
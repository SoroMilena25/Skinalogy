package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.Commander;
import com.skinalogy.backend.entity.CommanderId;
import com.skinalogy.backend.entity.Facture;
import com.skinalogy.backend.service.CommanderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/commandes")
@CrossOrigin(origins = "http://localhost:3000")
public class CommanderController {
    
    @Autowired
    private CommanderService commanderService;
    
    // GET /api/commandes - Récupérer toutes les commandes
    @GetMapping
    public List<Commander> getAllCommandes() {
        return commanderService.getAllCommandes();
    }
    
    // GET /api/commandes/utilisateur/{id} - Récupérer les commandes d'un utilisateur
    @GetMapping("/utilisateur/{id}")
    public List<Commander> getCommandesByUtilisateur(@PathVariable Integer id) {
        return commanderService.getCommandesByUtilisateur(id);
    }
    
    // GET /api/commandes/facture/{id} - Récupérer les commandes d'une facture
    @GetMapping("/facture/{id}")
    public List<Commander> getCommandesByFacture(@PathVariable Integer id) {
        return commanderService.getCommandesByFacture(id);
    }
    
    // GET /api/commandes/produit/{id} - Récupérer les commandes d'un produit
    @GetMapping("/produit/{id}")
    public List<Commander> getCommandesByProduit(@PathVariable Integer id) {
        return commanderService.getCommandesByProduit(id);
    }
    
    // POST /api/commandes - Créer une nouvelle commande
    @PostMapping
    public Commander createCommande(@RequestBody Commander commande) {
        return commanderService.createCommande(commande);
    }
    
    // POST /api/commandes/process - Traiter une commande complète (panier)
    @PostMapping("/process")
    public ResponseEntity<?> processCommande(@RequestBody Map<String, Object> request) {
        try {
            Integer idUtilisateur = (Integer) request.get("idUtilisateur");
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> itemsData = (List<Map<String, Object>>) request.get("items");
            
            // Convertir les données en objets CartItem
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
    
    // PUT /api/commandes/{idUtilisateur}/{idProduit}/{idFacture} - Mettre à jour une commande
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
    
    // DELETE /api/commandes/{idUtilisateur}/{idProduit}/{idFacture} - Supprimer une commande
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
}
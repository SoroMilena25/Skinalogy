package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.Produit;
import com.skinalogy.backend.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "http://localhost:3000")
public class ProduitController {
    
    @Autowired
    private ProduitService produitService;
    
    @GetMapping
    public List<Produit> getAllProduits() {
        return produitService.getAllProduits();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Integer id) {
        return produitService.getProduitById(id)
                .map(produit -> ResponseEntity.ok().body(produit))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/top")
    public List<Produit> getTopProduits() {
        return produitService.getTopProduits();
    }
    
    // GET /api/produits/cadeaux - Récupérer les idées cadeaux (pour ta homepage)
    @GetMapping("/cadeaux")
    public List<Produit> getIdeeCadeaux() {
        return produitService.getIdeeCadeaux();
    }
    
    // GET /api/produits/categorie/{id} - Récupérer les produits par catégorie
    @GetMapping("/categorie/{id}")
    public List<Produit> getProduitsByCategorie(@PathVariable Integer id) {
        return produitService.getProduitsByCategorie(id);
    }
    
    // GET /api/produits/typepeau/{id} - Récupérer les produits par type de peau
    @GetMapping("/typepeau/{id}")
    public List<Produit> getProduitsByTypePeau(@PathVariable Integer id) {
        return produitService.getProduitsByTypePeau(id);
    }
    
    // GET /api/produits/search?nom=... - Rechercher des produits
    @GetMapping("/search")
    public List<Produit> searchProduits(@RequestParam String nom) {
        return produitService.searchProduitsByNom(nom);
    }
    
    // GET /api/produits/prix/asc - Produits triés par prix croissant
    @GetMapping("/prix/asc")
    public List<Produit> getProduitsByPrixAsc() {
        return produitService.getProduitsByPrixAsc();
    }
    
    // GET /api/produits/prix/desc - Produits triés par prix décroissant
    @GetMapping("/prix/desc")
    public List<Produit> getProduitsByPrixDesc() {
        return produitService.getProduitsByPrixDesc();
    }
    
    // POST /api/produits - Créer un nouveau produit
    @PostMapping
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.createProduit(produit);
    }
    
    // PUT /api/produits/{id} - Mettre à jour un produit
    @PutMapping("/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Integer id, @RequestBody Produit produitDetails) {
        Produit updatedProduit = produitService.updateProduit(id, produitDetails);
        return updatedProduit != null ? ResponseEntity.ok(updatedProduit) : ResponseEntity.notFound().build();
    }
    
    // DELETE /api/produits/{id} - Supprimer un produit
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduit(@PathVariable Integer id) {
        return produitService.deleteProduit(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}

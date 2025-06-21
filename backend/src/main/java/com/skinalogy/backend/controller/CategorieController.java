package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.Categorie;
import com.skinalogy.backend.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategorieController {
    
    @Autowired
    private CategorieService categorieService;
    
    // GET /api/categories - Récupérer toutes les catégories
    @GetMapping
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }
    
    // GET /api/categories/{id} - Récupérer une catégorie par ID
    @GetMapping("/{id}")
    public ResponseEntity<Categorie> getCategorieById(@PathVariable Integer id) {
        return categorieService.getCategorieById(id)
                .map(categorie -> ResponseEntity.ok().body(categorie))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/categories/search?nom=... - Rechercher des catégories
    @GetMapping("/search")
    public List<Categorie> searchCategories(@RequestParam String nom) {
        return categorieService.searchCategories(nom);
    }
    
    // POST /api/categories - Créer une nouvelle catégorie
    @PostMapping
    public Categorie createCategorie(@RequestBody Categorie categorie) {
        return categorieService.createCategorie(categorie);
    }
    
    // PUT /api/categories/{id} - Mettre à jour une catégorie
    @PutMapping("/{id}")
    public ResponseEntity<Categorie> updateCategorie(@PathVariable Integer id, @RequestBody Categorie categorieDetails) {
        Categorie updatedCategorie = categorieService.updateCategorie(id, categorieDetails);
        return updatedCategorie != null ? ResponseEntity.ok(updatedCategorie) : ResponseEntity.notFound().build();
    }
    
    // DELETE /api/categories/{id} - Supprimer une catégorie
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategorie(@PathVariable Integer id) {
        return categorieService.deleteCategorie(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
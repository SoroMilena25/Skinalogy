package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.Categorie;
import com.skinalogy.backend.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategorieController {
    
    @Autowired
    private CategorieService categorieService;
    
    @GetMapping
    public List<Categorie> getAllCategories() {
        return categorieService.getAllCategories();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Categorie> getCategorieById(@PathVariable Integer id) {
        return categorieService.getCategorieById(id)
                .map(categorie -> ResponseEntity.ok().body(categorie))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public List<Categorie> searchCategories(@RequestParam String nom) {
        return categorieService.searchCategories(nom);
    }
    
    @PostMapping
    public Categorie createCategorie(@RequestBody Categorie categorie) {
        return categorieService.createCategorie(categorie);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Categorie> updateCategorie(@PathVariable Integer id, @RequestBody Categorie categorieDetails) {
        Categorie updatedCategorie = categorieService.updateCategorie(id, categorieDetails);
        return updatedCategorie != null ? ResponseEntity.ok(updatedCategorie) : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategorie(@PathVariable Integer id) {
        return categorieService.deleteCategorie(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
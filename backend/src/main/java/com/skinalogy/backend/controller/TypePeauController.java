package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.TypePeau;
import com.skinalogy.backend.service.TypePeauService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/typespeau")
@CrossOrigin(origins = "http://localhost:3000")
public class TypePeauController {
    
    @Autowired
    private TypePeauService typePeauService;
    
    // GET /api/typespeau - Récupérer tous les types de peau
    @GetMapping
    public List<TypePeau> getAllTypesPeau() {
        return typePeauService.getAllTypesPeau();
    }
    
    // GET /api/typespeau/{id} - Récupérer un type de peau par ID
    @GetMapping("/{id}")
    public ResponseEntity<TypePeau> getTypePeauById(@PathVariable Integer id) {
        return typePeauService.getTypePeauById(id)
                .map(typePeau -> ResponseEntity.ok().body(typePeau))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/typespeau/search?nom=... - Rechercher des types de peau
    @GetMapping("/search")
    public List<TypePeau> searchTypesPeau(@RequestParam String nom) {
        return typePeauService.searchTypesPeau(nom);
    }
    
    // POST /api/typespeau - Créer un nouveau type de peau
    @PostMapping
    public TypePeau createTypePeau(@RequestBody TypePeau typePeau) {
        return typePeauService.createTypePeau(typePeau);
    }
    
    // PUT /api/typespeau/{id} - Mettre à jour un type de peau
    @PutMapping("/{id}")
    public ResponseEntity<TypePeau> updateTypePeau(@PathVariable Integer id, @RequestBody TypePeau typePeauDetails) {
        TypePeau updatedTypePeau = typePeauService.updateTypePeau(id, typePeauDetails);
        return updatedTypePeau != null ? ResponseEntity.ok(updatedTypePeau) : ResponseEntity.notFound().build();
    }
    
    // DELETE /api/typespeau/{id} - Supprimer un type de peau
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTypePeau(@PathVariable Integer id) {
        return typePeauService.deleteTypePeau(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
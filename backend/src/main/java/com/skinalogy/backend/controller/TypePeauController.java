package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.TypePeau;
import com.skinalogy.backend.service.TypePeauService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/typespeau")
public class TypePeauController {
    
    @Autowired
    private TypePeauService typePeauService;
    
    @GetMapping
    public List<TypePeau> getAllTypesPeau() {
        return typePeauService.getAllTypesPeau();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TypePeau> getTypePeauById(@PathVariable Integer id) {
        return typePeauService.getTypePeauById(id)
                .map(typePeau -> ResponseEntity.ok().body(typePeau))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public List<TypePeau> searchTypesPeau(@RequestParam String nom) {
        return typePeauService.searchTypesPeau(nom);
    }
    
    @PostMapping
    public TypePeau createTypePeau(@RequestBody TypePeau typePeau) {
        return typePeauService.createTypePeau(typePeau);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TypePeau> updateTypePeau(@PathVariable Integer id, @RequestBody TypePeau typePeauDetails) {
        TypePeau updatedTypePeau = typePeauService.updateTypePeau(id, typePeauDetails);
        return updatedTypePeau != null ? ResponseEntity.ok(updatedTypePeau) : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTypePeau(@PathVariable Integer id) {
        return typePeauService.deleteTypePeau(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
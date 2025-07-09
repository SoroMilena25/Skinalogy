package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.Astuce;
import com.skinalogy.backend.service.AstuceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/astuces")
public class AstuceController {
    
    @Autowired
    private AstuceService astuceService;
 
    @GetMapping
    public List<Astuce> getAllAstuces() {
        return astuceService.getAllAstuces();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Astuce> getAstuceById(@PathVariable Integer id) {
        return astuceService.getAstuceById(id)
                .map(astuce -> ResponseEntity.ok().body(astuce))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/produit/{idProduit}")
    public List<Astuce> getAstucesByProduit(@PathVariable Integer idProduit) {
        return astuceService.getAstucesByProduit(idProduit);
    }
    
    @GetMapping("/search")
    public List<Astuce> searchAstuces(@RequestParam String term) {
        return astuceService.searchAstuces(term);
    }
    
    @GetMapping("/search/titre")
    public List<Astuce> searchAstucesByTitre(@RequestParam String titre) {
        return astuceService.searchAstucesByTitre(titre);
    }
    
    @GetMapping("/search/texte")
    public List<Astuce> searchAstucesByTexte(@RequestParam String texte) {
        return astuceService.searchAstucesByTexte(texte);
    }

    @GetMapping("/topHome")
    public Optional<Astuce> getAstuceTopHome() {
        return astuceService.getAstuceTopHome();
    }
    
    @PostMapping
    public Astuce createAstuce(@RequestBody Astuce astuce) {
        return astuceService.createAstuce(astuce);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Astuce> updateAstuce(@PathVariable Integer id, @RequestBody Astuce astuceDetails) {
        Astuce updatedAstuce = astuceService.updateAstuce(id, astuceDetails);
        return updatedAstuce != null ? ResponseEntity.ok(updatedAstuce) : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAstuce(@PathVariable Integer id) {
        return astuceService.deleteAstuce(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
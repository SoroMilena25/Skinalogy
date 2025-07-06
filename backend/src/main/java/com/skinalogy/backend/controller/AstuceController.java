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
@CrossOrigin(origins = "http://localhost:3000")
public class AstuceController {
    
    @Autowired
    private AstuceService astuceService;
    
    // GET /api/astuces - Récupérer toutes les astuces
    @GetMapping
    public List<Astuce> getAllAstuces() {
        return astuceService.getAllAstuces();
    }
    
    // GET /api/astuces/{id} - Récupérer une astuce par ID
    @GetMapping("/{id}")
    public ResponseEntity<Astuce> getAstuceById(@PathVariable Integer id) {
        return astuceService.getAstuceById(id)
                .map(astuce -> ResponseEntity.ok().body(astuce))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/astuces/produit/{idProduit} - Récupérer les astuces d'un produit
    @GetMapping("/produit/{idProduit}")
    public List<Astuce> getAstucesByProduit(@PathVariable Integer idProduit) {
        return astuceService.getAstucesByProduit(idProduit);
    }
    
    // GET /api/astuces/search?term=... - Rechercher des astuces
    @GetMapping("/search")
    public List<Astuce> searchAstuces(@RequestParam String term) {
        return astuceService.searchAstuces(term);
    }
    
    // GET /api/astuces/search/titre?titre=... - Rechercher par titre
    @GetMapping("/search/titre")
    public List<Astuce> searchAstucesByTitre(@RequestParam String titre) {
        return astuceService.searchAstucesByTitre(titre);
    }
    
    // GET /api/astuces/search/texte?texte=... - Rechercher par contenu
    @GetMapping("/search/texte")
    public List<Astuce> searchAstucesByTexte(@RequestParam String texte) {
        return astuceService.searchAstucesByTexte(texte);
    }

    @GetMapping("/topHome")
    public Optional<Astuce> getAstuceTopHome() {
        return astuceService.getAstuceTopHome();
    }
    
    // POST /api/astuces - Créer une nouvelle astuce
    @PostMapping
    public Astuce createAstuce(@RequestBody Astuce astuce) {
        return astuceService.createAstuce(astuce);
    }
    
    // PUT /api/astuces/{id} - Mettre à jour une astuce
    @PutMapping("/{id}")
    public ResponseEntity<Astuce> updateAstuce(@PathVariable Integer id, @RequestBody Astuce astuceDetails) {
        Astuce updatedAstuce = astuceService.updateAstuce(id, astuceDetails);
        return updatedAstuce != null ? ResponseEntity.ok(updatedAstuce) : ResponseEntity.notFound().build();
    }
    
    // DELETE /api/astuces/{id} - Supprimer une astuce
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAstuce(@PathVariable Integer id) {
        return astuceService.deleteAstuce(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
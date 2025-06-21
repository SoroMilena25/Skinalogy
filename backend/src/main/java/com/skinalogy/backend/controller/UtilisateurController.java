package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.Utilisateur;
import com.skinalogy.backend.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurController {
    
    @Autowired
    private UtilisateurService utilisateurService;
    
    // GET /api/utilisateurs - Récupérer tous les utilisateurs
    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurService.getAllUtilisateurs();
    }
    
    // GET /api/utilisateurs/{id} - Récupérer un utilisateur par ID
    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Integer id) {
        return utilisateurService.getUtilisateurById(id)
                .map(utilisateur -> ResponseEntity.ok().body(utilisateur))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/utilisateurs/email/{email} - Récupérer un utilisateur par email
    @GetMapping("/email/{email}")
    public ResponseEntity<Utilisateur> getUtilisateurByEmail(@PathVariable String email) {
        return utilisateurService.getUtilisateurByEmail(email)
                .map(utilisateur -> ResponseEntity.ok().body(utilisateur))
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET /api/utilisateurs/search?term=... - Rechercher des utilisateurs
    @GetMapping("/search")
    public List<Utilisateur> searchUtilisateurs(@RequestParam String term) {
        return utilisateurService.searchUtilisateurs(term);
    }
    
    // GET /api/utilisateurs/role/{role} - Récupérer les utilisateurs par rôle
    @GetMapping("/role/{role}")
    public List<Utilisateur> getUtilisateursByRole(@PathVariable Integer role) {
        return utilisateurService.getUtilisateursByRole(role);
    }
    
    // POST /api/utilisateurs - Créer un nouvel utilisateur (inscription)
    @PostMapping
    public ResponseEntity<?> createUtilisateur(@RequestBody Utilisateur utilisateur) {
        try {
            Utilisateur newUtilisateur = utilisateurService.createUtilisateur(utilisateur);
            return ResponseEntity.ok(newUtilisateur);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // POST /api/utilisateurs/login - Authentification
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        return utilisateurService.authenticate(email, password)
                .map(utilisateur -> ResponseEntity.ok(Map.of(
                    "message", "Connexion réussie",
                    "utilisateur", utilisateur
                )))
                .orElse(ResponseEntity.badRequest().body(Map.of(
                    "error", "Email ou mot de passe incorrect"
                )));
    }
    
    // PUT /api/utilisateurs/{id} - Mettre à jour un utilisateur
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUtilisateur(@PathVariable Integer id, @RequestBody Utilisateur utilisateurDetails) {
        try {
            Utilisateur updatedUtilisateur = utilisateurService.updateUtilisateur(id, utilisateurDetails);
            return updatedUtilisateur != null ? 
                ResponseEntity.ok(updatedUtilisateur) : 
                ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // DELETE /api/utilisateurs/{id} - Supprimer un utilisateur
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUtilisateur(@PathVariable Integer id) {
        return utilisateurService.deleteUtilisateur(id) ? 
            ResponseEntity.ok().build() : 
            ResponseEntity.notFound().build();
    }
}
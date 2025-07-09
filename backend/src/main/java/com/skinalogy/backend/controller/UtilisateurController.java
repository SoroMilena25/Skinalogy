package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.Commander;
import com.skinalogy.backend.entity.Facture;
import com.skinalogy.backend.entity.Produit;
import com.skinalogy.backend.entity.Utilisateur;
import com.skinalogy.backend.service.CommanderService;
import com.skinalogy.backend.service.FactureService;
import com.skinalogy.backend.service.UtilisateurService;
import com.skinalogy.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {
    
    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CommanderService commanderService;

    @Autowired
    private FactureService factureService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurService.getAllUtilisateurs();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Integer id) {
        return utilisateurService.getUtilisateurById(id)
                .map(utilisateur -> ResponseEntity.ok().body(utilisateur))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<Utilisateur> getUtilisateurByEmail(@PathVariable String email) {
        return utilisateurService.getUtilisateurByEmail(email)
                .map(utilisateur -> ResponseEntity.ok().body(utilisateur))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public List<Utilisateur> searchUtilisateurs(@RequestParam String term) {
        return utilisateurService.searchUtilisateurs(term);
    }
    
    @GetMapping("/role/{role}")
    public List<Utilisateur> getUtilisateursByRole(@PathVariable Integer role) {
        return utilisateurService.getUtilisateursByRole(role);
    }
    
    @PostMapping
    public ResponseEntity<?> createUtilisateur(@RequestBody Utilisateur utilisateur) {
        try {
            Utilisateur newUtilisateur = utilisateurService.createUtilisateur(utilisateur);
            return ResponseEntity.ok(newUtilisateur);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        return utilisateurService.authenticate(email, password)
                .map(utilisateur -> {
                    String token = jwtUtil.generateToken(utilisateur.getEmail());
                    return ResponseEntity.ok(Map.of(
                        "message", "Connexion réussie",
                        "utilisateur", utilisateur,
                        "token", token
                    ));
                })
                .orElse(ResponseEntity.badRequest().body(Map.of(
                    "error", "Email ou mot de passe incorrect"
                )));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody Map<String, Object> userData) {
        try {
            
            Optional<Utilisateur> optionalUser = utilisateurService.findById(id);
            if (!optionalUser.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            Utilisateur user = optionalUser.get();
            
            if (userData.containsKey("nom")) {
                user.setNom((String) userData.get("nom"));
            }
            if (userData.containsKey("prenom")) {
                user.setPrenom((String) userData.get("prenom"));
            }
            if (userData.containsKey("email")) {
                user.setEmail((String) userData.get("email"));
            }
            
            if (userData.containsKey("newPassword") && userData.containsKey("currentPassword")) {
                String currentPassword = (String) userData.get("currentPassword");
                String newPassword = (String) userData.get("newPassword");
                
                if (!passwordEncoder.matches(currentPassword, user.getMdp())) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Mot de passe actuel incorrect"));
                }
                
                user.setMdp(passwordEncoder.encode(newPassword));
            }
            
            if (userData.containsKey("role")) {
                user.setRole((Integer) userData.get("role"));
            }
            
            Utilisateur updatedUser = utilisateurService.save(user);
            
            Map<String, Object> response = Map.of(
                "id", updatedUser.getId(),
                "nom", updatedUser.getNom(),
                "prenom", updatedUser.getPrenom(),
                "email", updatedUser.getEmail(),
                "role", updatedUser.getRole()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}/commandes")
    public ResponseEntity<?> getUserOrders(@PathVariable Integer id) {
        try {
            List<Commander> commandes = commanderService.getCommandesByUtilisateur(id);
            
            Map<Integer, List<Commander>> commandesParFacture = commandes.stream()
                    .collect(Collectors.groupingBy(Commander::getIdFacture));
            
            List<Map<String, Object>> facturesAvecCommandes = new ArrayList<>();
            
            for (Map.Entry<Integer, List<Commander>> entry : commandesParFacture.entrySet()) {
                Integer factureId = entry.getKey();
                List<Commander> commandesDeLaFacture = entry.getValue();
                
                Optional<Facture> factureOpt = factureService.getFactureById(factureId);
                if (factureOpt.isPresent()) {
                    Facture facture = factureOpt.get();
                    
                    List<Map<String, Object>> items = commandesDeLaFacture.stream()
                            .map(commande -> {
                                Produit produit = commande.getProduit();
                                Map<String, Object> item = new HashMap<>();
                                
                                
                                item.put("nom", produit != null ? produit.getNom() : "Produit inconnu"); 
                                item.put("image", produit != null ? produit.getImage() : null);          
                                item.put("quantite", commande.getQuantite());                           
                                item.put("prixDonne", commande.getPrixDonne());                         
                                
                                return item;
                            })
                            .collect(Collectors.toList());
                    

                    Map<String, Object> factureAvecCommandes = new HashMap<>();
                    factureAvecCommandes.put("factureId", facture.getId());              
                    factureAvecCommandes.put("datePaiement", facture.getDatePaiement()); 
                    factureAvecCommandes.put("total", facture.getTotal());               
                    factureAvecCommandes.put("items", items);                            
                    
                    facturesAvecCommandes.add(factureAvecCommandes);
                }
            }
            
            
            facturesAvecCommandes.sort((f1, f2) -> {
                LocalDateTime date1 = (LocalDateTime) f1.get("datePaiement");
                LocalDateTime date2 = (LocalDateTime) f2.get("datePaiement");
                return date2.compareTo(date1);
            });
            
            return ResponseEntity.ok(facturesAvecCommandes);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUtilisateur(@PathVariable Integer id) {
        return utilisateurService.deleteUtilisateur(id) ? 
            ResponseEntity.ok().build() : 
            ResponseEntity.notFound().build();
    }
}
package com.skinalogy.backend.controller;

import com.skinalogy.backend.entity.Facture;
import com.skinalogy.backend.service.CommanderService;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    
    @Value("${stripe.secret.key}")
    private String stripeSecretKey;
    
    @Autowired
    private CommanderService commanderService;
    
    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody Map<String, Object> data) {
        try {
            System.out.println("=== STRIPE PAYMENT DEBUG ===");
            System.out.println("Données reçues: " + data);
            
            if (stripeSecretKey == null || stripeSecretKey.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Clé Stripe non configurée"));
            }
            
            Stripe.apiKey = stripeSecretKey;
            
            if (!data.containsKey("amount")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Montant manquant"));
            }
            
            Long amount = Long.valueOf(data.get("amount").toString());
            System.out.println("Montant à traiter: " + amount + " centimes");
            
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)
                .setCurrency("eur")
                .build();
                
            PaymentIntent intent = PaymentIntent.create(params);
            
            System.out.println("PaymentIntent créé avec succès: " + intent.getId());
            System.out.println("=== FIN DEBUG ===");
            
            return ResponseEntity.ok(Map.of("clientSecret", intent.getClientSecret()));
            
        } catch (Exception e) {
            System.err.println("=== ERREUR STRIPE ===");
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();
            
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Nouvel endpoint pour confirmer le paiement et créer la commande
    @PostMapping("/confirm-payment")
    public ResponseEntity<?> confirmPayment(@RequestBody Map<String, Object> data) {
        try {
            System.out.println("=== CONFIRMATION PAIEMENT ===");
            System.out.println("Données reçues: " + data);
            
            // Validation des données
            if (!data.containsKey("paymentIntentId") || !data.containsKey("idUtilisateur") || !data.containsKey("items")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Données manquantes"));
            }
            
            String paymentIntentId = (String) data.get("paymentIntentId");
            Integer idUtilisateur = (Integer) data.get("idUtilisateur");
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> itemsData = (List<Map<String, Object>>) data.get("items");
            
            // Vérifier que le paiement a bien été confirmé côté Stripe
            Stripe.apiKey = stripeSecretKey;
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);
            
            if (!"succeeded".equals(intent.getStatus())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Paiement non confirmé"));
            }
            
            // Convertir les données en objets CartItem

            List<CommanderService.CartItem> items = itemsData.stream()
                    .map(itemData -> new CommanderService.CartItem(
                            (Integer) itemData.get("id"),        // Frontend envoie "id"
                            (Integer) itemData.get("quantity"),  // Frontend envoie "quantity"
                            new BigDecimal(itemData.get("price").toString()) // Frontend envoie "price"
                    ))
                    .toList();
            
            // Créer la facture et les lignes de commande MAINTENANT que le paiement est confirmé
            Facture facture = commanderService.processCommande(idUtilisateur, items);
            
            System.out.println("Commande créée après paiement confirmé - Facture ID: " + facture.getId());
            System.out.println("=== FIN CONFIRMATION ===");
            
            return ResponseEntity.ok(Map.of(
                "message", "Commande créée avec succès",
                "factureId", facture.getId(),
                "total", facture.getTotal(),
                "paymentIntentId", paymentIntentId
            ));
            
        } catch (Exception e) {
            System.err.println("=== ERREUR CONFIRMATION PAIEMENT ===");
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();
            
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(Map.of(
            "message", "API Payments fonctionne",
            "stripeConfigured", stripeSecretKey != null && !stripeSecretKey.isEmpty()
        ));
    }
}
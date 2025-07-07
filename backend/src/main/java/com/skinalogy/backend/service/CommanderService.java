package com.skinalogy.backend.service;

import com.skinalogy.backend.entity.Commander;
import com.skinalogy.backend.entity.CommanderId;
import com.skinalogy.backend.entity.Facture;
import com.skinalogy.backend.repository.CommanderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommanderService {
    
    @Autowired
    private CommanderRepository commanderRepository;
    
    @Autowired
    private FactureService factureService;
    
    // Récupérer toutes les commandes
    public List<Commander> getAllCommandes() {
        return commanderRepository.findAll();
    }
    
    // Récupérer une commande par ID composite
    public Optional<Commander> getCommandeById(CommanderId id) {
        return commanderRepository.findById(id);
    }
    
    // Récupérer les commandes d'un utilisateur
    public List<Commander> getCommandesByUtilisateur(Integer idUtilisateur) {
        return commanderRepository.findCommandesWithDetailsByUtilisateur(idUtilisateur);
    }
    
    // Récupérer les commandes d'une facture
    public List<Commander> getCommandesByFacture(Integer idFacture) {
        return commanderRepository.findCommandesWithProduitsByFacture(idFacture);
    }
    
    // Récupérer les commandes d'un produit
    public List<Commander> getCommandesByProduit(Integer idProduit) {
        return commanderRepository.findByIdProduit(idProduit);
    }
    
    // Créer une nouvelle commande
    public Commander createCommande(Commander commande) {
        return commanderRepository.save(commande);
    }
    
    // Créer plusieurs commandes en une transaction (pour un panier complet)
    @Transactional
    public List<Commander> createCommandes(List<Commander> commandes) {
        return commanderRepository.saveAll(commandes);
    }
    
    // Traitement complet d'une commande : créer facture + lignes de commande
    @Transactional
    public Facture processCommande(Integer idUtilisateur, List<CartItem> items) {
        // 1. Calculer le total
        BigDecimal total = items.stream()
                .map(item -> item.getPrix().multiply(BigDecimal.valueOf(item.getQuantite())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // 2. Créer la facture
        Facture facture = new Facture(LocalDateTime.now(), total.doubleValue());
        facture = factureService.createFacture(facture);
        
        // 3. Créer les lignes de commande
        for (CartItem item : items) {
            Commander commande = new Commander(
                idUtilisateur,
                item.getIdProduit(),
                facture.getId(),
                item.getQuantite(),
                item.getPrix()
            );
            commanderRepository.save(commande);
        }
        
        return facture;
    }
    
    // Mettre à jour une commande
    public Commander updateCommande(CommanderId id, Commander commandeDetails) {
        return commanderRepository.findById(id)
                .map(commande -> {
                    commande.setQuantite(commandeDetails.getQuantite());
                    commande.setPrixDonne(commandeDetails.getPrixDonne());
                    return commanderRepository.save(commande);
                })
                .orElse(null);
    }
    
    // Supprimer une commande
    public boolean deleteCommande(CommanderId id) {
        return commanderRepository.findById(id)
                .map(commande -> {
                    commanderRepository.delete(commande);
                    return true;
                })
                .orElse(false);
    }
    
    // Classe interne pour représenter un item du panier
    public static class CartItem {
        private Integer idProduit;
        private Integer quantite;
        private BigDecimal prix;
        
        // Constructeurs
        public CartItem() {}
        
        public CartItem(Integer idProduit, Integer quantite, BigDecimal prix) {
            this.idProduit = idProduit;
            this.quantite = quantite;
            this.prix = prix;
        }
        
        // Getters et Setters
        public Integer getIdProduit() { return idProduit; }
        public void setIdProduit(Integer idProduit) { this.idProduit = idProduit; }
        
        public Integer getQuantite() { return quantite; }
        public void setQuantite(Integer quantite) { this.quantite = quantite; }
        
        public BigDecimal getPrix() { return prix; }
        public void setPrix(BigDecimal prix) { this.prix = prix; }
    }
}
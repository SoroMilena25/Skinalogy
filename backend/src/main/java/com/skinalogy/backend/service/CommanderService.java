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
    
    public List<Commander> getAllCommandes() {
        return commanderRepository.findAll();
    }
    
    public Optional<Commander> getCommandeById(CommanderId id) {
        return commanderRepository.findById(id);
    }

    public List<Commander> getCommandesByUtilisateur(Integer idUtilisateur) {
        return commanderRepository.findCommandesWithDetailsByUtilisateur(idUtilisateur);
    }
    
    public List<Commander> getCommandesByFacture(Integer idFacture) {
        return commanderRepository.findByIdFacture(idFacture);
    }
    
    public List<Commander> getCommandesByProduit(Integer idProduit) {
        return commanderRepository.findByIdProduit(idProduit);
    }
    
    public Commander createCommande(Commander commande) {
        return commanderRepository.save(commande);
    }
    
    @Transactional
    public List<Commander> createCommandes(List<Commander> commandes) {
        return commanderRepository.saveAll(commandes);
    }
    
    @Transactional
    public Facture processCommande(Integer idUtilisateur, List<CartItem> items) {

        BigDecimal total = items.stream()
                .map(item -> item.getPrix().multiply(BigDecimal.valueOf(item.getQuantite())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Facture facture = new Facture(LocalDateTime.now(), total.doubleValue());
        facture = factureService.createFacture(facture);
        System.out.println("ID de la facture utilisée pour commander : " + facture.getId());
        
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
    
    public Commander updateCommande(CommanderId id, Commander commandeDetails) {
        return commanderRepository.findById(id)
                .map(commande -> {
                    commande.setQuantite(commandeDetails.getQuantite());
                    commande.setPrixDonne(commandeDetails.getPrixDonne());
                    return commanderRepository.save(commande);
                })
                .orElse(null);
    }
    
    public boolean deleteCommande(CommanderId id) {
        return commanderRepository.findById(id)
                .map(commande -> {
                    commanderRepository.delete(commande);
                    return true;
                })
                .orElse(false);
    }
    
    public static class CartItem {
        private Integer idProduit;
        private Integer quantite;
        private BigDecimal prix;
        
        public CartItem() {}
        
        public CartItem(Integer idProduit, Integer quantite, BigDecimal prix) {
            this.idProduit = idProduit;
            this.quantite = quantite;
            this.prix = prix;
        }
        
        public Integer getIdProduit() { return idProduit; }
        public void setIdProduit(Integer idProduit) { this.idProduit = idProduit; }
        
        public Integer getQuantite() { return quantite; }
        public void setQuantite(Integer quantite) { this.quantite = quantite; }
        
        public BigDecimal getPrix() { return prix; }
        public void setPrix(BigDecimal prix) { this.prix = prix; }
    }
}
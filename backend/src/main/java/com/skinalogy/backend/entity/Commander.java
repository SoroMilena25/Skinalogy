package com.skinalogy.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "commander")
@IdClass(CommanderId.class)
public class Commander {
    
    @Id
    @Column(name = "IdUtilisateur")
    private Integer idUtilisateur;
    
    @Id
    @Column(name = "IdProduit")
    private Integer idProduit;
    
    @Id
    @Column(name = "IdFacture")
    private Integer idFacture;
    
    @Column(name = "quantite", nullable = false)
    private Integer quantite;
    
    @Column(name = "prixDonne", precision = 10, scale = 2, nullable = false)
    private BigDecimal prixDonne;
    
    // Relations optionnelles pour faciliter les requêtes
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdUtilisateur", insertable = false, updatable = false)
    private Utilisateur utilisateur;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdProduit", insertable = false, updatable = false)
    private Produit produit;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdFacture", insertable = false, updatable = false)
    private Facture facture;
    
    // Constructeurs
    public Commander() {}
    
    public Commander(Integer idUtilisateur, Integer idProduit, Integer idFacture, 
                     Integer quantite, BigDecimal prixDonne) {
        this.idUtilisateur = idUtilisateur;
        this.idProduit = idProduit;
        this.idFacture = idFacture;
        this.quantite = quantite;
        this.prixDonne = prixDonne;
    }
    
    // Getters et Setters
    public Integer getIdUtilisateur() { return idUtilisateur; }
    public void setIdUtilisateur(Integer idUtilisateur) { this.idUtilisateur = idUtilisateur; }
    
    public Integer getIdProduit() { return idProduit; }
    public void setIdProduit(Integer idProduit) { this.idProduit = idProduit; }
    
    public Integer getIdFacture() { return idFacture; }
    public void setIdFacture(Integer idFacture) { this.idFacture = idFacture; }
    
    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }
    
    public BigDecimal getPrixDonne() { return prixDonne; }
    public void setPrixDonne(BigDecimal prixDonne) { this.prixDonne = prixDonne; }
    
    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }
    
    public Produit getProduit() { return produit; }
    public void setProduit(Produit produit) { this.produit = produit; }
    
    public Facture getFacture() { return facture; }
    public void setFacture(Facture facture) { this.facture = facture; }
}
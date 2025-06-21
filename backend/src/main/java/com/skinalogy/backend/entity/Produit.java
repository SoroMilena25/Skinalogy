package com.skinalogy.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "produit")
public class Produit {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    
    @Column(name = "nom", length = 50, nullable = false)
    private String nom;
    
    @Column(name = "prix", nullable = false, precision = 5, scale = 2)
    private Double prix;
    
    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;
    
    @Column(name = "image", length = 255)
    private String image;
    
    @Column(name = "top_produit")
    private Boolean topProduit = false;
    
    @Column(name = "idee_cadeau")
    private Boolean ideeCadeau = false;
    
    @Column(name = "IdCategorie")
    private Integer idCategorie;
    
    @Column(name = "IdTypePeau")
    private Integer idTypePeau;
    
    // Constructeurs
    public Produit() {}
    
    public Produit(String nom, Double prix, String description, String image) {
        this.nom = nom;
        this.prix = prix;
        this.description = description;
        this.image = image;
    }
    
    // Getters et Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public Double getPrix() { return prix; }
    public void setPrix(Double prix) { this.prix = prix; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    
    public Boolean getTopProduit() { return topProduit; }
    public void setTopProduit(Boolean topProduit) { this.topProduit = topProduit; }
    
    public Boolean getIdeeCadeau() { return ideeCadeau; }
    public void setIdeeCadeau(Boolean ideeCadeau) { this.ideeCadeau = ideeCadeau; }
    
    public Integer getIdCategorie() { return idCategorie; }
    public void setIdCategorie(Integer idCategorie) { this.idCategorie = idCategorie; }
    
    public Integer getIdTypePeau() { return idTypePeau; }
    public void setIdTypePeau(Integer idTypePeau) { this.idTypePeau = idTypePeau; }
}
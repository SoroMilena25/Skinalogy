package com.skinalogy.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "astuce")
public class Astuce {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    
    @Column(name = "titre", length = 50, nullable = false)
    private String titre;
    
    @Column(name = "texte", columnDefinition = "TEXT", nullable = false)
    private String texte;
    
    @Column(name = "image", length = 255)
    private String image;
    
    @Column(name = "idProduit")
    private Integer idProduit;
    
    // Constructeurs
    public Astuce() {}
    
    public Astuce(String titre, String texte, String image, Integer idProduit) {
        this.titre = titre;
        this.texte = texte;
        this.image = image;
        this.idProduit = idProduit;
    }
    
    // Getters et Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    
    public String getTexte() { return texte; }
    public void setTexte(String texte) { this.texte = texte; }
    
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    
    public Integer getIdProduit() { return idProduit; }
    public void setIdProduit(Integer idProduit) { this.idProduit = idProduit; }
}
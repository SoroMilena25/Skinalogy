package com.skinalogy.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categorie")
public class Categorie {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    
    @Column(name = "nom", length = 50, nullable = false)
    private String nom;
    
    public Categorie() {}
    
    public Categorie(String nom) {
        this.nom = nom;
    }
    
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
}
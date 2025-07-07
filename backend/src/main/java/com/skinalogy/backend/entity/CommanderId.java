package com.skinalogy.backend.entity;

import java.io.Serializable;
import java.util.Objects;

public class CommanderId implements Serializable {
    
    private Integer idUtilisateur;
    private Integer idProduit;
    private Integer idFacture;
    
    // Constructeurs
    public CommanderId() {}
    
    public CommanderId(Integer idUtilisateur, Integer idProduit, Integer idFacture) {
        this.idUtilisateur = idUtilisateur;
        this.idProduit = idProduit;
        this.idFacture = idFacture;
    }
    
    // Getters et Setters
    public Integer getIdUtilisateur() { return idUtilisateur; }
    public void setIdUtilisateur(Integer idUtilisateur) { this.idUtilisateur = idUtilisateur; }
    
    public Integer getIdProduit() { return idProduit; }
    public void setIdProduit(Integer idProduit) { this.idProduit = idProduit; }
    
    public Integer getIdFacture() { return idFacture; }
    public void setIdFacture(Integer idFacture) { this.idFacture = idFacture; }
    
    // equals et hashCode obligatoires pour les clés composites
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommanderId that = (CommanderId) o;
        return Objects.equals(idUtilisateur, that.idUtilisateur) &&
               Objects.equals(idProduit, that.idProduit) &&
               Objects.equals(idFacture, that.idFacture);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(idUtilisateur, idProduit, idFacture);
    }
}
package com.skinalogy.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "facture")
public class Facture {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    
    @Column(name = "date_paiement", nullable = false) 
    private LocalDateTime datePaiement;
    
    @Column(name = "total", nullable = false)
    private Double total;
    
    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdUtilisateur", insertable = false, updatable = false)
    private Utilisateur utilisateur; */
    
    public Facture() {}
    
    public Facture(LocalDateTime datePaiement, Double total) {
        this.datePaiement = datePaiement;
        this.total = total;
    }
    
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public LocalDateTime getDatePaiement() { return datePaiement; }
    public void setDatePaiement(LocalDateTime datePaiement) { this.datePaiement = datePaiement; }
    
    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }
    
    /* 
    public Utilisateur getUtilisateur() { return utilisateur; }
    public void setUtilisateur(Utilisateur utilisateur) { this.utilisateur = utilisateur; }*/
}
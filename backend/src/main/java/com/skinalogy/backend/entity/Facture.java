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
    
    @Column(name = "datePaiement", nullable = false)
    private LocalDateTime datePaiement;
    
    @Column(name = "total", nullable = false, precision = 10, scale = 2)
    private Double total;
    
    // Constructeurs
    public Facture() {}
    
    public Facture(LocalDateTime datePaiement, Double total) {
        this.datePaiement = datePaiement;
        this.total = total;
    }
    
    // Getters et Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public LocalDateTime getDatePaiement() { return datePaiement; }
    public void setDatePaiement(LocalDateTime datePaiement) { this.datePaiement = datePaiement; }
    
    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }
}
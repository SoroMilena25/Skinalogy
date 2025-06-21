package com.skinalogy.backend.service;

import com.skinalogy.backend.entity.Produit;
import com.skinalogy.backend.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {
    
    @Autowired
    private ProduitRepository produitRepository;
    
    // Récupérer tous les produits
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }
    
    // Récupérer un produit par ID
    public Optional<Produit> getProduitById(Integer id) {
        return produitRepository.findById(id);
    }
    
    // Récupérer les produits "Top du moment"
    public List<Produit> getTopProduits() {
        return produitRepository.findTop3TopProduits();
    }
    
    // Récupérer les idées cadeaux
    public List<Produit> getIdeeCadeaux() {
        return produitRepository.findTop2IdeeCadeaux();
    }
    
    // Récupérer les produits par catégorie
    public List<Produit> getProduitsByCategorie(Integer idCategorie) {
        return produitRepository.findByIdCategorie(idCategorie);
    }
    
    // Récupérer les produits par type de peau
    public List<Produit> getProduitsByTypePeau(Integer idTypePeau) {
        return produitRepository.findByIdTypePeau(idTypePeau);
    }
    
    // Rechercher des produits par nom
    public List<Produit> searchProduitsByNom(String nom) {
        return produitRepository.findByNomContainingIgnoreCase(nom);
    }
    
    // Récupérer les produits triés par prix
    public List<Produit> getProduitsByPrixAsc() {
        return produitRepository.findAllByOrderByPrixAsc();
    }
    
    public List<Produit> getProduitsByPrixDesc() {
        return produitRepository.findAllByOrderByPrixDesc();
    }
    
    // Créer un nouveau produit
    public Produit createProduit(Produit produit) {
        return produitRepository.save(produit);
    }
    
    // Mettre à jour un produit
    public Produit updateProduit(Integer id, Produit produitDetails) {
        return produitRepository.findById(id)
                .map(produit -> {
                    produit.setNom(produitDetails.getNom());
                    produit.setPrix(produitDetails.getPrix());
                    produit.setDescription(produitDetails.getDescription());
                    produit.setImage(produitDetails.getImage());
                    produit.setTopProduit(produitDetails.getTopProduit());
                    produit.setIdeeCadeau(produitDetails.getIdeeCadeau());
                    produit.setIdCategorie(produitDetails.getIdCategorie());
                    produit.setIdTypePeau(produitDetails.getIdTypePeau());
                    return produitRepository.save(produit);
                })
                .orElse(null);
    }
    
    // Supprimer un produit
    public boolean deleteProduit(Integer id) {
        return produitRepository.findById(id)
                .map(produit -> {
                    produitRepository.delete(produit);
                    return true;
                })
                .orElse(false);
    }
}
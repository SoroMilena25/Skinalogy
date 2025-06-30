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

    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }
    
    public Optional<Produit> getProduitById(Integer id) {
        return produitRepository.findById(id);
    }
    
    public List<Produit> getTopProduits() {
        return produitRepository.findTop3TopProduits();
    }
    
    public List<Produit> getIdeeCadeaux() {
        return produitRepository.findTop2IdeeCadeaux();
    }
    
    public List<Produit> getProduitsByCategorie(Integer idCategorie) {
        return produitRepository.findByIdCategorie(idCategorie);
    }
    
    public List<Produit> getProduitsByTypePeau(Integer idTypePeau) {
        return produitRepository.findByIdTypePeau(idTypePeau);
    }
    
    public List<Produit> searchProduitsByNom(String nom) {
        return produitRepository.findByNomContainingIgnoreCase(nom);
    }
    
    public List<Produit> getProduitsByPrixAsc() {
        return produitRepository.findAllByOrderByPrixAsc();
    }
    
    public List<Produit> getProduitsByPrixDesc() {
        return produitRepository.findAllByOrderByPrixDesc();
    }
    
    public Produit createProduit(Produit produit) {
        return produitRepository.save(produit);
    }
    
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
    
    public boolean deleteProduit(Integer id) {
        return produitRepository.findById(id)
                .map(produit -> {
                    produitRepository.delete(produit);
                    return true;
                })
                .orElse(false);
    }
}
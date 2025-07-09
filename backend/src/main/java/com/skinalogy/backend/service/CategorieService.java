package com.skinalogy.backend.service;

import com.skinalogy.backend.entity.Categorie;
import com.skinalogy.backend.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategorieService {
    
    @Autowired
    private CategorieRepository categorieRepository;
    
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAllByOrderByNomAsc();
    }
    
    public Optional<Categorie> getCategorieById(Integer id) {
        return categorieRepository.findById(id);
    }
    
    public Optional<Categorie> getCategorieByNom(String nom) {
        return categorieRepository.findByNom(nom);
    }
    
    public List<Categorie> searchCategories(String nom) {
        return categorieRepository.findByNomContainingIgnoreCase(nom);
    }
    
    public Categorie createCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }
    
    public Categorie updateCategorie(Integer id, Categorie categorieDetails) {
        return categorieRepository.findById(id)
                .map(categorie -> {
                    categorie.setNom(categorieDetails.getNom());
                    return categorieRepository.save(categorie);
                })
                .orElse(null);
    }
    
    public boolean deleteCategorie(Integer id) {
        return categorieRepository.findById(id)
                .map(categorie -> {
                    categorieRepository.delete(categorie);
                    return true;
                })
                .orElse(false);
    }
}
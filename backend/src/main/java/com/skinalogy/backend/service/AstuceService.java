package com.skinalogy.backend.service;

import com.skinalogy.backend.entity.Astuce;
import com.skinalogy.backend.repository.AstuceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AstuceService {
    
    @Autowired
    private AstuceRepository astuceRepository;
    
    // Récupérer toutes les astuces
    public List<Astuce> getAllAstuces() {
        return astuceRepository.findAllByOrderByTitreAsc();
    }

    public Optional<Astuce> getAstuceTopHome() {
        return astuceRepository.findByTopHome();
    }
    
    // Récupérer une astuce par ID
    public Optional<Astuce> getAstuceById(Integer id) {
        return astuceRepository.findById(id);
    }
    
    // Récupérer les astuces d'un produit
    public List<Astuce> getAstucesByProduit(Integer idProduit) {
        return astuceRepository.findByIdProduit(idProduit);
    }
    
    // Rechercher des astuces par titre
    public List<Astuce> searchAstucesByTitre(String titre) {
        return astuceRepository.findByTitreContainingIgnoreCase(titre);
    }
    
    // Rechercher des astuces par contenu
    public List<Astuce> searchAstucesByTexte(String texte) {
        return astuceRepository.findByTexteContainingIgnoreCase(texte);
    }
    
    // Recherche globale dans titre et contenu
    public List<Astuce> searchAstuces(String searchTerm) {
        return astuceRepository.findByTitreContainingIgnoreCaseOrTexteContainingIgnoreCase(searchTerm, searchTerm);
    }
    
    // Créer une nouvelle astuce
    public Astuce createAstuce(Astuce astuce) {
        return astuceRepository.save(astuce);
    }
    
    // Mettre à jour une astuce
    public Astuce updateAstuce(Integer id, Astuce astuceDetails) {
        return astuceRepository.findById(id)
                .map(astuce -> {
                    astuce.setTitre(astuceDetails.getTitre());
                    astuce.setTexte(astuceDetails.getTexte());
                    astuce.setImage(astuceDetails.getImage());
                    astuce.setIdProduit(astuceDetails.getIdProduit());
                    return astuceRepository.save(astuce);
                })
                .orElse(null);
    }
    
    // Supprimer une astuce
    public boolean deleteAstuce(Integer id) {
        return astuceRepository.findById(id)
                .map(astuce -> {
                    astuceRepository.delete(astuce);
                    return true;
                })
                .orElse(false);
    }
}
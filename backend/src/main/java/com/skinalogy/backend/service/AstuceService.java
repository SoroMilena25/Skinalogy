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
    
    public List<Astuce> getAllAstuces() {
        return astuceRepository.findAllByOrderByTitreAsc();
    }

    public Optional<Astuce> getAstuceTopHome() {
        return astuceRepository.findByTopHome();
    }
    
    public Optional<Astuce> getAstuceById(Integer id) {
        return astuceRepository.findById(id);
    }
    
    public List<Astuce> getAstucesByProduit(Integer idProduit) {
        return astuceRepository.findByIdProduit(idProduit);
    }
    
    public List<Astuce> searchAstucesByTitre(String titre) {
        return astuceRepository.findByTitreContainingIgnoreCase(titre);
    }
    
    public List<Astuce> searchAstucesByTexte(String texte) {
        return astuceRepository.findByTexteContainingIgnoreCase(texte);
    }
    
    public List<Astuce> searchAstuces(String searchTerm) {
        return astuceRepository.findByTitreContainingIgnoreCaseOrTexteContainingIgnoreCase(searchTerm, searchTerm);
    }
    
    public Astuce createAstuce(Astuce astuce) {
        return astuceRepository.save(astuce);
    }
    
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
    
    public boolean deleteAstuce(Integer id) {
        return astuceRepository.findById(id)
                .map(astuce -> {
                    astuceRepository.delete(astuce);
                    return true;
                })
                .orElse(false);
    }
}
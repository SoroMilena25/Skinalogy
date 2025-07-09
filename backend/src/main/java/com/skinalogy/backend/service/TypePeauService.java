package com.skinalogy.backend.service;

import com.skinalogy.backend.entity.TypePeau;
import com.skinalogy.backend.repository.TypePeauRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypePeauService {
    
    @Autowired
    private TypePeauRepository typePeauRepository;
    
    public List<TypePeau> getAllTypesPeau() {
        return typePeauRepository.findAllByOrderByNomAsc();
    }
    
    public Optional<TypePeau> getTypePeauById(Integer id) {
        return typePeauRepository.findById(id);
    }
    
    public Optional<TypePeau> getTypePeauByNom(String nom) {
        return typePeauRepository.findByNom(nom);
    }
    
    public List<TypePeau> searchTypesPeau(String nom) {
        return typePeauRepository.findByNomContainingIgnoreCase(nom);
    }
    
    public TypePeau createTypePeau(TypePeau typePeau) {
        return typePeauRepository.save(typePeau);
    }
    
    public TypePeau updateTypePeau(Integer id, TypePeau typePeauDetails) {
        return typePeauRepository.findById(id)
                .map(typePeau -> {
                    typePeau.setNom(typePeauDetails.getNom());
                    return typePeauRepository.save(typePeau);
                })
                .orElse(null);
    }
    
    public boolean deleteTypePeau(Integer id) {
        return typePeauRepository.findById(id)
                .map(typePeau -> {
                    typePeauRepository.delete(typePeau);
                    return true;
                })
                .orElse(false);
    }
}
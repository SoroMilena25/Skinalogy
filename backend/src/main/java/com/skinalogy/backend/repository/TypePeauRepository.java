package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.TypePeau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TypePeauRepository extends JpaRepository<TypePeau, Integer> {
    
    Optional<TypePeau> findByNom(String nom);
    
    List<TypePeau> findByNomContainingIgnoreCase(String nom);
    
    List<TypePeau> findAllByOrderByNomAsc();
}
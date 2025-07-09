package com.skinalogy.backend.repository;

import com.skinalogy.backend.entity.Astuce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AstuceRepository extends JpaRepository<Astuce, Integer> {
    
    List<Astuce> findByIdProduit(Integer idProduit);

    List<Astuce> findByTitreContainingIgnoreCase(String titre);
    
    List<Astuce> findByTexteContainingIgnoreCase(String texte);
    
    List<Astuce> findByTitreContainingIgnoreCaseOrTexteContainingIgnoreCase(String titre, String texte);
    
    List<Astuce> findAllByOrderByTitreAsc();

    @Query(value = "SELECT id, titre, texte, image, idProduit, top_home FROM astuce WHERE top_home = true LIMIT 1", nativeQuery = true)
    Optional<Astuce> findByTopHome();
}
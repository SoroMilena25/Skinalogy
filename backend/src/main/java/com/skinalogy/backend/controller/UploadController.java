package com.skinalogy.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
public class UploadController {

    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

    // Chemin absolu vers le dossier images du frontend (à adapter si besoin)
    @Value("${upload.images.dir:C:/Projet/Skinalogy/frontend/public/images}")
    private String imagesDir;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        logger.info("Tentative d'upload d'une image : {} ({} octets)", file.getOriginalFilename(), file.getSize());
        if (file.isEmpty()) {
            logger.warn("Aucun fichier reçu");
            return ResponseEntity.badRequest().body("Aucun fichier reçu");
        }
        try {
            String ext = getExtension(file.getOriginalFilename());
            String randomName = UUID.randomUUID().toString().replace("-", "") + (ext.isEmpty() ? "" : "." + ext);
            Path destPath = Paths.get(imagesDir, randomName);
            Files.createDirectories(destPath.getParent());
            file.transferTo(destPath.toFile());
            logger.info("Image sauvegardée à : {}", destPath.toAbsolutePath());
            Map<String, String> result = new HashMap<>();
            result.put("imagePath", "images/" + randomName);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            logger.error("Erreur lors de l'upload : {}", e.getMessage());
            return ResponseEntity.status(500).body("Erreur lors de l'upload : " + e.getMessage());
        }
    }

    private String getExtension(String filename) {
        if (filename == null) return "";
        int dot = filename.lastIndexOf('.');
        return (dot >= 0) ? filename.substring(dot + 1) : "";
    }
}

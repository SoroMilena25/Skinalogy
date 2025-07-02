CREATE DATABASE IF NOT EXISTS bdd_skinalogy;
USE bdd_skinalogy;

-- Donner tous les droits à skinalogy_user sur bdd_skinalogy
GRANT ALL PRIVILEGES ON bdd_skinalogy.* TO 'skinalogy_user'@'%';
FLUSH PRIVILEGES;

SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;
SET NAMES utf8;
SET @OLD_TIME_ZONE=@@TIME_ZONE;
SET TIME_ZONE='+00:00';
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0;

DROP TABLE IF EXISTS `astuce`;
CREATE TABLE `astuce` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(50) NOT NULL,
  `texte` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `IdProduit` int DEFAULT NULL,
  `id_produit` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdProduit` (`IdProduit`),
  CONSTRAINT `astuce_ibfk_1` FOREIGN KEY (`IdProduit`) REFERENCES `produit` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `astuce` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE `categorie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `categorie` WRITE;
INSERT INTO `categorie` VALUES (1,'Crèmes hydratantes'),(2,'Crèmes solaires'),(3,'Sérums'),(4,'Toners'),(5,'Masques'),(6,'Démaquillants'),(7,'Crèmes pour les yeux'),(8,'Catégorie');
UNLOCK TABLES;

DROP TABLE IF EXISTS `commander`;
CREATE TABLE `commander` (
  `IdUtilisateur` int NOT NULL,
  `IdProduit` int NOT NULL,
  `IdFacture` int NOT NULL,
  `quantite` int NOT NULL,
  `prixDonne` decimal(10,2) NOT NULL,
  PRIMARY KEY (`IdUtilisateur`,`IdProduit`,`IdFacture`),
  KEY `IdProduit` (`IdProduit`),
  KEY `IdFacture` (`IdFacture`),
  CONSTRAINT `commander_ibfk_1` FOREIGN KEY (`IdUtilisateur`) REFERENCES `utilisateur` (`id`),
  CONSTRAINT `commander_ibfk_2` FOREIGN KEY (`IdProduit`) REFERENCES `produit` (`Id`),
  CONSTRAINT `commander_ibfk_3` FOREIGN KEY (`IdFacture`) REFERENCES `facture` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `commander` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `facture`;
CREATE TABLE `facture` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `datePaiement` datetime NOT NULL,
  `total` double NOT NULL,
  `date_paiement` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `facture` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `produit`;
CREATE TABLE `produit` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prix` double NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `top_produit` tinyint(1) DEFAULT '0',
  `idee_cadeau` tinyint(1) DEFAULT '0',
  `IdCategorie` int DEFAULT NULL,
  `IdTypePeau` int DEFAULT NULL,
  `id_categorie` int DEFAULT NULL,
  `id_type_peau` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdCategorie` (`IdCategorie`),
  KEY `IdTypePeau` (`IdTypePeau`),
  CONSTRAINT `produit_ibfk_1` FOREIGN KEY (`IdCategorie`) REFERENCES `categorie` (`id`),
  CONSTRAINT `produit_ibfk_2` FOREIGN KEY (`IdTypePeau`) REFERENCES `typepeau` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `produit` WRITE;
INSERT INTO `produit` VALUES (1,'Coffret - Routine complète florale hhhhhhhhhhhhhhh',45.85,'description','images/Coffret_-_Routine_complete_florale.png',0,1,8,1,NULL,NULL),(2,'Coffret - Soins anti-age',35.5,'description','images/Coffret_-_Soins_anti-age.png',0,1,8,4,NULL,NULL),(3,'Creme hydratante smooth hhhhhhhhhhhhhhhhhhhhhhhhhh',14.5,'description','images/Creme_hydratante_smooth.png',1,0,1,3,NULL,NULL),(4,'Crème solaire - SPF 50++ hhhhhhhhhhhhhhhhhhhhhhhhh',9.75,'description','images/Creme_solaire_-_SPF_50++.png',0,0,2,4,NULL,NULL),(5,'Sérum - Acide hyaluronique',12.75,'description','images/Serum_-_Acide_hyaluronique.png',1,0,3,1,NULL,NULL),(6,'Sérum - Vitamine C + B',8.45,'Ce sérum concentré associe la puissance antioxydante de la vitamine C à l\'effet apaisant et hydratant de la vitamine B5, pour révéler une peau visiblement plus lumineuse, lisse et protégée.\n\n✨Pourquoi on l\'adore :\n- Illumine le teint et estompe les taches pigmentaires\n- Favorise la régénération cellulaire\n- Hydrate en profondeur sans effet gras\n- Texture légère, absorption rapide\n- Convient à tous les types de peau, même sensibles\n\n?Conseil d\'utilisation :\nAppliquer quelques gouttes matin et/ou soir sur peau propre avant la crème hydratante. Toujours utiliser une protection solaire en journée pour optimiser l\'efficacité de la vitamine C.\n\n✓ Formulé sans parabènes, silicones ni parfums artificiels.\n?Vegan & cruelty-free.','images/Serum_-_Vitamine_C_+_B.png',1,0,3,2,NULL,NULL);
UNLOCK TABLES;

DROP TABLE IF EXISTS `typepeau`;
CREATE TABLE `typepeau` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `typepeau` WRITE;
INSERT INTO `typepeau` VALUES (1,'Peau sèche'),(2,'Peau grasse'),(3,'Peau mixte'),(4,'Peau normale');
UNLOCK TABLES;

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `role` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `utilisateur` WRITE;
INSERT INTO `utilisateur` VALUES (1,'Sallam','Mona','mona@gmail.com','$2a$10$gvMd/MB3M5ws6OcMH/NsNOBvE6eOd7F3110zdMWR6uKl3bsySOJ0K',0);
UNLOCK TABLES;

SET TIME_ZONE=@OLD_TIME_ZONE;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT;
SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS;
SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION;
SET SQL_NOTES=@OLD_SQL_NOTES;
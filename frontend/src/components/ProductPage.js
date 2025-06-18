import React, { useState } from 'react';
import './ProductPage.css';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log('Ajouter au panier:', { quantity });
  };

  return (
    <div className="product-page">
      {/* Header avec navigation */}
      <header className="product-header">
        <nav className="product-nav">
          <div className="nav-left">
            <a href="#about" className="nav-link">ABOUT</a>
          </div>
          <div className="nav-right">
            <a href="#connexion" className="nav-link">CONNEXION</a>
            <a href="#panier" className="nav-link">PANIER</a>
          </div>
        </nav>
        
        {/* Logo SKINALOGY */}
        <div className="hero-content">
          <h1 className="hero-logo">SKINALOGY</h1>
        </div>
      </header>

      {/* Section principale du produit */}
      <main className="product-main">
        <div className="product-container">
          {/* Titre du produit centré */}
          <h2 className="product-title">Sérum - Vitamine C + B</h2>
          
          <div className="product-content">
            {/* Image du produit avec prix en dessous */}
            <div className="product-image-section">
              <div className="product-image-placeholder"></div>
              
              {/* Prix sous l'image */}
              <div className="price-section">
                <span className="product-price">8.45€</span>
              </div>
            </div>

            {/* Informations du produit */}
            <div className="product-info">
              <div className="product-tagline">
                <strong>Éclat. Uniformité. Hydratation.</strong>
              </div>

              <div className="product-description">
                <p>
                  Ce sérum concentré associe la puissance antioxydante de la vitamine C à l'effet 
                  apaisant et hydratant de la vitamine B5, pour révéler une peau visiblement plus 
                  lumineuse, lisse et protégée.
                </p>
              </div>

              <div className="product-benefits">
                <div className="benefits-header">
                  <span className="star-icon">✨</span>
                  <strong>Pourquoi on l'adore :</strong>
                </div>
                <ul className="benefits-list">
                  <li>• Illumine le teint et estompe les taches pigmentaires</li>
                  <li>• Favorise la régénération cellulaire</li>
                  <li>• Hydrate en profondeur sans effet gras</li>
                  <li>• Texture légère, absorption rapide</li>
                  <li>• Convient à tous les types de peau, même sensibles</li>
                </ul>
              </div>

              <div className="product-usage">
                <div className="usage-header">
                  <span className="bulb-icon">💡</span>
                  <strong>Conseil d'utilisation :</strong>
                </div>
                <p>
                  Appliquer quelques gouttes matin et/ou soir sur peau propre avant la crème 
                  hydratante. Toujours utiliser une protection solaire en journée pour optimiser 
                  l'efficacité de la vitamine C.
                </p>
              </div>

              <div className="product-features">
                <div className="feature-item">
                  <span className="check-icon">✓</span>
                  <span>Formulé sans parabènes, silicones ni parfums artificiels.</span>
                </div>
                <div className="feature-item">
                  <span className="leaf-icon">🌿</span>
                  <span>Vegan & cruelty-free.</span>
                </div>
              </div>

              {/* Bouton Ajouter tout en bas à droite de la colonne info */}
              <div className="add-to-cart-section">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="product-footer">
        <h2 className="footer-logo">SKINALOGY</h2>
      </footer>
    </div>
  );
};

export default ProductPage;
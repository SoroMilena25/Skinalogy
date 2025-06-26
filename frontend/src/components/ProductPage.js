import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductPage.css';
import apiService from '../services/apiService';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        setLoading(true);
        const produitData = await apiService.getProduitById(id);
        console.log('Produit récupéré:', produitData);
        console.log('Image URL:', produitData.image);
        setProduit(produitData);
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error);
        setError('Produit non trouvé');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduit();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (produit) {
      console.log('Ajouter au panier:', { produit, quantity });
      // Ici tu peux ajouter la logique pour le panier
    }
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="product-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !produit) {
    return (
      <div className="product-page">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>{error || 'Produit non trouvé'}</p>
          <button onClick={handleHomeClick} style={{ marginTop: '20px', padding: '10px 20px' }}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

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
        
        {/* Logo SKINALOGY cliquable pour retour accueil */}
        <div className="hero-content">
          <h1 className="hero-logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
            SKINALOGY
          </h1>
        </div>
      </header>

      {/* Section principale du produit */}
      <main className="product-main">
        <div className="product-container">
          {/* Titre du produit centré */}
          <h2 className="product-title">{produit.nom}</h2>
          
          <div className="product-content">
            {/* Image du produit avec prix en dessous */}
            <div className="product-image-section">
              {produit.image ? (
                  <img 
                    src={produit.image.startsWith('/') ? produit.image : `/${produit.image}`}
                    alt={produit.nom}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="placeholder-imgHome"
                  style={{ display: produit.image ? 'none' : 'flex' }}
                >
                </div>
              
              {/* Prix sous l'image */}
              <div className="price-section">
                <span className="product-price">{formatPrice(produit.prix)}€</span>
              </div>
            </div>

            {/* Informations du produit */}
            <div className="product-info">
              <div className="product-tagline">
                {produit.topProduit && <strong>⭐ Top du moment</strong>}
                {produit.ideeCadeau && <strong>🎁 Idée cadeau</strong>}
              </div>

              <div className="product-description">
                <p style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{produit.description}</p>
              </div>

              {/* Bouton Ajouter tout en bas à droite de la colonne info */}
              <div className="add-to-cart-section">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="product-footer">
        <h2 className="footer-logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
          SKINALOGY
        </h2>
      </footer>
    </div>
  );
};

export default ProductPage;
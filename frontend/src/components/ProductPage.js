import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductPage.css';
import apiService from '../services/apiService';
import Navbar from './Navbar';
import Footer from './Footer';
import { useCart } from '../hooks/useCart';

const ProductPage = () => {
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

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
      const success = addToCart({
        id: produit.id,
        nom: produit.nom,
        prix: produit.prix,
        image: produit.image
      });
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
      <Navbar />
      <header className="product-header">
        <div className="hero-content">
          <h1 className="hero-logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
            SKINALOGY
          </h1>
        </div>
      </header>

      <main className="product-main">
        <div className="product-container">
          <h2 className="product-title">{produit.nom}</h2>
          
          <div className="product-content">
            <div className="product-image-section">
              {produit.image ? (
                <img 
                  src={produit.image.startsWith('/') ? produit.image : `/${produit.image}`}
                  alt={produit.nom}
                  style={{ 
                    width: '400px', 
                    height: '500px', 
                    objectFit: 'cover',
                    borderRadius: '10px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="productPage-image-placeholder"
                style={{ display: produit.image ? 'none' : 'flex' }}
              ></div>
              
              <div className="price-section">
                <span className="product-price">{formatPrice(produit.prix)}€</span>
              </div>
            </div>

            <div className="product-info-Product">
              <div>
                <div className="product-tagline">
                  {produit.topProduit && <strong>⭐ Top du moment</strong>}
                  {produit.ideeCadeau && <strong>🎁 Idée cadeau</strong>}
                </div>

                <div className="product-description">
                  <p style={{ whiteSpace: 'pre-line', textAlign: 'left', marginTop: '20px' }}>
                    {produit.description}
                  </p>
                </div>
              </div>
              
              <div className="add-to-cart-section">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;


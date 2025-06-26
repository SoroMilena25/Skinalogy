import React, { useState, useEffect } from 'react';
import './HomePage.css';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [topProduits, setTopProduits] = useState([]);
  const [ideeCadeaux, setIdeeCadeaux] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topData = await apiService.getTopProduits();
        const cadeauxData = await apiService.getIdeeCadeaux();
        
        setTopProduits(topData);
        setIdeeCadeaux(cadeauxData);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchData();
  }, []);

  // Fonction pour formater le prix
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  // Fonction pour naviguer vers la page produit
  const handleProductClick = (produitId) => {
    navigate(`/produit/${produitId}`);
  };

  // Fonction pour ajouter au panier (empêche la navigation)
  const handleAddToCart = (e, produit) => {
    e.stopPropagation(); // Empêche le clic de déclencher la navigation
    console.log('Produit ajouté au panier:', produit);
    // Logique d'ajout au panier ici
  };

  return (
    <div className="homepage">
      {/* Header avec navigation */}
      <header className="header">
        <nav className="nav">
          <div className="nav-left">
            <a href="#about" className="nav-link">ABOUT</a>
          </div>
          <div className="nav-right">
            <a href="#connexion" className="nav-link">CONNEXION</a>
            <a href="#panier" className="nav-link">PANIER</a>
          </div>
        </nav>
      </header>

      {/* Section Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">SKINALOGY</h1>
        </div>
      </section>

      {/* Section TOP DU MOMENT */}
      <section className="top-moment">
        <h2 className="section-title">TOP DU MOMENT</h2>
        <div className="products-gridHome">
          {topProduits.map((produit) => (
            <div key={produit.id} className="product-cardHome title-top" onClick={() => handleProductClick(produit.id)}>
              <h3 className="product-titleHome">{produit.nom}</h3>
              <div className="product-imageHome">
                {produit.image ? (
                  <img 
                    src={produit.image} 
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
                <button className="add-btnHome" onClick={(e) => handleAddToCart(e, produit)}>+</button>
              </div>
              <p className="product-priceHome">{formatPrice(produit.prix)}€</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Partenariat Typology */}
      <section className="partnership">
        <div className="partnership-content">
          <div className="partnership-text">
            <h2>En partenaire avec Typology</h2>
            <p>Profitez du code promo : SPRING25</p>
          </div>
          <div className="partnership-offer">
            <p>20% sur leur site et 50% sur nos produits favoris</p>
          </div>
        </div>
      </section>

      {/* Section Beauty Basics */}
      <section className="beauty-basics">
        <div className="content-wrapper">
          <div className="text-content">
            <div>
              <h2 className="section-title">BEAUTY BASICS</h2>
              <h3>Quel est l'utilité d'une crème solaire ?</h3>
              <p>
                La <strong>crème solaire</strong> protège ta peau des effets 
                nocifs du soleil, en particulier des rayons UV 
                (UVA et UVB). Elle <strong>prévient le vieillissement 
                prématuré, les taches pigmentaires, les 
                coups de soleil</strong>... et surtout, elle réduit le 
                <strong>risque de cancer de la peau</strong>. C'est LE geste 
                incontournable, été comme hiver, pour 
                <strong>préserver l'éclat et la santé de ta peau</strong>.
              </p>
            </div>
            <a href="#" className="beauty-link">
              &gt;&gt; Cliquez ici pour d'autres astuces beautés
            </a>
          </div>
          <div className="product-showcase">
            {/*<div className="product-cardHome">
              <div className="product-imageHome">
                <div className="placeholder-imgHome"></div>
                <button className="add-btnHome">+</button>
              </div>
              <h3 className="product-titleHome">Crème solaire - SPF 50++</h3>
              <p className="product-priceHome">9.75€</p>
            </div>*/}
            <div className="product-cardHomeTips title-top">
              <h3 className="product-titleHome">Crème solaire - SPF 50++</h3>
              <div className="product-imageHome">
                <div className="placeholder-imgHome"></div>
                <button className="add-btnHome">+</button>{/*onClick={(e) => handleAddToCart(e, produit)}*/}
              </div>
              <p className="product-priceHome">9.75€</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Idées Cadeaux */}
      <section className="gift-ideas">
        <h2 className="section-title white">IDÉES CADEAUX</h2>
        <p className="section-subtitle">La fête des mères approche à grands pas !</p>
        
        <div className="products-gridHome">
          {ideeCadeaux.map((produit) => (
            <div key={produit.id} className="product-cardHome title-top gift" onClick={() => handleProductClick(produit.id)}>
              <h3 className="product-titleHome">{produit.nom}</h3>
              <div className="product-imageHome">
                {produit.image ? (
                  <img 
                    src={produit.image} 
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
                <button className="add-btnHome white-btn" onClick={(e) => handleAddToCart(e, produit)}>+</button>
              </div>
              <p className="product-priceHome">{formatPrice(produit.prix)}€</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h2 className="footer-logo">SKINALOGY</h2>
      </footer>
    </div>
  );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useCart } from '../hooks/useCart';
import Footer from './Footer';

const HomePage = () => {
  const [topProduits, setTopProduits] = useState([]);
  const [ideeCadeaux, setIdeeCadeaux] = useState([]);
  const [astuceHome, setAstuceHome] = useState({});
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topData = await apiService.getTopProduits();
        const cadeauxData = await apiService.getIdeeCadeaux();
        const astuceData = await apiService.getAstuceHome();
        
        setTopProduits(topData);
        setIdeeCadeaux(cadeauxData);

        console.log('DEBUG astuceData:', astuceData);
        
        if (astuceData && astuceData.idProduit) {
          console.log('DEBUG idProduit trouvé:', astuceData.idProduit);
          // Récupérer les données du produit associé à l'astuce
          const produitAstuceData = await apiService.getProduitById(astuceData.idProduit);

          console.log('DEBUG produitAstuceData:', produitAstuceData);
          setAstuceHome({
            ...astuceData,
            produitAssocie: produitAstuceData // Nom spécifique pour éviter les conflits
          });
        } else {
          setAstuceHome(astuceData || {});
        }

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
    e.stopPropagation();
    
    // Utiliser le nouveau service de panier
    const success = addToCart({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      image: produit.image
    });
    
    // Le service gère déjà la vérification de connexion et les notifications
  };

  return (
    <div className="homepage">
      {/* Header avec navigation */}
      <Navbar />

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
              <h3>{astuceHome.titre}</h3>
                <p dangerouslySetInnerHTML={{ __html: astuceHome.texte }}></p>
            </div>
            <a href="#" className="beauty-link">
              &gt;&gt; Cliquez ici pour d'autres astuces beautés
            </a>
          </div>

          <div className="product-showcase">
            {astuceHome?.titre ? (
              <div className="product-cardHomeTips title-top" onClick={() => handleProductClick(astuceHome.idProduit)}>
                <h3 className="product-titleHome">
                  {astuceHome.produitAssocie?.nom || astuceHome.titre}
                </h3>
                <div className="product-imageHome">
                  {(astuceHome.image || astuceHome.produitAssocie?.image) ? (
                    <img 
                      src={astuceHome.image || astuceHome.produitAssocie?.image} 
                      alt={astuceHome.titre}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="placeholder-imgHome"
                    style={{ display: (astuceHome.image || astuceHome.produitAssocie?.image) ? 'none' : 'flex' }}
                  >
                  </div>
                  <button className="add-btnHome" onClick={(e) => handleAddToCart(e, astuceHome.produitAssocie || astuceHome)}>+</button>
                </div>
                <p className="product-priceHome">
                  {astuceHome.produitAssocie?.prix ? formatPrice(astuceHome.produitAssocie.prix) : '--.--'}€
                </p>
              </div>
            ) : (
              <div className="product-cardHomeTips title-top">
                <h3 className="product-titleHome">Chargement...</h3>
                <div className="product-imageHome">
                  <div className="placeholder-imgHome"></div>
                </div>
                <p className="product-priceHome">--.--€</p>
              </div>
            )}
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
      <Footer />
    </div>
  );
};

export default HomePage;
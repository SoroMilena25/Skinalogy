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

          const produitAstuceData = await apiService.getProduitById(astuceData.idProduit);

          console.log('DEBUG produitAstuceData:', produitAstuceData);
          setAstuceHome({
            ...astuceData,
            produitAssocie: produitAstuceData
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

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const handleProductClick = (produitId) => {
    navigate(`/produit/${produitId}`);
  };

  const handleAddToCart = (e, produit) => {
    e.stopPropagation();
    
    const success = addToCart({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      image: produit.image
    });
    
  };

  return (
    <div className="homepage">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">SKINALOGY</h1>
        </div>
      </section>

      <section className="top-moment">
        <h2 className="section-title-Home">TOP DU MOMENT</h2>
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

      <section className="beauty-basics">
        <div className="content-wrapper">
          <div className="text-content">
            <div>
              <h2 className="section-title-Home">BEAUTY BASICS</h2>
              <h3>{astuceHome.titre}</h3>
                
                <p style={{ whiteSpace: 'pre-line'}}>
                    {astuceHome.texte}
                  </p>
            </div>
            <a href="/astuces" className="beauty-link">
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

      <section className="gift-ideas">
        <h2 className="section-title-Home white">IDÉES CADEAUX</h2>
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

      <Footer />
    </div>
  );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TipDetailPage.css';
import apiService from '../services/apiService';
import Navbar from './Navbar';
import Footer from './Footer';
import { useCart } from '../hooks/useCart';

const TipDetailPage = () => {
  const [astuce, setAstuce] = useState(null);
  const [produitAssocie, setProduitAssocie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchAstuce = async () => {
      try {
        setLoading(true);
        const astuceData = await apiService.getAstuceById(id);
        console.log('Astuce récupérée:', astuceData);
        setAstuce(astuceData);
        
        if (astuceData.idProduit) {
          const produitData = await apiService.getProduitById(astuceData.idProduit);
          console.log('Produit associé récupéré:', produitData);
          setProduitAssocie(produitData);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'astuce:', error);
        setError('Astuce non trouvée');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAstuce();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (produitAssocie) {
      const success = addToCart({
        id: produitAssocie.id,
        nom: produitAssocie.nom,
        prix: produitAssocie.prix,
        image: produitAssocie.image
      });
    }
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleBackToTips = () => {
    navigate('/astuces');
  };

  if (loading) {
    return (
      <div className="tip-detail-page">
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !astuce) {
    return (
      <div className="tip-detail-page">
        <Navbar />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>{error || 'Astuce non trouvée'}</p>
          <button onClick={handleBackToTips} style={{ marginTop: '20px', padding: '10px 20px' }}>
            Retour aux astuces
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="tip-detail-page">
      <Navbar />
      
      <header className="tip-detail-header">
        <div className="hero-content">
          <h1 className="hero-logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
            SKINALOGY
          </h1>
        </div>
      </header>

      <main className="tip-detail-main">
        <div className="tip-detail-container">
          
          <h2 className="tip-detail-title">{astuce.titre}</h2>
          
          <div className="tip-detail-content">

            <div className="tip-detail-image-section" onClick={() => navigate(`/produit/${produitAssocie.id}`)}>
              {produitAssocie ? (

                
                  <div className="" style = {{ width: '70%' }}>
                    <h3 className="product-titleHome">{produitAssocie.nom}</h3>
                    <div className="product-imageHome">
                      {produitAssocie.image ? (
                        <img 
                          src={produitAssocie.image.startsWith('/') ? produitAssocie.image : `/${produitAssocie.image}`}
                          alt={produitAssocie.nom}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="placeholder-imgHome"
                        style={{ display: produitAssocie.image ? 'none' : 'flex' }}
                      >
                      </div>
                      <button className="add-btnHome" onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart();
                      }}>+</button>
                    </div>
                    <p className="product-priceHome">{formatPrice(produitAssocie.prix)}€</p>
                  </div>
                
              ) : (

                <>
                  {astuce.image ? (
                    <img 
                      src={astuce.image.startsWith('/') ? astuce.image : `/${astuce.image}`}
                      alt={astuce.titre}
                      className="tip-detail-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="tip-detail-image-placeholder"
                    style={{ display: astuce.image ? 'none' : 'flex' }}
                  >
                  </div>
                </>
              )}
            </div>


            <div className="tip-detail-info">
              <div className="tip-detail-text" style={{ textAlign: 'left' }}>
                <div 
                  className="tip-description"
                  style={{ whiteSpace: 'pre-line', marginTop: '50px', fontSize: '1.1rem', lineHeight: '1.6' }}
                >
                  {astuce.texte}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TipDetailPage;
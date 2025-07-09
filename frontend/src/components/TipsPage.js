import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TipsPage.css';
import apiService from '../services/apiService';
import Navbar from './Navbar';
import Footer from './Footer';

const TipsPage = () => {
  const [astuces, setAstuces] = useState([]);
  const [astucesWithImages, setAstucesWithImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAstuces = async () => {
      try {
        setLoading(true);
        const astucesData = await apiService.getAllAstuces();
        console.log('Astuces récupérées:', astucesData);
        
        const astucesWithProduitImages = await Promise.all(
          astucesData.map(async (astuce) => {

            if (astuce.image) {
              return {
                ...astuce,
                imageToDisplay: astuce.image 
              };
            }

            else if (astuce.idProduit) {
              try {
                const produit = await apiService.getProduitById(astuce.idProduit);
                return {
                  ...astuce,
                  imageToDisplay: produit.image, 
                  produitAssocie: produit
                };
              } catch (error) {
                console.error(`Erreur lors du chargement du produit ${astuce.idProduit}:`, error);
                return {
                  ...astuce,
                  imageToDisplay: null
                };
              }
            }

            else {
              return {
                ...astuce,
                imageToDisplay: null
              };
            }
          })
        );
        
        setAstucesWithImages(astucesWithProduitImages);
      } catch (error) {
        console.error('Erreur lors du chargement des astuces:', error);
        setError('Erreur lors du chargement des astuces');
      } finally {
        setLoading(false);
      }
    };

    fetchAstuces();
  }, []);

  const handleTipClick = (astuceId) => {
    navigate(`/astuce/${astuceId}`);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="tips-page">
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>Chargement des astuces...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="tips-page">
        <Navbar />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>{error}</p>
          <button onClick={handleHomeClick} style={{ marginTop: '20px', padding: '10px 20px' }}>
            Retour à l'accueil
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="tips-page">
      <Navbar />

      <header className="tips-header">

        <div className="hero-content">
          <h1 className="hero-logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
            SKINALOGY
          </h1>
        </div>
      </header>


      <main className="tips-main">
        <div className="tips-container">

          <h2 className="tips-title">NOS ASTUCES BEAUTES</h2>
          
          {astucesWithImages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>
                Aucune astuce disponible pour le moment.
              </p>
            </div>
          ) : (

            <div className="tips-grid">
              {astucesWithImages.map((astuce, index) => (
                <div 
                  key={astuce.id} 
                  className={`tip-card ${index === 0 ? 'large' : 'medium'}`}
                  onClick={() => handleTipClick(astuce.id)}
                >
                  <div className={`tip-image ${index === 0 ? 'large-image' : 'medium-image'}`}>
                    {astuce.imageToDisplay ? (
                      <img 
                        src={astuce.imageToDisplay.startsWith('/') ? astuce.imageToDisplay : `/${astuce.imageToDisplay}`}
                        alt={astuce.titre}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`tip-image-placeholder ${index === 0 ? 'large-placeholder' : 'medium-placeholder'}`}
                      style={{ display: astuce.imageToDisplay ? 'none' : 'flex' }}
                    >
                    </div>
                  </div>
                  <div className="tip-content">
                    <h3 className="tip-title">{astuce.titre}</h3>
                  </div>
                </div>
              ))}

              {Array.from({ length: Math.max(0, 5 - astucesWithImages.length) }).map((_, index) => (
                <div 
                  key={`placeholder-${index}`} 
                  className="tip-card medium"
                  style={{ opacity: 0.3, cursor: 'default' }}
                >
                  <div className="tip-image medium-image">
                    <div className="tip-image-placeholder medium-placeholder"></div>
                  </div>
                  <div className="tip-content">
                    <h3 className="tip-title">Bientôt disponible...</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TipsPage;
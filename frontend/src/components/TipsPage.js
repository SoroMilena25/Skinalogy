import React from 'react';
import './TipsPage.css';

const TipsPage = () => {
  const beautyTips = [
    {
      id: 1,
      title: "Quel est l'utilité d'une crème solaire ?",
      image: "sunscreen1",
      size: "large"
    },
    {
      id: 2,
      title: "Quel est l'utilité d'une crème solaire ?",
      image: "sunscreen2",
      size: "medium"
    },
    {
      id: 3,
      title: "Quel est l'utilité d'une crème solaire ?",
      image: "sunscreen3",
      size: "medium"
    },
    {
      id: 4,
      title: "Quel est l'utilité d'une crème solaire ?",
      image: "sunscreen4",
      size: "medium"
    },
    {
      id: 5,
      title: "Quel est l'utilité d'une crème solaire ?",
      image: "sunscreen5",
      size: "medium"
    }
  ];

  const handleTipClick = (tipId) => {
    console.log('Ouvrir astuce:', tipId);
  };

  return (
    <div className="tips-page">
      {/* Header avec navigation */}
      <header className="tips-header">
        <nav className="tips-nav">
          <div className="nav-left">
            <a href="#about" className="nav-link active">ABOUT</a>
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

      {/* Section principale des astuces */}
      <main className="tips-main">
        <div className="tips-container">
          {/* Titre de la section */}
          <h2 className="tips-title">NOS ASTUCES BEAUTES</h2>
          
          {/* Grille des astuces */}
          <div className="tips-grid">
            {/* Grande carte en haut à gauche */}
            <div className="tip-card large" onClick={() => handleTipClick(beautyTips[0].id)}>
              <div className="tip-image large-image">
                <div className="tip-image-placeholder large-placeholder"></div>
              </div>
              <div className="tip-content">
                <h3 className="tip-title">{beautyTips[0].title}</h3>
              </div>
            </div>

            {/* Cartes moyennes */}
            <div className="tip-card medium" onClick={() => handleTipClick(beautyTips[1].id)}>
              <div className="tip-image medium-image">
                <div className="tip-image-placeholder medium-placeholder"></div>
              </div>
              <div className="tip-content">
                <h3 className="tip-title">{beautyTips[1].title}</h3>
              </div>
            </div>

            <div className="tip-card medium" onClick={() => handleTipClick(beautyTips[2].id)}>
              <div className="tip-image medium-image">
                <div className="tip-image-placeholder medium-placeholder"></div>
              </div>
              <div className="tip-content">
                <h3 className="tip-title">{beautyTips[2].title}</h3>
              </div>
            </div>

            <div className="tip-card medium" onClick={() => handleTipClick(beautyTips[3].id)}>
              <div className="tip-image medium-image">
                <div className="tip-image-placeholder medium-placeholder"></div>
              </div>
              <div className="tip-content">
                <h3 className="tip-title">{beautyTips[3].title}</h3>
              </div>
            </div>

            <div className="tip-card medium" onClick={() => handleTipClick(beautyTips[4].id)}>
              <div className="tip-image medium-image">
                <div className="tip-image-placeholder medium-placeholder"></div>
              </div>
              <div className="tip-content">
                <h3 className="tip-title">{beautyTips[4].title}</h3>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="tips-footer">
        <h2 className="footer-logo">SKINALOGY</h2>
      </footer>
    </div>
  );
};

export default TipsPage;
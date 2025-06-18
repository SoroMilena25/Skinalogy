import React from 'react';
import './HomePage.css';

const HomePage = () => {
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

      {/* Section Hero avec image de fond */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">SKINALOGY</h1>
        </div>
      </section>

      {/* Section TOP DU MOMENT */}
      <section className="top-moment">
        <h2 className="section-title">TOP DU MOMENT</h2>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-image">
              <div className="placeholder-img"></div>
              <button className="add-btn">+</button>
            </div>
            <h3 className="product-title">Crème hydratante smooth</h3>
            <p className="product-price">14.50€</p>
          </div>
          
          <div className="product-card">
            <div className="product-image">
              <div className="placeholder-img"></div>
              <button className="add-btn">+</button>
            </div>
            <h3 className="product-title">Sérum - Acide hyaluronique</h3>
            <p className="product-price">12.75€</p>
          </div>
          
          <div className="product-card">
            <div className="product-image">
              <div className="placeholder-img"></div>
              <button className="add-btn">+</button>
            </div>
            <h3 className="product-title">Sérum - Vitamine C + B</h3>
            <p className="product-price">8.45€</p>
          </div>
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
            <a href="#" className="beauty-link">
              &gt;&gt; Cliquez ici pour d'autres astuces beautés
            </a>
          </div>
          <div className="product-showcase">
            <div className="product-card">
              <div className="product-image">
                <div className="placeholder-img"></div>
                <button className="add-btn">+</button>
              </div>
              <h3 className="product-title">Crème solaire - SPF 50++</h3>
              <p className="product-price">9.75€</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Idées Cadeaux */}
      <section className="gift-ideas">
        <h2 className="section-title-white">IDÉES CADEAUX</h2>
        <p className="section-subtitle">Le fête des mères approches à grands pas !</p>
        
        <div className="gift-grid">
          <div className="gift-card">
            <div className="gift-image">
              <div className="placeholder-img"></div>
              <button className="add-btn">+</button>
            </div>
            <h3 className="gift-title">Coffret - Soins anti-âge</h3>
            <p className="gift-price">38.50€</p>
          </div>
          
          <div className="gift-card">
            <div className="gift-image">
              <div className="placeholder-img"></div>
              <button className="add-btn">+</button>
            </div>
            <h3 className="gift-title">Coffret - Routine complète florale</h3>
            <p className="gift-price">45.85€</p>
          </div>
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
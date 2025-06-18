import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Logique de connexion à implémenter
    console.log('Connexion avec:', { email, password });
  };

  return (
    <div className="login-page">
      {/* Section Hero avec image de fond et navigation */}
      <section className="login-hero">
        {/* Header avec navigation */}
        <header className="login-header">
          <nav className="login-nav">
            <div className="nav-left">
              <a href="#about" className="nav-link">ABOUT</a>
            </div>
            <div className="nav-right">
              <a href="#connexion" className="nav-link active">CONNEXION</a>
              <a href="#panier" className="nav-link">PANIER</a>
            </div>
          </nav>
        </header>

        {/* Logo SKINALOGY */}
        <div className="hero-content">
          <h1 className="hero-logo">SKINALOGY</h1>
        </div>
      </section>

      {/* Section principale dorée avec formulaire */}
      <section className="login-main">
        <div className="login-container">
          {/* Texte décoratif gauche */}
          <div className="decorative-text left">
            <h2>POLYPHENOLS</h2>
            <h3>ANTIOXYDANTS</h3>
          </div>

          {/* Formulaire de connexion */}
          <div className="login-form-container">
            <div className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="button" className="login-button" onClick={handleSubmit}>
                Se connecter
              </button>
            </div>
          </div>

          {/* Texte décoratif droit */}
          <div className="decorative-text right">
            <h2>POLYPHENOLS</h2>
            <h3>ANTIOXYDANTS</h3>
          </div>
        </div>

        {/* Image décorative dorée (à droite du formulaire) */}
        <div className="decorative-image">
          <div className="golden-drop"></div>
        </div>
      </section>

      {/* Section footer noire */}
      <section className="login-footer">
        <div className="footer-content">
          {/* Footer noir comme sur la maquette */}
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
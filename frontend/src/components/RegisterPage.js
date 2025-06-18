import React, { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    // Logique d'inscription à implémenter
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas !');
      return;
    }
    console.log('Inscription avec:', { email, password, confirmPassword });
  };

  return (
    <div className="register-page">
      {/* Section Hero avec image de fond et navigation */}
      <section className="register-hero">
        {/* Header avec navigation */}
        <header className="register-header">
          <nav className="register-nav">
            <div className="nav-left">
              <a href="#about" className="nav-link">ABOUT</a>
            </div>
            <div className="nav-right">
              <a href="#connexion" className="nav-link">CONNEXION</a>
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
      <section className="register-main">
        <div className="register-container">
          {/* Texte décoratif gauche */}
          <div className="decorative-text left">
            <h2>POLYPHENOLS</h2>
            <h3>ANTIOXYDANTS</h3>
          </div>

          {/* Formulaire d'inscription */}
          <div className="register-form-container">
            <div className="register-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Saisissez votre adresse e-mail
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
                  Saisissez votre mot de passe
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

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmez votre mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="button" className="register-button" onClick={handleSubmit}>
                S'inscrire
              </button>
            </div>
          </div>

          {/* Texte décoratif droit */}
          <div className="decorative-text right">
            <h2>POLYPHENOLS</h2>
            <h3>ANTIOXYDANTS</h3>
          </div>
        </div>

        {/* Image décorative dorée */}
        <div className="decorative-image">
          <div className="golden-drop"></div>
        </div>
      </section>

      {/* Section footer avec logo */}
      <section className="register-footer">
        <div className="footer-content">
          <h2 className="footer-logo">SKINALOGY</h2>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
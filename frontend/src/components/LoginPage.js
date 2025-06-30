import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('http://localhost:8080/api/utilisateurs/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sauvegarder les informations de l'utilisateur
        localStorage.setItem('user', JSON.stringify(data.utilisateur));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Rediriger vers la page d'accueil ou dashboard
        window.location.href = '/dashboard';
      } else {
        if (data.error) {
          setErrors({ general: data.error });
        } else {
          setErrors({ general: 'Une erreur est survenue lors de la connexion' });
        }
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setErrors({ general: 'Erreur de connexion au serveur' });
    } finally {
      setIsLoading(false);
    }
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
              {/* Message d'erreur général */}
              {errors.general && (
                <div style={{
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                  padding: '12px',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  fontSize: '14px',
                  border: '1px solid #f5c6cb'
                }}>
                  {errors.general}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  style={errors.email ? {borderColor: '#dc3545', boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.25)'} : {}}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && (
                  <span style={{color: '#dc3545', fontSize: '14px', marginTop: '4px', display: 'block'}}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  style={errors.password ? {borderColor: '#dc3545', boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.25)'} : {}}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                {errors.password && (
                  <span style={{color: '#dc3545', fontSize: '14px', marginTop: '4px', display: 'block'}}>
                    {errors.password}
                  </span>
                )}
              </div>

              <button 
                type="button" 
                className="login-button" 
                style={isLoading ? {opacity: 0.6, cursor: 'not-allowed'} : {}}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </button>

              {/* Liens supplémentaires */}
              <div style={{textAlign: 'center', marginTop: '20px'}}>
                <p style={{marginBottom: '8px', fontSize: '14px'}}>
                  Pas encore de compte ? 
                  <a href="/register" style={{color: '#007bff', textDecoration: 'none', fontWeight: '500', marginLeft: '5px'}}>
                    S'inscrire
                  </a>
                </p>
                <a href="/forgot-password" style={{color: '#6c757d', textDecoration: 'none', fontSize: '13px'}}>
                  Mot de passe oublié ?
                </a>
              </div>
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
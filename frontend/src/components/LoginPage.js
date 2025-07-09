import React, { useState } from 'react';
import './LoginPage.css';
import apiService from '../services/apiService';
import Navbar from './Navbar';
import Footer from './Footer';

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
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

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
      console.log('🔍 Tentative de connexion avec:', { email: formData.email });
      const data = await apiService.login(formData.email, formData.password);
      console.log('Réponse reçue:', data);

      if (data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.utilisateur));
        
        if (data.utilisateur && data.utilisateur.email) {
          try {
            await apiService.logLogin(data.utilisateur.email);
          } catch (e) {
            console.warn('Log MongoDB non inséré:', e.message);
          }
        }
        if (data.utilisateur && data.utilisateur.role === 1) {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/';
        }
      } else {
        setErrors({ general: 'Une erreur est survenue lors de la connexion' });
      }
    } catch (data) {
      console.error('Erreur complète:', data);
      if (data && data.error) {
        setErrors({ general: data.error });
      } else {
        setErrors({ general: 'Une erreur est survenue lors de la connexion' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="login-page">
      <Navbar />

      <section className="login-hero">

        <div className="hero-content">
          <h1 className="hero-logo">SKINALOGY</h1>
        </div>
      </section>

      <section className="login-main">
        <div className="login-videos-container">
          <div className="video-side left">
            <video src="/videos/video.mp4" autoPlay loop muted playsInline />

          </div>
          <div className="video-side right">
            <video src="/videos/video.mp4" autoPlay loop muted playsInline />
   
          </div>
          <div className="login-form-side">
            <div className="login-form-container">
              <div className="login-form">

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

                <div style={{textAlign: 'center', marginTop: '20px'}}>
                  <p style={{marginBottom: '8px', fontSize: '14px'}}>
                    Pas encore de compte ? 
                    <a href="/inscription" style={{color: '#007bff', textDecoration: 'none', fontWeight: '500', marginLeft: '5px'}}>
                      S'inscrire
                    </a>
                  </p>
                  <a href="/forgot-password" style={{color: '#6c757d', textDecoration: 'none', fontSize: '13px'}}>
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LoginPage;
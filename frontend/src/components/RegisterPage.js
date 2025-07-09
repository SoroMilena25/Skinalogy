import React, { useState } from 'react';
import './RegisterPage.css';
import apiService from '../services/apiService';
import Navbar from './Navbar';
import Footer from './Footer';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
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
    setSuccessMessage('');

    try {
      const data = await apiService.register({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        mdp: formData.password
      });

      setSuccessMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      setTimeout(() => {
        window.location.href = '/connexion';
      }, 2000);
    } catch (data) {
      if (data && data.error) {
        setErrors({ general: data.error });
      } else {
        setErrors({ general: 'Une erreur est survenue lors de l\'inscription' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Navbar />

      <section className="register-hero">

        <div className="hero-content">
          <h1 className="hero-logo">SKINALOGY</h1>
        </div>
      </section>

      <section className="register-main">
        <div className="register-videos-container">
          <div className="video-side left">
            <video src="/videos/video.mp4" autoPlay loop muted playsInline />
          </div>
          <div className="video-side right">
            <video src="/videos/video.mp4" autoPlay loop muted playsInline />
          </div>
          
          <div className="register-form-side">
            <div className="register-form-container">
              <div className="register-form">
                {errors.general && (
                  <div style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    border: '1px solid #f5c6cb'
                  }}>
                    {errors.general}
                  </div>
                )}
                {successMessage && (
                  <div style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    border: '1px solid #c3e6cb'
                  }}>
                    {successMessage}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="nom" className="form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    className="form-input"
                    style={errors.nom ? {borderColor: '#dc3545', boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.25)'} : {}}
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.nom && (
                    <span style={{color: '#dc3545', fontSize: '13px', marginTop: '2px', display: 'block'}}>
                      {errors.nom}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="prenom" className="form-label">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    className="form-input"
                    style={errors.prenom ? {borderColor: '#dc3545', boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.25)'} : {}}
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.prenom && (
                    <span style={{color: '#dc3545', fontSize: '13px', marginTop: '2px', display: 'block'}}>
                      {errors.prenom}
                    </span>
                  )}
                </div>

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
                    <span style={{color: '#dc3545', fontSize: '13px', marginTop: '2px', display: 'block'}}>
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
                    <span style={{color: '#dc3545', fontSize: '13px', marginTop: '2px', display: 'block'}}>
                      {errors.password}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmez le mot de passe
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input"
                    style={errors.confirmPassword ? {borderColor: '#dc3545', boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.25)'} : {}}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.confirmPassword && (
                    <span style={{color: '#dc3545', fontSize: '13px', marginTop: '2px', display: 'block'}}>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                <button 
                  type="button" 
                  className="register-button" 
                  style={isLoading ? {opacity: 0.6, cursor: 'not-allowed'} : {}}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
                </button>

                <div style={{textAlign: 'center', marginTop: '15px'}}>
                  <p style={{fontSize: '14px'}}>
                    Déjà un compte ? 
                    <a href="/connexion" style={{color: '#007bff', textDecoration: 'none', fontWeight: '500', marginLeft: '5px'}}>
                      Se connecter
                    </a>
                  </p>
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

export default RegisterPage;
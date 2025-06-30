import React, { useState } from 'react';
import './RegisterPage.css';

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

    // Validation du nom
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    // Validation du prénom
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }

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
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    // Validation de la confirmation du mot de passe
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
      const response = await fetch('http://localhost:8080/api/utilisateurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          mdp: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Rediriger vers la page de connexion après 2 secondes
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        if (data.error) {
          setErrors({ general: data.error });
        } else {
          setErrors({ general: 'Une erreur est survenue lors de l\'inscription' });
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setErrors({ general: 'Erreur de connexion au serveur' });
    } finally {
      setIsLoading(false);
    }
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
              {/* Messages d'erreur et de succès */}
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
              {successMessage && (
                <div style={{
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  padding: '12px',
                  borderRadius: '6px',
                  marginBottom: '20px',
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
                  <span style={{color: '#dc3545', fontSize: '14px', marginTop: '4px', display: 'block'}}>
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
                  <span style={{color: '#dc3545', fontSize: '14px', marginTop: '4px', display: 'block'}}>
                    {errors.prenom}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Saisissez votre adresse e-mail
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
                  Saisissez votre mot de passe
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

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmez votre mot de passe
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
                  <span style={{color: '#dc3545', fontSize: '14px', marginTop: '4px', display: 'block'}}>
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

              {/* Lien vers la connexion */}
              <div style={{textAlign: 'center', marginTop: '20px'}}>
                <p style={{fontSize: '14px'}}>
                  Déjà un compte ? 
                  <a href="/login" style={{color: '#007bff', textDecoration: 'none', fontWeight: '500', marginLeft: '5px'}}>
                    Se connecter
                  </a>
                </p>
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
import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import Navbar from './Navbar';
import Footer from './Footer';
import apiService from '../services/apiService';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Récupérer les informations utilisateur depuis localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        nom: parsedUser.nom || '',
        prenom: parsedUser.prenom || '',
        email: parsedUser.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Charger l'historique des commandes
      loadOrderHistory(parsedUser.id);
    }
  }, []);

  const loadOrderHistory = async (userId) => {
    try {
      setLoadingOrders(true);
      // Récupérer les commandes de l'utilisateur
      const userOrders = await apiService.getUserOrders(userId);
      setOrders(userOrders);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

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

    // Validation des champs obligatoires
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    // Validation du mot de passe (si changement demandé)
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Mot de passe actuel requis pour le changement';
      }
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Le nouveau mot de passe doit contenir au moins 6 caractères';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoadingUpdate(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const updateData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email
      };

      // Ajouter les mots de passe seulement si changement demandé
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const updatedUser = await apiService.updateUserProfile(user.id, updateData);
      
      // Mettre à jour localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Réinitialiser les champs de mot de passe
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setSuccessMessage('Profil mis à jour avec succès !');
      
      // Faire disparaître le message après 5 secondes
      setTimeout(() => setSuccessMessage(''), 5000);
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setErrors({ general: error.message || 'Erreur lors de la mise à jour' });
    } finally {
      setLoadingUpdate(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  if (!user) {
    return (
      <div className="profile-page">
        <Navbar />
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <p>Vous devez être connecté pour accéder à cette page.</p>
          <a href="/connexion">Se connecter</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />
      
      {/* Section Hero */}
      <section className="profile-hero">
        <div className="hero-content">
          <h1 className="hero-title">SKINALOGY</h1>
        </div>
      </section>

      {/* Section principale */}
      <main className="profile-main">
        <div className="profile-container">
          <h2 className="profile-title">MON PROFIL</h2>
          
          <div className="profile-sections">
            {/* Section informations personnelles */}
            <div className="personal-info-section">
              <h3 className="section-title">Informations personnelles</h3>
              
              {successMessage && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}
              
              {errors.general && (
                <div className="form-error-message">
                  {errors.general}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="prenom" className="form-label">Prénom</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    className="form-input"
                    style={errors.prenom ? {borderColor: '#dc3545'} : {}}
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.prenom && (
                    <span style={{color: '#dc3545', fontSize: '14px'}}>{errors.prenom}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="nom" className="form-label">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    className="form-input"
                    style={errors.nom ? {borderColor: '#dc3545'} : {}}
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.nom && (
                    <span style={{color: '#dc3545', fontSize: '14px'}}>{errors.nom}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    style={errors.email ? {borderColor: '#dc3545'} : {}}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.email && (
                    <span style={{color: '#dc3545', fontSize: '14px'}}>{errors.email}</span>
                  )}
                </div>

                <hr style={{margin: '20px 0', border: '1px solid #e0e0e0'}} />
                
                <h4 style={{marginBottom: '15px', color: '#582828'}}>Changer le mot de passe (optionnel)</h4>
                
                <div className="form-group">
                  <label htmlFor="currentPassword" className="form-label">Mot de passe actuel</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className="form-input"
                    style={errors.currentPassword ? {borderColor: '#dc3545'} : {}}
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                  />
                  {errors.currentPassword && (
                    <span style={{color: '#dc3545', fontSize: '14px'}}>{errors.currentPassword}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword" className="form-label">Nouveau mot de passe</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="form-input"
                    style={errors.newPassword ? {borderColor: '#dc3545'} : {}}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                  />
                  {errors.newPassword && (
                    <span style={{color: '#dc3545', fontSize: '14px'}}>{errors.newPassword}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input"
                    style={errors.confirmPassword ? {borderColor: '#dc3545'} : {}}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {errors.confirmPassword && (
                    <span style={{color: '#dc3545', fontSize: '14px'}}>{errors.confirmPassword}</span>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="update-button"
                  disabled={loadingUpdate}
                >
                  {loadingUpdate ? 'Mise à jour...' : 'Mettre à jour'}
                </button>
              </form>
            </div>

            {/* Section historique des commandes */}
            <div className="order-history-section">
              <h3 className="section-title">Historique des commandes</h3>
              
              {loadingOrders ? (
                <div className="loading-message">
                  Chargement de vos commandes...
                </div>
              ) : orders.length === 0 ? (
                <div className="no-orders-message">
                  Aucune commande trouvée.
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.factureId} className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <h3>Facture #{order.factureId}</h3>
                          <p className="order-date">{formatDate(order.datePaiement)}</p>
                        </div>
                        <div className="order-total">
                          {formatPrice(order.total)}€
                        </div>
                      </div>
                      
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <div className="item-info">
                              {item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.nom}
                                  className="item-image"
                                />
                              ) : (
                                <div className="item-image"></div>
                              )}
                              <div className="item-details">
                                <h4>{item.nom}</h4>
                                <p className="item-quantity">Quantité: {item.quantite}</p>
                              </div>
                            </div>
                            <div className="item-price">
                              {formatPrice(item.prixDonne * item.quantite)}€
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
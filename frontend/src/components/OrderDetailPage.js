import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/apiService';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
  const { orderNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [facture, setFacture] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [produits, setProduits] = useState([]);
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState('EXPEDIE');

  useEffect(() => {
    let debug = '';
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // 1. Récupérer la facture
        debug = 'facture';
        const factureData = await apiService.getFactureById(orderNumber);
        setFacture(factureData);
        // 2. Récupérer les lignes de commande
        debug = 'commandes';
        const commandesData = await apiService.getCommandesByFacture(orderNumber);
        setCommandes(commandesData);
        // 3. Récupérer les infos produit et client
        if (commandesData.length > 0) {
          debug = 'client';
          const clientId = commandesData[0].idUtilisateur;
          const clientData = await apiService.getUtilisateurById(clientId);
          setClient(clientData);
          debug = 'produits';
          const produitsPromises = commandesData.map(cmd => apiService.getProduitById(cmd.idProduit));
          const produitsData = await Promise.all(produitsPromises);
          setProduits(produitsData);
        }
        setLoading(false);
      } catch (err) {
        setError('Erreur sur : ' + debug + ' → ' + (err?.message || err));
        setLoading(false);
      }
    };
    fetchDetails();
  }, [orderNumber]);

  const handleStatusChange = (newStatus) => {
    setOrderStatus(newStatus);
    console.log('Statut changé:', newStatus);
  };

  const handleExpedier = () => {
    setOrderStatus('EXPEDIE');
    console.log('Commande expédiée');
  };

  // Helper pour obtenir le chemin de l'image produit (même logique que ProductPage/TipDetailPage)
  const getProductImageUrl = (produit) => {
    if (!produit || !produit.image) return null;
    return produit.image.startsWith('/') ? produit.image : `/${produit.image}`;
  };

  if (loading) {
    return <div className="order-detail-page"><div className="order-detail-container">Chargement...</div></div>;
  }

  if (error) {
    return <div className="order-detail-page"><div className="order-detail-container">{error}</div></div>;
  }

  // Construction des items à afficher (fusion commandes + produits)
  const items = commandes.map((cmd, idx) => ({
    ...cmd,
    produit: produits[idx] || {},
  }));

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.prixDonne * item.quantite), 0).toFixed(2);
  };

  return (
    <div className="order-detail-page">

      <header className="order-detail-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="order-detail-logo">SKINALOGY</h1>
            <span className="order-detail-subtitle">Portail - Administrateur</span>
          </div>
          <div className="header-right">
            <button className="logout-btn">DECONNEXION</button>
          </div>
        </div>
      </header>

      <nav className="order-detail-nav">
        <div className="nav-items">
          <a href="#dashboard" className="nav-item">DASHBOARD</a>
          <a href="#commandes" className="nav-item active">COMMANDES</a>
          <a href="#utilisateurs" className="nav-item">UTILISATEURS</a>
          <a href="#produits" className="nav-item">PRODUITS</a>
          <a href="#idees" className="nav-item">IDEES</a>
        </div>
      </nav>

      <main className="order-detail-main">
        <div className="order-detail-container">
          <h2 className="page-title">Facture N° {facture?.id}</h2>
          <div className="order-detail-content">
            <div className="order-main-section">
              <div className="order-card-order">
                <div className="customer-info">
                  <div className="info-row">
                    <div className="info-group">
                      <span className="info-label">Nom</span>
                      <span className="info-value">{client?.nom}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Date</span>
                      <span className="info-value">{facture?.datePaiement ? new Date(facture.datePaiement).toLocaleDateString() : ''}</span>
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-group">
                      <span className="info-label">Prénom</span>
                      <span className="info-value">{client?.prenom}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">E-mail</span>
                      <span className="info-value">{client?.email}</span>
                    </div>
                  </div>
                </div>
                <div className="products-table-container">
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, idx) => (
                        <tr key={item.idProduit}>
                          <td>
                            {getProductImageUrl(item.produit) ? (
                              <>
                                <img
                                  src={getProductImageUrl(item.produit)}
                                  alt={item.produit.nom}
                                  style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, display: 'block' }}
                                  onError={e => {
                                    e.target.style.display = 'none';
                                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div
                                  className="product-image-placeholder"
                                  style={{ width: 60, height: 60, borderRadius: 8, background: '#eee', display: 'none', alignItems: 'center', justifyContent: 'center' }}
                                >
                                  <span style={{ color: '#aaa', fontSize: 12 }}>Image indisponible</span>
                                </div>
                              </>
                            ) : (
                              <div className="product-image-placeholder" style={{ width: 60, height: 60, borderRadius: 8, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: '#aaa', fontSize: 12 }}>Image indisponible</span>
                              </div>
                            )}
                          </td>
                          <td>{item.produit.nom}</td>
                          <td>{item.quantite}</td>
                          <td>{item.prixDonne} €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="order-total">
                    <div className="total-row">
                      <span className="total-label">Total</span>
                      <span className="total-amount">{facture?.total ? facture.total.toFixed(2) : calculateTotal()} €</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailPage;
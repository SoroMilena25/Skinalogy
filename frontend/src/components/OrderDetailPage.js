import React, { useState } from 'react';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
  const [orderStatus, setOrderStatus] = useState('EXPEDIE');

  // Données de la commande
  const orderData = {
    orderNumber: '2025.06.17.SM.00001',
    customer: {
      name: 'SALLAM',
      firstName: 'Marie',
      email: 'marie.sallam@gmail.com',
      date: '17/06/2025'
    },
    items: [
      {
        id: 1,
        name: 'Crème hydratante smooth',
        quantity: 1,
        price: 14.50,
        image: 'cream'
      },
      {
        id: 2,
        name: 'Crème solaire - SPF 50++',
        quantity: 2,
        price: 9.75,
        image: 'sunscreen'
      },
      {
        id: 3,
        name: 'Sérum - Vitamine C + B',
        quantity: 1,
        price: 8.45,
        image: 'serum'
      }
    ]
  };

  const calculateTotal = () => {
    return orderData.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleStatusChange = (newStatus) => {
    setOrderStatus(newStatus);
    console.log('Statut changé:', newStatus);
  };

  const handleExpedier = () => {
    setOrderStatus('EXPEDIE');
    console.log('Commande expédiée');
  };

  return (
    <div className="order-detail-page">
      {/* Header */}
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

      {/* Navigation */}
      <nav className="order-detail-nav">
        <div className="nav-items">
          <a href="#dashboard" className="nav-item">DASHBOARD</a>
          <a href="#commandes" className="nav-item active">COMMANDES</a>
          <a href="#utilisateurs" className="nav-item">UTILISATEURS</a>
          <a href="#produits" className="nav-item">PRODUITS</a>
          <a href="#idees" className="nav-item">IDEES</a>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="order-detail-main">
        <div className="order-detail-container">
          <h2 className="page-title">COMMANDE N° {orderData.orderNumber}</h2>
          
          <div className="order-detail-content">
            {/* Section principale */}
            <div className="order-main-section">
              <div className="order-card">
                {/* Informations client */}
                <div className="customer-info">
                  <div className="info-row">
                    <div className="info-group">
                      <span className="info-label">Nom</span>
                      <span className="info-value">{orderData.customer.name}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">Date</span>
                      <span className="info-value">{orderData.customer.date}</span>
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-group">
                      <span className="info-label">Prénom</span>
                      <span className="info-value">{orderData.customer.firstName}</span>
                    </div>
                    <div className="info-group">
                      <span className="info-label">E-mail</span>
                      <span className="info-value">{orderData.customer.email}</span>
                    </div>
                  </div>
                </div>

                {/* Tableau des produits */}
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
                      {orderData.items.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="product-image-placeholder"></div>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price} €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Total */}
                  <div className="order-total">
                    <div className="total-row">
                      <span className="total-label">Total</span>
                      <span className="total-amount">{calculateTotal()} €</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panneau de statut */}
            <div className="status-panel">
              <div className="status-section">
                <h3 className="status-title">Etat</h3>
                <div className="status-options">
                  <label className="status-option">
                    <input
                      type="radio"
                      name="status"
                      value="COMMANDE"
                      checked={orderStatus === 'COMMANDE'}
                      onChange={() => handleStatusChange('COMMANDE')}
                    />
                    <span className="status-text">COMMANDE</span>
                  </label>
                </div>
              </div>

              <button className="expedier-btn" onClick={handleExpedier}>
                EXPEDIER
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailPage;
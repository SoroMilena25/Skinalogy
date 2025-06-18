import React, { useState } from 'react';
import './OrdersPage.css';

const OrdersPage = () => {
  const [filters, setFilters] = useState({
    date: '',
    orderNumber: '',
    name: '',
    email: ''
  });

  // Données des commandes
  const [orders] = useState([
    {
      id: 1,
      date: '17/06/2025',
      orderNumber: '2025.06.17.SM.00001',
      name: 'SALLAM',
      email: 'marie.sallam@gmail.com',
      status: 'EXPEDIE'
    },
    {
      id: 2,
      date: '25/05/2025',
      orderNumber: '2025.06.17.SM.00002',
      name: 'SALLAM',
      email: 'marie.sallam@gmail.com',
      status: 'RECU'
    }
  ]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilter = () => {
    console.log('Filtrer avec:', filters);
  };

  const handleConsult = (orderId) => {
    console.log('Consulter commande:', orderId);
  };

  return (
    <div className="orders-page">
      {/* Header */}
      <header className="orders-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="orders-logo">SKINALOGY</h1>
            <span className="orders-subtitle">Portail - Administrateur</span>
          </div>
          <div className="header-right">
            <button className="logout-btn">DECONNEXION</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="orders-nav">
        <div className="nav-items">
          <a href="#dashboard" className="nav-item">DASHBOARD</a>
          <a href="#commandes" className="nav-item active">COMMANDES</a>
          <a href="#utilisateurs" className="nav-item">UTILISATEURS</a>
          <a href="#produits" className="nav-item">PRODUITS</a>
          <a href="#idees" className="nav-item">IDEES</a>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="orders-main">
        <div className="orders-container">
          <h2 className="page-title">GESTION DE COMMANDES</h2>
          
          <div className="orders-content">
            {/* Tableau des commandes */}
            <div className="orders-table-section">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Consulter</th>
                    <th>Date</th>
                    <th>N° de commande</th>
                    <th>Nom</th>
                    <th>E-mail</th>
                    <th>Etat</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <button 
                          className="consult-btn"
                          onClick={() => handleConsult(order.id)}
                        >
                          <div className="consult-icon"></div>
                        </button>
                      </td>
                      <td>{order.date}</td>
                      <td>{order.orderNumber}</td>
                      <td>{order.name}</td>
                      <td>{order.email}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Lignes vides pour compléter le tableau */}
                  {Array.from({ length: 8 }, (_, index) => (
                    <tr key={`empty-${index}`} className="empty-row">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination */}
              <div className="pagination">
                <span className="pagination-arrow">&gt;&gt;</span>
              </div>
            </div>

            {/* Panneau de filtres */}
            <div className="filters-panel">
              <div className="filter-group">
                <label className="filter-label">Date</label>
                <input
                  type="text"
                  className="filter-input"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">N° de commande</label>
                <input
                  type="text"
                  className="filter-input"
                  value={filters.orderNumber}
                  onChange={(e) => handleFilterChange('orderNumber', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Nom</label>
                <input
                  type="text"
                  className="filter-input"
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">E-mail</label>
                <input
                  type="text"
                  className="filter-input"
                  value={filters.email}
                  onChange={(e) => handleFilterChange('email', e.target.value)}
                />
              </div>

              <button className="filter-btn" onClick={handleFilter}>
                <span className="filter-text">Filtrer</span>
                <span className="filter-icon">🔍</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
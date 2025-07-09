import React, { useState, useEffect } from 'react';
import './OrdersPage.css';
import Navbar from './Navbar';
import apiService from '../services/apiService'; 
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const [filters, setFilters] = useState({
    date: '',
    orderNumber: '',
    name: '',
    email: ''
  });

  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getAllOrders()
      .then(data => {
        setOrders(data);
        setAllOrders(data);
      })
      .catch(err => console.error('Erreur chargement commandes', err));
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilter = () => {
    const filtered = allOrders.filter(order => {
      const matchOrderNumber = filters.orderNumber === '' || (order.orderNumber && order.orderNumber.toString().toLowerCase().includes(filters.orderNumber.toLowerCase()));
      const matchName = filters.name === '' || (order.name && order.name.toLowerCase().includes(filters.name.toLowerCase()));
      const matchEmail = filters.email === '' || (order.email && order.email.toLowerCase().includes(filters.email.toLowerCase()));
      return matchOrderNumber && matchName && matchEmail;
    });
    setOrders(filtered);
  };

  const handleResetFilter = () => {
    setFilters({ orderNumber: '', name: '', email: '', date: '' });
    setOrders(allOrders);
  };

  const handleConsult = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="orders-page">
      <Navbar />
      <header className="orders-header" style={{ paddingTop: '60px' }}>
        <div className="header-content">
          <div className="header-left">
            <h1 className="orders-logo">SKINALOGY</h1>
            <span className="orders-subtitle">Portail - Administrateur</span>
          </div>
        </div>
      </header>

      <nav className="orders-nav">
        <div className="nav-items">
          <a href="/dashboard" className="nav-item">DASHBOARD</a>
          <a href="/commandes" className="nav-item active">COMMANDES</a>
          <a href="/users" className="nav-item">UTILISATEURS</a>
          <a href="/produitsAdmin" className="nav-item">PRODUITS</a>
        </div>
      </nav>

      <main className="orders-main">
        <div className="orders-container">
          <h2 className="page-title">GESTION DE COMMANDES</h2>
          <div className="orders-content">
            <div className="orders-table-section">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Consulter</th>
                    <th>Date</th>
                    <th>N° de facture</th>
                    <th>Nom</th>
                    <th>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <button 
                          className="consult-btn"
                          onClick={() => handleConsult(order.orderNumber)}
                        >
                          <div className="consult-icon"></div>
                        </button>
                      </td>
                      <td>{order.date ? order.date.split('T')[0] : ''}</td>
                      <td>{order.orderNumber}</td>
                      <td>{order.name}</td>
                      <td>{order.email}</td>
                    </tr>
                  ))}
                  
                  {orders.length < 10 && Array.from({ length: 10 - orders.length }, (_, index) => (
                    <tr key={`empty-${index}`} className="empty-row">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <span className="pagination-arrow">&gt;&gt;</span>
              </div>
            </div>
            <div className="filters-panel">
             
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
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className="filter-btn" onClick={handleFilter}>
                  <span className="filter-text">Filtrer</span>
                  
                </button>
                <button className="filter-btn" onClick={handleResetFilter}>
                  <span className="filter-text">Réinitialiser</span>
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
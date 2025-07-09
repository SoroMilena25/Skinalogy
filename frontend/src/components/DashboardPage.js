import React, { useState, useEffect } from 'react';
import './DashboardPage.css';
import Navbar from './Navbar';
import apiService from '../services/apiService';

const DashboardPage = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [errorOrders, setErrorOrders] = useState(null);

  // Ajout des states pour les KPIs
  const [nbUsers, setNbUsers] = useState(0);
  const [nbCommandes, setNbCommandes] = useState(0);
  const [nbProduits, setNbProduits] = useState(0);

  useEffect(() => {
    setLoadingOrders(true);
    setErrorOrders(null);
    apiService.getStatsFacturesParMois(selectedYear)
      .then(data => {
        // Ajoute une couleur à chaque mois pour le graphique
        const colors = ['#4A90A4', '#2F7D7B', '#F4A261', '#A8DADC', '#E76F51', '#4A90A4', '#A8DADC', '#F1A5A5', '#F1A5A5', '#E76F51', '#B5838D', '#6D6875'];
        const formatted = data.map((item, idx) => ({
          month: item.mois,
          value: item.nombre,
          color: colors[idx % colors.length]
        }));
        setOrdersData(formatted);
        setLoadingOrders(false);
      })
      .catch(err => {
        setErrorOrders(err.message);
        setLoadingOrders(false);
      });
  }, [selectedYear]);

  useEffect(() => {
    // Récupère le nombre d'utilisateurs
    apiService.getAllUsers().then(users => setNbUsers(users.length)).catch(() => setNbUsers(0));
    // Récupère le nombre de commandes (factures)
    apiService.getStatsFacturesParMois(selectedYear)
      .then(data => setNbCommandes(data.reduce((acc, curr) => acc + curr.nombre, 0)))
      .catch(() => setNbCommandes(0));
    // Récupère le nombre de produits
    apiService.getAllProduits().then(produits => setNbProduits(produits.length)).catch(() => setNbProduits(0));
  }, [selectedYear]);

  const maxValue = 25;

  return (
    <div className="dashboard-page">
       <Navbar />
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-logo">SKINALOGY</h1>
            <span className="dashboard-subtitle">Portail - Administrateur</span>
          </div>

        </div>
      </header>

      <nav className="dashboard-nav">
        <div className="nav-items">
          <a href="/dashboard" className="nav-item active">DASHBOARD</a>
          <a href="/commandes" className="nav-item">COMMANDES</a>
          <a href="/users" className="nav-item">UTILISATEURS</a>
          <a href="/produitsAdmin" className="nav-item">PRODUITS</a>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-container">

          <div className="year-selector">
            <div 
              className="year-dropdown"
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
            >
              <span className="dropdown-icon">▼</span>
              <span className="year-text">En {selectedYear}</span>
            </div>
            {isYearDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => {setSelectedYear(2024); setIsYearDropdownOpen(false);}}>
                  En 2024
                </div>
                <div className="dropdown-item" onClick={() => {setSelectedYear(2023); setIsYearDropdownOpen(false);}}>
                  En 2023
                </div>
              </div>
            )}
          </div>

          <div className="charts-container">

            <div className="chart-section">
              <div className="chart-container">
                <div className="chart-y-axis">
                  <span className="y-label">25</span>
                  <span className="y-label">20</span>
                  <span className="y-label">15</span>
                  <span className="y-label">10</span>
                  <span className="y-label">5</span>
                  <span className="y-label">0</span>
                </div>
                <div className="chart-content">
                  <div className="chart-bars">
                    {loadingOrders ? (
                      <div style={{color: '#888'}}>Chargement...</div>
                    ) : errorOrders ? (
                      <div style={{color: 'red'}}>{errorOrders}</div>
                    ) : ordersData.length > 0 ? (
                      ordersData.map((data, index) => (
                        <div key={index} className="bar-container">
                          <div 
                            className="chart-bar"
                            style={{
                              height: `${(data.value / maxValue) * 100}%`,
                              backgroundColor: data.color
                            }}
                          ></div>
                        </div>
                      ))
                    ) : (
                      <div style={{color: '#888'}}>Aucune donnée</div>
                    )}
                  </div>
                </div>
                <div className="chart-y-axis-right">
                  <span className="y-label-right">Mois</span>
                </div>
              </div>
              <h3 className="chart-title">Nombre de commandes en fonction du mois</h3>
            </div>

            <div className="chart-section2 kpi-section">
              <div className="kpi-row">
                <div className="kpi-card kpi-large">
                  <div className="kpi-label">Nombre d'inscrits</div>
                  <div className="kpi-value">{nbUsers}</div>
                </div>
              </div>
              <div className="kpi-row kpi-row-bottom">
                <div className="kpi-card">
                  <div className="kpi-label">Nombre de commandes</div>
                  <div className="kpi-value">{nbCommandes}</div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-label">Nombre de produits</div>
                  <div className="kpi-value">{nbProduits}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
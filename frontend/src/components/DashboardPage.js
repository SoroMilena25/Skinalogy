import React, { useState } from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  // Données pour les graphiques
  const ordersData = [
    { month: 'Jan', value: 1.8, color: '#4A90A4' },
    { month: 'Fév', value: 4.2, color: '#2F7D7B' },
    { month: 'Mar', value: 2.1, color: '#F4A261' },
    { month: 'Avr', value: 1.9, color: '#A8DADC' },
    { month: 'Mai', value: 2.3, color: '#E76F51' },
    { month: 'Jun', value: 2.8, color: '#4A90A4' },
    { month: 'Jul', value: 2.0, color: '#A8DADC' },
    { month: 'Aoû', value: 2.5, color: '#F1A5A5' },
    { month: 'Sep', value: 1.2, color: '#F1A5A5' },
    { month: 'Oct', value: 1.8, color: '#E76F51' }
  ];

  const registrationsData = [
    { month: 'Jan', value: 2.2, color: '#4A90A4' },
    { month: 'Fév', value: 4.8, color: '#2F7D7B' },
    { month: 'Mar', value: 2.0, color: '#F4A261' },
    { month: 'Avr', value: 2.1, color: '#A8DADC' },
    { month: 'Mai', value: 2.4, color: '#E76F51' },
    { month: 'Jun', value: 2.3, color: '#4A90A4' },
    { month: 'Jul', value: 2.2, color: '#A8DADC' },
    { month: 'Aoû', value: 2.8, color: '#F1A5A5' },
    { month: 'Sep', value: 1.0, color: '#F1A5A5' },
    { month: 'Oct', value: 1.8, color: '#E76F51' }
  ];

  const maxValue = 5;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-logo">SKINALOGY</h1>
            <span className="dashboard-subtitle">Portail - Administrateur</span>
          </div>
          <div className="header-right">
            <button className="logout-btn">DECONNEXION</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="nav-items">
          <a href="#dashboard" className="nav-item active">DASHBOARD</a>
          <a href="#commandes" className="nav-item">COMMANDES</a>
          <a href="#utilisateurs" className="nav-item">UTILISATEURS</a>
          <a href="#produits" className="nav-item">PRODUITS</a>
          <a href="#idees" className="nav-item">IDEES</a>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Sélecteur d'année */}
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

          {/* Graphiques */}
          <div className="charts-container">
            {/* Graphique des commandes */}
            <div className="chart-section">
              <div className="chart-container">
                <div className="chart-y-axis">
                  <span className="y-label">5</span>
                  <span className="y-label">2</span>
                  <span className="y-label">1</span>
                  <span className="y-label">0</span>
                </div>
                <div className="chart-content">
                  <div className="chart-bars">
                    {ordersData.map((data, index) => (
                      <div key={index} className="bar-container">
                        <div 
                          className="chart-bar"
                          style={{
                            height: `${(data.value / maxValue) * 100}%`,
                            backgroundColor: data.color
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chart-y-axis-right">
                  <span className="y-label-right">Mois</span>
                </div>
              </div>
              <h3 className="chart-title">Nombre de commandes en fonction du mois</h3>
            </div>

            {/* Graphique des inscriptions */}
            <div className="chart-section">
              <div className="chart-container">
                <div className="chart-y-axis">
                  <span className="y-label">5</span>
                  <span className="y-label">2</span>
                  <span className="y-label">1</span>
                  <span className="y-label">0</span>
                </div>
                <div className="chart-content">
                  <div className="chart-bars">
                    {registrationsData.map((data, index) => (
                      <div key={index} className="bar-container">
                        <div 
                          className="chart-bar"
                          style={{
                            height: `${(data.value / maxValue) * 100}%`,
                            backgroundColor: data.color
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chart-y-axis-right">
                  <span className="y-label-right">Mois</span>
                </div>
              </div>
              <h3 className="chart-title">Nombre d'inscriptions en fonction du mois</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
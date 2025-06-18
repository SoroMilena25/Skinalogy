import React, { useState } from 'react';
import './UsersPage.css';

const UsersPage = () => {
  const [filters, setFilters] = useState({
    admin: false,
    name: '',
    firstName: '',
    email: ''
  });

  // Données des utilisateurs
  const [users] = useState([
    {
      id: 1,
      isAdmin: false,
      name: 'SALLAM',
      firstName: 'Marie',
      email: 'marie.sallam@gmail.com'
    },
    {
      id: 2,
      isAdmin: false,
      name: 'DUPONT',
      firstName: 'Vladimir',
      email: 'vladimir.dupont@gmail.com'
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

  const handleAdminToggle = (userId) => {
    console.log('Toggle admin pour utilisateur:', userId);
  };

  return (
    <div className="users-page">
      {/* Header */}
      <header className="users-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="users-logo">SKINALOGY</h1>
            <span className="users-subtitle">Portail - Administrateur</span>
          </div>
          <div className="header-right">
            <button className="logout-btn">DECONNEXION</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="users-nav">
        <div className="nav-items">
          <a href="#dashboard" className="nav-item">DASHBOARD</a>
          <a href="#commandes" className="nav-item">COMMANDES</a>
          <a href="#utilisateurs" className="nav-item active">UTILISATEURS</a>
          <a href="#produits" className="nav-item">PRODUITS</a>
          <a href="#idees" className="nav-item">IDEES</a>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="users-main">
        <div className="users-container">
          <h2 className="page-title">GESTION DES UTILISATEURS</h2>
          
          <div className="users-content">
            {/* Tableau des utilisateurs */}
            <div className="users-table-section">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ADMIN</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>
                        <button 
                          className="admin-btn"
                          onClick={() => handleAdminToggle(user.id)}
                        >
                          <div className="admin-icon"></div>
                        </button>
                      </td>
                      <td>{user.name}</td>
                      <td>{user.firstName}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                  {/* Lignes vides pour compléter le tableau */}
                  {Array.from({ length: 8 }, (_, index) => (
                    <tr key={`empty-${index}`} className="empty-row">
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
                <label className="filter-label">ADMIN</label>
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    checked={filters.admin}
                    onChange={(e) => handleFilterChange('admin', e.target.checked)}
                  />
                </div>
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
                <label className="filter-label">Prénom</label>
                <input
                  type="text"
                  className="filter-input"
                  value={filters.firstName}
                  onChange={(e) => handleFilterChange('firstName', e.target.value)}
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

export default UsersPage;
import React, { useState, useEffect } from 'react';
import './UsersPage.css';
import Navbar from './Navbar';
import apiService from '../services/apiService';

const UsersPage = () => {
  const [filters, setFilters] = useState({
    admin: false,
    name: '',
    firstName: '',
    email: ''
  });

  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getAllUsers();
        setUsers(data);
        setAllUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilter = () => {
    const filtered = allUsers.filter(user => {
      const matchAdmin = !filters.admin || user.role === 1;
      const matchNom = filters.name === '' || (user.nom && user.nom.toLowerCase().includes(filters.name.toLowerCase()));
      const matchPrenom = filters.firstName === '' || (user.prenom && user.prenom.toLowerCase().includes(filters.firstName.toLowerCase()));
      const matchEmail = filters.email === '' || (user.email && user.email.toLowerCase().includes(filters.email.toLowerCase()));
      return matchAdmin && matchNom && matchPrenom && matchEmail;
    });
    setUsers(filtered);
  };

  const handleResetFilter = () => {
    setFilters({ admin: false, name: '', firstName: '', email: '' });
    setUsers(allUsers);
  };

  const handleAdminToggle = async (userId, currentRole) => {
    const nouveauRole = currentRole === 1 ? 0 : 1;
    try {
      await apiService.updateUserRole(userId, nouveauRole);
      setUsers(users => users.map(u =>
        u.id === userId ? { ...u, role: nouveauRole } : u
      ));
    } catch (err) {
      alert('Erreur lors de la mise à jour du rôle : ' + err.message);
    }
  };

  return (
    <div className="users-page">
<Navbar />
      <header className="users-header" style={{ paddingTop: '60px' }}>
        <div className="header-content">
          <div className="header-left">
            <h1 className="users-logo">SKINALOGY</h1>
            <span className="users-subtitle">Portail - Administrateur</span>
          </div>
        </div>
      </header>


      <nav className="users-nav">
        <div className="nav-items">
          <a href="/dashboard" className="nav-item">DASHBOARD</a>
          <a href="/commandes" className="nav-item">COMMANDES</a>
          <a href="/users" className="nav-item active">UTILISATEURS</a>
          <a href="/produitsAdmin" className="nav-item">PRODUITS</a>
        </div>
      </nav>


      <main className="users-main">
        <div className="users-container">
          <h2 className="page-title">GESTION DES UTILISATEURS</h2>
          
          <div className="users-content">
 
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
                  {loading ? (
                    <tr><td colSpan="4">Chargement...</td></tr>
                  ) : error ? (
                    <tr><td colSpan="4" style={{color:'red'}}>{error}</td></tr>
                  ) : users.length === 0 ? (
                    <tr><td colSpan="4">Aucun utilisateur trouvé</td></tr>
                  ) : (
                    users.map(user => (
                      <tr key={user.id}>
                        <td>
                          <input
                            type="checkbox"
                            className="admin-checkbox"
                            checked={user.role === 1}
                            onChange={() => handleAdminToggle(user.id, user.role)}
                          />
                        </td>
                        <td>{user.nom}</td>
                        <td>{user.prenom}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))
                  )}
                 
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

              <div className="pagination">
                <span className="pagination-arrow">&gt;&gt;</span>
              </div>
            </div>


            <div className="filters-panel">
  <div className="filter-group admin">
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

export default UsersPage;
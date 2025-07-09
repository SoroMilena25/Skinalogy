import React, { useState, useEffect } from 'react';
import './ProductAdminPage.css';
import Navbar from './Navbar';
import ApiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const ProductAdminPage = () => {
  const [filters, setFilters] = useState({
    name: '',
    skinType: '',
    category: ''
  });

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [productsOrigin, setProductsOrigin] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllProduits().then(data => {
      setProducts(data);
      setProductsOrigin(data);
    });
  }, []);

  const skinTypes = ['Peau sèche', 'Peau grasse', 'Peau mixte', 'Peau normale', 'Peau sensible'];
  const categories = ['Sérum', 'Crème hydratante', 'Crème solaire', 'Masque', 'Démaquillant'];

  const skinTypesMap = {
    1: 'Peau sèche',
    2: 'Peau grasse',
    3: 'Peau mixte',
    4: 'Peau normale',
    5: 'Peau sensible'
  };
  const categoriesMap = {
    1: 'Sérum',
    2: 'Crème hydratante',
    3: 'Crème solaire',
    4: 'Masque',
    5: 'Démaquillant'
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilter = () => {
    let filtered = productsOrigin;
    if (filters.name) {
      filtered = filtered.filter(p => p.nom.toLowerCase().includes(filters.name.toLowerCase()));
    }
    if (filters.skinType) {
      filtered = filtered.filter(p => {
        return (p.typePeau && p.typePeau.toLowerCase() === filters.skinType.toLowerCase()) ||
               (p.idTypePeau && skinTypesMap[p.idTypePeau] && skinTypesMap[p.idTypePeau] === filters.skinType);
      });
    }
    if (filters.category) {
      filtered = filtered.filter(p => {
        return (p.categorie && p.categorie.toLowerCase() === filters.category.toLowerCase()) ||
               (p.idCategorie && categoriesMap[p.idCategorie] && categoriesMap[p.idCategorie] === filters.category);
      });
    }
    setProducts(filtered);
  };

  const handleConsult = (productId) => {
    navigate(`/produitsAdmin/${productId}`);
  };

  const handleSkinTypeSelect = (type) => {
    setFilters(prev => ({ ...prev, skinType: type }));
    setIsTypeDropdownOpen(false);
  };

  const handleCategorySelect = (category) => {
    setFilters(prev => ({ ...prev, category: category }));
    setIsCategoryDropdownOpen(false);
  };

  const handleReset = () => {
    setFilters({ name: '', skinType: '', category: '' });
    setProducts(productsOrigin);
  };

  return (
    <div className="products-page">
      <Navbar />
      <header className="products-header" style={{ paddingTop: '60px' }}>
        <div className="header-content">
          <div className="header-left">
            <h1 className="products-logo">SKINALOGY</h1>
            <span className="products-subtitle">Portail - Administrateur</span>
          </div>
        </div>
      </header>

      <nav className="products-nav">
        <div className="nav-items">
          <a href="/dashboard" className="nav-item">DASHBOARD</a>
          <a href="/commandes" className="nav-item">COMMANDES</a>
          <a href="/users" className="nav-item">UTILISATEURS</a>
          <a href="/produitsAdmin" className="nav-item active">PRODUITS</a>
        </div>
      </nav>

      <main className="products-main">
        <div className="products-container">
          <h2 className="page-title">GESTION DES PRODUITS</h2>
          
          <div className="products-content">
            <div className="products-table-section">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Consulter</th>
                    <th>Nom</th>
                    <th>Prix</th>
                    <th>Catégorie</th>
                    <th>Type de peau</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <button 
                          className="consult-btn"
                          onClick={() => handleConsult(product.id)}
                        >
                          <div className="consult-icon"></div>
                        </button>
                      </td>
                      <td>{product.nom}</td>
                      <td>{product.prix}€</td>
                      <td>{product.idCategorie}</td>
                      <td>{product.idTypePeau}</td>
                    </tr>
                  ))}
                  {products.length < 13 && Array.from({ length: 13 - products.length }, (_, index) => (
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
                <label className="filter-label">Nom</label>
                <input
                  type="text"
                  className="filter-input"
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Type de peau</label>
                <div className="dropdown-container">
                  <div 
                    className="dropdown-select"
                    onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  >
                    <span>{filters.skinType || 'Sélectionner'}</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  {isTypeDropdownOpen && (
                    <div className="dropdown-menu">
                      {skinTypes.map(type => (
                        <div 
                          key={type}
                          className="dropdown-item"
                          onClick={() => handleSkinTypeSelect(type)}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Catégorie</label>
                <div className="dropdown-container">
                  <div 
                    className="dropdown-select"
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  >
                    <span>{filters.category || 'Sélectionner'}</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  {isCategoryDropdownOpen && (
                    <div className="dropdown-menu">
                      {categories.map(category => (
                        <div 
                          key={category}
                          className="dropdown-item"
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="filter-btn" onClick={handleFilter}>
                  <span className="filter-text">Filtrer</span>
                </button>
                <button className="filter-btn" style={{ background: '#eee', color: '#333' }} onClick={handleReset}>
                  <span className="filter-text">Réinitialiser</span>
                </button>
              </div>
              <button className="filter-btn insert-btn" style={{ marginTop: 18, width: '100%' }} onClick={() => navigate('/produitsAdmin/insert')}>
                + INSÉRER UN PRODUIT
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductAdminPage;
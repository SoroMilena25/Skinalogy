import React, { useState } from 'react';
import './ProductAdminPage.css';

const ProductAdminPage = () => {
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 100,
    name: '',
    skinType: '',
    category: ''
  });

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Données des produits
  const [products] = useState([
    {
      id: 1,
      name: 'Sérum - Acide hyaluronique',
      price: 12.75,
      category: 'Sérum',
      skinType: 'Peau sèche'
    },
    {
      id: 2,
      name: 'Crème hydratante smooth',
      price: 14.50,
      category: 'Crème hydratante',
      skinType: 'Peau sèche, peau normal'
    }
  ]);

  const skinTypes = ['Peau sèche', 'Peau grasse', 'Peau mixte', 'Peau normale', 'Peau sensible'];
  const categories = ['Sérum', 'Crème hydratante', 'Crème solaire', 'Masque', 'Démaquillant'];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilter = () => {
    console.log('Filtrer avec:', filters);
  };

  const handleConsult = (productId) => {
    console.log('Consulter produit:', productId);
  };

  const handleSkinTypeSelect = (type) => {
    setFilters(prev => ({ ...prev, skinType: type }));
    setIsTypeDropdownOpen(false);
  };

  const handleCategorySelect = (category) => {
    setFilters(prev => ({ ...prev, category: category }));
    setIsCategoryDropdownOpen(false);
  };

  return (
    <div className="products-page">
      {/* Header */}
      <header className="products-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="products-logo">SKINALOGY</h1>
            <span className="products-subtitle">Portail - Administrateur</span>
          </div>
          <div className="header-right">
            <button className="logout-btn">DECONNEXION</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="products-nav">
        <div className="nav-items">
          <a href="#dashboard" className="nav-item">DASHBOARD</a>
          <a href="#commandes" className="nav-item">COMMANDES</a>
          <a href="#utilisateurs" className="nav-item">UTILISATEURS</a>
          <a href="#produits" className="nav-item active">PRODUITS</a>
          <a href="#idees" className="nav-item">IDEES</a>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="products-main">
        <div className="products-container">
          <h2 className="page-title">GESTION DES PRODUITS</h2>
          
          <div className="products-content">
            {/* Tableau des produits */}
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
                      <td>{product.name}</td>
                      <td>{product.price}€</td>
                      <td>{product.category}</td>
                      <td>{product.skinType}</td>
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
                <label className="filter-label">Prix</label>
                <div className="price-range">
                  <div className="price-inputs">
                    <input 
                      type="number" 
                      value={filters.priceMin} 
                      className="price-input"
                      onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                    />
                    <span className="price-separator">€ — </span>
                    <input 
                      type="number" 
                      value={filters.priceMax} 
                      className="price-input"
                      onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                    />
                    <span className="price-currency">€</span>
                  </div>
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

export default ProductAdminPage;
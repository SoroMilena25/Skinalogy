import React, { useState } from 'react';
import './IdeasPage.css';
import Navbar from './Navbar';

const IdeasPage = () => {
  const [pageData, setPageData] = useState({
    title: '',
    product1: '',
    product2: ''
  });

  const [isProduct1DropdownOpen, setIsProduct1DropdownOpen] = useState(false);
  const [isProduct2DropdownOpen, setIsProduct2DropdownOpen] = useState(false);

  const products = [
    'Sérum - Acide hyaluronique',
    'Crème hydratante smooth',
    'Crème solaire - SPF 50++',
    'Sérum - Vitamine C + B',
    'Masque purifiant',
    'Démaquillant doux'
  ];

  const handleInputChange = (field, value) => {
    setPageData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProduct1Select = (product) => {
    setPageData(prev => ({ ...prev, product1: product }));
    setIsProduct1DropdownOpen(false);
  };

  const handleProduct2Select = (product) => {
    setPageData(prev => ({ ...prev, product2: product }));
    setIsProduct2DropdownOpen(false);
  };

  const handleUpdate = () => {
    console.log('Mettre à jour page idées:', pageData);
  };

  return (
    <div className="ideas-page">
    <Navbar />
      <header className="ideas-header" style={{ paddingTop: '60px' }}>
        <div className="header-content">
          <div className="header-left">
            <h1 className="ideas-logo">SKINALOGY</h1>
            <span className="ideas-subtitle">Portail - Administrateur</span>
          </div>
          <div className="header-right">
            <button className="logout-btn">DECONNEXION</button>
          </div>
        </div>
      </header>


      <nav className="ideas-nav">
        <div className="nav-items">
          <a href="/dashboard" className="nav-item">DASHBOARD</a>
          <a href="/commandes" className="nav-item">COMMANDES</a>
          <a href="/users" className="nav-item">UTILISATEURS</a>
          <a href="/produitsAdmin" className="nav-item">PRODUITS</a>
          <a href="/idees" className="nav-item active">IDEES</a>
        </div>
      </nav>


      <main className="ideas-main">
        <div className="ideas-container">
          <h2 className="page-title">GESTION DE LA PAGE IDEE</h2>
          
          <div className="ideas-form-card">
            <div className="form-layout">

              <div className="title-section">
                <div className="form-group">
                  <label className="form-label">Titre</label>
                  <input
                    type="text"
                    className="form-input title-input"
                    value={pageData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
              </div>


              <div className="products-section">
                <div className="form-group">
                  <label className="form-label">Produit n°1</label>
                  <div className="dropdown-container">
                    <div 
                      className="dropdown-select"
                      onClick={() => setIsProduct1DropdownOpen(!isProduct1DropdownOpen)}
                    >
                      <span>{pageData.product1 || 'Sélectionner un produit'}</span>
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    {isProduct1DropdownOpen && (
                      <div className="dropdown-menu">
                        {products.map(product => (
                          <div 
                            key={product}
                            className="dropdown-item"
                            onClick={() => handleProduct1Select(product)}
                          >
                            {product}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Produit n°2</label>
                  <div className="dropdown-container">
                    <div 
                      className="dropdown-select"
                      onClick={() => setIsProduct2DropdownOpen(!isProduct2DropdownOpen)}
                    >
                      <span>{pageData.product2 || 'Sélectionner un produit'}</span>
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    {isProduct2DropdownOpen && (
                      <div className="dropdown-menu">
                        {products.map(product => (
                          <div 
                            key={product}
                            className="dropdown-item"
                            onClick={() => handleProduct2Select(product)}
                          >
                            {product}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="update-section">
            <button className="update-btn" onClick={handleUpdate}>
              UPDATE
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IdeasPage;
import React, { useState } from 'react';
import './ProductAdminDetailPage.css';

const ProductAdminDetailPage = () => {
  const [productData, setProductData] = useState({
    name: 'Sérum - Acide hyaluronique',
    description: '',
    skinType: '',
    category: '',
    price: ''
  });

  const [isSkinTypeDropdownOpen, setIsSkinTypeDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const skinTypes = ['Peau sèche', 'Peau grasse', 'Peau mixte', 'Peau normale', 'Peau sensible'];
  const categories = ['Sérum', 'Crème hydratante', 'Crème solaire', 'Masque', 'Démaquillant'];

  const handleInputChange = (field, value) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkinTypeSelect = (type) => {
    setProductData(prev => ({ ...prev, skinType: type }));
    setIsSkinTypeDropdownOpen(false);
  };

  const handleCategorySelect = (category) => {
    setProductData(prev => ({ ...prev, category: category }));
    setIsCategoryDropdownOpen(false);
  };

  const handleUpdate = () => {
    console.log('Mettre à jour produit:', productData);
  };

  const handleDelete = () => {
    console.log('Supprimer produit');
  };

  return (
    <div className="product-detail-page">
      {/* Header */}
      <header className="product-detail-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="product-detail-logo">SKINALOGY</h1>
            <span className="product-detail-subtitle">Portail - Administrateur</span>
          </div>
          <div className="header-right">
            <button className="logout-btn">DECONNEXION</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="product-detail-nav">
        <div className="nav-items">
          <a href="#dashboard" className="nav-item">DASHBOARD</a>
          <a href="#commandes" className="nav-item">COMMANDES</a>
          <a href="#utilisateurs" className="nav-item">UTILISATEURS</a>
          <a href="#produits" className="nav-item active">PRODUITS</a>
          <a href="#idees" className="nav-item">IDEES</a>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="product-detail-main">
        <div className="product-detail-container">
          <div className="title-section">
            <h2 className="page-title">{productData.name}</h2>
            <button className="delete-btn" onClick={handleDelete}>
              DELETE
            </button>
          </div>
          
          <div className="product-form-card">
            <div className="form-layout">
              {/* Colonne de gauche - Champs */}
              <div className="left-column">
                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-input"
                    value={productData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Type de peau</label>
                  <div className="dropdown-container">
                    <div 
                      className="dropdown-select"
                      onClick={() => setIsSkinTypeDropdownOpen(!isSkinTypeDropdownOpen)}
                    >
                      <span>{productData.skinType || 'Sélectionner'}</span>
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    {isSkinTypeDropdownOpen && (
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

                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <div className="dropdown-container">
                    <div 
                      className="dropdown-select"
                      onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    >
                      <span>{productData.category || 'Sélectionner'}</span>
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

                <div className="form-group">
                  <label className="form-label">Prix</label>
                  <input
                    type="number"
                    className="form-input"
                    value={productData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                </div>
              </div>

              {/* Colonne du milieu - Description */}
              <div className="middle-column">
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={productData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="18"
                  />
                </div>
              </div>

              {/* Colonne de droite - Photo */}
              <div className="right-column">
                <div className="form-group">
                  <label className="form-label">Photo</label>
                  <div className="product-photo">
                    <div className="photo-placeholder"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bouton UPDATE en dessous */}
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

export default ProductAdminDetailPage;
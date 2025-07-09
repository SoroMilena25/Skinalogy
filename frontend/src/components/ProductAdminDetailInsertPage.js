import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/apiService';
import './ProductAdminDetailInsertPage.css';
import Navbar from './Navbar';

const ProductAdminDetailInsertPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    skinType: '',
    category: '',
    price: '',
    ideeCadeau: false,
    top: false,
    image: ''
  });
  const [isSkinTypeDropdownOpen, setIsSkinTypeDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formError, setFormError] = useState('');

  const skinTypes = ['Peau sèche', 'Peau grasse', 'Peau mixte', 'Peau normale'];
  const categories = ['Crèmes hydratantes', 'Crèmes solaires', 'Sérums', 'Toners', 'Masques', 'Démaquillants', 'Crèmes pour les yeux', 'Coffrets'];

  // Utilitaires pour conversion id <-> nom
  const skinTypesMap = {
    1: 'Peau sèche',
    2: 'Peau grasse',
    3: 'Peau mixte',
    4: 'Peau normale'
  };
  const categoriesMap = {
    1: 'Crèmes hydratantes',
    2: 'Crèmes solaires',
    3: 'Sérum',
    4: 'Toners',
    5: 'Masques',
    6: 'Démaquillants',
    7: 'Crèmes pour les yeux',
    8: 'Coffret'
  };

  // Fonctions pour obtenir l'id à partir du nom
  const getSkinTypeId = (name) => {
    for (const [id, n] of Object.entries(skinTypesMap)) {
      if (n === name) return parseInt(id);
    }
    return null;
  };
  const getCategoryId = (name) => {
    for (const [id, n] of Object.entries(categoriesMap)) {
      if (n === name || n + 's' === name) return parseInt(id); // gestion pluriel
    }
    return null;
  };

  const handleInputChange = (field, value) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
    setFormError('');
  };

  const handleSkinTypeSelect = (type) => {
    setProductData(prev => ({ ...prev, skinType: type }));
    setIsSkinTypeDropdownOpen(false);
  };

  const handleCategorySelect = (category) => {
    setProductData(prev => ({ ...prev, category: category }));
    setIsCategoryDropdownOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCheckboxChange = (field) => {
    setProductData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const isFormValid = () => {
    return (
      productData.name.trim() &&
      productData.description.trim() &&
      productData.skinType &&
      productData.category &&
      productData.price &&
      selectedImage
    );
  };

  const handleInsert = async () => {
    if (!isFormValid()) {
      setFormError('Veuillez remplir tous les champs');
      return;
    }
    try {
      setLoading(true);
      // Upload image obligatoire
      const uploadResult = await ApiService.uploadImage(selectedImage);
      const imagePath = uploadResult.imagePath;
      // Préparer le payload
      const payload = {
        nom: productData.name,
        description: productData.description,
        idTypePeau: getSkinTypeId(productData.skinType),
        idCategorie: getCategoryId(productData.category),
        prix: productData.price,
        ideeCadeau: productData.ideeCadeau,
        top: productData.top,
        image: imagePath
      };
      await ApiService.insertProduit(payload);
      alert('Produit inséré !');
      navigate('/produitsAdmin');
    } catch (err) {
      alert('Erreur lors de l\'insertion : ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getProductImageUrl = (image) => {
    if (!image) return null;
    return image.startsWith('/') ? image : `/${image}`;
  };

  return (
    <div className="product-detail-page">
      <Navbar />
      <header className="product-detail-header" style={{ paddingTop: '60px' }}>
        <div className="header-content">
          <div className="header-left">
            <h1 className="product-detail-logo">SKINALOGY</h1>
            <span className="product-detail-subtitle">Portail - Administrateur</span>
          </div>
        </div>
      </header>


      <nav className="product-detail-nav">
        <div className="nav-items">
          <a href="/dashboard" className="nav-item">DASHBOARD</a>
          <a href="/commandes" className="nav-item">COMMANDES</a>
          <a href="/users" className="nav-item">UTILISATEURS</a>
          <a href="/produitsAdmin" className="nav-item active">PRODUITS</a>
        </div>
      </nav>


      <main className="product-detail-main">
        <div className="product-detail-container">
          <div className="title-section">
            <h2 className="page-title">Nouveau produit</h2>
          </div>
          
          <div className="product-form-card">
            <div className="form-layout">

              <div className="middle-column">
                <div className="form-group-product">
                  <label className="form-label">Idées cadeaux</label>
                  <input
                    type="checkbox"
                    checked={productData.ideeCadeau}
                    onChange={() => handleCheckboxChange('ideeCadeau')}
                  />
                </div>
                <div className="form-group-product">
                  <label className="form-label">Top du moment</label>
                  <input
                    type="checkbox"
                    checked={productData.top}
                    onChange={() => handleCheckboxChange('top')}
                  />
                </div>
              </div>


              <div className="left-column">
                <div className="form-group-product">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-input"
                    value={productData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    autoComplete="off"
                  />
                </div>

                <div className="form-group-product">
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

                <div className="form-group-product">
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

                <div className="form-group-product">
                  <label className="form-label">Prix</label>
                  <input
                    type="number"
                    className="form-input"
                    value={productData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                </div>
              </div>



              <div className="right-column">
              
                <div className="form-group-description">
                  <label className="form-label" style={{ textAlign:'left' }}>Description</label>
                  <textarea
                    className="form-textarea"
                    value={productData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="18"
                    
                  />
                </div>
              

              
                <div className="form-group-description">
                  <label className="form-label" style={{ textAlign:'left' }}>Photo</label>
                  <div className="product-photo">
                    {imagePreview ? (
                      <img src={imagePreview} alt={productData.name} className="product-image-preview" onError={e => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }} />
                    ) : (
                      <div className="photo-placeholder" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span style={{ color: '#aaa', fontSize: 14 }}>Image indisponible</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginTop: 8 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="update-section">
            <button className="update-btn" onClick={handleInsert} disabled={loading}>
              {loading ? 'Insertion...' : 'INSERT'}
            </button>
            {formError && (
              <div style={{ color: 'red', marginTop: 12, fontWeight: 500 }}>
                {formError}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductAdminDetailInsertPage;
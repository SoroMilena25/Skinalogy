import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../services/apiService';
import './ProductAdminDetailPage.css';
import Navbar from './Navbar';

const ProductAdminDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState({
    name: 'Sérum - Acide hyaluronique',
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

  const skinTypes = ['Peau sèche', 'Peau grasse', 'Peau mixte', 'Peau normale'];
  const categories = ['Crèmes hydratantes', 'Crèmes solaires', 'Sérums', 'Toners', 'Masques', 'Démaquillants', 'Crèmes pour les yeux', 'Coffrets'];

  
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

 
  const getSkinTypeId = (name) => {
    for (const [id, n] of Object.entries(skinTypesMap)) {
      if (n === name) return parseInt(id);
    }
    return null;
  };
  const getCategoryId = (name) => {
    for (const [id, n] of Object.entries(categoriesMap)) {
      if (n === name || n + 's' === name) return parseInt(id); 
    }
    return null;
  };

  useEffect(() => {
    if (id) {
      ApiService.getProduitById(id)
        .then(data => {
          setProductData({
            name: data.nom,
            description: data.description,
            skinType: data.typePeau || skinTypesMap[data.idTypePeau] || '',
            category: data.categorie || categoriesMap[data.idCategorie] || '',
            price: data.prix,
            ideeCadeau: !!data.ideeCadeau,
            top: !!data.top,
            image: data.image || ''
          });
          setImagePreview(data.image ? getProductImageUrl(data.image) : '');
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

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

  const handleUpdate = async () => {
    try {
      let imagePath = productData.image;
      if (selectedImage) {
        
        const uploadResult = await ApiService.uploadImage(selectedImage);
        imagePath = uploadResult.imagePath;
        console.log('Image uploadée, chemin:', imagePath);
      }
      await updateProduct(imagePath);
    } catch (err) {
      alert('Erreur lors de la mise à jour : ' + err.message);
    }
  };

  const updateProduct = async (imagePath) => {
    
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
    await ApiService.updateProduit(id, payload);
    alert('Produit mis à jour !');
  };

  const handleDelete = async () => {
    if (window.confirm('Confirmer la suppression de ce produit ?')) {
      try {
        await ApiService.deleteProduit(id);
        alert('Produit supprimé.');
        navigate('/produitsAdmin');
      } catch (err) {
        alert('Erreur lors de la suppression : ' + err.message);
      }
    }
  };

  const getProductImageUrl = (image) => {
    if (!image) return null;
    return image.startsWith('/') ? image : `/${image}`;
  };

  if (loading) return <div>Chargement...</div>;

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
            <h2 className="page-title">{productData.name}</h2>
            <button className="delete-btn" onClick={handleDelete}>
              DELETE
            </button>
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
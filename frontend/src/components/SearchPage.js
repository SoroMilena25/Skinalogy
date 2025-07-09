import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import apiService from '../services/apiService';
import Navbar from './Navbar';
import Footer from './Footer';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPrice, setMaxPrice] = useState(100);
  const [categories, setCategories] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isSkinTypesOpen, setIsSkinTypesOpen] = useState(true);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getAllProduits();
        setProducts(data);
        setFilteredProducts(data);
        
        const prixMaxRaw = data.length > 0 ? Math.max(...data.map(p => p.prix || 0)) : 100;
        const prixMax = Math.ceil(prixMaxRaw);
        setMaxPrice(prixMax);
        setPriceRange({ min: 0, max: prixMax });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await apiService.getCategories();
        setCategories(data);
      } catch (err) {
        setCategories([]);
      }
    };

    const fetchSkinTypes = async () => {
      try {
        const data = await apiService.getTypesPeau();
        setSkinTypes(data);
      } catch (err) {
        setSkinTypes([]);
      }
    };

    fetchProducts();
    fetchCategories();
    fetchSkinTypes();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/produit/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    
    const success = addToCart({
      id: product.id,
      nom: product.nom,
      prix: product.prix,
      image: product.image
    });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSkinTypeChange = (skinTypeId) => {
    setSelectedSkinTypes(prev => 
      prev.includes(skinTypeId) 
        ? prev.filter(s => s !== skinTypeId)
        : [...prev, skinTypeId]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setPriceRange({ min: 0, max: maxPrice });
    setSelectedCategories([]);
    setSelectedSkinTypes([]);
    setFilteredProducts(products);
    setIsMobileFilterOpen(false);
  };

  const handleApplyFilters = () => {
    let filtered = products.filter(product => {
      const price = product.prix || 0;
      if (price < priceRange.min || price > priceRange.max) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.idCategorie)) return false;
      if (selectedSkinTypes.length > 0 && !selectedSkinTypes.includes(product.idTypePeau)) return false;
      if (searchTerm && !product.nom.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
    setFilteredProducts(filtered);
    setIsMobileFilterOpen(false);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="shop-page">
      <Navbar />

      <header className="shop-header">
        <div className="hero-content">
          <h1 className="hero-logo">SKINALOGY</h1>
        </div>
      </header>

      <section className="search-section">
        <div className="search-container">

          <button className="mobile-filter-btn" onClick={toggleMobileFilter}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          
          <input 
            type="text" 
            placeholder="Recherchez ici..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);

              const value = e.target.value;
              let filtered = products.filter(product => {
                const price = product.prix || 0;
                if (price < priceRange.min || price > priceRange.max) return false;
                if (selectedCategories.length > 0 && !selectedCategories.includes(product.idCategorie)) return false;
                if (selectedSkinTypes.length > 0 && !selectedSkinTypes.includes(product.idTypePeau)) return false;
                if (value && !product.nom.toLowerCase().includes(value.toLowerCase())) return false;
                return true;
              });
              setFilteredProducts(filtered);
            }}
          />
        </div>
      </section>

      {isMobileFilterOpen && <div className="mobile-filter-overlay" onClick={toggleMobileFilter}></div>}

      <div className="shop-content">

        <aside className={`filters-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`}>

          <div className="filter-section">
            <h3 className="filter-title" onClick={() => setIsPriceOpen(!isPriceOpen)}>
              PRIX <span className={`chevron ${isPriceOpen ? 'open' : ''}`}>▼</span>
            </h3>
            {isPriceOpen && (
              <div className="price-range">
                <div className="price-inputs">
                  <input 
                    type="number" 
                    value={priceRange.min} 
                    className="price-input"
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                  />
                  <span>€ — </span>
                  <input 
                    type="number" 
                    value={priceRange.max === null || priceRange.max === undefined ? '' : priceRange.max}
                    className="price-input"
                    onChange={e => {
                      const value = e.target.value;
                      setPriceRange(prev => ({ ...prev, max: value === '' ? null : parseInt(value) }));
                    }}
                  />
                  <span>€</span>
                </div>
              </div>
            )}
          </div>

          <div className="filter-section">
            <h3 className="filter-title" onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
              CATÉGORIES <span className={`chevron ${isCategoriesOpen ? 'open' : ''}`}>▼</span>
            </h3>
            {isCategoriesOpen && (
              <div className="filter-options">
                {categories.map((cat) => (
                  <label className="filter-option" key={cat.id}>
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                    />
                    <span className="option-text">
                      {cat.nom}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="filter-section">
            <h3 className="filter-title" onClick={() => setIsSkinTypesOpen(!isSkinTypesOpen)}>
              TYPES DE PEAU <span className={`chevron ${isSkinTypesOpen ? 'open' : ''}`}>▼</span>
            </h3>
            {isSkinTypesOpen && (
              <div className="filter-options">
                {skinTypes.map((type) => (
                  <label className="filter-option" key={type.id}>
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      checked={selectedSkinTypes.includes(type.id)}
                      onChange={() => handleSkinTypeChange(type.id)}
                    />
                    <span className="option-text">
                      {type.nom}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="filter-actions">
            <button className="filter-btn-Search apply-btn" onClick={handleApplyFilters}>
              FILTRER
            </button>
            <button className="filter-btn-Search reset-btn" onClick={handleResetFilters}>
              RÉINITIALISER
            </button>
          </div>
        </aside>

        <main className="products-section-Search">
          {isLoading ? (
            <div>Chargement des produits...</div>
          ) : error ? (
            <div style={{color: 'red'}}>{error}</div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
                  <h3 className="product-title-Search">{product.nom}</h3>
                  <div className="product-image">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.nom}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                      />
                    ) : null}
                    <div
                      className="placeholder-img"
                      style={{ display: product.image ? 'none' : 'flex' }}
                    ></div>
                    <button className="add-btn" onClick={(e) => handleAddToCart(e, product)}>+</button>
                  </div>
                  <p className="product-price-Search">{product.prix}€</p>
                </div>
              ))}
              {filteredProducts.length === 0 && !isLoading && (
                <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '50px'}}>
                  Aucun produit trouvé avec ces filtres.
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
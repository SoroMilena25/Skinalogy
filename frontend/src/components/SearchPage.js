import React, { useState } from 'react';
import './SearchPage.css';

const SearchpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [selectedOthers, setSelectedOthers] = useState([]);
  
  // États pour les sections dépliables
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isSkinTypesOpen, setIsSkinTypesOpen] = useState(true);
  const [isOthersOpen, setIsOthersOpen] = useState(true);

  // Données des produits
  const products = [
    { id: 1, name: 'Crème hydratante smooth', price: 14.50, category: 'cremes-hydratantes', image: 'cream1' },
    { id: 2, name: 'Sérum - Acide hyaluronique', price: 12.75, category: 'serums', image: 'serum1' },
    { id: 3, name: 'Sérum - Vitamine C + B', price: 8.45, category: 'serums', image: 'serum2' },
    { id: 4, name: 'Crème solaire - SPF 50++', price: 9.75, category: 'cremes-solaires', image: 'sunscreen' },
    { id: 5, name: 'Coffret - Routine complète florale', price: 45.85, category: 'coffrets', image: 'gift1' },
    { id: 6, name: 'Coffret - Soins anti-âge', price: 38.50, category: 'coffrets', image: 'gift2' },
    { id: 7, name: 'Sérum - hydratante & apaisante', price: 11.25, category: 'serums', image: 'serum3' },
    { id: 8, name: 'Coffret - Routine complète peau s...', price: 52.50, category: 'coffrets', image: 'gift3' }
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="shop-page">
      {/* Header avec navigation */}
      <header className="shop-header">
        <nav className="shop-nav">
          <div className="nav-left">
            <a href="#about" className="nav-link">ABOUT</a>
          </div>
          <div className="nav-right">
            <a href="#connexion" className="nav-link">CONNEXION</a>
            <a href="#panier" className="nav-link">PANIER</a>
          </div>
        </nav>
        
        {/* Logo SKINALOGY */}
        <div className="hero-content">
          <h1 className="hero-logo">SKINALOGY</h1>
        </div>
      </header>

      {/* Barre de recherche séparée */}
      <section className="search-section">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Recherchez ici..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">🔍</button>
        </div>
      </section>

      <div className="shop-content">
        {/* Sidebar avec filtres */}
        <aside className="filters-sidebar">
          {/* Filtre Prix */}
          <div className="filter-section">
            <h3 className="filter-title" onClick={() => setIsPriceOpen(!isPriceOpen)}>
              PRIX <span className={`chevron ${isPriceOpen ? 'open' : ''}`}>▼</span>
            </h3>
            {isPriceOpen && (
              <div className="price-range">
                <div className="price-inputs">
                  <input type="number" value="0" className="price-input" />
                  <span>€ — </span>
                  <input type="number" value="100" className="price-input" />
                  <span>€</span>
                </div>
              </div>
            )}
          </div>

          {/* Filtre Catégories */}
          <div className="filter-section">
            <h3 className="filter-title" onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
              CATÉGORIES <span className={`chevron ${isCategoriesOpen ? 'open' : ''}`}>▼</span>
            </h3>
            {isCategoriesOpen && (
              <div className="filter-options">
                <label className="filter-option">
                  <input type="radio" name="category" className="filter-radio" />
                  <span className="option-text">Crèmes hydratantes (5)</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="category" className="filter-radio" />
                  <span className="option-text">Crèmes solaires (2)</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="category" className="filter-radio" />
                  <span className="option-text">Sérums (3)</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="category" className="filter-radio" />
                  <span className="option-text">Toners (3)</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="category" className="filter-radio" />
                  <span className="option-text">Masques (2)</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="category" className="filter-radio" />
                  <span className="option-text">Démaquillants (2)</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="category" className="filter-radio" />
                  <span className="option-text">Crèmes pour les yeux (2)</span>
                </label>
              </div>
            )}
          </div>

          {/* Filtre Types de peau */}
          <div className="filter-section">
            <h3 className="filter-title" onClick={() => setIsSkinTypesOpen(!isSkinTypesOpen)}>
              TYPES DE PEAU <span className={`chevron ${isSkinTypesOpen ? 'open' : ''}`}>▼</span>
            </h3>
            {isSkinTypesOpen && (
              <div className="filter-options">
                <label className="filter-option">
                  <input type="radio" name="skintype" className="filter-radio" />
                  <span className="option-text">Peau mixte (5)</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="skintype" className="filter-radio" />
                  <span className="option-text">Peau sèche (2)</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="skintype" className="filter-radio" />
                  <span className="option-text">Peau grasse (3)</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="skintype" className="filter-radio" />
                  <span className="option-text">Peau normal (3)</span>
                </label>
              </div>
            )}
          </div>

          {/* Filtre Autres */}
          <div className="filter-section">
            <h3 className="filter-title" onClick={() => setIsOthersOpen(!isOthersOpen)}>
              AUTRES <span className={`chevron ${isOthersOpen ? 'open' : ''}`}>▼</span>
            </h3>
            {isOthersOpen && (
              <div className="filter-options">
                <label className="filter-option">
                  <input type="radio" name="others" className="filter-radio" />
                  <span className="option-text">Coffret</span>
                </label>
              </div>
            )}
          </div>
        </aside>

        {/* Grille des produits */}
        <main className="products-section">
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <div className="placeholder-img"></div>
                  <button className="add-btn">+</button>
                </div>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">{product.price}€</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="shop-footer">
        <h2 className="footer-logo">SKINALOGY</h2>
      </footer>
    </div>
  );
};

export default SearchpPage;
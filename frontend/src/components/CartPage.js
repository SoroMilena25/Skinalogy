import React, { useState } from 'react';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sérum - Vitamine C + B',
      price: 8.45,
      quantity: 1,
      image: 'serum1'
    },
    {
      id: 2,
      name: 'Crème solaire - SPF 50++',
      price: 9.75,
      quantity: 2,
      image: 'sunscreen'
    },
    {
      id: 3,
      name: 'Sérum - hydratante & ap...',
      price: 11.25,
      quantity: 1,
      image: 'serum2'
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handlePayment = () => {
    console.log('Procéder au paiement');
  };

  return (
    <div className="cart-page">
      {/* Header avec navigation */}
      <header className="cart-header">
        <nav className="cart-nav">
          <div className="nav-left">
            <a href="#about" className="nav-link">ABOUT</a>
          </div>
          <div className="nav-right">
            <a href="#connexion" className="nav-link">CONNEXION</a>
            <a href="#panier" className="nav-link active">PANIER</a>
          </div>
        </nav>
        
        {/* Logo SKINALOGY */}
        <div className="hero-content">
          <h1 className="hero-logo">SKINALOGY</h1>
        </div>
      </header>

      {/* Section principale du panier */}
      <main className="cart-main">
        <div className="cart-container">
          {/* Titre du panier */}
          <h2 className="cart-title">PANIER</h2>
          
          <div className="cart-content">
            {/* Liste des produits */}
            <div className="cart-items-section">
              <div className="cart-items-container">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <div className="item-image-placeholder"></div>
                    </div>
                    
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      
                      <div className="item-controls">
                        <button 
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          ✕
                        </button>
                        
                        <div className="quantity-controls">
                          <span>x</span>
                          <div className="quantity-input-container">
                            <button 
                              className="quantity-btn"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="quantity-display">{item.quantity}</span>
                            <button 
                              className="quantity-btn"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="item-price">
                          {(item.price * item.quantity).toFixed(2)}€
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="cart-summary-section">
              <div className="summary-container">
                <h3 className="summary-title">RECAPITULATIF</h3>
                
                <div className="summary-total">
                  <div className="total-line">
                    <span>Total</span>
                    <span className="total-amount">{calculateTotal()}€</span>
                  </div>
                </div>
                
                <button className="payment-btn" onClick={handlePayment}>
                  Payer
                </button>
                
                {/* Logo Skinalogy dans le récapitulatif */}
                <div className="summary-logo">
                  <div className="logo-icon">
                    <div className="tree-icon"></div>
                  </div>
                  <div className="logo-text">SKINALOGY</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="cart-footer">
        <h2 className="footer-logo">SKINALOGY</h2>
      </footer>
    </div>
  );
};

export default CartPage;
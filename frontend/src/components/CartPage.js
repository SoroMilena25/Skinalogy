import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './CartPage.css';
import Navbar from './Navbar';
import Footer from './Footer';
import StripePayment from './StripePayment';
import { useCart } from '../hooks/useCart';

// Remplace par ta vraie clé publique Stripe (pk_test_...)
const stripePromise = loadStripe('pk_test_51RiFrTBGnhaIcuSbWV3LaC2F6TMv5XAsoXMUVPRCo6qbYn0ACSxHzEuEMy6Af1roQCivCRGXgwHWUxSi2cvncgwB00UQVwjYAp');

const CartPage = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  // Fonction pour récupérer l'ID utilisateur depuis localStorage
  const getCurrentUserId = () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user).id;
      } catch (e) {
        console.error('Erreur parsing user localStorage:', e);
        return null;
      }
    }
    return null;
  };

  const handlePayment = () => {
    if (cart.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    // Vérifier qu'un utilisateur est connecté
    const userId = getCurrentUserId();
    if (!userId) {
      alert('Vous devez être connecté pour passer commande');
      // Optionnel : rediriger vers la page de connexion
      // window.location.href = '/login';
      return;
    }
    
    // Debug pour voir la structure du panier
    console.log('🔍 Structure du panier:');
    cart.forEach((item, index) => {
      console.log(`Item ${index}:`, {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      });
      console.log(`Types: id=${typeof item.id}, quantity=${typeof item.quantity}, price=${typeof item.price}`);
    });
    
    console.log('🔍 Utilisateur connecté ID:', userId);
    
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentIntent, factureId) => {
    console.log('Paiement réussi:', paymentIntent);
    console.log('Facture créée:', factureId);

    clearCart();

    alert(`Paiement réussi ! Facture n°${factureId} créée. Merci pour votre commande.`);
    setShowPayment(false);
    // Ici tu peux vider le panier ou rediriger vers une page de confirmation
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  return (
    <div className="cart-page">
      {/* Header avec navigation */}
      <Navbar />
      <header className="cart-header">
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
          
          {cart.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 20px',
              backgroundColor: 'white',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
                Votre panier est vide
              </p>
              <a href="/" style={{
                display: 'inline-block',
                padding: '12px 30px',
                backgroundColor: '#8B4513',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600'
              }}>
                Continuer mes achats
              </a>
            </div>
          ) : (
            <div className="cart-content">
              {/* Liste des produits */}
              <div className="cart-items-section">
                <div className="cart-items-container">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            style={{ 
                              width: '80px', 
                              height: '100px', 
                              objectFit: 'cover',
                              borderRadius: '8px'
                            }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="item-image-placeholder"
                          style={{ display: item.image ? 'none' : 'flex' }}
                        ></div>
                      </div>
                      
                      <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>
                        
                        <div className="item-controls">
                          <button 
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id)}
                            title="Supprimer du panier"
                          >
                            ✕
                          </button>
                          
                          <div className="quantity-controls">
                            <span>x</span>
                            <div className="quantity-input-container">
                              <button 
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
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
                            {formatPrice(item.price * item.quantity)}€
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
                      <span>Total ({cart.reduce((sum, item) => sum + item.quantity, 0)} article{cart.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 's' : ''})</span>
                      <span className="total-amount">{formatPrice(cartTotal)}€</span>
                    </div>
                  </div>
                  
                  <button className="payment-btn" onClick={handlePayment}>
                    Payer avec Stripe
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
          )}
        </div>
      </main>

      {/* Modal de paiement Stripe - CORRIGÉ avec userId dynamique */}
      {showPayment && (
        <Elements stripe={stripePromise}>
          <StripePayment
            amount={cartTotal}
            cart={cart}
            userId={getCurrentUserId()} // ← Plus de valeur en dur !
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </Elements>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CartPage;
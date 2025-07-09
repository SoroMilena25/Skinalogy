import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import apiService from '../services/apiService';
import './StripePayment.css';

const StripePayment = ({ amount, onSuccess, onCancel, cart, userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    try {
      console.log('🔥 Début du paiement, montant:', amount);
      console.log('🔥 Items du panier:', cart);
      console.log('🔥 ID utilisateur:', userId);
      
      if (!cart || !Array.isArray(cart) || cart.length === 0) {
        throw new Error('Le panier est vide ou invalide');
      }
      
      console.log('🔥 CALLING processOrder with:', { userId, cart });
      const orderData = await apiService.processOrder(userId, cart);
      console.log('🔥 RESPONSE from processOrder:', orderData);
      
      const { clientSecret } = orderData;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (result.error) {
        console.error('🔥 Erreur Stripe:', result.error);
        setError(result.error.message);
      } else {
        console.log('🔥 Paiement Stripe réussi!', result.paymentIntent);
        
        console.log('🔥 Confirmation backend...');
        const confirmData = await apiService.confirmPayment(
          result.paymentIntent.id,
          userId,
          cart
        );
        
        console.log('🔥 Confirmation backend réussie:', confirmData);
        console.log('🔥 Facture créée:', confirmData.factureId);
        
        onSuccess(result.paymentIntent, confirmData.factureId);
      }
    } catch (err) {
      console.error('🔥 Erreur:', err);
      setError(err.message);
    }

    setIsProcessing(false);
  };

  return (
    <div className="stripe-payment-overlay">
      <div className="stripe-payment-modal">
        <div className="payment-header">
          <h3>Paiement sécurisé</h3>
          <button className="close-btn" onClick={onCancel}>✕</button>
        </div>
        
        <div className="payment-amount">
          <span>Total à payer : {amount.toFixed(2)}€</span>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="card-element-container">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="payment-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={onCancel}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="pay-btn"
              disabled={!stripe || isProcessing}
            >
              {isProcessing ? 'Traitement...' : `Payer ${amount.toFixed(2)}€`}
            </button>
          </div>
        </form>

        <div className="test-card-info">
          <small>
            <strong>Test :</strong> Utilisez 4242 4242 4242 4242 + date future + n'importe quel CVC
          </small>
        </div>
      </div>
    </div>
  );
};

export default StripePayment;
// hooks/useCart.js
import { useState, useEffect } from 'react';
import cartService from '../services/CartService';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Fonction pour mettre à jour l'état local
  const updateCartState = (newCart) => {
    setCart(newCart);
    setCartCount(cartService.getCartCount());
    setCartTotal(cartService.getCartTotal());
  };

  useEffect(() => {
    // Initialiser l'état du panier
    const initialCart = cartService.getCart();
    updateCartState(initialCart);

    // Écouter les changements du panier
    cartService.addListener(updateCartState);

    // Nettoyer l'écouteur lors du démontage
    return () => {
      cartService.removeListener(updateCartState);
    };
  }, []);

  // Fonctions du panier
  const addToCart = (product) => {
    return cartService.addToCart(product);
  };

  const updateQuantity = (productId, quantity) => {
    cartService.updateQuantity(productId, quantity);
  };

  const removeFromCart = (productId) => {
    cartService.removeFromCart(productId);
  };

  const clearCart = () => {
    cartService.clearCart();
  };

  return {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
};
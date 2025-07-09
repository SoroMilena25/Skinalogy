
import { useState, useEffect } from 'react';
import cartService from '../services/CartService';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);


  const updateCartState = (newCart) => {
    setCart(newCart);
    setCartCount(cartService.getCartCount());
    setCartTotal(cartService.getCartTotal());
  };

  useEffect(() => {

    const initialCart = cartService.getCart();
    updateCartState(initialCart);

    
    cartService.addListener(updateCartState);

    
    return () => {
      cartService.removeListener(updateCartState);
    };
  }, []);


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
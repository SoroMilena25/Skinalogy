// services/cartService.js
class CartService {
  constructor() {
    this.storageKey = 'skinalogy_cart';
    this.sessionStorageKey = 'skinalogy_cart_session';
    this.listeners = [];
    
    // Initialiser le panier au démarrage
    this.initCart();
  }

  // Initialise le panier selon le statut de connexion
  initCart() {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Utilisateur connecté : utiliser localStorage (persistant)
      this.storage = localStorage;
      this.key = this.storageKey;
    } else {
      // Utilisateur non connecté : utiliser sessionStorage (temporaire)
      this.storage = sessionStorage;
      this.key = this.sessionStorageKey;
    }
  }

  // Récupérer le panier actuel
  getCart() {
    try {
      const cart = this.storage.getItem(this.key);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
      return [];
    }
  }

  // Sauvegarder le panier
  saveCart(cart) {
    try {
      this.storage.setItem(this.key, JSON.stringify(cart));
      this.notifyListeners();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
    }
  }

  // Ajouter un produit au panier
  addToCart(product) {
    const token = localStorage.getItem('token');
    
    // Vérifier si l'utilisateur est connecté
    if (!token) {
      alert('Veuillez vous connecter pour ajouter des produits au panier');
      return false;
    }

    let cart = this.getCart();
    
    // Vérifier si le produit existe déjà
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Produit existe : augmenter la quantité
      cart[existingItemIndex].quantity += 1;
    } else {
      // Nouveau produit : l'ajouter avec quantité 1
      cart.push({
        id: product.id,
        name: product.nom || product.name,
        price: parseFloat(product.prix || product.price),
        image: product.image,
        quantity: 1
      });
    }
    
    this.saveCart(cart);
    
    // Notification optionnelle
    this.showNotification(`${product.nom || product.name} ajouté au panier`);
    
    return true;
  }

  // Mettre à jour la quantité d'un produit
  updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;
    
    let cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
      cart[itemIndex].quantity = newQuantity;
      this.saveCart(cart);
    }
  }

  // Supprimer un produit du panier
  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
  }

  // Vider le panier
  clearCart() {
    this.storage.removeItem(this.key);
    this.notifyListeners();
  }

  // Obtenir le nombre total d'articles
  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Obtenir le total du panier
  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Migrer le panier de session vers localStorage lors de la connexion
  migrateCartOnLogin() {
    const sessionCart = sessionStorage.getItem(this.sessionStorageKey);
    
    if (sessionCart) {
      // Récupérer le panier de la session
      const sessionItems = JSON.parse(sessionCart);
      
      // Récupérer le panier persistant (peut être vide)
      let persistentCart = [];
      try {
        const stored = localStorage.getItem(this.storageKey);
        persistentCart = stored ? JSON.parse(stored) : [];
      } catch (error) {
        persistentCart = [];
      }
      
      // Fusionner les paniers
      sessionItems.forEach(sessionItem => {
        const existingIndex = persistentCart.findIndex(item => item.id === sessionItem.id);
        
        if (existingIndex > -1) {
          // Additionner les quantités
          persistentCart[existingIndex].quantity += sessionItem.quantity;
        } else {
          // Ajouter le nouvel item
          persistentCart.push(sessionItem);
        }
      });
      
      // Sauvegarder le panier fusionné
      localStorage.setItem(this.storageKey, JSON.stringify(persistentCart));
      
      // Nettoyer le panier de session
      sessionStorage.removeItem(this.sessionStorageKey);
      
      // Réinitialiser le service pour utiliser localStorage
      this.initCart();
    }
  }

  // Nettoyer le panier lors de la déconnexion
  clearCartOnLogout() {
    localStorage.removeItem(this.storageKey);
    this.initCart(); // Passer en mode session
  }

  // Système de notifications pour les composants
  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.getCart()));
  }

  // Notification visuelle simple
  showNotification(message) {
    // Créer une notification toast simple
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #8B4513;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Créer une instance unique (singleton)
const cartService = new CartService();
export default cartService;
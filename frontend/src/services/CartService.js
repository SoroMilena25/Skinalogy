class CartService {
  constructor() {
    this.storageKey = 'skinalogy_cart';
    this.sessionStorageKey = 'skinalogy_cart_session';
    this.listeners = [];
    

    this.initCart();
  }


  initCart() {
    const token = localStorage.getItem('token');
    
    if (token) {

      this.storage = localStorage;
      this.key = this.storageKey;
    } else {

      this.storage = sessionStorage;
      this.key = this.sessionStorageKey;
    }
  }


  getCart() {
    try {
      const cart = this.storage.getItem(this.key);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
      return [];
    }
  }


  saveCart(cart) {
    try {
      this.storage.setItem(this.key, JSON.stringify(cart));
      this.notifyListeners();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
    }
  }

  addToCart(product) {
    const token = localStorage.getItem('token');
    

    if (!token) {
      alert('Veuillez vous connecter pour ajouter des produits au panier');
      return false;
    }

    let cart = this.getCart();
    

    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
  
      cart[existingItemIndex].quantity += 1;
    } else {
 
      cart.push({
        id: product.id,
        name: product.nom || product.name,
        price: parseFloat(product.prix || product.price),
        image: product.image,
        quantity: 1
      });
    }
    
    this.saveCart(cart);
    

    this.showNotification(`${product.nom || product.name} ajouté au panier`);
    
    return true;
  }


  updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;
    
    let cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
      cart[itemIndex].quantity = newQuantity;
      this.saveCart(cart);
    }
  }


  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
  }


  clearCart() {
    this.storage.removeItem(this.key);
    this.notifyListeners();
  }

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }


  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  migrateCartOnLogin() {
    const sessionCart = sessionStorage.getItem(this.sessionStorageKey);
    
    if (sessionCart) {
     
      const sessionItems = JSON.parse(sessionCart);
      
      
      let persistentCart = [];
      try {
        const stored = localStorage.getItem(this.storageKey);
        persistentCart = stored ? JSON.parse(stored) : [];
      } catch (error) {
        persistentCart = [];
      }
      
    
      sessionItems.forEach(sessionItem => {
        const existingIndex = persistentCart.findIndex(item => item.id === sessionItem.id);
        
        if (existingIndex > -1) {
          
          persistentCart[existingIndex].quantity += sessionItem.quantity;
        } else {
          
          persistentCart.push(sessionItem);
        }
      });
      

      localStorage.setItem(this.storageKey, JSON.stringify(persistentCart));
      

      sessionStorage.removeItem(this.sessionStorageKey);
      

      this.initCart();
    }
  }


  clearCartOnLogout() {
    localStorage.removeItem(this.storageKey);
    this.initCart();
  }


  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.getCart()));
  }


  showNotification(message) {
    let container = document.getElementById('cart-notifications');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cart-notifications';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.style.cssText = `
      background-color: #8B4513;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-size: 14px;
      font-weight: 500;
      margin-top: 8px;
      min-width: 180px;
      pointer-events: auto;
      opacity: 1;
      transition: all 0.3s ease;
    `;
    notification.textContent = message;
    container.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
        // Si plus aucune notif, on retire le conteneur
        if (container.childElementCount === 0 && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }, 300);
    }, 3000);
  }
}

const cartService = new CartService();
export default cartService;
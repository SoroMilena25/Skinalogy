const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  async getTopProduits() {
    const response = await fetch(`${API_BASE_URL}/produits/top`);
    return response.json();
  }

  async getIdeeCadeaux() {
    const response = await fetch(`${API_BASE_URL}/produits/cadeaux`);
    return response.json();
  }

  async getProduitById(id) {
    const response = await fetch(`${API_BASE_URL}/produits/${id}`);
    if (!response.ok) {
      throw new Error('Produit non trouvé');
    }
    return response.json();
  }

  async getAllProduits() {
    const response = await fetch(`${API_BASE_URL}/produits`);
    return response.json();
  }

    // Récupérer toutes les astuces
  async getAllAstuces() {
    const response = await fetch(`${API_BASE_URL}/astuces`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des astuces');
    }
    return response.json();
  }

  // Récupérer une astuce par ID
  async getAstuceById(id) {
    const response = await fetch(`${API_BASE_URL}/astuces/${id}`);
    if (!response.ok) {
      throw new Error('Astuce non trouvée');
    }
    return response.json();
  }

  // ====== MÉTHODES ASTUCES ======

  // Récupérer toutes les astuces
  async getAllAstuces() {
    const response = await fetch(`${API_BASE_URL}/astuces`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des astuces');
    }
    return response.json();
  }

  // Récupérer une astuce par ID
  async getAstuceById(id) {
    const response = await fetch(`${API_BASE_URL}/astuces/${id}`);
    if (!response.ok) {
      throw new Error('Astuce non trouvée');
    }
    return response.json();
  }

  async getAstuceHome() {
    const response = await fetch(`${API_BASE_URL}/astuces/topHome`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération de l\'astuce home');
    }
    return response.json();
  }

  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Erreur lors du chargement des catégories');
    return response.json();
  }

  async getTypesPeau() {
    const response = await fetch(`${API_BASE_URL}/typespeau`);
    if (!response.ok) throw new Error('Erreur lors du chargement des types de peau');
    return response.json();
  }

  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  }

  async register(user) {
    const response = await fetch(`${API_BASE_URL}/utilisateurs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  }

  // Mettre à jour le profil utilisateur
  async updateUserProfile(userId, userData) {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la mise à jour');
    }
    return data;
  }

  // Récupérer l'historique des commandes d'un utilisateur
  async getUserOrders(userId) {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/${userId}/commandes`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la récupération des commandes');
    }
    return data;
  }

 // Créer un PaymentIntent simple
  async createPaymentIntent(amount) {
    console.log('🔍 Création PaymentIntent, montant:', amount);
    const response = await fetch(`${API_BASE_URL}/payments/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la création du paiement');
    }
    return data;
  }

  // NOUVELLE MÉTHODE : Traiter une commande complète (adaptée à votre backend)
  async processOrder(userId, cart) {
    console.log('🔍 Traitement commande:', { userId, cart });
    
    // Vérifications côté client
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      throw new Error('Le panier est vide ou invalide');
    }
    
    if (!userId) {
      throw new Error('ID utilisateur manquant');
    }

    // Calculer le total pour créer le PaymentIntent
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const amountInCents = Math.round(total * 100);

    // 1. Créer le PaymentIntent
    const paymentData = await this.createPaymentIntent(amountInCents);
    
    // 2. Retourner les données dans le format attendu par StripePayment.js
    return {
      clientSecret: paymentData.clientSecret,
      factureId: null, // Sera créé après confirmation du paiement
      total: total,
      message: "PaymentIntent créé avec succès"
    };
  }

  // Confirmer le paiement et créer la commande (méthode alternative)
  async confirmPayment(paymentIntentId, idUtilisateur, cart) {
    console.log('🔍 Cart reçu pour confirmation:', cart);
    
    // Vérifier et nettoyer les données du panier avant envoi
    const items = cart.map((item, index) => {
      console.log(`🔍 Item ${index}:`, item);
      
      if (!item.id && item.id !== 0) {
        throw new Error(`Item ${index}: ID manquant ou invalide`);
      }
      if (!item.quantity && item.quantity !== 0) {
        throw new Error(`Item ${index}: Quantité manquante ou invalide`);
      }
      if (!item.price && item.price !== 0) {
        throw new Error(`Item ${index}: Prix manquant ou invalide`);
      }
      
      return {
        id: item.id,              // Garder la structure originale pour le backend
        quantity: item.quantity,  
        price: item.price        
      };
    });

    console.log('🔍 Items formatés pour backend:', items);
    console.log('🔍 Confirmation paiement:', { paymentIntentId, idUtilisateur, items });

    const response = await fetch(`${API_BASE_URL}/payments/confirm-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        paymentIntentId: paymentIntentId, 
        idUtilisateur: idUtilisateur, 
        items: items 
      })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la confirmation du paiement');
    }
    return data;
  }
}

export default new ApiService();
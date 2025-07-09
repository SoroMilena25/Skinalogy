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


  async getAllAstuces() {
    const response = await fetch(`${API_BASE_URL}/astuces`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des astuces');
    }
    return response.json();
  }


  async getAstuceById(id) {
    const response = await fetch(`${API_BASE_URL}/astuces/${id}`);
    if (!response.ok) {
      throw new Error('Astuce non trouvée');
    }
    return response.json();
  }


  async getAllAstuces() {
    const response = await fetch(`${API_BASE_URL}/astuces`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des astuces');
    }
    return response.json();
  }


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


  async getUserOrders(userId) {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/${userId}/commandes`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la récupération des commandes');
    }
    return data;
  }

  async getAllOrders() {
    const response = await fetch(`${API_BASE_URL}/commandes`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des commandes');
    }
    return response.json();
  }

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


  async processOrder(userId, cart) {
    console.log('🔍 Traitement commande:', { userId, cart });
    

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      throw new Error('Le panier est vide ou invalide');
    }
    
    if (!userId) {
      throw new Error('ID utilisateur manquant');
    }


    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const amountInCents = Math.round(total * 100);


    const paymentData = await this.createPaymentIntent(amountInCents);
    

    return {
      clientSecret: paymentData.clientSecret,
      factureId: null,
      total: total,
      message: "PaymentIntent créé avec succès"
    };
  }


  async confirmPayment(paymentIntentId, idUtilisateur, cart) {
    console.log('🔍 Cart reçu pour confirmation:', cart);

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
        id: item.id,             
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

  async logLogin(username) {
    const response = await fetch(`${API_BASE_URL}/logs/login?username=${encodeURIComponent(username)}`, {
      method: 'POST'
    });
    if (!response.ok) {
      throw new Error('Erreur lors de l\'insertion du log de connexion');
    }
    return response.json();
  }

  async getFactureById(id) {
    const response = await fetch(`${API_BASE_URL}/factures/${id}`);
    if (!response.ok) {
      throw new Error('Facture non trouvée');
    }
    return response.json();
  }

  async getCommandesByFacture(id) {
    const response = await fetch(`${API_BASE_URL}/commandes/facture/${id}`);
    if (!response.ok) {
      throw new Error('Lignes de commande non trouvées');
    }
    return response.json();
  }

  async getUtilisateurById(id) {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/${id}`);
    if (!response.ok) {
      throw new Error('Utilisateur non trouvé');
    }
    return response.json();
  }

  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/utilisateurs`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }
    return response.json();
  }

  async updateUserRole(userId, nouveauRole) {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: nouveauRole })
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du rôle');
    }
    return response.json();
  }

  // Ajoute la mise à jour d'un produit
  async updateProduit(id, produit) {
    const response = await fetch(`${API_BASE_URL}/produits/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produit)
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erreur lors de la mise à jour du produit');
    }
    return response.json();
  }

  // Ajoute la suppression d'un produit
  async deleteProduit(id) {
    const response = await fetch(`${API_BASE_URL}/produits/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du produit');
    }
    // Si le backend ne retourne pas de body, ne pas parser en JSON
    const text = await response.text();
    if (text) {
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    }
    return null;
  }

  // Upload d'une image produit
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Erreur lors de l'upload de l'image");
    }
    return response.json(); // { imagePath: 'images/filename.ext' }
  }

  // Insertion d'un produit
  async insertProduit(produit) {
    const response = await fetch(`${API_BASE_URL}/produits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produit)
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Erreur lors de l\'insertion du produit');
    }
    return response.json();
  }

  async getStatsFacturesParMois(annee) {
    const response = await fetch(`${API_BASE_URL}/factures/stats-mensuelles?annee=${annee}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des stats factures par mois");
    }
    return response.json();
  }
}

export default new ApiService();
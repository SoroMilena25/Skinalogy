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
}

export default new ApiService();
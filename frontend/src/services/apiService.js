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
}

export default new ApiService();
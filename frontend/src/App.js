import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import SearchPage from './components/SearchPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import TipsPage from './components/TipsPage';
import DashboardPage from './components/DashboardPage';
import OrdersPage from './components/OrdersPage';
import OrderDetailPage from './components/OrderDetailPage';
import UsersPage from './components/UsersPage';
import ProductAdminPage from './components/ProductAdminPage';
import ProductAdminDetailPage from './components/ProductAdminDetailPage';
import IdeasPage from './components/IdeasPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/inscription" element={<RegisterPage />} />
          <Route path="/recheche" element={<SearchPage />} />
          <Route path="/produits" element={<ProductPage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/astuces" element={<TipsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/commandes" element={<OrdersPage />} />
          <Route path="/commandesDetail" element={<OrderDetailPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/produitsAdmin" element={<ProductAdminPage />} />
          <Route path="/produitsDetailAdmin" element={<ProductAdminDetailPage />} />
          <Route path="/idees" element={<IdeasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
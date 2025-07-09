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
import ProductAdminDetailInsertPage from './components/ProductAdminDetailInsertPage';
import IdeasPage from './components/IdeasPage';
import ProfilePage from './components/ProfilePage';
import TipDetailPage from './components/TipDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/recherche" element={<SearchPage />} />
          <Route path="/produit/:id" element={<ProductPage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/astuces" element={<TipsPage />} />
          <Route path="/idees" element={
            <ProtectedRoute allowedRoles={[1]}>
              <IdeasPage />
            </ProtectedRoute>
          } />
          <Route path="/astuce/:id" element={<TipDetailPage />} />


          <Route path="/connexion" element={
            <ProtectedRoute onlyAnonymous={true}>
              <LoginPage />
            </ProtectedRoute>
          } />
          <Route path="/inscription" element={
            <ProtectedRoute onlyAnonymous={true}>
              <RegisterPage />
            </ProtectedRoute>
          } />

 
          <Route path="/profil" element={
            <ProtectedRoute allowedRoles={[0, 1]}>
              <ProfilePage />
            </ProtectedRoute>
          } />

          
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={[1]}>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/commandes" element={
            <ProtectedRoute allowedRoles={[1]}>
              <OrdersPage />
            </ProtectedRoute>
          } />
          
          <Route path="/users" element={
            <ProtectedRoute allowedRoles={[1]}>
              <UsersPage />
            </ProtectedRoute>
          } />
          <Route path="/produitsAdmin" element={
            <ProtectedRoute allowedRoles={[1]}>
              <ProductAdminPage />
            </ProtectedRoute>
          } />
          <Route path="/produitsAdmin/insert" element={
            <ProtectedRoute allowedRoles={[1]}>
              <ProductAdminDetailInsertPage />
            </ProtectedRoute>
          } />
          <Route path="/produitsAdmin/:id" element={
            <ProtectedRoute allowedRoles={[1]}>
              <ProductAdminDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/order/:orderNumber" element={
            <ProtectedRoute allowedRoles={[1]}>
              <OrderDetailPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../hooks/useCart';
import cartService from '../services/CartService';


const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 1;

  const handleLogout = () => {
    cartService.clearCartOnLogout();
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <div className="navbar-left">
          <Link to="/" className="navbar-link">HOME</Link>
          {isAdmin && (
            <Link to="/dashboard" className="navbar-link">DASHBOARD</Link>
          )}
        </div>
 
        <div className="navbar-right">
          
          <Link to="/astuces" className="navbar-link">ASTUCES</Link>
          <Link to="/recherche" className="navbar-link">RECHERCHER</Link>
          {isLoggedIn ? (
            <>
              <Link to="/profil" className="navbar-link">MON PROFIL</Link>
              <button className="navbar-link logout-btn-Navbar" onClick={handleLogout}>DÉCONNEXION</button>
            </>
          ) : (
            <Link to="/connexion" className="navbar-link">CONNEXION</Link>
          )}
          <Link to="/panier" className="navbar-link cart-link">
            PANIER
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
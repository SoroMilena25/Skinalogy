import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../hooks/useCart';
import cartService from '../services/CartService';

// Ajoutez ce CSS à Navbar.css :
/*
.cart-link {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
*/

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    // Nettoyer le panier lors de la déconnexion
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
        </div>
 
        <div className="navbar-right">
          <Link to="/recherche" className="navbar-link">RECHERCHER</Link>
          {isLoggedIn ? (
            <>
              <Link to="/profil" className="navbar-link">MON PROFIL</Link>
              <button className="navbar-link logout-btn" onClick={handleLogout}>DÉCONNEXION</button>
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
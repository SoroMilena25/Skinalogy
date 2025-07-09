import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * @param {ReactNode} children 
 * @param {number[]|null} allowedRoles
 * @param {boolean} onlyAnonymous 
 */
const ProtectedRoute = ({ children, allowedRoles = null, onlyAnonymous = false }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isLoggedIn = !!token && !!user;
  const role = user?.role;

  if (onlyAnonymous) {

    if (isLoggedIn) return <Navigate to="/" />;
    return children;
  }

  if (!isLoggedIn) {

    return <Navigate to="/connexion" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {

    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

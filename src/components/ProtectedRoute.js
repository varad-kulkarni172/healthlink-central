import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Or use sessionStorage or cookies

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (i.e., the protected component)
  return children;
};

export default ProtectedRoute;

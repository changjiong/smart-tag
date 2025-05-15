import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * A component to protect routes that require authentication.
 * If the user is authenticated, it renders the child routes using <Outlet />.
 * If the user is not authenticated, it redirects them to the /login page,
 * preserving the location they attempted to access.
 */
const ProtectedRoute = ({ authenticated, children }) => {
  const location = useLocation();
  console.log('ProtectedRoute - authenticated:', authenticated);

  // Double-check authentication from localStorage as a fallback
  const checkLocalStorage = () => {
    try {
      const token = localStorage.getItem('auth_token');
      console.log('ProtectedRoute - localStorage token:', token ? 'exists' : 'not found');
      return !!token; // Convert to boolean
    } catch (error) {
      console.error('Error checking localStorage:', error);
      return false;
    }
  };

  // Use either the passed authenticated prop or check localStorage
  const isAuthenticated = authenticated || checkLocalStorage();

  if (!isAuthenticated) {
    // Redirect them to the /login page, saving the current location state
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes or children
  console.log('User is authenticated, rendering protected content');
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
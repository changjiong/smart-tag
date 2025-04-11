import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * A component to protect routes that require authentication.
 * If the user is authenticated, it renders the child routes using <Outlet />.
 * If the user is not authenticated, it redirects them to the /login page,
 * preserving the location they attempted to access.
 */
const ProtectedRoute = ({ authenticated }) => {
  const location = useLocation();

  if (!authenticated) {
    // Redirect them to the /login page, saving the current location state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 
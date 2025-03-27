/**
 * Authentication utility functions
 * Handles user authentication state and token management
 */

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token');
  return !!token;
};

// Get current user information
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Get authentication token
export const getToken = () => {
  return localStorage.getItem('auth_token');
};

// Logout user
export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

// Check if user has specific role
export const hasRole = (role) => {
  const user = getCurrentUser();
  if (!user) return false;
  return user.role === role;
};

// Check if user has permission
export const hasPermission = (permissionName) => {
  const user = getCurrentUser();
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permissionName);
};
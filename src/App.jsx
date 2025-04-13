import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { routeConfig, generateRoutes } from './routes/routeConfig.jsx';
import Login from './pages/Login/Login'; // Import Login directly for passing props
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

/**
 * 应用程序主组件
 * 使用集中式路由配置
 * 管理认证状态
 */
function AppRoutes({ authenticated, setAuthenticated, handleLogout }) {
  // Adjust route config generation to include authentication state
  const generatedRoutes = generateRoutes(routeConfig, authenticated, setAuthenticated, handleLogout);
  const routes = useRoutes(generatedRoutes);
  return routes;
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // Check authentication status on initial load
  useEffect(() => {
    try {
      const token = localStorage.getItem('auth_token');
      console.log('Checking authentication token:', token ? 'Token found' : 'No token');

      if (token) {
        // Get user data if available
        const userData = localStorage.getItem('user');
        console.log('User data:', userData ? 'Found' : 'Not found');

        setAuthenticated(true);
        console.log('User authenticated from stored token');
      } else {
        console.log('No authentication token found, user is not authenticated');
        setAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setAuthenticated(false);
    }
  }, []);

  // Add a function to handle logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setAuthenticated(false);
    console.log('User logged out');
  }, []);

  return (
    <Router>
      <AppRoutes
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        handleLogout={handleLogout}
      />
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { routeConfig, generateRoutes } from './routes/routeConfig.jsx';
import Login from './pages/Login/Login'; // Import Login directly for passing props
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

/**
 * 应用程序主组件
 * 使用集中式路由配置
 * 管理认证状态
 */
function AppRoutes({ authenticated, setAuthenticated }) {
  // Adjust route config generation to include authentication state
  const generatedRoutes = generateRoutes(routeConfig, authenticated, setAuthenticated);
  const routes = useRoutes(generatedRoutes);
  return routes;
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // Check authentication status on initial load
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <AppRoutes authenticated={authenticated} setAuthenticated={setAuthenticated} />
    </Router>
  );
}

export default App;

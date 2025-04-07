import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { routeConfig, generateRoutes } from './routes/routeConfig.jsx';

/**
 * 应用程序主组件
 * 使用集中式路由配置
 */
function AppRoutes() {
  const routes = generateRoutes(routeConfig);
  return useRoutes(routes);
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

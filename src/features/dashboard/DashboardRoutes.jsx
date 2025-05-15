import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { lazy } from 'react';

// 懒加载仪表盘子组件
const CockpitPage = lazy(() => import('./CockpitPage'));
const AIAssistantPage = lazy(() => import('./AIAssistantPage'));

/**
 * 仪表盘路由组件
 * 定义仪表盘模块的路由结构，使用懒加载提升性能
 */
const DashboardRoutes = () => {
  return (
    <Outlet />
  );
};

// 仪表盘模块路由配置
export const dashboardRoutes = [
  {
    path: '',
    element: <Navigate to="cockpit" replace />
  },
  {
    path: 'cockpit',
    element: <CockpitPage />
  },
  {
    path: 'assistant',
    element: <AIAssistantPage />
  }
];

export default DashboardRoutes;

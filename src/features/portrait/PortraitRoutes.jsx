import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { lazy } from 'react';

// 懒加载客群画像子组件
const CreatePage = lazy(() => import('./groups/CreatePage'));
const AIPage = lazy(() => import('./groups/AIPage'));

const CustomerPage = lazy(() => import('./analysis/CustomerPage'));
const GroupInsightsPage = lazy(() => import('./analysis/GroupInsightsPage'));
const GroupPortraitPage = lazy(() => import('./analysis/GroupPortraitPage'));
const FunnelPage = lazy(() => import('./analysis/FunnelPage'));
const ComparisonPage = lazy(() => import('./analysis/ComparisonPage'));
const YRFMPage = lazy(() => import('./analysis/YRFMPage'));

/**
 * 客群画像路由组件
 * 定义客群画像模块的路由结构，使用懒加载提升性能
 */
const PortraitRoutes = () => {
  return (
    <Outlet />
  );
};

// 客群画像模块路由配置
export const portraitRoutes = [
  {
    path: '',
    element: <Navigate to="groups" replace />
  },
  {
    path: 'groups',
    children: [
      {
        path: '',
        element: <Navigate to="create" replace />
      },
      {
        path: 'create',
        element: <CreatePage />
      },
      {
        path: 'ai',
        element: <AIPage />
      }
    ]
  },
  {
    path: 'analysis',
    children: [
      {
        path: '',
        element: <Navigate to="customer" replace />
      },
      {
        path: 'customer',
        element: <CustomerPage />
      },
      {
        path: 'group-insights',
        element: <GroupInsightsPage />
      },
      {
        path: 'group-portrait',
        element: <GroupPortraitPage />
      },
      {
        path: 'funnel',
        element: <FunnelPage />
      },
      {
        path: 'comparison',
        element: <ComparisonPage />
      },
      {
        path: 'yrfm',
        element: <YRFMPage />
      }
    ]
  }
];

export default PortraitRoutes;

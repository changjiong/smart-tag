import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { lazy } from 'react';

// 懒加载标签中心子组件
const MarketPage = lazy(() => import('./management/MarketPage'));
const CategoriesPage = lazy(() => import('./management/CategoriesPage'));
const InfoPage = lazy(() => import('./management/InfoPage'));
const MetadataPage = lazy(() => import('./management/MetadataPage'));
const UninstallPage = lazy(() => import('./management/UninstallPage'));
const BatchUpdatePage = lazy(() => import('./management/BatchUpdatePage'));

const RequirementsPage = lazy(() => import('./creation/RequirementsPage'));
const RegistrationPage = lazy(() => import('./creation/RegistrationPage'));
const FactoryPage = lazy(() => import('./creation/FactoryPage'));
const AIPage = lazy(() => import('./creation/AIPage'));

const QualityDashboardPage = lazy(() => import('./quality/DashboardPage'));
const AlertsPage = lazy(() => import('./quality/AlertsPage'));
const AlertConfigPage = lazy(() => import('./quality/AlertConfigPage'));
const RuleAlertsPage = lazy(() => import('./quality/RuleAlertsPage'));
const HistoryPage = lazy(() => import('./quality/HistoryPage'));

const ValueInsightsPage = lazy(() => import('./value/InsightsPage'));

/**
 * 标签中心路由组件
 * 定义标签中心模块的路由结构，使用懒加载提升性能
 */
const TagsRoutes = () => {
  return (
    <Outlet />
  );
};

// 标签中心模块路由配置
export const tagsRoutes = [
  {
    path: '',
    element: <Navigate to="management" replace />
  },
  {
    path: 'management',
    children: [
      {
        path: '',
        element: <Navigate to="market" replace />
      },
      {
        path: 'market',
        element: <MarketPage />
      },
      {
        path: 'categories',
        element: <CategoriesPage />
      },
      {
        path: 'info',
        element: <InfoPage />
      },
      {
        path: 'metadata',
        element: <MetadataPage />
      },
      {
        path: 'uninstall',
        element: <UninstallPage />
      },
      {
        path: 'batch-update',
        element: <BatchUpdatePage />
      }
    ]
  },
  {
    path: 'creation',
    children: [
      {
        path: '',
        element: <Navigate to="requirements" replace />
      },
      {
        path: 'requirements',
        element: <RequirementsPage />
      },
      {
        path: 'registration',
        element: <RegistrationPage />
      },
      {
        path: 'factory',
        element: <FactoryPage />
      },
      {
        path: 'ai',
        element: <AIPage />
      }
    ]
  },
  {
    path: 'quality',
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <QualityDashboardPage />
      },
      {
        path: 'alerts',
        element: <AlertsPage />
      },
      {
        path: 'alert-config',
        element: <AlertConfigPage />
      },
      {
        path: 'rule-alerts',
        element: <RuleAlertsPage />
      },
      {
        path: 'history',
        element: <HistoryPage />
      }
    ]
  },
  {
    path: 'value',
    children: [
      {
        path: '',
        element: <Navigate to="insights" replace />
      },
      {
        path: 'insights',
        element: <ValueInsightsPage />
      }
    ]
  }
];

export default TagsRoutes;

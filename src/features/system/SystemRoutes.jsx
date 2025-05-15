import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { lazy } from 'react';

// 懒加载用户管理子组件
const UserListPage = lazy(() => import('./users/UserListPage'));
const RoleManagementPage = lazy(() => import('./users/RoleManagementPage'));
const OrganizationManagementPage = lazy(() => import('./users/OrganizationManagementPage'));
const WorkflowManagementPage = lazy(() => import('./users/WorkflowManagementPage'));

// 懒加载系统设置子组件
const ParametersPage = lazy(() => import('./settings/ParametersPage'));
const AnnouncementsPage = lazy(() => import('./settings/AnnouncementsPage'));
const SchedulesPage = lazy(() => import('./settings/SchedulesPage'));
const AdvancedSettingsPage = lazy(() => import('./settings/AdvancedSettingsPage'));

// 懒加载个人中心子组件
const ProfilePage = lazy(() => import('./profile/ProfilePage'));

// 懒加载通知中心子组件
const NotificationsPage = lazy(() => import('./notifications/NotificationsPage'));

// 懒加载AI管理子组件
const ModelsPage = lazy(() => import('./ai/ModelsPage'));
const PromptsPage = lazy(() => import('./ai/PromptsPage'));
const KnowledgePage = lazy(() => import('./ai/KnowledgePage'));

// 懒加载监控管理子组件
const PlatformPage = lazy(() => import('./monitoring/PlatformPage'));
const ServicesPage = lazy(() => import('./monitoring/ServicesPage'));
const LogsPage = lazy(() => import('./monitoring/LogsPage'));
const TrafficPage = lazy(() => import('./monitoring/TrafficPage'));

// 懒加载OpenAPI管理子组件
const APITagsPage = lazy(() => import('./openapi/APITagsPage'));
const DataOutputPage = lazy(() => import('./openapi/DataOutputPage'));

/**
 * 系统管理路由组件
 * 定义系统管理模块的路由结构，使用懒加载提升性能
 */
const SystemRoutes = () => {
  return (
    <Outlet />
  );
};

// 系统管理模块路由配置
export const systemRoutes = [
  {
    path: '',
    element: <Navigate to="users" replace />
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        element: <Navigate to="list" replace />
      },
      {
        path: 'list',
        element: <UserListPage />
      },
      {
        path: 'roles',
        element: <RoleManagementPage />
      },
      {
        path: 'organizations',
        element: <OrganizationManagementPage />
      },
      {
        path: 'workflows',
        element: <WorkflowManagementPage />
      }
    ]
  },
  {
    path: 'settings',
    children: [
      {
        path: '',
        element: <Navigate to="parameters" replace />
      },
      {
        path: 'parameters',
        element: <ParametersPage />
      },
      {
        path: 'announcements',
        element: <AnnouncementsPage />
      },
      {
        path: 'schedules',
        element: <SchedulesPage />
      },
      {
        path: 'advanced',
        element: <AdvancedSettingsPage />
      }
    ]
  },
  {
    path: 'profile',
    element: <ProfilePage />
  },
  {
    path: 'notifications',
    element: <NotificationsPage />
  },
  {
    path: 'ai',
    children: [
      {
        path: '',
        element: <Navigate to="models" replace />
      },
      {
        path: 'models',
        element: <ModelsPage />
      },
      {
        path: 'prompts',
        element: <PromptsPage />
      },
      {
        path: 'knowledge',
        element: <KnowledgePage />
      }
    ]
  },
  {
    path: 'monitoring',
    children: [
      {
        path: '',
        element: <Navigate to="platform" replace />
      },
      {
        path: 'platform',
        element: <PlatformPage />
      },
      {
        path: 'services',
        element: <ServicesPage />
      },
      {
        path: 'logs',
        element: <LogsPage />
      },
      {
        path: 'traffic',
        element: <TrafficPage />
      }
    ]
  },
  {
    path: 'openapi',
    children: [
      {
        path: '',
        element: <Navigate to="tags" replace />
      },
      {
        path: 'tags',
        element: <APITagsPage />
      },
      {
        path: 'data-output',
        element: <DataOutputPage />
      }
    ]
  }
];

export default SystemRoutes;

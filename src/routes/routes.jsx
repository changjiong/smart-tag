/**
 * 路由与组件映射文件
 * 集中管理所有路由配置和组件映射
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// --- 布局与基础组件 ---
import MainLayout from '../components/Layout/MainLayout';
import Login from '../pages/Login/Login';
import NotFoundPage from '../components/ErrorPages/NotFoundPage';

// --- 仪表盘 (已重构) ---
import { 
  DashboardPage, 
  DashboardRoutes,
  CockpitPage, 
  AIAssistantPage 
} from '../features/dashboard';

// --- 标签中心 (已重构) ---
import {
  TagsPage,
  TagsRoutes,
  MarketPage,
  CategoriesPage,
  InfoPage,
  MetadataPage,
  UninstallPage,
  BatchUpdatePage,
  RequirementsPage,
  RegistrationPage,
  FactoryPage,
  AIPage,
  QualityDashboardPage,
  AlertsPage,
  AlertConfigPage,
  RuleAlertsPage,
  HistoryPage,
  ValueInsightsPage
} from '../features/tags';

// --- 客群画像 (已重构) ---
import {
  PortraitPage,
  PortraitRoutes,
  CreatePage,
  PortraitAIPage,
  CustomerPage,
  GroupInsightsPage,
  GroupPortraitPage,
  FunnelPage,
  ComparisonPage,
  YRFMPage
} from '../features/portrait';

// --- 业务场景 ---
import { 
  ApplicationsPage, 
  ApplicationsRoutes, 
  BusinessApplicationsPage, 
  PrecisionMarketingPage, 
  RetentionAssistantPage, 
  WealthAdvisorPage 
} from '../features/applications';
import RiskMonitor from '../pages/Applications/business/RiskMonitor';
import CorporatePortrait from '../pages/Applications/business/CorporatePortrait';

// --- 系统管理 (已重构) ---
import {
  SystemPage,
  SystemRoutes,
  UserListPage,
  RoleManagementPage,
  OrganizationManagementPage,
  WorkflowManagementPage,
  ParametersPage,
  AnnouncementsPage,
  SchedulesPage,
  ModelsPage,
  PromptsPage,
  KnowledgePage,
  AiTestPage,
  PlatformPage,
  ServicesPage,
  LogsPage,
  TrafficPage,
  APITagsPage,
  DataOutputPage
} from '../features/system';

// --- 组件映射对象 ---
export const componentMap = {
  // 布局与基础
  mainLayout: MainLayout,
  login: Login,
  notFound: NotFoundPage,

  // 仪表盘（已重构）
  dashboard: DashboardRoutes,
  cockpit: CockpitPage,
  assistant: AIAssistantPage,

  // 标签中心（已重构）
  tagsRouter: TagsRoutes,
  tagMarket: MarketPage,
  tagCategories: CategoriesPage,
  tagInfo: InfoPage,
  tagMetadata: MetadataPage,
  tagUninstall: UninstallPage,
  tagBatchUpdate: BatchUpdatePage,
  tagRequirements: RequirementsPage,
  tagRegistration: RegistrationPage,
  tagFactory: FactoryPage,
  tagAI: AIPage,
  tagQualityDashboard: QualityDashboardPage,
  tagAlerts: AlertsPage,
  tagAlertConfig: AlertConfigPage,
  tagRuleAlerts: RuleAlertsPage,
  tagHistory: HistoryPage,
  tagValueInsights: ValueInsightsPage,

  // 客群画像（已重构）
  portraitRouter: PortraitRoutes,
  groupCreate: CreatePage,
  groupAI: PortraitAIPage,
  customerView: CustomerPage,
  groupInsights: GroupInsightsPage,
  groupPortrait: GroupPortraitPage,
  funnelAnalysis: FunnelPage,
  groupComparison: ComparisonPage,
  yrfmAnalysis: YRFMPage,

  // 业务场景（已重构）
  applicationsRouter: ApplicationsRoutes,
  businessRouter: ApplicationsPage,
  businessApplications: BusinessApplicationsPage,
  precisionMarketing: PrecisionMarketingPage,
  retentionAssistant: RetentionAssistantPage,
  wealthAdvisor: WealthAdvisorPage,
  riskMonitor: RiskMonitor,
  corporatePortrait: CorporatePortrait,

  // 系统管理（已重构）
  systemRouter: SystemRoutes,
  userList: UserListPage,
  roleManagement: RoleManagementPage,
  organizationManagement: OrganizationManagementPage,
  workflowManagement: WorkflowManagementPage,
  systemParameters: ParametersPage,
  systemAnnouncements: AnnouncementsPage,
  systemSchedules: SchedulesPage,
  aiModels: ModelsPage,
  aiPrompts: PromptsPage,
  aiKnowledge: KnowledgePage,
  aiTest: AiTestPage,
  monitoringPlatform: PlatformPage,
  monitoringServices: ServicesPage,
  monitoringLogs: LogsPage,
  monitoringTraffic: TrafficPage,
  apiTags: APITagsPage,
  dataOutput: DataOutputPage
};

// 辅助函数：根据组件名获取组件
export const getComponent = (componentName) => {
  const component = componentMap[componentName];
  if (!component) {
    console.warn(`Component "${componentName}" not found in componentMap`);
    return () => React.createElement('div', null, `Component not found: ${componentName}`);
  }
  return component;
};

// 路由配置对象，直接反映 menuData.js 结构
export const routeConfig = {
  // 登录路由 (不在主布局内)
  login: {
    path: '/login',
    elementKey: 'login'
  },

  // 主应用路由 (使用 MainLayout)
  root: {
    path: '/',
    elementKey: 'mainLayout',
    isProtected: true,
    children: {
      // 根路径默认重定向到仪表盘
      index: {
        path: '',
        element: <Navigate to="/dashboard" replace />
      },

      // 首页/仪表盘
      dashboard: {
        path: 'dashboard',
        elementKey: 'dashboard',
        children: {
          index: {
            path: '',
            element: <Navigate to="/dashboard/cockpit" replace />
          },
          cockpit: {
            path: 'cockpit',
            elementKey: 'cockpit'
          },
          assistant: {
            path: 'assistant',
            elementKey: 'assistant'
          }
        }
      },

      // 标签中心
      tags: {
        path: 'tags',
        elementKey: 'tagsRouter',
        children: {
          index: {
            path: '',
            element: <Navigate to="/tags/management" replace />
          },
          management: {
            path: 'management',
            children: {
              index: { path: '', element: <Navigate to="/tags/management/market" replace /> },
              market: { path: 'market', elementKey: 'tagMarket' },
              categories: { path: 'categories', elementKey: 'tagCategories' },
              info: { path: 'info', elementKey: 'tagInfo' },
              metadata: { path: 'metadata', elementKey: 'tagMetadata' },
              uninstall: { path: 'uninstall', elementKey: 'tagUninstall' },
              batchUpdate: { path: 'batch-update', elementKey: 'tagBatchUpdate' }
            }
          },
          creation: {
            path: 'creation',
            children: {
              index: { path: '', element: <Navigate to="/tags/creation/requirements" replace /> },
              requirements: { path: 'requirements', elementKey: 'tagRequirements' },
              registration: { path: 'registration', elementKey: 'tagRegistration' },
              factory: { path: 'factory', elementKey: 'tagFactory' },
              ai: { path: 'ai', elementKey: 'tagAI' }
            }
          },
          quality: {
            path: 'quality',
            children: {
              index: { path: '', element: <Navigate to="/tags/quality/dashboard" replace /> },
              dashboard: { path: 'dashboard', elementKey: 'tagQualityDashboard' },
              alerts: { path: 'alerts', elementKey: 'tagAlerts' },
              alertConfig: { path: 'alert-config', elementKey: 'tagAlertConfig' },
              ruleAlerts: { path: 'rule-alerts', elementKey: 'tagRuleAlerts' },
              history: { path: 'history', elementKey: 'tagHistory' }
            }
          },
          value: {
            path: 'value',
            children: {
              index: { path: '', element: <Navigate to="/tags/value/insights" replace /> },
              insights: { path: 'insights', elementKey: 'tagValueInsights' }
            }
          }
        }
      },

      // 客群画像
      portrait: {
        path: 'portrait',
        elementKey: 'portraitRouter',
        children: {
          index: {
            path: '',
            element: <Navigate to="/portrait/groups" replace />
          },
          groups: {
            path: 'groups',
            children: {
              index: { path: '', element: <Navigate to="/portrait/groups/create" replace /> },
              create: { path: 'create', elementKey: 'groupCreate' },
              ai: { path: 'ai', elementKey: 'groupAI' }
            }
          },
          analysis: {
            path: 'analysis',
            children: {
              index: { path: '', element: <Navigate to="/portrait/analysis/customer" replace /> },
              customer: { path: 'customer', elementKey: 'customerView' },
              groupInsights: { path: 'group-insights', elementKey: 'groupInsights' },
              groupPortrait: { path: 'group-portrait', elementKey: 'groupPortrait' },
              funnel: { path: 'funnel', elementKey: 'funnelAnalysis' },
              comparison: { path: 'comparison', elementKey: 'groupComparison' },
              yrfm: { path: 'yrfm', elementKey: 'yrfmAnalysis' }
            }
          }
        }
      },

      // 业务场景（已重构）
      applications: {
        path: 'applications',
        elementKey: 'applicationsRouter',
        children: {
          // /applications 默认重定向到业务应用入口页
          index: {
            path: '',
            element: <Navigate to="/applications/home" replace />
          },
          // 业务应用入口页
          home: {
            path: 'home',
            elementKey: 'businessApplications'
          },
          // 精准营销
          marketing: { 
            path: 'marketing', 
            elementKey: 'precisionMarketing'
          },
          // 客户挽留
          retention: { 
            path: 'retention', 
            elementKey: 'retentionAssistant'
          },
          // 财富顾问
          wealth: { 
            path: 'wealth', 
            elementKey: 'wealthAdvisor'
          },
          // 未重构的路由保持原样
          risk: { 
            path: 'risk', 
            elementKey: 'riskMonitor' 
          },
          corporate: {
            path: 'corporate',
            elementKey: 'corporatePortrait'
          },
          // 业务应用模板（保持兼容）
          templates: {
            path: 'templates',
            element: <Navigate to="/applications/home" replace />
          },
          // 旧版业务场景路由（保持兼容性）
          business: {
            path: 'business',
            element: <Navigate to="/applications/home" replace />
          }
        }
      },

      // 系统管理
      system: {
        path: 'system',
        elementKey: 'systemRouter',
        children: {
          index: {
            path: '',
            element: <Navigate to="/system/users" replace />
          },
          users: {
            path: 'users',
            children: {
              index: { path: '', element: <Navigate to="/system/users/list" replace /> },
              list: { path: 'list', elementKey: 'userList' },
              roles: { path: 'roles', elementKey: 'roleManagement' },
              organizations: { path: 'organizations', elementKey: 'organizationManagement' },
              workflows: { path: 'workflows', elementKey: 'workflowManagement' }
            }
          },
          settings: {
            path: 'settings',
            children: {
              index: { path: '', element: <Navigate to="/system/settings/parameters" replace /> },
              parameters: { path: 'parameters', elementKey: 'systemParameters' },
              schedules: { path: 'schedules', elementKey: 'systemSchedules' },
              announcements: { path: 'announcements', elementKey: 'systemAnnouncements' }
            }
          },
          ai: {
            path: 'ai',
            children: {
              index: { path: '', element: <Navigate to="/system/ai/models" replace /> },
              models: { path: 'models', elementKey: 'aiModels' },
              prompts: { path: 'prompts', elementKey: 'aiPrompts' },
              knowledge: { path: 'knowledge', elementKey: 'aiKnowledge' },
              test: { path: 'test', elementKey: 'aiTest' }
            }
          },
          monitoring: {
            path: 'monitoring',
            children: {
              index: { path: '', element: <Navigate to="/system/monitoring/platform" replace /> },
              platform: { path: 'platform', elementKey: 'monitoringPlatform' },
              services: { path: 'services', elementKey: 'monitoringServices' },
              logs: { path: 'logs', elementKey: 'monitoringLogs' },
              traffic: { path: 'traffic', elementKey: 'monitoringTraffic' }
            }
          },
          openapi: {
            path: 'openapi',
            children: {
              index: { path: '', element: <Navigate to="/system/openapi/tags" replace /> },
              tags: { path: 'tags', elementKey: 'apiTags' },
              data: { path: 'data', elementKey: 'dataOutput' }
            }
          }
        }
      }
    }
  },

  // 404 路由 (放在最后)
  notFound: {
    path: '*',
    elementKey: 'notFound'
  }
};

// 辅助函数：将配置转换为 React Router 所需的格式
export const generateRoutes = (config, authenticated, setAuthenticated, handleLogout) => {
  const routes = [];

  // 处理单个路由
  const processRoute = (routeConfig) => {
    const { path, element, elementKey, children, isProtected } = routeConfig;
    const route = { path };

    let RouteElement = null;

    if (element) {
      // 如果直接提供了元素（如 Navigate）
      if (React.isValidElement(element)) {
        RouteElement = element;
      }
    } else if (elementKey) {
      // 使用elementKey从组件映射中获取组件
      const Component = getComponent(elementKey);
      // 根据需要传递特定props
      if (elementKey === 'login') {
        RouteElement = <Component setAuthenticated={setAuthenticated} />;
      } else if (elementKey === 'mainLayout') {
        RouteElement = <Component handleLogout={handleLogout} />;
      } else {
        RouteElement = <Component />;
      }
    }

    // 如果路由元素已确定，根据需要包装受保护的路由
    if (RouteElement) {
      if (isProtected) {
        route.element = (
          <ProtectedRoute authenticated={authenticated}>
            {RouteElement}
          </ProtectedRoute>
        );
      } else {
        route.element = RouteElement;
      }
    } else if (!children) {
      console.warn(`Route for path "${path}" has no element or elementKey and no children.`);
    }

    // 处理子路由
    if (children) {
      route.children = Object.values(children)
        .map(child => processRoute(child))
        .filter(Boolean);
    }

    // 只返回有效的路由（有元素或有子路由的路由）
    if (route.element || (route.children && route.children.length > 0)) {
      return route;
    }
    return null;
  };

  // 处理所有顶级路由
  if (Array.isArray(config)) {
    console.warn("Route config should be an object, not an array.");
    return [];
  } else {
    Object.values(config).forEach(routeData => {
      if (routeData && routeData.path) {
        const processed = processRoute(routeData);
        if (processed) {
          routes.push(processed);
        }
      } else {
        console.warn("Invalid route configuration item:", routeData);
      }
    });
    return routes;
  }
};

// 为了保持向后兼容性，仍然导出原来的默认导出
export default routeConfig;

/**
 * 路由配置文件
 * 提供系统中所有路由的集中管理和组件映射
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { componentMap } from './componentMap.jsx';
import ProtectedRoute from '../components/ProtectedRoute'; // Import ProtectedRoute

// 系统管理模块路由配置
export const systemRoutes = {
  base: '/system',
  users: {
    base: '/system/users',
    organizations: '/system/users/organizations',
    accounts: '/system/users/accounts',
    roles: '/system/users/roles',
    workflows: '/system/users/workflows'
  },
  settings: {
    base: '/system/settings',
    schedules: '/system/settings/schedules',
    parameters: '/system/settings/parameters',
    announcements: '/system/settings/announcements'
  },
  ai: {
    base: '/system/ai',
    models: '/system/ai/models',
    knowledge: '/system/ai/knowledge',
    prompts: '/system/ai/prompts'
  },
  monitoring: {
    base: '/system/monitoring',
    traffic: '/system/monitoring/traffic',
    logs: '/system/monitoring/logs',
    platform: '/system/monitoring/platform',
    services: '/system/monitoring/services'
  }
};

// 首页模块路由配置
export const dashboardRoutes = {
  base: '/dashboard',
  overview: '/dashboard/overview',
  workspace: {
    base: '/dashboard/workspace',
    tasks: '/dashboard/workspace/tasks',
    insights: '/dashboard/workspace/insights',
    guide: '/dashboard/workspace/guide',
    achievements: '/dashboard/workspace/achievements'
  },
  cockpit: {
    base: '/dashboard/cockpit',
    metrics: '/dashboard/cockpit/metrics',
    results: '/dashboard/cockpit/results',
    tasks: '/dashboard/cockpit/tasks',
    navigation: '/dashboard/cockpit/navigation'
  },
  recommend: {
    base: '/dashboard/recommend',
    features: '/dashboard/recommend/features',
    tools: '/dashboard/recommend/tools',
    learning: '/dashboard/recommend/learning'
  },
  assistant: {
    base: '/dashboard/assistant',
    conversation: '/dashboard/assistant/conversation',
    qa: '/dashboard/assistant/qa',
    analysis: '/dashboard/assistant/analysis',
    guide: '/dashboard/assistant/guide'
  }
};

// 标签中心路由配置
export const tagsRoutes = {
  base: '/tags',
  management: {
    base: '/tags/management',
    market: '/tags/management/market',
    categories: '/tags/management/categories',
    info: '/tags/management/info',
    metadata: '/tags/management/metadata',
    uninstall: '/tags/management/uninstall',
    batchUpdate: '/tags/management/batch-update'
  },
  creation: {
    base: '/tags/creation',
    requirements: '/tags/creation/requirements',
    registration: '/tags/creation/registration',
    factory: '/tags/creation/factory',
    ai: '/tags/creation/ai'
  },
  quality: {
    base: '/tags/quality',
    dashboard: '/tags/quality/dashboard',
    health: '/tags/quality/health',
    alerts: '/tags/quality/alerts',
    alertConfig: '/tags/quality/alert-config',
    ruleAlerts: '/tags/quality/rule-alerts',
    history: '/tags/quality/history'
  },
  value: {
    base: '/tags/value',
    usage: '/tags/value/usage',
    tracking: '/tags/value/tracking',
    businessMapping: '/tags/value/business-mapping',
    insights: '/tags/value/insights'
  }
};

// 客群画像路由配置
export const portraitRoutes = {
  base: '/portrait',
  groups: {
    base: '/portrait/groups',
    create: '/portrait/groups/create',
    ai: '/portrait/groups/ai',
    similar: '/portrait/groups/similar',
    insights: '/portrait/groups/insights'
  },
  analysis: {
    base: '/portrait/analysis',
    customer: '/portrait/analysis/customer',
    behavior: '/portrait/analysis/behavior',
    groupInsights: '/portrait/analysis/group-insights',
    groupPortrait: '/portrait/analysis/group-portrait',
    funnel: '/portrait/analysis/funnel',
    comparison: '/portrait/analysis/comparison',
    yrfm: '/portrait/analysis/yrfm'
  },
  applications: {
    base: '/portrait/applications',
    contactPlans: '/portrait/applications/contact-plans',
    scripts: '/portrait/applications/scripts',
    contactRecords: '/portrait/applications/contact-records'
  }
};

// 业务应用中心路由配置
export const applicationsRoutes = {
  base: '/applications',
  retailMarketing: {
    base: '/applications/retail-marketing',
    precision: '/applications/retail-marketing/precision',
    acquisition: '/applications/retail-marketing/acquisition',
    crossSelling: '/applications/retail-marketing/cross-selling',
    digital: '/applications/retail-marketing/digital'
  },
  business: {
    base: '/applications/business',
    marketingEngine: '/applications/business/marketing-engine',
    retentionAssistant: '/applications/business/retention-assistant',
    wealthAdvisor: '/applications/business/wealth-advisor',
    riskMonitor: '/applications/business/risk-monitor',
    corporatePortrait: '/applications/business/corporate-portrait'
  },
  templates: {
    base: '/applications/templates',
  },
  customerManagement: {
    base: '/applications/customer-management',
    churn: '/applications/customer-management/churn',
    value: '/applications/customer-management/value',
    lifecycle: '/applications/customer-management/lifecycle',
    loyalty: '/applications/customer-management/loyalty'
  },
  wealthManagement: {
    base: '/applications/wealth-management',
    advisor: '/applications/wealth-management/advisor',
    investor: '/applications/wealth-management/investor',
    product: '/applications/wealth-management/product',
    pension: '/applications/wealth-management/pension'
  },
  riskManagement: {
    base: '/applications/risk-management',
    alert: '/applications/risk-management/alert',
    fraud: '/applications/risk-management/fraud',
    credit: '/applications/risk-management/credit',
    transaction: '/applications/risk-management/transaction'
  },
  corporate: {
    base: '/applications/corporate',
    portrait: '/applications/corporate/portrait',
    supplyChain: '/applications/corporate/supply-chain',
    relationship: '/applications/corporate/relationship',
    industry: '/applications/corporate/industry'
  },
  management: {
    base: '/applications/management',
    categories: '/applications/management/categories',
    permissions: '/applications/management/permissions',
    statistics: '/applications/management/statistics'
  }
};

// 场景模板路由配置
export const templatesRoutes = {
  base: '/templates',
  library: {
    base: '/templates/library',
    retail: '/templates/library/retail',
    corporate: '/templates/library/corporate',
    risk: '/templates/library/risk',
    customer: '/templates/library/customer'
  },
  applications: {
    base: '/templates/applications',
    mapping: '/templates/applications/mapping',
    configuration: '/templates/applications/configuration',
    monitoring: '/templates/applications/monitoring'
  },
  management: {
    base: '/templates/management',
    create: '/templates/management/create',
    parameters: '/templates/management/parameters',
    versions: '/templates/management/versions',
    evaluation: '/templates/management/evaluation'
  }
};

// 开放能力路由配置
export const openAPIRoutes = {
  base: '/open-api',
  services: {
    base: '/open-api/services',
    tags: '/open-api/services/tags',
    portraits: '/open-api/services/portraits',
    groups: '/open-api/services/groups'
  },
  data: {
    base: '/open-api/data',
    catalog: '/open-api/data/catalog',
    subscription: '/open-api/data/subscription',
    push: '/open-api/data/push'
  },
  monitoring: {
    base: '/open-api/monitoring',
    statistics: '/open-api/monitoring/statistics',
    performance: '/open-api/monitoring/performance',
    alerts: '/open-api/monitoring/alerts'
  }
};

// 其他路由配置
export const otherRoutes = {
  login: '/login',
  profile: '/profile',
  notFound: '*'
};

// 路由配置对象，直接反映 menuData.js 结构
export const routeConfig = {
  // 登录路由 (不在主布局内)
  login: {
    path: '/login',
    elementKey: 'login' // Use a key to identify the component
  },

  // 主应用路由 (使用 MainLayout)
  root: {
    path: '/',
    elementKey: 'mainLayout', // Use a key to identify the component
    isProtected: true, // Mark this route as protected
    children: {
      // 根路径默认重定向到仪表盘
      index: {
        path: '',
        element: <Navigate to="/dashboard" replace />
      },

      // 首页/仪表盘
      dashboard: {
        path: 'dashboard', // 相对路径 'dashboard'
        elementKey: 'dashboard', // Dashboard 根组件，可能只是个Outlet容器
        children: {
          // /dashboard 默认重定向到 /dashboard/cockpit
          index: {
            path: '',
            element: <Navigate to="/dashboard/cockpit" replace />
          },
          cockpit: { // 对应菜单 "工作台"
            path: 'cockpit', // 相对路径 'cockpit'
            elementKey: 'cockpit' // Cockpit 根组件或页面
            // 如果 Cockpit 有子路由，在这里添加
          },
          assistant: { // 对应菜单 "智能助手"
            path: 'assistant', // 相对路径 'assistant'
            elementKey: 'assistant' // Assistant 根组件或页面
            // 如果 Assistant 有子路由，在这里添加
          }
        }
      },

      // 标签中心
      tags: {
        path: 'tags', // 相对路径 'tags'
        elementKey: 'tagsRouter', // 标签模块根路由组件
        children: {
          // /tags 默认重定向
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
        path: 'portrait', // 相对路径 'portrait'
        elementKey: 'portraitRouter',
        children: {
          // /portrait 默认重定向
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
              // similar, insights 不在 menuData 中，暂时移除
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
              // behavior 不在 menuData 中，暂时移除
            }
          }
          // applications 子模块不在 menuData 中，暂时移除
        }
      },

      // 业务场景
      applications: {
        path: 'applications',
        elementKey: 'applicationsRouter',
        children: {
          // /applications 默认重定向到业务场景
          index: {
            path: '',
            element: <Navigate to="/applications/business" replace />
          },
          // 业务场景路由组
          business: {
            path: 'business',
            elementKey: 'businessRouter',
            children: {
              // /applications/business 默认重定向
              index: {
                path: '',
                element: <Navigate to="/applications/business/marketing-engine" replace />
              },
              // 精准营销引擎
              marketingEngine: {
                path: 'marketing-engine',
                elementKey: 'precisionMarketing'
              },
              // 客户挽留助手
              retentionAssistant: {
                path: 'retention-assistant',
                elementKey: 'retentionAssistant'
              },
              // 财富增值顾问
              wealthAdvisor: {
                path: 'wealth-advisor',
                elementKey: 'wealthAdvisor'
              },
              // 风险预警监控
              riskMonitor: {
                path: 'risk-monitor',
                elementKey: 'riskMonitor'
              },
              // 企业客户画像
              corporatePortrait: {
                path: 'corporate-portrait',
                elementKey: 'corporatePortrait'
              }
            }
          },
          // 业务应用
          templates: {
            path: 'templates',
            elementKey: 'businessApplications'
          }
        }
      },

      // 系统管理
      system: {
        path: 'system', // 相对路径 'system'
        elementKey: 'systemRouter',
        children: {
          // /system 默认重定向
          index: {
            path: '',
            element: <Navigate to="/system/users" replace />
          },
          users: {
            path: 'users',
            children: {
              index: { path: '', element: <Navigate to="/system/users/organizations" replace /> },
              organizations: { path: 'organizations', elementKey: 'organizations' },
              accounts: { path: 'accounts', elementKey: 'accounts' },
              roles: { path: 'roles', elementKey: 'roles' },
              workflows: { path: 'workflows', elementKey: 'workflows' }
            }
          },
          settings: {
            path: 'settings',
            children: {
              index: { path: '', element: <Navigate to="/system/settings/schedules" replace /> },
              schedules: { path: 'schedules', elementKey: 'schedules' },
              parameters: { path: 'parameters', elementKey: 'parameters' },
              announcements: { path: 'announcements', elementKey: 'announcements' }
            }
          },
          ai: {
            path: 'ai',
            children: {
              index: { path: '', element: <Navigate to="/system/ai/models" replace /> },
              models: { path: 'models', elementKey: 'aiModels' },
              prompts: { path: 'prompts', elementKey: 'aiPrompts' },
              knowledge: { path: 'knowledge', elementKey: 'aiKnowledge' }
            }
          },
          monitoring: {
            path: 'monitoring',
            children: {
              index: { path: '', element: <Navigate to="/system/monitoring/traffic" replace /> },
              traffic: { path: 'traffic', elementKey: 'trafficMonitoring' },
              logs: { path: 'logs', elementKey: 'logsMonitoring' },
              platform: { path: 'platform', elementKey: 'platformMonitoring' }
              // services 不在 menuData 中，暂时移除
            }
          },
          // 开放能力 - 路径为 open-api
          openApi: {
            path: 'open-api', // 相对路径 'open-api'
            children: {
              index: { path: '', element: <Navigate to="/system/open-api/services" replace /> },
              services: {
                path: 'services',
                children: {
                  index: { path: '', element: <Navigate to="/system/open-api/services/tags" replace /> },
                  tags: { path: 'tags', elementKey: 'apiTags' }
                  // portraits, groups 不在 menuData 中，暂时移除
                }
              },
              dataOutput: { path: 'data-output', elementKey: 'dataOutput' }
              // data 子模块不在 menuData 中，暂时移除
            }
          }
        }
      }
    }
  },

  // 404 路由 (放在最后)
  notFound: {
    path: '*',
    elementKey: 'notFound' // Use key for NotFoundPage
  }
};

// Helper function to get component from componentMap
const getComponent = (key) => {
  const Comp = componentMap[key];
  if (!Comp) {
    console.warn(`Component with key "${key}" not found in componentMap`);
    return () => <div>Component not found: {key}</div>; // Return a placeholder
  }
  return Comp;
};

// 辅助函数：将配置转换为 React Router 所需的格式
// Updated to accept authenticated and setAuthenticated
export const generateRoutes = (config, authenticated, setAuthenticated) => {
  const routes = [];

  // Updated to handle elementKey and props
  const processRoute = (routeConfig) => {
    const { path, element, elementKey, children, isProtected } = routeConfig;
    const route = { path };

    let RouteElement = null;

    if (element) {
      // If element is directly provided (like Navigate), use it
      if (React.isValidElement(element)) {
        RouteElement = element;
      }
    } else if (elementKey) {
      // Get component from map using elementKey
      const Component = getComponent(elementKey);
      // Pass setAuthenticated to Login component
      if (elementKey === 'login') {
        RouteElement = <Component setAuthenticated={setAuthenticated} />;
      } else {
        RouteElement = <Component />;
      }
    }

    // If the route element is determined, wrap it if protected
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
        // Only warn if there's no element AND no children
        console.warn(`Route for path "${path}" has no element or elementKey and no children.`);
        // Optionally return null or a placeholder element for debugging
        // route.element = <div>Invalid route: {path}</div>;
    }

    // 子路由处理 (recursive call)
    if (children) {
      route.children = Object.values(children)
        .map(child => processRoute(child))
        .filter(Boolean);
    }

    // Only return the route if it has an element or children
    if (route.element || (route.children && route.children.length > 0)) {
       return route;
    }
    return null; // Return null for invalid/empty routes
  };

  // 处理所有顶级路由
  if (Array.isArray(config)) {
    console.warn("Route config should be an object, not an array.");
    return [];
  } else {
    Object.values(config).forEach(routeData => {
      if (routeData && routeData.path) {
        const processed = processRoute(routeData);
        if (processed) { // Add only if processRoute returns a valid route object
          routes.push(processed);
        }
      } else {
        console.warn("Invalid route configuration item:", routeData);
      }
    });
    return routes;
  }
};

// 导出路由路径常量
export const ROUTES = {
  // 登录
  LOGIN: '/login',

  // 仪表盘
  DASHBOARD: {
    ROOT: '/dashboard',
    OVERVIEW: '/dashboard/overview',
    TODOS: '/dashboard/personal/todos',
    // ... 其他路由常量
  },

  // 标签中心
  TAGS: {
    ROOT: '/tags',
    MANAGEMENT: '/tags/management',
    CREATION: '/tags/creation',
    QUALITY: '/tags/quality',
    VALUE: '/tags/value',
  },

  // ... 其他模块的路由常量
};

export default routeConfig; 
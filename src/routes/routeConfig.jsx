/**
 * 路由配置文件
 * 提供系统中所有路由的集中管理和组件映射
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { componentMap } from './componentMap.jsx';

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
    element: <componentMap.login />
  },

  // 主应用路由 (使用 MainLayout)
  root: {
    path: '/',
    element: <componentMap.mainLayout />,
    children: {
      // 根路径默认重定向到仪表盘
      index: {
        path: '',
        element: <Navigate to="/dashboard" replace />
      },

      // 首页/仪表盘
      dashboard: {
        path: 'dashboard', // 相对路径 'dashboard'
        element: <componentMap.dashboard />, // Dashboard 根组件，可能只是个Outlet容器
        children: {
          // /dashboard 默认重定向到 /dashboard/cockpit
          index: {
            path: '',
            element: <Navigate to="/dashboard/cockpit" replace />
          },
          cockpit: { // 对应菜单 "工作台"
            path: 'cockpit', // 相对路径 'cockpit'
            element: <componentMap.cockpit /> // Cockpit 根组件或页面
            // 如果 Cockpit 有子路由，在这里添加
          },
          assistant: { // 对应菜单 "智能助手"
            path: 'assistant', // 相对路径 'assistant'
            element: <componentMap.assistant /> // Assistant 根组件或页面
            // 如果 Assistant 有子路由，在这里添加
          }
        }
      },

      // 标签中心
      tags: {
        path: 'tags', // 相对路径 'tags'
        element: <componentMap.tagsRouter />, // 标签模块根路由组件
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
              market: { path: 'market', element: <componentMap.tagMarket /> },
              categories: { path: 'categories', element: <componentMap.tagCategories /> },
              info: { path: 'info', element: <componentMap.tagInfo /> },
              metadata: { path: 'metadata', element: <componentMap.tagMetadata /> },
              uninstall: { path: 'uninstall', element: <componentMap.tagUninstall /> },
              batchUpdate: { path: 'batch-update', element: <componentMap.tagBatchUpdate /> }
            }
          },
          creation: {
            path: 'creation',
            children: {
              index: { path: '', element: <Navigate to="/tags/creation/requirements" replace /> },
              requirements: { path: 'requirements', element: <componentMap.tagRequirements /> },
              registration: { path: 'registration', element: <componentMap.tagRegistration /> },
              factory: { path: 'factory', element: <componentMap.tagFactory /> },
              ai: { path: 'ai', element: <componentMap.tagAI /> }
            }
          },
          quality: {
            path: 'quality',
            children: {
              index: { path: '', element: <Navigate to="/tags/quality/dashboard" replace /> },
              dashboard: { path: 'dashboard', element: <componentMap.tagQualityDashboard /> },
              alerts: { path: 'alerts', element: <componentMap.tagAlerts /> },
              alertConfig: { path: 'alert-config', element: <componentMap.tagAlertConfig /> },
              ruleAlerts: { path: 'rule-alerts', element: <componentMap.tagRuleAlerts /> },
              history: { path: 'history', element: <componentMap.tagHistory /> }
              // health 路由不在 menuData 中，暂时移除
            }
          },
          value: {
            path: 'value',
            children: {
              index: { path: '', element: <Navigate to="/tags/value/insights" replace /> },
              insights: { path: 'insights', element: <componentMap.tagValueInsights /> }
              // usage, tracking, businessMapping 不在 menuData 中，暂时移除
            }
          }
        }
      },

      // 客群画像
      portrait: {
        path: 'portrait', // 相对路径 'portrait'
        element: <componentMap.portraitRouter />,
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
              create: { path: 'create', element: <componentMap.groupCreate /> },
              ai: { path: 'ai', element: <componentMap.groupAI /> }
              // similar, insights 不在 menuData 中，暂时移除
            }
          },
          analysis: {
            path: 'analysis',
            children: {
              index: { path: '', element: <Navigate to="/portrait/analysis/customer" replace /> },
              customer: { path: 'customer', element: <componentMap.customerView /> },
              groupInsights: { path: 'group-insights', element: <componentMap.groupInsights /> },
              groupPortrait: { path: 'group-portrait', element: <componentMap.groupPortrait /> },
              funnel: { path: 'funnel', element: <componentMap.funnelAnalysis /> },
              comparison: { path: 'comparison', element: <componentMap.groupComparison /> },
              yrfm: { path: 'yrfm', element: <componentMap.yrfmAnalysis /> }
              // behavior 不在 menuData 中，暂时移除
            }
          }
          // applications 子模块不在 menuData 中，暂时移除
        }
      },

      // 业务场景
      applications: {
        path: 'applications', // 相对路径 'applications'
        element: <componentMap.applicationsRouter />,
        children: {
          // /applications 默认重定向到第一个菜单项
          index: {
            path: '',
            element: <Navigate to="/applications/retail-marketing/precision" replace />
          },
          // 直接映射菜单中的路径，注意路径是相对于 /applications
          // --- 场景模板下的路径 ---
          // 精准营销引擎
          retailMarketingPrecision: {
            path: 'retail-marketing/precision', // 完整相对路径
            element: <componentMap.precisionMarketing />
          },
          // 客户挽留助手
          retentionAssistant: {
            path: 'business/retention-assistant', // 完整相对路径
            element: <componentMap.retentionAssistant />
          },
          // 财富增值顾问
          wealthAdvisor: {
            path: 'business/wealth-advisor', // 完整相对路径
            element: <componentMap.wealthAdvisor />
          },
           // 风险预警监控
          riskMonitor: {
            path: 'business/risk-monitor', // 完整相对路径
            element: <componentMap.riskMonitor />
          },
          // 企业客户画像
          corporatePortrait: {
            path: 'business/corporate-portrait', // 完整相对路径
            element: <componentMap.corporatePortrait />
          },
          // --- 业务应用下的路径 ---
          templates: { // 对应菜单 "业务应用"
            path: 'templates', // 相对路径 'templates'
            element: <componentMap.templatesRouter />
          }
          // 其他 business 下的子路由如果不在 menuData 中，暂时移除
        }
      },

      // 系统管理
      system: {
        path: 'system', // 相对路径 'system'
        element: <componentMap.systemRouter />,
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
              organizations: { path: 'organizations', element: <componentMap.organizations /> },
              accounts: { path: 'accounts', element: <componentMap.accounts /> },
              roles: { path: 'roles', element: <componentMap.roles /> },
              workflows: { path: 'workflows', element: <componentMap.workflows /> }
            }
          },
          settings: {
            path: 'settings',
            children: {
              index: { path: '', element: <Navigate to="/system/settings/schedules" replace /> },
              schedules: { path: 'schedules', element: <componentMap.schedules /> },
              parameters: { path: 'parameters', element: <componentMap.parameters /> },
              announcements: { path: 'announcements', element: <componentMap.announcements /> }
            }
          },
          ai: {
            path: 'ai',
            children: {
              index: { path: '', element: <Navigate to="/system/ai/models" replace /> },
              models: { path: 'models', element: <componentMap.aiModels /> },
              prompts: { path: 'prompts', element: <componentMap.aiPrompts /> },
              knowledge: { path: 'knowledge', element: <componentMap.aiKnowledge /> }
            }
          },
          monitoring: {
            path: 'monitoring',
            children: {
              index: { path: '', element: <Navigate to="/system/monitoring/traffic" replace /> },
              traffic: { path: 'traffic', element: <componentMap.trafficMonitoring /> },
              logs: { path: 'logs', element: <componentMap.logsMonitoring /> },
              platform: { path: 'platform', element: <componentMap.platformMonitoring /> }
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
                  tags: { path: 'tags', element: <componentMap.apiTags /> }
                  // portraits, groups 不在 menuData 中，暂时移除
                }
              },
              dataOutput: { path: 'data-output', element: <componentMap.dataOutput /> }
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
    element: <componentMap.notFound />
  }
};

// 辅助函数：将配置转换为 React Router 所需的格式
export const generateRoutes = (config) => {
  const routes = [];

  const processRoute = (routeConfig) => {
    const { path, element, children } = routeConfig;
    
    // 创建路由对象
    const route = { path };
    
    // 元素处理：确保元素是有效的React元素
    if (element) {
      // 如果元素已经是React元素，直接使用它
      if (React.isValidElement(element)) {
        route.element = element;
      } 
      // 如果元素是组件或函数，使用JSX创建元素
      else if (typeof element === 'function') {
        route.element = React.createElement(element);
      } 
      // 否则假设它是来自componentMap的引用
      else {
        console.warn(`Route element for path "${path}" is not a valid React element or function`);
        route.element = null;
      }
    }

    // 子路由处理
    if (children) {
      // 转换children对象为数组
      route.children = Object.values(children).map(child => processRoute(child)).filter(Boolean); // Filter out null/undefined routes
    }

    return route;
  };

  // 处理所有顶级路由
  if (Array.isArray(config)) {
    console.warn("Route config should be an object, not an array.");
    return []; // Or handle array case if necessary
  } else {
    Object.values(config).forEach(route => {
      if (route && route.path) { // Ensure route is valid
         routes.push(processRoute(route));
      } else {
         console.warn("Invalid route configuration item:", route);
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
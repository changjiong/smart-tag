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

// 路由配置对象，包含路径和对应的组件
export const routeConfig = {
  // 登录路由
  login: {
    path: '/login',
    element: <componentMap.login />
  },

  // 主应用路由
  root: {
    path: '/',
    element: <componentMap.mainLayout />,
    children: {
      // 默认重定向
      index: {
        path: '',
        element: <Navigate to="/dashboard" replace />
      },

      // 仪表盘路由
      dashboard: {
        path: 'dashboard',
        element: <componentMap.dashboard />,
        children: {
          index: {
            path: '',
            element: <Navigate to="/dashboard/cockpit" replace />
          },
          // 工作台
          cockpit: {
            path: 'cockpit',
            children: {
              metrics: { path: 'metrics', element: <componentMap.metrics /> },
              results: { path: 'results', element: <componentMap.results /> },
              tasks: { path: 'tasks', element: <componentMap.tasks /> },
              navigation: { path: 'navigation', element: <componentMap.navigation /> }
            }
          },
          // 智能助手
          assistant: {
            path: 'assistant',
            children: {
              conversation: { path: 'conversation', element: <componentMap.conversation /> },
              qa: { path: 'qa', element: <componentMap.qa /> },
              analysis: { path: 'analysis', element: <componentMap.analysis /> },
              guide: { path: 'guide', element: <componentMap.guide /> }
            }
          }
        }
      },

      // 标签中心路由
      tags: {
        path: 'tags',
        element: <componentMap.tagsRouter />,
        children: {
          index: {
            path: '',
            element: <Navigate to="/tags/management" replace />
          },
          // 标签管理
          management: {
            path: 'management',
            children: {
              market: { path: 'market', element: <componentMap.tagMarket /> },
              categories: { path: 'categories', element: <componentMap.tagCategories /> },
              info: { path: 'info', element: <componentMap.tagInfo /> },
              metadata: { path: 'metadata', element: <componentMap.tagMetadata /> },
              uninstall: { path: 'uninstall', element: <componentMap.tagUninstall /> },
              batchUpdate: { path: 'batch-update', element: <componentMap.tagBatchUpdate /> }
            }
          },
          // 标签创建
          creation: {
            path: 'creation',
            children: {
              requirements: { path: 'requirements', element: <componentMap.tagRequirements /> },
              registration: { path: 'registration', element: <componentMap.tagRegistration /> },
              factory: { path: 'factory', element: <componentMap.tagFactory /> },
              ai: { path: 'ai', element: <componentMap.tagAI /> }
            }
          },
          // 标签质量监控
          quality: {
            path: 'quality',
            children: {
              dashboard: { path: 'dashboard', element: <componentMap.tagQualityDashboard /> },
              alerts: { path: 'alerts', element: <componentMap.tagAlerts /> },
              alertConfig: { path: 'alert-config', element: <componentMap.tagAlertConfig /> },
              ruleAlerts: { path: 'rule-alerts', element: <componentMap.tagRuleAlerts /> },
              history: { path: 'history', element: <componentMap.tagHistory /> }
            }
          },
          // 标签价值
          value: {
            path: 'value',
            children: {
              insights: { path: 'insights', element: <componentMap.tagValueInsights /> }
            }
          }
        }
      },

      // 客群画像路由
      portrait: {
        path: 'portrait',
        element: <componentMap.portraitRouter />,
        children: {
          index: {
            path: '',
            element: <Navigate to="/portrait/groups" replace />
          },
          // 客群管理
          groups: {
            path: 'groups',
            children: {
              create: { path: 'create', element: <componentMap.groupCreate /> },
              ai: { path: 'ai', element: <componentMap.groupAI /> }
            }
          },
          // 画像分析
          analysis: {
            path: 'analysis',
            children: {
              customer: { path: 'customer', element: <componentMap.customerView /> },
              groupInsights: { path: 'group-insights', element: <componentMap.groupInsights /> },
              groupPortrait: { path: 'group-portrait', element: <componentMap.groupPortrait /> },
              funnel: { path: 'funnel', element: <componentMap.funnelAnalysis /> },
              comparison: { path: 'comparison', element: <componentMap.groupComparison /> },
              yrfm: { path: 'yrfm', element: <componentMap.yrfmAnalysis /> }
            }
          }
        }
      },

      // 业务场景路由
      applications: {
        path: 'applications',
        element: <componentMap.applicationsRouter />,
        children: {
          index: {
            path: '',
            element: <Navigate to="/applications/business" replace />
          },
          // 场景模板
          business: {
            path: 'business',
            children: {
              retailMarketing: { 
                path: 'retail-marketing/precision', 
                element: <componentMap.precisionMarketing /> 
              },
              retentionAssistant: { 
                path: 'retention-assistant', 
                element: <componentMap.retentionAssistant /> 
              },
              wealthAdvisor: { 
                path: 'wealth-advisor', 
                element: <componentMap.wealthAdvisor /> 
              },
              riskMonitor: { 
                path: 'risk-monitor', 
                element: <componentMap.riskMonitor /> 
              },
              corporatePortrait: { 
                path: 'corporate-portrait', 
                element: <componentMap.corporatePortrait /> 
              }
            }
          },
          // 业务应用
          templates: {
            path: 'templates',
            element: <componentMap.templatesRouter />
          }
        }
      },

      // 系统管理路由
      system: {
        path: 'system',
        element: <componentMap.systemRouter />,
        children: {
          index: {
            path: '',
            element: <Navigate to="/system/users" replace />
          },
          // 用户权限
          users: {
            path: 'users',
            children: {
              organizations: { path: 'organizations', element: <componentMap.organizations /> },
              accounts: { path: 'accounts', element: <componentMap.accounts /> },
              roles: { path: 'roles', element: <componentMap.roles /> },
              workflows: { path: 'workflows', element: <componentMap.workflows /> }
            }
          },
          // 系统配置
          settings: {
            path: 'settings',
            children: {
              schedules: { path: 'schedules', element: <componentMap.schedules /> },
              parameters: { path: 'parameters', element: <componentMap.parameters /> },
              announcements: { path: 'announcements', element: <componentMap.announcements /> }
            }
          },
          // 大模型配置
          ai: {
            path: 'ai',
            children: {
              models: { path: 'models', element: <componentMap.aiModels /> },
              prompts: { path: 'prompts', element: <componentMap.aiPrompts /> },
              knowledge: { path: 'knowledge', element: <componentMap.aiKnowledge /> }
            }
          },
          // 运行监控
          monitoring: {
            path: 'monitoring',
            children: {
              traffic: { path: 'traffic', element: <componentMap.trafficMonitoring /> },
              logs: { path: 'logs', element: <componentMap.logsMonitoring /> },
              platform: { path: 'platform', element: <componentMap.platformMonitoring /> }
            }
          },
          // 开放能力
          openApi: {
            path: 'open-api',
            children: {
              services: {
                path: 'services',
                children: {
                  tags: { path: 'tags', element: <componentMap.apiTags /> }
                }
              },
              dataOutput: { path: 'data-output', element: <componentMap.dataOutput /> }
            }
          }
        }
      }
    }
  },

  // 404 路由
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
      route.children = Object.values(children).map(child => processRoute(child));
    }

    return route;
  };

  // 处理所有顶级路由
  if (Array.isArray(config)) {
    return config.map(route => processRoute(route));
  } else {
    Object.values(config).forEach(route => {
      routes.push(processRoute(route));
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
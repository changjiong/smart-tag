/**
 * 路由配置文件
 * 提供系统中所有路由的集中管理和组件映射
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { componentMap } from './componentMap.jsx';
import ProtectedRoute from '../components/ProtectedRoute';

/**
 * 注意: 所有路由应该从 menuData.js 中导出，避免重复定义
 * 下面的路由常量已经被移除，因为它们已经在 routeConfig 对象中定义
 */

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
        path: 'portrait',
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
              marketingEngine: {
                path: 'marketing-engine',
                elementKey: 'precisionMarketing'
              },
              retentionAssistant: {
                path: 'retention-assistant',
                elementKey: 'retentionAssistant'
              },
              wealthAdvisor: {
                path: 'wealth-advisor',
                elementKey: 'wealthAdvisor'
              },
              riskMonitor: {
                path: 'risk-monitor',
                elementKey: 'riskMonitor'
              },
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
        path: 'system',
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

                }
              },
              dataOutput: { path: 'data-output', elementKey: 'dataOutput' }

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
// Updated to accept authenticated, setAuthenticated and handleLogout
export const generateRoutes = (config, authenticated, setAuthenticated, handleLogout) => {
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
      // Pass props to components that need them
      if (elementKey === 'login') {
        RouteElement = <Component setAuthenticated={setAuthenticated} />;
      } else if (elementKey === 'mainLayout') {
        RouteElement = <Component handleLogout={handleLogout} />;
      } else {
        RouteElement = <Component />;
      }
    }

    // If the route element is determined, wrap it if protected
    if (RouteElement) {
      if (isProtected) {
        // Wrap protected routes with ProtectedRoute component
        console.log(`Protecting route: ${path}`);
        route.element = (
          <ProtectedRoute authenticated={authenticated}>
            {RouteElement}
          </ProtectedRoute>
        );
      } else {
        // Non-protected routes don't need the wrapper
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

// 注意: 所有路由应该从 menuData.js 中导出，避免重复定义

export default routeConfig;
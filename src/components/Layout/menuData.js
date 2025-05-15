// 菜单数据结构定义
export const menuItems = [
  {
    name: '首页',
    path: '/dashboard',
    isNew: true,
    children: [
      {
        name: '工作台',
        path: '/dashboard/cockpit',
        isNew: true,
      },
      {
        name: '智能助手',
        path: '/dashboard/assistant',
        isNew: true,
      }
    ]
  },

  {
    name: '标签中心',
    path: '/tags',
    children: [
      {
        name: '标签管理',
        path: '/tags/management',
        children: [
          { name: '标签超市', path: '/tags/management/market' },
          { name: '标签分类管理', path: '/tags/management/categories' },
          { name: '标签信息管理', path: '/tags/management/info' },
          { name: '标签元数据管理', path: '/tags/management/metadata' },
          { name: '标签体系批量卸载', path: '/tags/management/uninstall' },
          { name: '标签信息批量更新', path: '/tags/management/batch-update' }
        ]
      },
      {
        name: '标签创建',
        path: '/tags/creation',
        children: [
          { name: '标签需求', path: '/tags/creation/requirements' },
          { name: '标签注册', path: '/tags/creation/registration' },
          { name: '标签工厂', path: '/tags/creation/factory' },
          { name: '智能标签生成', path: '/tags/creation/ai', isNew: true }
        ]
      },
      {
        name: '标签质量监控',
        path: '/tags/quality',
        children: [
          { name: '标签质量看板', path: '/tags/quality/dashboard' },
          { name: '异常预警', path: '/tags/quality/alerts' },
          { name: '预警配置', path: '/tags/quality/alert-config' },
          { name: '规则预警', path: '/tags/quality/rule-alerts' },
          { name: '任务与历史', path: '/tags/quality/history' }
        ]
      },
      {
        name: '标签价值',
        path: '/tags/value',
        isNew: true,
        children: [
          { name: '标签价值洞察', path: '/tags/value/insights', isNew: true }
        ]
      }
    ]
  },
  {
    name: '客群画像',
    path: '/portrait',
    children: [
      {
        name: '客群管理',
        path: '/portrait/groups',
        children: [
          { name: '客群创建', path: '/portrait/groups/create' },
          { name: '智能分群', path: '/portrait/groups/ai', isNew: true }
        ]
      },
      {
        name: '画像分析',
        path: '/portrait/analysis',
        children: [
          { name: '单客户视图', path: '/portrait/analysis/customer' },
          { name: '群体洞察', path: '/portrait/analysis/group-insights' },
          { name: '群体画像', path: '/portrait/analysis/group-portrait' },
          { name: '漏斗分析', path: '/portrait/analysis/funnel' },
          { name: '客群对比', path: '/portrait/analysis/comparison' },
          { name: 'YRFM分析', path: '/portrait/analysis/yrfm' }
        ]
      }
    ]
  },

  {
    name: '业务场景',
    path: '/applications',
    isNew: true,
    children: [
      {
        name: '应用中心',
        path: '/applications/home',
        isNew: true,
      },
      {
        name: '专项应用',
        path: '/applications/home',
        isNew: true,
        children: [
          { name: '精准营销引擎', path: '/applications/marketing', isNew: true },
          { name: '客户挽留助手', path: '/applications/retention', isNew: true },
          { name: '财富增值顾问', path: '/applications/wealth', isNew: true },
          { name: '风险预警监控', path: '/applications/risk', isNew: true },
          { name: '企业客户画像', path: '/applications/corporate', isNew: true }
        ]
      },
      {
        name: '业务模板',
        path: '/applications/templates',
        isNew: true,
      }
    ]
  },
  {
    name: '系统管理',
    path: '/system',
    children: [
      {
        name: '用户权限',
        path: '/system/users',
        children: [
          { name: '用户管理', path: '/system/users/list' },
          { name: '机构管理', path: '/system/users/organizations' },
          { name: '角色管理', path: '/system/users/roles' },
          { name: '流程管理', path: '/system/users/workflows' }
        ]
      },
      {
        name: '系统配置',
        path: '/system/settings',
        children: [
          { name: '调度任务', path: '/system/settings/schedules' },
          { name: '参数设置', path: '/system/settings/parameters' },
          { name: '公告管理', path: '/system/settings/announcements' }
        ]
      },
      {
        name: '大模型配置',
        path: '/system/ai',
        isNew: true,
        children: [
          { name: '模型服务', path: '/system/ai/models', isNew: true },
          { name: '提示词管理', path: '/system/ai/prompts', isNew: true },
          { name: '知识库', path: '/system/ai/knowledge', isNew: true },
        ]
      },
      {
        name: '运行监控',
        path: '/system/monitoring',
        children: [
          { name: '平台监控', path: '/system/monitoring/platform' },
          { name: '服务监控', path: '/system/monitoring/services' },
          { name: '日志监控', path: '/system/monitoring/logs' },
          { name: '流量监控', path: '/system/monitoring/traffic' }
        ]
      },
      {
        name: '开放能力',
        path: '/system/openapi',
        children: [
          {
            name: 'API服务',
            path: '/system/openapi/tags',
            children: [
              { name: '标签快递（API）', path: '/system/openapi/tags' }
            ]
          },
          {
            name: '数据输出',
            path: '/system/openapi/data-output',
            isNew: true,
          }
        ]
      }
    ]
  }
]; 

// 菜单数据结构定义
export const menuItems = [
  {
    name: '首页',
    path: '/dashboard',
    children: [
      {
        name: '工作台',
        path: '/dashboard/workspace',
        children: [
          { name: '业务任务看板', path: '/dashboard/workspace/tasks' },
          { name: '数据洞察快报', path: '/dashboard/workspace/insights' },
          { name: '系统使用指南', path: '/dashboard/workspace/guide' },
          { name: '价值成果展示', path: '/dashboard/workspace/achievements' }
        ]
      },
      {
        name: '个性化推荐',
        path: '/dashboard/recommend',
        children: [
          { name: '推荐功能', path: '/dashboard/recommend/features' },
          { name: '常用工具', path: '/dashboard/recommend/tools' },
          { name: '学习资源', path: '/dashboard/recommend/learning' }
        ]
      },
      {
        name: '全局智能助手',
        path: '/dashboard/assistant',
        children: [
          { name: '对话式分析', path: '/dashboard/assistant/conversation' },
          { name: '业务问题解答', path: '/dashboard/assistant/qa' },
          { name: '智能解读', path: '/dashboard/assistant/analysis' },
          { name: '操作引导', path: '/dashboard/assistant/guide' }
        ]
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
          { name: '智能生成', path: '/tags/creation/ai', isNew: true }
        ]
      },
      {
        name: '标签质量',
        path: '/tags/quality',
        children: [
          { name: '标签质量看板', path: '/tags/quality/dashboard' },
          { name: '标签健康', path: '/tags/quality/health', isNew: true },
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
          { name: '标签使用分析', path: '/tags/value/usage', isNew: true },
          { name: '价值追踪', path: '/tags/value/tracking', isNew: true },
          { name: '业务映射', path: '/tags/value/business-mapping', isNew: true }
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
          { name: '智能分群', path: '/portrait/groups/ai', isNew: true },
          { name: '相似客群发现', path: '/portrait/groups/similar', isNew: true },
          { name: '客群洞察库', path: '/portrait/groups/insights' }
        ]
      },
      {
        name: '画像分析',
        path: '/portrait/analysis',
        children: [
          { name: '单客户视图', path: '/portrait/analysis/customer' },
          { name: '行为序列分析', path: '/portrait/analysis/behavior', isNew: true },
          { name: '群体洞察', path: '/portrait/analysis/group-insights' },
          { name: '群体画像', path: '/portrait/analysis/group-portrait' },
          { name: '漏斗分析', path: '/portrait/analysis/funnel' },
          { name: '客群对比', path: '/portrait/analysis/comparison' },
          { name: 'YRFM分析', path: '/portrait/analysis/yrfm' }
        ]
      },
      {
        name: '画像应用',
        path: '/portrait/applications',
        children: [
          { name: '触达计划', path: '/portrait/applications/contact-plans' },
          { name: '话术模板', path: '/portrait/applications/scripts' },
          { name: '触达记录', path: '/portrait/applications/contact-records' }
        ]
      }
    ]
  },

  {
    name: '业务应用中心',
    path: '/applications',
    isNew: true,
    children: [
      {
        name: '零售营销应用',
        path: '/applications/retail-marketing',
        isNew: true,
        children: [
          { name: '精准营销工作站', path: '/applications/retail-marketing/precision', isNew: true },
          { name: '新客获取平台', path: '/applications/retail-marketing/acquisition', isNew: true },
          { name: '交叉销售助手', path: '/applications/retail-marketing/cross-selling', isNew: true },
          { name: '数字营销平台', path: '/applications/retail-marketing/digital', isNew: true }
        ]
      },
      {
        name: '客户经营应用',
        path: '/applications/customer-management',
        isNew: true,
        children: [
          { name: '流失预警与挽留平台', path: '/applications/customer-management/churn', isNew: true },
          { name: '客户价值提升', path: '/applications/customer-management/value', isNew: true },
          { name: '客户生命周期管理', path: '/applications/customer-management/lifecycle', isNew: true },
          { name: '忠诚度计划管理', path: '/applications/customer-management/loyalty', isNew: true }
        ]
      },
      {
        name: '财富管理应用',
        path: '/applications/wealth-management',
        isNew: true,
        children: [
          { name: '智能财富顾问', path: '/applications/wealth-management/advisor', isNew: true },
          { name: '投资者画像', path: '/applications/wealth-management/investor', isNew: true },
          { name: '产品匹配推荐', path: '/applications/wealth-management/product', isNew: true },
          { name: '养老金规划', path: '/applications/wealth-management/pension', isNew: true }
        ]
      },
      {
        name: '风险管控应用',
        path: '/applications/risk-management',
        isNew: true,
        children: [
          { name: '风险预警平台', path: '/applications/risk-management/alert', isNew: true },
          { name: '欺诈检测系统', path: '/applications/risk-management/fraud', isNew: true },
          { name: '信用风险评估', path: '/applications/risk-management/credit', isNew: true },
          { name: '异常交易监控', path: '/applications/risk-management/transaction', isNew: true }
        ]
      },
      {
        name: '对公业务应用',
        path: '/applications/corporate',
        isNew: true,
        children: [
          { name: '企业客户画像', path: '/applications/corporate/portrait', isNew: true },
          { name: '供应链金融分析', path: '/applications/corporate/supply-chain', isNew: true },
          { name: '企业关系图谱', path: '/applications/corporate/relationship', isNew: true },
          { name: '行业洞察', path: '/applications/corporate/industry', isNew: true }
        ]
      },
      {
        name: '应用分类管理',
        path: '/applications/management',
        isNew: true,
        children: []
      }
    ]
  },
  {
    name: '场景模板',
    path: '/templates',
    isNew: true,
    children: [
      {
        name: '模板库',
        path: '/templates/library',
        isNew: true,
        children: [
          { name: '零售金融场景包', path: '/templates/library/retail', isNew: true },
          { name: '对公业务场景包', path: '/templates/library/corporate', isNew: true },
          { name: '风控合规场景包', path: '/templates/library/risk', isNew: true },
          { name: '客户经营场景包', path: '/templates/library/customer', isNew: true }
        ]
      },
      {
        name: '模板应用',
        path: '/templates/applications',
        isNew: true,
        children: [
          { name: '模板业务映射', path: '/templates/applications/mapping', isNew: true },
          { name: '模板实例化配置', path: '/templates/applications/configuration', isNew: true },
          { name: '模板应用监控', path: '/templates/applications/monitoring', isNew: true }
        ]
      },
      {
        name: '模板管理',
        path: '/templates/management',
        isNew: true,
        children: [
          { name: '模板创建', path: '/templates/management/create', isNew: true },
          { name: '模板参数化配置', path: '/templates/management/parameters', isNew: true },
          { name: '模板版本管理', path: '/templates/management/versions', isNew: true },
          { name: '模板效果评估', path: '/templates/management/evaluation', isNew: true }
        ]
      }
    ]
  },
  {
    name: '开放能力',
    path: '/open-api',
    children: [
      {
        name: 'API服务',
        path: '/open-api/services',
        isNew: true,
        children: [
          { name: '标签快递（API）', path: '/open-api/services/tags' },
          { name: '画像输出', path: '/open-api/services/portraits', isNew: true },
          { name: '客群输出', path: '/open-api/services/groups', isNew: true }
        ]
      },
      {
        name: '数据服务',
        path: '/open-api/data',
        isNew: true,
        children: [
          { name: '数据资产目录', path: '/open-api/data/catalog', isNew: true },
          { name: '数据订阅', path: '/open-api/data/subscription', isNew: true },
          { name: '数据推送配置', path: '/open-api/data/push', isNew: true }
        ]
      },
      {
        name: '服务监控',
        path: '/open-api/monitoring',
        isNew: true,
        children: [
          { name: '调用统计', path: '/open-api/monitoring/statistics', isNew: true },
          { name: '性能监控', path: '/open-api/monitoring/performance', isNew: true },
          { name: '告警管理', path: '/open-api/monitoring/alerts', isNew: true }
        ]
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
          { name: '机构管理', path: '/system/users/organizations' },
          { name: '用户管理', path: '/system/users/accounts' },
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
          { name: '知识库', path: '/system/ai/knowledge', isNew: true },
          { name: '提示词管理', path: '/system/ai/prompts', isNew: true }
        ]
      },
      {
        name: '运行监控',
        path: '/system/monitoring',
        children: [
          { name: '流量监控', path: '/system/monitoring/traffic' },
          { name: '日志监控', path: '/system/monitoring/logs' },
          { name: '平台监控', path: '/system/monitoring/platform' },
          { name: '服务监控', path: '/system/monitoring/services' }
        ]
      }
    ]
  }
]; 

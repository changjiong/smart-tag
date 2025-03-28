/**
 * 路由配置文件
 * 提供系统中所有路由的集中管理
 */

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
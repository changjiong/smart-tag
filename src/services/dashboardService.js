// 模拟仪表盘数据服务
// 在实际项目中，这些数据将从后端API获取

// 根据时间范围获取仪表盘数据，移除了 userRole 参数
export const fetchDashboardData = async (timeRange) => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 800));

  // 获取基础数据
  const baseData = getBaseData(timeRange);
  
  // 获取默认用户数据
  const defaultData = getDefaultUserData(timeRange);

  // 合并数据
  return {
    ...baseData,
    ...defaultData
  };
};

// 获取用户任务
export const fetchUserTasks = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 获取默认用户数据中的任务
  const defaultData = getDefaultUserData();
  return defaultData.tasks;
};

// 获取最近活动
export const fetchRecentActivities = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 模拟最近活动数据
  return [
    {
      id: 1,
      type: 'tag_created',
      title: '创建了新标签',
      description: '高价值客户标签已创建成功',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      type: 'group_updated',
      title: '更新了客群',
      description: '零售高频客群条件已更新',
      timestamp: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: 3,
      type: 'campaign_started',
      title: '启动了营销活动',
      description: '季度促销活动已启动',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ];
};

// 获取指标数据
export const fetchMetrics = async () => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 模拟指标数据
  return {
    userCount: 1287,
    userGrowth: 5.2,
    activeTagCount: 367,
    tagGrowth: 12.3,
    activeGroupCount: 84,
    groupGrowth: 8.7
  };
};

// 基础数据，所有角色共享
const getBaseData = (timeRange) => {
  return {
    // 转化率数据
    conversionRate: 5.8,
    conversionTrend: 0.7,
    
    // 流失率数据
    churnRate: 2.4,
    churnTrend: -0.5,
    
    // 标签数据
    totalTags: 1287,
    newTags: 43,
    tagCoverage: 78.5,
    tagCoverageTrend: 2.3,
    
    // 客群数据
    totalGroups: 96,
    newGroups: 12,
    aiGroupCount: 18,
    newAiGroupCount: 5,
    
    // 路径导航
    quickLinks: [
      {
        title: '标签创建',
        icon: '📊',
        description: '快速创建和管理标签',
        path: '/tags/creation'
      },
      {
        title: '客群画像',
        icon: '👥',
        description: '深入了解客户群体',
        path: '/portrait/analysis'
      },
      {
        title: '精准营销',
        icon: '🎯',
        description: '提升营销转化效果',
        path: '/applications/business/marketing-engine'
      },
      {
        title: '客户挽留',
        icon: '🔄',
        description: '减少客户流失',
        path: '/applications/business/retention-assistant'
      },
      {
        title: '智能助手',
        icon: '🤖',
        description: '获取智能化支持',
        path: '/dashboard/assistant'
      },
      {
        title: '系统设置',
        icon: '⚙️',
        description: '配置系统参数',
        path: '/system/settings'
      }
    ]
  };
};

// 默认用户数据
const getDefaultUserData = (timeRange) => {
  return {
    // 业务洞察
    insights: [
      {
        title: '营销活动ROI',
        value: '230%',
        description: '基于智能分群的精准营销活动，较去年同期提升40%',
        link: '/applications/business/marketing-engine'
      },
      {
        title: '客户流失率',
        value: '下降28%',
        description: '通过客户挂留助手的预警机制，成功降低高价值客户流失',
        link: '/applications/business/retention-assistant'
      },
      {
        title: '客户生命周期价值',
        value: '提升18%',
        description: '通过标签驱动的个性化服务，提升了客户平均价值',
        link: '/tags/value/insights'
      }
    ],
    
    // 待处理任务
    tasks: [
      {
        title: '欢迎使用标签画像中台',
        description: '点击此处查看系统使用指南，快速上手各项功能',
        priority: '建议',
        dueDate: '随时',
        link: '/dashboard/assistant/guide'
      },
      {
        title: '创建您的第一个标签',
        description: '通过智能标签生成功能，轻松创建业务标签',
        priority: '建议',
        dueDate: '随时',
        link: '/tags/creation/ai'
      },
      {
        title: '探索客群画像',
        description: '使用智能分群功能，洞察客户群体特征',
        priority: '建议',
        dueDate: '随时',
        link: '/portrait/groups/ai'
      }
    ]
  };
};

// 业务分析师特定数据 - 可以保留，但不再被调用
const getBusinessAnalystData = (timeRange) => {
  return {
    // 待处理任务
    tasks: [
      {
        title: '高价值客户流失风险预警',
        description: '有32位高价值客户近期交易频次降低，存在流失风险',
        priority: '高优先级',
        dueDate: '今日',
        link: '/applications/business/retention-assistant'
      },
      {
        title: '季度营销活动执行',
        description: '需要为即将到来的季度营销活动创建目标客群',
        priority: '中优先级',
        dueDate: '3天后',
        link: '/portrait/groups/create'
      },
      {
        title: '标签质量异常',
        description: '3个核心标签的覆盖率出现异常下降，请检查',
        priority: '中优先级',
        dueDate: '2天后',
        link: '/tags/quality/alerts'
      },
      {
        title: '新客户欢迎流程',
        description: '需审核本周新客户欢迎流程执行情况',
        priority: '低优先级',
        dueDate: '5天后',
        link: '/applications/business/marketing-engine'
      }
    ]
  };
};

// 管理层特定数据 - 可以保留，但不再被调用
const getManagerData = (timeRange) => {
  return {
    // ROI数据
    systemROI: 186.5,
    systemROITrend: 12.3,
    
    // 用户数据
    activeUsers: 98,
    activeUsersTrend: 15,
    
    // 模板数据
    deployedTemplates: 16,
    newDeployedTemplates: 3,
    
    // 系统性能
    systemPerformance: 92,
    systemPerformanceTrend: 2,
    
    // 业务价值
    businessValues: [
      {
        title: '营销活动ROI',
        metric: '230%',
        description: '基于智能分群的精准营销活动，较去年同期提升40%',
        link: '/applications/business/marketing-engine'
      },
      {
        title: '客户流失率',
        metric: '下降28%',
        description: '通过客户挽留助手的预警机制，成功降低高价值客户流失',
        link: '/applications/business/retention-assistant'
      },
      {
        title: '客户生命周期价值',
        metric: '提升18%',
        description: '通过标签驱动的个性化服务，提升了客户平均价值',
        link: '/tags/value/insights'
      },
      {
        title: '运营效率',
        metric: '提升35%',
        description: '自动化流程和智能推荐降低了人工决策成本',
        link: '/applications/templates/dashboard'
      },
      {
        title: '交叉销售增长',
        metric: '22%',
        description: '通过智能推荐引擎，提升产品交叉销售能力',
        link: '/applications/business/marketing-engine'
      },
      {
        title: '新客获取成本',
        metric: '降低14%',
        description: '精准目标客群定位降低了获客成本',
        link: '/portrait/groups/ai'
      }
    ]
  };
};

// 数据科学家特定数据 - 可以保留，但不再被调用
const getDataScientistData = (timeRange) => {
  return {
    // 标签健康
    tagHealthScore: 87.6,
    tagHealthTrend: 2.3,
    
    // 智能标签
    aiTagsCount: 156,
    newAiTagsCount: 28,
    
    // 模型性能
    modelPerformance: 94.2,
    modelPerformanceTrend: 1.5,
    
    // 异常预警
    alertsCount: 7,
    previousAlertsCount: 12,
    
    // 标签异常
    tagAlerts: [
      {
        title: '收入标签异常',
        description: '收入等级标签覆盖率下降15%',
        severity: 'error',
        link: '/tags/quality/alerts?id=234'
      },
      {
        title: '交易频次标签',
        description: '数据更新延迟4小时',
        severity: 'warning',
        link: '/tags/quality/alerts?id=235'
      },
      {
        title: '风险评分标签',
        description: '分布异常偏移，检查更新规则',
        severity: 'warning',
        link: '/tags/quality/alerts?id=236'
      },
      {
        title: '客户年龄标签',
        description: '部分客户年龄数据缺失',
        severity: 'info',
        link: '/tags/quality/alerts?id=237'
      }
    ],
    
    // 模型异常
    modelAlerts: [
      {
        title: '流失预测准确率下降',
        description: '模型准确率下降5%，建议重新训练',
        severity: 'error',
        link: '/system/ai/models?id=34'
      },
      {
        title: '客群划分性能延迟',
        description: '处理时间增加32%，检查资源分配',
        severity: 'warning',
        link: '/system/ai/models?id=28'
      },
      {
        title: '标签推荐服务波动',
        description: '服务响应时间不稳定',
        severity: 'info',
        link: '/system/ai/models?id=42'
      }
    ]
  };
}; 
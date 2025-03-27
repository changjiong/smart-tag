// 标签价值洞察服务
// 模拟实现，实际项目中应该连接到后端API

// 获取标签应用价值概览
export const getTagValueOverview = async () => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    totalTags: 1287,
    activeTags: 986,
    businessCoverage: 92.4,
    valueScore: 87.3,
    valueGrowth: 12.5,
    
    // 各领域标签价值分布
    domainValues: [
      { name: '零售金融', value: 34.6 },
      { name: '对公业务', value: 28.2 },
      { name: '风险管理', value: 18.9 },
      { name: '客户服务', value: 10.3 },
      { name: '运营管理', value: 8.0 }
    ],
    
    // 标签价值趋势
    valueTrends: [
      { month: '1月', value: 72.4 },
      { month: '2月', value: 75.2 },
      { month: '3月', value: 74.8 },
      { month: '4月', value: 78.1 },
      { month: '5月', value: 80.5 },
      { month: '6月', value: 82.3 },
      { month: '7月', value: 84.2 },
      { month: '8月', value: 87.3 }
    ],
    
    // 标签应用场景分布
    scenarioDistribution: [
      { name: '营销获客', value: 28 },
      { name: '客户挽留', value: 22 },
      { name: '风险控制', value: 18 },
      { name: '产品推荐', value: 16 },
      { name: '精准定价', value: 10 },
      { name: '其他场景', value: 6 }
    ]
  };
};

// 获取标签业务价值指标
export const getTagBusinessValue = async () => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    // 业务价值指标
    businessMetrics: [
      {
        name: '客户转化提升',
        currentValue: 24.6,
        previousValue: 18.2,
        trend: 'up',
        unit: '%',
        description: '标签应用后营销活动的客户转化率提升幅度'
      },
      {
        name: '客户流失降低',
        currentValue: 32.8,
        previousValue: 22.5,
        trend: 'up',
        unit: '%',
        description: '标签应用后高价值客户流失率降低幅度'
      },
      {
        name: '风险识别准确率',
        currentValue: 88.5,
        previousValue: 75.2,
        trend: 'up',
        unit: '%',
        description: '标签应用后风险客户识别准确率'
      },
      {
        name: '客户体验提升',
        currentValue: 18.3,
        previousValue: 12.7,
        trend: 'up',
        unit: '%',
        description: '标签应用后客户满意度提升幅度'
      },
      {
        name: '运营效率提升',
        currentValue: 35.2,
        previousValue: 20.8,
        trend: 'up',
        unit: '%',
        description: '标签应用后业务运营效率提升幅度'
      }
    ],
    
    // 标签应用业务案例
    businessCases: [
      {
        title: '精准营销活动效果提升',
        description: '利用客户价值和产品偏好标签，针对性开展营销活动，转化率从3.2%提升至7.8%',
        tags: ['客户价值', '产品偏好', '活跃度'],
        roi: 325
      },
      {
        title: '高价值客户流失预防',
        description: '通过流失风险标签提前识别流失风险，挽留率从15%提升至46%',
        tags: ['流失风险', '客户价值', '活跃度变化'],
        roi: 480
      },
      {
        title: '风险客户提前识别',
        description: '基于行为异常标签提前识别风险客户，降低坏账率32%',
        tags: ['异常行为', '风险评分', '信用变化'],
        roi: 520
      },
      {
        title: '产品交叉销售效果提升',
        description: '基于客户生命周期和需求标签推荐产品，交叉销售成功率提升115%',
        tags: ['客户生命周期', '潜在需求', '产品持有'],
        roi: 286
      }
    ]
  };
};

// 获取标签推荐关联
export const getTagRecommendations = async (tagName) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 根据标签名返回不同的推荐
  const recommendations = {
    '客户价值评分': [
      { name: '价值等级', relevance: 98, businessValue: 95 },
      { name: '价值增长潜力', relevance: 92, businessValue: 90 },
      { name: '消费能力', relevance: 85, businessValue: 88 },
      { name: '资产规模', relevance: 82, businessValue: 80 },
      { name: '客户生命周期', relevance: 78, businessValue: 75 }
    ],
    '流失风险评分': [
      { name: '流失原因类型', relevance: 96, businessValue: 94 },
      { name: '活跃度变化', relevance: 92, businessValue: 89 },
      { name: '挽留响应概率', relevance: 88, businessValue: 85 },
      { name: '投诉记录', relevance: 75, businessValue: 72 },
      { name: '最后交易时间', relevance: 72, businessValue: 70 }
    ],
    '产品偏好': [
      { name: '最佳触达时间', relevance: 88, businessValue: 85 },
      { name: '营销响应概率', relevance: 85, businessValue: 87 },
      { name: '购买力', relevance: 82, businessValue: 80 },
      { name: '渠道偏好', relevance: 80, businessValue: 78 },
      { name: '持有产品数', relevance: 78, businessValue: 75 }
    ],
    // 默认推荐
    'default': [
      { name: '客户价值评分', relevance: 90, businessValue: 92 },
      { name: '活跃度分级', relevance: 85, businessValue: 88 },
      { name: '渠道偏好', relevance: 82, businessValue: 80 },
      { name: '生命周期阶段', relevance: 80, businessValue: 78 },
      { name: '潜在需求', relevance: 78, businessValue: 80 }
    ]
  };
  
  return recommendations[tagName] || recommendations['default'];
};

// 获取最具价值标签列表
export const getMostValuableTags = async () => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 900));
  
  return [
    {
      id: 'tag_001',
      name: '客户价值评分',
      type: 'derived',
      businessValue: 98,
      coverage: 96,
      usageCount: 128,
      scenarios: ['营销', '客户服务', '产品推荐']
    },
    {
      id: 'tag_002',
      name: '流失风险评分',
      type: 'derived',
      businessValue: 95,
      coverage: 94,
      usageCount: 112,
      scenarios: ['客户挽留', '营销', '客户维护']
    },
    {
      id: 'tag_003',
      name: '产品偏好',
      type: 'behavioral',
      businessValue: 92,
      coverage: 90,
      usageCount: 105,
      scenarios: ['产品推荐', '营销', '产品设计']
    },
    {
      id: 'tag_004',
      name: '信用风险等级',
      type: 'derived',
      businessValue: 90,
      coverage: 95,
      usageCount: 98,
      scenarios: ['风险控制', '额度管理', '定价']
    },
    {
      id: 'tag_005',
      name: '客户生命周期',
      type: 'derived',
      businessValue: 89,
      coverage: 92,
      usageCount: 96,
      scenarios: ['营销', '产品推荐', '客户服务']
    },
    {
      id: 'tag_006',
      name: '渠道偏好',
      type: 'behavioral',
      businessValue: 88,
      coverage: 94,
      usageCount: 92,
      scenarios: ['渠道管理', '营销', '客户体验']
    },
    {
      id: 'tag_007',
      name: '资产规模',
      type: 'basic',
      businessValue: 87,
      coverage: 98,
      usageCount: 88,
      scenarios: ['客户分层', '产品推荐', '额度管理']
    },
    {
      id: 'tag_008',
      name: '活跃度分级',
      type: 'behavioral',
      businessValue: 86,
      coverage: 100,
      usageCount: 85,
      scenarios: ['客户活动', '客户维护', '营销']
    },
    {
      id: 'tag_009',
      name: '营销响应概率',
      type: 'derived',
      businessValue: 85,
      coverage: 92,
      usageCount: 82,
      scenarios: ['营销', '客户转化', '活动策划']
    },
    {
      id: 'tag_010',
      name: '消费能力',
      type: 'derived',
      businessValue: 84,
      coverage: 88,
      usageCount: 80,
      scenarios: ['额度管理', '产品推荐', '定价']
    }
  ];
}; 
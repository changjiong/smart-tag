/**
 * Mock customer group data for development and testing
 */

export const customerGroups = [
  {
    id: 1,
    name: '高净值年轻客户',
    description: '35岁以下高净值客户群体',
    creator: '张三',
    createdAt: '2023-10-15',
    updatedAt: '2023-11-25',
    status: 'active',
    customerCount: 1250,
    criteria: [
      { field: 'age', operator: 'less_than', value: 35 },
      { field: 'total_assets', operator: 'greater_than', value: 1000000 }
    ],
    tags: ['高净值', '年轻客户', '投资客户'],
    metrics: {
      averageAssets: 1580000,
      assetGrowthRate: 12.5,
      productActivation: 3.8,
      churnRate: 2.1
    }
  },
  {
    id: 2,
    name: '养老理财客户',
    description: '50岁以上偏好稳健型理财产品的客户',
    creator: '李四',
    createdAt: '2023-09-20',
    updatedAt: '2023-11-20',
    status: 'active',
    customerCount: 2850,
    criteria: [
      { field: 'age', operator: 'greater_than', value: 50 },
      { field: 'investment_preference', operator: 'equals', value: '稳健型' },
      { field: 'product_preference', operator: 'contains', value: '理财类' }
    ],
    tags: ['年长客户', '稳健投资', '养老规划'],
    metrics: {
      averageAssets: 780000,
      assetGrowthRate: 5.8,
      productActivation: 2.3,
      churnRate: 1.2
    }
  },
  {
    id: 3,
    name: '小微企业主',
    description: '拥有小型或微型企业的个人客户',
    creator: '王五',
    createdAt: '2023-11-05',
    updatedAt: '2023-11-28',
    status: 'active',
    customerCount: 1875,
    criteria: [
      { field: 'occupation', operator: 'equals', value: '企业主' },
      { field: 'business_type', operator: 'in', value: ['小型企业', '微型企业'] }
    ],
    tags: ['企业主', '贷款需求', '结算服务'],
    metrics: {
      averageAssets: 920000,
      assetGrowthRate: 8.2,
      productActivation: 4.5,
      churnRate: 3.8
    }
  },
  {
    id: 4,
    name: '年轻职场人士',
    description: '25-35岁都市白领客户',
    creator: '赵六',
    createdAt: '2023-08-12',
    updatedAt: '2023-11-15',
    status: 'active',
    customerCount: 4200,
    criteria: [
      { field: 'age', operator: 'between', value: [25, 35] },
      { field: 'occupation', operator: 'in', value: ['专业人士', '白领'] },
      { field: 'residential_area', operator: 'contains', value: '城市' }
    ],
    tags: ['年轻客户', '消费信贷', '数字银行'],
    metrics: {
      averageAssets: 320000,
      assetGrowthRate: 15.2,
      productActivation: 3.2,
      churnRate: 4.5
    }
  },
  {
    id: 5,
    name: '即将退休客户',
    description: '距离退休不足5年的客户',
    creator: '张三',
    createdAt: '2023-11-10',
    updatedAt: '2023-11-26',
    status: 'active',
    customerCount: 2350,
    criteria: [
      { field: 'age', operator: 'between', value: [55, 60] },
      { field: 'employment_status', operator: 'equals', value: '在职' }
    ],
    tags: ['退休规划', '养老金', '财富传承'],
    metrics: {
      averageAssets: 950000,
      assetGrowthRate: 4.8,
      productActivation: 2.7,
      churnRate: 1.5
    }
  }
];

// Group analytics data
export const groupAnalytics = {
  assetDistribution: {
    '高净值年轻客户': {
      deposit: 25,
      investment: 55,
      insurance: 10,
      loan: 5,
      others: 5
    },
    '养老理财客户': {
      deposit: 40,
      investment: 35,
      insurance: 20,
      loan: 2,
      others: 3
    },
    '小微企业主': {
      deposit: 35,
      investment: 25,
      insurance: 15,
      loan: 20,
      others: 5
    },
    '年轻职场人士': {
      deposit: 30,
      investment: 25,
      insurance: 15,
      loan: 25,
      others: 5
    },
    '即将退休客户': {
      deposit: 45,
      investment: 35,
      insurance: 15,
      loan: 3,
      others: 2
    }
  },
  behaviorPatterns: {
    '高净值年轻客户': {
      digitalChannelUsage: 92,
      branchVisits: 2.5,
      productHoldings: 4.8,
      transactionsPerMonth: 25.3
    },
    '养老理财客户': {
      digitalChannelUsage: 65,
      branchVisits: 3.8,
      productHoldings: 3.2,
      transactionsPerMonth: 12.5
    },
    '小微企业主': {
      digitalChannelUsage: 85,
      branchVisits: 5.2,
      productHoldings: 6.1,
      transactionsPerMonth: 42.8
    },
    '年轻职场人士': {
      digitalChannelUsage: 96,
      branchVisits: 0.8,
      productHoldings: 2.9,
      transactionsPerMonth: 18.7
    },
    '即将退休客户': {
      digitalChannelUsage: 58,
      branchVisits: 4.1,
      productHoldings: 4.3,
      transactionsPerMonth: 10.2
    }
  },
  valueMetrics: {
    categories: ['客户价值', '成长潜力', '流失风险', '交叉销售潜力', '数字化接受度'],
    groups: [
      {
        name: '高净值年轻客户',
        data: [90, 85, 35, 75, 95]
      },
      {
        name: '养老理财客户',
        data: [85, 40, 20, 50, 65]
      },
      {
        name: '小微企业主',
        data: [80, 75, 45, 85, 80]
      },
      {
        name: '年轻职场人士',
        data: [60, 95, 50, 70, 95]
      },
      {
        name: '即将退休客户',
        data: [75, 35, 30, 45, 60]
      }
    ]
  }
};

// Group template recommendations
export const groupTemplates = [
  {
    id: 1,
    name: '高净值客户',
    description: '资产规模超过100万的高价值客户',
    popularity: 'high',
    criteria: [
      { field: 'total_assets', operator: 'greater_than', value: 1000000 }
    ],
    suggestedTags: ['高净值', '财富管理', 'VIP客户']
  },
  {
    id: 2,
    name: '流失风险客户',
    description: '近期活跃度显著下降的客户',
    popularity: 'medium',
    criteria: [
      { field: 'transaction_activity', operator: 'equals', value: '低频' },
      { field: 'login_frequency', operator: 'less_than', value: 1 },
      { field: 'last_login', operator: 'greater_than', value: '30days' }
    ],
    suggestedTags: ['流失风险', '挽留目标', '活动促活']
  },
  {
    id: 3,
    name: '信用卡消费客户',
    description: '信用卡消费活跃的客户',
    popularity: 'high',
    criteria: [
      { field: 'credit_card_usage', operator: 'equals', value: '活跃' },
      { field: 'monthly_spend', operator: 'greater_than', value: 5000 }
    ],
    suggestedTags: ['信用卡', '消费金融', '支付便利']
  },
  {
    id: 4,
    name: '储蓄偏好客户',
    description: '以存款为主要理财方式的客户',
    popularity: 'medium',
    criteria: [
      { field: 'deposit_ratio', operator: 'greater_than', value: 0.7 },
      { field: 'investment_products', operator: 'less_than', value: 2 }
    ],
    suggestedTags: ['存款偏好', '风险厌恶', '稳健型']
  },
  {
    id: 5,
    name: '投资新手',
    description: '刚开始接触投资理财的客户',
    popularity: 'high',
    criteria: [
      { field: 'investment_history', operator: 'less_than', value: '1year' },
      { field: 'investment_products', operator: 'less_than', value: 3 },
      { field: 'risk_tolerance', operator: 'not_equals', value: '进取型' }
    ],
    suggestedTags: ['投资新手', '教育需求', '基础产品']
  }
];

// Group overlap analysis
export const groupOverlap = [
  { group1: 1, group2: 3, overlapCount: 450, overlapPercentage: 36 },
  { group1: 1, group2: 4, overlapCount: 280, overlapPercentage: 22.4 },
  { group1: 2, group2: 5, overlapCount: 820, overlapPercentage: 28.8 },
  { group1: 3, group2: 4, overlapCount: 520, overlapPercentage: 27.7 },
  { group1: 4, group2: 5, overlapCount: 310, overlapPercentage: 7.4 }
];

export default {
  customerGroups,
  groupAnalytics,
  groupTemplates,
  groupOverlap
};

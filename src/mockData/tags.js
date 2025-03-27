/**
 * Mock tag data for development and testing
 */

// Tag categories
export const tagCategories = [
  { id: 1, name: '人口属性', code: 'demographic', description: '客户基本人口学特征' },
  { id: 2, name: '资产状况', code: 'asset', description: '客户资产规模与构成情况' },
  { id: 3, name: '行为偏好', code: 'behavior', description: '客户交易和操作行为特征' },
  { id: 4, name: '风险特征', code: 'risk', description: '客户风险承受能力与偏好' },
  { id: 5, name: '渠道偏好', code: 'channel', description: '客户偏好的交互渠道' },
  { id: 6, name: '生命周期', code: 'lifecycle', description: '客户在银行的生命周期阶段' },
  { id: 7, name: '价值评估', code: 'value', description: '客户价值相关评估指标' },
  { id: 8, name: '产品偏好', code: 'product', description: '客户产品使用偏好' },
  { id: 9, name: 'AI特征', code: 'ai_feature', description: '人工智能模型发现的特征' }
];

// Tag data sources
export const tagSources = [
  { id: 1, name: '核心系统', code: 'core', description: '银行核心系统数据' },
  { id: 2, name: '交易系统', code: 'transaction', description: '交易处理系统数据' },
  { id: 3, name: '渠道数据', code: 'channel', description: '各渠道交互数据' },
  { id: 4, name: '外部数据', code: 'external', description: '第三方数据源' },
  { id: 5, name: '人工智能', code: 'ai', description: '人工智能模型生成' },
  { id: 6, name: '数据集市', code: 'datamart', description: '数据集市整合数据' }
];

// Tag list
export const tags = [
  {
    id: 1,
    name: '年龄段',
    code: 'age_group',
    category: 1,
    categoryName: '人口属性',
    source: 1,
    sourceName: '核心系统',
    dataType: 'enum',
    enumValues: ['18-24岁', '25-34岁', '35-44岁', '45-54岁', '55-64岁', '65岁以上'],
    description: '客户年龄分段',
    coverage: 98.5,
    updateFrequency: 'yearly',
    lastUpdated: '2023-11-15T00:00:00',
    creator: '系统管理员',
    status: 'active',
    businessUnit: '全行',
    version: 1
  },
  {
    id: 2,
    name: '性别',
    code: 'gender',
    category: 1,
    categoryName: '人口属性',
    source: 1,
    sourceName: '核心系统',
    dataType: 'enum',
    enumValues: ['男', '女', '未知'],
    description: '客户性别',
    coverage: 99.2,
    updateFrequency: 'yearly',
    lastUpdated: '2023-11-15T00:00:00',
    creator: '系统管理员',
    status: 'active',
    businessUnit: '全行',
    version: 1
  },
  {
    id: 3,
    name: '婚姻状况',
    code: 'marital_status',
    category: 1,
    categoryName: '人口属性',
    source: 1,
    sourceName: '核心系统',
    dataType: 'enum',
    enumValues: ['未婚', '已婚', '离异', '丧偶', '未知'],
    description: '客户婚姻状况',
    coverage: 65.8,
    updateFrequency: 'yearly',
    lastUpdated: '2023-11-15T00:00:00',
    creator: '系统管理员',
    status: 'active',
    businessUnit: '全行',
    version: 1
  },
  {
    id: 4,
    name: 'AUM总资产',
    code: 'total_assets',
    category: 2,
    categoryName: '资产状况',
    source: 2,
    sourceName: '交易系统',
    dataType: 'range',
    rangeValues: [
      '0-10万',
      '10-50万',
      '50-100万',
      '100-500万',
      '500-1000万',
      '1000万以上'
    ],
    description: '客户在本行的资产管理总额',
    coverage: 100.0,
    updateFrequency: 'daily',
    lastUpdated: '2023-12-01T00:00:00',
    creator: '系统管理员',
    status: 'active',
    businessUnit: '财富管理部',
    version: 2
  },
  {
    id: 5,
    name: '资产增长率',
    code: 'asset_growth_rate',
    category: 2,
    categoryName: '资产状况',
    source: 6,
    sourceName: '数据集市',
    dataType: 'range',
    rangeValues: [
      '负增长',
      '0-5%',
      '5-10%',
      '10-20%',
      '20%以上'
    ],
    description: '客户过去一年资产增长率',
    coverage: 95.3,
    updateFrequency: 'monthly',
    lastUpdated: '2023-11-30T00:00:00',
    creator: '数据分析师',
    status: 'active',
    businessUnit: '财富管理部',
    version: 1
  },
  {
    id: 6,
    name: '投资偏好',
    code: 'investment_preference',
    category: 3,
    categoryName: '行为偏好',
    source: 2,
    sourceName: '交易系统',
    dataType: 'enum',
    enumValues: [
      '保守型',
      '稳健型',
      '平衡型',
      '成长型',
      '进取型'
    ],
    description: '客户投资偏好类型',
    coverage: 78.4,
    updateFrequency: 'quarterly',
    lastUpdated: '2023-10-01T00:00:00',
    creator: '数据分析师',
    status: 'active',
    businessUnit: '财富管理部',
    version: 2
  },
  {
    id: 7,
    name: '交易活跃度',
    code: 'transaction_activity',
    category: 3,
    categoryName: '行为偏好',
    source: 2,
    sourceName: '交易系统',
    dataType: 'enum',
    enumValues: [
      '高频',
      '中频',
      '低频',
      '极低频',
      '不活跃'
    ],
    description: '客户交易频率分级',
    coverage: 100.0,
    updateFrequency: 'monthly',
    lastUpdated: '2023-11-30T00:00:00',
    creator: '数据分析师',
    status: 'active',
    businessUnit: '零售业务部',
    version: 3
  },
  {
    id: 8,
    name: '风险承受能力',
    code: 'risk_tolerance',
    category: 4,
    categoryName: '风险特征',
    source: 1,
    sourceName: '核心系统',
    dataType: 'enum',
    enumValues: [
      '保守型',
      '稳健型',
      '平衡型',
      '成长型',
      '进取型'
    ],
    description: '客户风险承受能力评估结果',
    coverage: 92.1,
    updateFrequency: 'yearly',
    lastUpdated: '2023-09-15T00:00:00',
    creator: '系统管理员',
    status: 'active',
    businessUnit: '合规部',
    version: 1
  },
  {
    id: 9,
    name: '渠道偏好',
    code: 'channel_preference',
    category: 5,
    categoryName: '渠道偏好',
    source: 3,
    sourceName: '渠道数据',
    dataType: 'enum',
    enumValues: [
      '线下网点',
      '网上银行',
      '手机银行',
      '电话银行',
      '智能客服'
    ],
    description: '客户最常使用的交互渠道',
    coverage: 97.8,
    updateFrequency: 'monthly',
    lastUpdated: '2023-11-30T00:00:00',
    creator: '数据分析师',
    status: 'active',
    businessUnit: '电子银行部',
    version: 2
  },
  {
    id: 10,
    name: '客户生命周期',
    code: 'customer_lifecycle',
    category: 6,
    categoryName: '生命周期',
    source: 6,
    sourceName: '数据集市',
    dataType: 'enum',
    enumValues: [
      '新客户',
      '成长期',
      '成熟期',
      '流失风险',
      '已流失'
    ],
    description: '客户生命周期阶段',
    coverage: 100.0,
    updateFrequency: 'monthly',
    lastUpdated: '2023-11-30T00:00:00',
    creator: '数据科学家',
    status: 'active',
    businessUnit: '零售业务部',
    version: 2
  },
  {
    id: 11,
    name: '客户价值等级',
    code: 'customer_value',
    category: 7,
    categoryName: '价值评估',
    source: 6,
    sourceName: '数据集市',
    dataType: 'enum',
    enumValues: [
      '钻石',
      '白金',
      '黄金',
      '白银',
      '普通'
    ],
    description: '客户价值综合评估等级',
    coverage: 100.0,
    updateFrequency: 'monthly',
    lastUpdated: '2023-11-30T00:00:00',
    creator: '数据科学家',
    status: 'active',
    businessUnit: '零售业务部',
    version: 3
  },
  {
    id: 12,
    name: '产品偏好',
    code: 'product_preference',
    category: 8,
    categoryName: '产品偏好',
    source: 6,
    sourceName: '数据集市',
    dataType: 'enum',
    enumValues: [
      '存款类',
      '理财类',
      '贷款类',
      '保险类',
      '基金类',
      '综合类'
    ],
    description: '客户主要使用的产品类型',
    coverage: 94.2,
    updateFrequency: 'monthly',
    lastUpdated: '2023-11-30T00:00:00',
    creator: '数据分析师',
    status: 'active',
    businessUnit: '产品部',
    version: 2
  },
  {
    id: 13,
    name: '升级潜力指数',
    code: 'upgrade_potential',
    category: 9,
    categoryName: 'AI特征',
    source: 5,
    sourceName: '人工智能',
    dataType: 'range',
    rangeValues: [
      '极低',
      '低',
      '中',
      '高',
      '极高'
    ],
    description: 'AI预测的客户产品升级潜力',
    coverage: 85.7,
    updateFrequency: 'monthly',
    lastUpdated: '2023-11-30T00:00:00',
    creator: 'AI系统',
    status: 'active',
    businessUnit: '数据中心',
    version: 1
  },
  {
    id: 14,
    name: '流失风险指数',
    code: 'churn_risk',
    category: 9,
    categoryName: 'AI特征',
    source: 5,
    sourceName: '人工智能',
    dataType: 'range',
    rangeValues: [
      '极低',
      '低',
      '中',
      '高',
      '极高'
    ],
    description: 'AI预测的客户流失风险概率',
    coverage: 85.7,
    updateFrequency: 'weekly',
    lastUpdated: '2023-12-01T00:00:00',
    creator: 'AI系统',
    status: 'active',
    businessUnit: '数据中心',
    version: 2
  },
  {
    id: 15,
    name: '收入水平',
    code: 'income_level',
    category: 2,
    categoryName: '资产状况',
    source: 4,
    sourceName: '外部数据',
    dataType: 'range',
    rangeValues: [
      '低收入',
      '中低收入',
      '中等收入',
      '中高收入',
      '高收入'
    ],
    description: '客户收入水平评估',
    coverage: 72.3,
    updateFrequency: 'yearly',
    lastUpdated: '2023-06-30T00:00:00',
    creator: '数据分析师',
    status: 'active',
    businessUnit: '零售业务部',
    version: 1
  }
];

// Tag distribution data
export const tagDistributionData = {
  age_group: [
    { name: '18-24岁', value: 15 },
    { name: '25-34岁', value: 28 },
    { name: '35-44岁', value: 25 },
    { name: '45-54岁', value: 18 },
    { name: '55-64岁', value: 10 },
    { name: '65岁以上', value: 4 }
  ],
  gender: [
    { name: '男', value: 52 },
    { name: '女', value: 47 },
    { name: '未知', value: 1 }
  ],
  customer_value: [
    { name: '钻石', value: 5 },
    { name: '白金', value: 15 },
    { name: '黄金', value: 25 },
    { name: '白银', value: 30 },
    { name: '普通', value: 25 }
  ],
  investment_preference: [
    { name: '保守型', value: 20 },
    { name: '稳健型', value: 35 },
    { name: '平衡型', value: 25 },
    { name: '成长型', value: 15 },
    { name: '进取型', value: 5 }
  ]
};

// Tag correlations
export const tagCorrelations = [
  { source: 'age_group', target: 'investment_preference', strength: 0.72 },
  { source: 'age_group', target: 'risk_tolerance', strength: 0.68 },
  { source: 'total_assets', target: 'customer_value', strength: 0.95 },
  { source: 'transaction_activity', target: 'customer_value', strength: 0.63 },
  { source: 'channel_preference', target: 'age_group', strength: 0.58 },
  { source: 'product_preference', target: 'investment_preference', strength: 0.76 },
  { source: 'upgrade_potential', target: 'asset_growth_rate', strength: 0.61 },
  { source: 'churn_risk', target: 'transaction_activity', strength: 0.83 },
  { source: 'churn_risk', target: 'customer_lifecycle', strength: 0.79 },
  { source: 'income_level', target: 'total_assets', strength: 0.52 }
];

// Tag monitoring data
export const tagMonitoring = {
  timeIntervals: ['2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12'],
  coverageData: {
    'age_group': [97.8, 98.0, 98.2, 98.3, 98.4, 98.5],
    'total_assets': [100.0, 100.0, 100.0, 100.0, 100.0, 100.0],
    'investment_preference': [75.2, 76.1, 76.8, 77.5, 78.0, 78.4],
    'churn_risk': [80.1, 81.5, 82.7, 83.9, 84.8, 85.7]
  },
  qualityScore: {
    'age_group': [95, 95, 96, 96, 97, 97],
    'total_assets': [98, 98, 98, 99, 99, 99],
    'investment_preference': [91, 92, 92, 93, 93, 93],
    'churn_risk': [85, 86, 88, 89, 90, 91]
  }
};

export default {
  tagCategories,
  tagSources,
  tags,
  tagDistributionData,
  tagCorrelations,
  tagMonitoring
};
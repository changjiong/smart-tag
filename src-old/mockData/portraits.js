/**
 * Mock customer portrait data for development and testing
 */

export const customerPortraits = [
  {
    id: 1,
    customerName: '张三',
    customerID: '100001',
    customerType: '个人客户',
    mainAttributes: {
      age: 42,
      gender: '男',
      education: '本科',
      occupation: '企业高管',
      income: '高收入',
      residentialArea: '城市中心'
    },
    financialAttributes: {
      totalAssets: '1,250,000',
      assetDistribution: {
        deposit: 30,
        investment: 45,
        insurance: 15,
        others: 10
      },
      riskPreference: '稳健型',
      creditScore: 'A'
    },
    behavioralAttributes: {
      preferredChannel: '手机银行',
      transactionFrequency: '高',
      productPreference: '理财产品',
      lifetime: '8年'
    },
    valueAssessment: {
      customerValue: '高价值',
      profitContribution: '高',
      loyaltyScore: 85,
      churnRisk: '低'
    },
    customerJourney: [
      { phase: '获客', status: '完成', date: '2015-05-12' },
      { phase: '激活', status: '完成', date: '2015-05-20' },
      { phase: '提升', status: '完成', date: '2017-08-15' },
      { phase: '保留', status: '进行中', date: '2022-11-30' }
    ],
    recommendations: [
      { type: '产品推荐', item: '私行定制理财', confidence: 0.89 },
      { type: '服务提升', item: '专属客户经理', confidence: 0.92 },
      { type: '交叉销售', item: '高端信用卡', confidence: 0.78 }
    ],
    recentActivities: [
      { date: '2023-11-28', activity: '购买理财产品', amount: 200000 },
      { date: '2023-11-15', activity: '薪资收入', amount: 45000 },
      { date: '2023-10-30', activity: '转账支付', amount: 12500 }
    ],
    tags: ['高净值', '企业高管', '理财偏好', '稳健投资']
  },
  {
    id: 2,
    customerName: '李四',
    customerID: '100002',
    customerType: '个人客户',
    mainAttributes: {
      age: 35,
      gender: '女',
      education: '研究生',
      occupation: '医生',
      income: '中高收入',
      residentialArea: '城市郊区'
    },
    financialAttributes: {
      totalAssets: '850,000',
      assetDistribution: {
        deposit: 40,
        investment: 30,
        insurance: 25,
        others: 5
      },
      riskPreference: '平衡型',
      creditScore: 'A'
    },
    behavioralAttributes: {
      preferredChannel: '网上银行',
      transactionFrequency: '中',
      productPreference: '储蓄和保险',
      lifetime: '5年'
    },
    valueAssessment: {
      customerValue: '中高价值',
      profitContribution: '中',
      loyaltyScore: 75,
      churnRisk: '中低'
    },
    customerJourney: [
      { phase: '获客', status: '完成', date: '2018-06-20' },
      { phase: '激活', status: '完成', date: '2018-07-05' },
      { phase: '提升', status: '进行中', date: '2021-03-15' }
    ],
    recommendations: [
      { type: '产品推荐', item: '结构性存款', confidence: 0.85 },
      { type: '服务提升', item: '健康保障咨询', confidence: 0.90 },
      { type: '交叉销售', item: '出国金融服务', confidence: 0.75 }
    ],
    recentActivities: [
      { date: '2023-11-25', activity: '购买保险', amount: 100000 },
      { date: '2023-11-10', activity: '薪资收入', amount: 32000 },
      { date: '2023-10-28', activity: '转账支付', amount: 8500 }
    ],
    tags: ['女性客户', '医疗行业', '保险偏好', '平衡投资']
  }
];

// Customer portrait insights - overall metrics
export const portraitInsights = {
  customerSegments: [
    { name: '高净值', count: 1250, percentage: 12.5 },
    { name: '中高净值', count: 3500, percentage: 35.0 },
    { name: '大众富裕', count: 4200, percentage: 42.0 },
    { name: '普通客户', count: 1050, percentage: 10.5 }
  ],
  ageDistribution: [
    { range: '18-25', count: 850, percentage: 8.5 },
    { range: '26-35', count: 3200, percentage: 32.0 },
    { range: '36-45', count: 2800, percentage: 28.0 },
    { range: '46-55', count: 1850, percentage: 18.5 },
    { range: '56-65', count: 950, percentage: 9.5 },
    { range: '65+', count: 350, percentage: 3.5 }
  ],
  occupationDistribution: [
    { name: '企业主/高管', count: 1450, percentage: 14.5 },
    { name: '专业人士', count: 2800, percentage: 28.0 },
    { name: '公务员', count: 1250, percentage: 12.5 },
    { name: '金融从业者', count: 950, percentage: 9.5 },
    { name: '教育工作者', count: 850, percentage: 8.5 },
    { name: '其他', count: 2700, percentage: 27.0 }
  ],
  productPreference: [
    { name: '存款产品', count: 8500, percentage: 85.0 },
    { name: '理财产品', count: 6200, percentage: 62.0 },
    { name: '保险产品', count: 4800, percentage: 48.0 },
    { name: '贷款产品', count: 3500, percentage: 35.0 },
    { name: '投资产品', count: 2900, percentage: 29.0 },
    { name: '信用卡', count: 7200, percentage: 72.0 }
  ],
  customerLifecycle: [
    { stage: '新客户', count: 2100, percentage: 21.0 },
    { stage: '成长期', count: 3500, percentage: 35.0 },
    { stage: '成熟期', count: 2800, percentage: 28.0 },
    { stage: '流失风险', count: 1100, percentage: 11.0 },
    { stage: '已流失', count: 500, percentage: 5.0 }
  ],
  channelPreference: [
    { name: '手机银行', count: 6500, percentage: 65.0 },
    { name: '网上银行', count: 2200, percentage: 22.0 },
    { name: '线下网点', count: 850, percentage: 8.5 },
    { name: '电话银行', count: 450, percentage: 4.5 }
  ]
};

// Time series data for customer metrics
export const customerTrends = {
  months: ['2023-06', '2023-07', '2023-08', '2023-09', '2023-10', '2023-11'],
  customerAcquisition: [320, 350, 380, 410, 440, 470],
  customerChurn: [120, 115, 125, 118, 130, 122],
  customerValue: [10200, 10500, 10800, 11200, 11500, 12000],
  productActivation: [1850, 1920, 2050, 2180, 2250, 2380]
};

// Customer behavior patterns
export const behaviorPatterns = [
  { id: 1, name: '高频交易', count: 2500, description: '月均交易次数超过20次的客户' },
  { id: 2, name: '夜间操作', count: 3200, description: '主要在晚上10点后使用银行服务的客户' },
  { id: 3, name: '多渠道用户', count: 4500, description: '同时使用3个以上服务渠道的客户' },
  { id: 4, name: '理财爱好者', count: 1800, description: '定期购买理财产品的客户' },
  { id: 5, name: '月初活跃', count: 3800, description: '月初1-5日活跃度最高的客户' },
  { id: 6, name: '长期储蓄', count: 2200, description: '拥有2年以上定期存款的客户' }
];

// Customer value matrix
export const valueMatrix = {
  axes: {
    x: { name: '客户价值', min: 0, max: 100 },
    y: { name: '客户忠诚度', min: 0, max: 100 }
  },
  segments: [
    { id: 1, name: '高价值高忠诚', x: [70, 100], y: [70, 100], color: '#4CAF50', customerCount: 2200 },
    { id: 2, name: '高价值低忠诚', x: [70, 100], y: [0, 70], color: '#FFC107', customerCount: 850 },
    { id: 3, name: '低价值高忠诚', x: [0, 70], y: [70, 100], color: '#2196F3', customerCount: 3500 },
    { id: 4, name: '低价值低忠诚', x: [0, 70], y: [0, 70], color: '#F44336', customerCount: 3450 }
  ],
  dataPoints: [
    // Sample customer data points
    { id: 1, customerId: '100001', value: 85, loyalty: 90, segment: 1 },
    { id: 2, customerId: '100002', value: 65, loyalty: 75, segment: 3 }
    // In a real scenario, this would include many more data points
  ]
};

export default {
  customerPortraits,
  portraitInsights,
  customerTrends,
  behaviorPatterns,
  valueMatrix
};

/**
 * Mock marketing campaign data for development and testing
 */

// Marketing campaigns
export const marketingCampaigns = [
  {
    id: 1,
    name: '大额存款专享礼',
    description: '针对大额存款客户的专属礼遇活动',
    type: '存款促销',
    status: 'active',
    startDate: '2023-11-01',
    endDate: '2023-12-31',
    targetGroups: [2, 5],
    targetCount: 5200,
    responseCount: 783,
    responseRate: 15.1,
    budget: 500000,
    ROI: 3.2,
    creator: '王五',
    channels: ['短信', '手机银行', '网点推广'],
    createdAt: '2023-10-15T09:25:32',
    updatedAt: '2023-11-28T14:35:21'
  },
  {
    id: 2,
    name: '信用卡消费返现',
    description: '信用卡消费满额返现活动',
    type: '信用卡促销',
    status: 'active',
    startDate: '2023-10-15',
    endDate: '2023-12-15',
    targetGroups: [1, 4],
    targetCount: 8500,
    responseCount: 2210,
    responseRate: 26.0,
    budget: 800000,
    ROI: 2.8,
    creator: '李四',
    channels: ['短信', '微信', '手机银行', 'APP推送'],
    createdAt: '2023-09-28T10:15:42',
    updatedAt: '2023-11-25T11:20:18'
  },
  {
    id: 3,
    name: '小微企业贷款优惠',
    description: '小微企业主专享贷款利率优惠',
    type: '贷款促销',
    status: 'planning',
    startDate: '2023-12-10',
    endDate: '2024-03-10',
    targetGroups: [3],
    targetCount: 1500,
    responseCount: 0,
    responseRate: 0,
    budget: 600000,
    ROI: 0,
    creator: '张三',
    channels: ['电话营销', '专属客户经理', '网点推广', '电子邮件'],
    createdAt: '2023-11-20T14:30:25',
    updatedAt: '2023-11-28T09:15:42'
  },
  {
    id: 4,
    name: '年终理财产品推广',
    description: '年末特别款理财产品推广活动',
    type: '理财产品',
    status: 'active',
    startDate: '2023-11-15',
    endDate: '2023-12-31',
    targetGroups: [1, 2, 5],
    targetCount: 6500,
    responseCount: 1320,
    responseRate: 20.3,
    budget: 1200000,
    ROI: 4.2,
    creator: '赵六',
    channels: ['手机银行', '网上银行', '短信', '微信', '专属客户经理'],
    createdAt: '2023-10-30T11:45:18',
    updatedAt: '2023-11-26T16:30:05'
  },
  {
    id: 5,
    name: '新客户开卡礼',
    description: '新客户开户送礼活动',
    type: '获客活动',
    status: 'inactive',
    startDate: '2023-09-01',
    endDate: '2023-10-31',
    targetGroups: [],
    targetCount: 10000,
    responseCount: 3250,
    responseRate: 32.5,
    budget: 750000,
    ROI: 2.1,
    creator: '张三',
    channels: ['线下推广', '社交媒体', 'APP推送'],
    createdAt: '2023-08-15T08:30:12',
    updatedAt: '2023-11-02T10:45:30'
  }
];

// Campaign performance metrics
export const campaignPerformance = {
  conversionRate: {
    labels: ['大额存款专享礼', '信用卡消费返现', '小微企业贷款优惠', '年终理财产品推广', '新客户开卡礼'],
    data: [15.1, 26.0, 0, 20.3, 32.5]
  },
  roi: {
    labels: ['大额存款专享礼', '信用卡消费返现', '小微企业贷款优惠', '年终理财产品推广', '新客户开卡礼'],
    data: [3.2, 2.8, 0, 4.2, 2.1]
  },
  responseByChannel: {
    channels: ['短信', '手机银行', '网点推广', '微信', 'APP推送', '电话营销', '专属客户经理', '电子邮件', '线下推广', '社交媒体'],
    data: [
      { name: '大额存款专享礼', data: [35, 42, 23, 0, 0, 0, 0, 0, 0, 0] },
      { name: '信用卡消费返现', data: [25, 30, 0, 28, 17, 0, 0, 0, 0, 0] },
      { name: '小微企业贷款优惠', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { name: '年终理财产品推广', data: [18, 25, 0, 22, 0, 0, 35, 0, 0, 0] },
      { name: '新客户开卡礼', data: [0, 0, 0, 0, 25, 0, 0, 0, 45, 30] }
    ]
  },
  timeSeriesResponse: {
    timePoints: [
      '2023-11-01', '2023-11-05', '2023-11-10', '2023-11-15', 
      '2023-11-20', '2023-11-25', '2023-11-30'
    ],
    campaigns: [
      {
        name: '大额存款专享礼',
        data: [50, 120, 210, 320, 480, 650, 783]
      },
      {
        name: '信用卡消费返现',
        data: [850, 1100, 1350, 1580, 1820, 2050, 2210]
      },
      {
        name: '年终理财产品推广',
        data: [0, 0, 0, 180, 450, 880, 1320]
      }
    ]
  }
};

// Marketing templates
export const marketingTemplates = [
  {
    id: 1,
    name: '节日促销模板',
    type: '节日活动',
    description: '适用于各类节日促销活动',
    popularity: 'high',
    channels: ['短信', '微信', '手机银行', 'APP推送'],
    targetFields: ['产品类型', '优惠力度', '活动时间'],
    content: '【{bankName}】尊敬的客户，{holidayName}好礼相送！{productType}专享{discount}优惠，活动期间{benefits}。详情请咨询{contactInfo}或登录手机银行查看。回T退订'
  },
  {
    id: 2,
    name: '生日祝福模板',
    type: '客户关怀',
    description: '客户生日祝福及专属优惠',
    popularity: 'medium',
    channels: ['短信', '电子邮件', '微信'],
    targetFields: ['客户称呼', '生日优惠', '有效期'],
    content: '【{bankName}】{customerName}，祝您生日快乐！作为我行尊贵客户，我们为您准备了{birthdayOffer}专属礼遇，有效期至{validDate}。详情咨询{contactInfo}。回T退订'
  },
  {
    id: 3,
    name: '产品更新通知模板',
    type: '产品通知',
    description: '通知客户产品更新或新功能',
    popularity: 'low',
    channels: ['短信', '电子邮件', 'APP推送'],
    targetFields: ['产品名称', '更新内容', '生效日期'],
    content: '【{bankName}】尊敬的{productName}用户，我们已于{effectiveDate}更新了{updateContent}。本次更新{benefitDescription}。详情请访问官网或登录手机银行APP查看。回T退订'
  },
  {
    id: 4,
    name: '客户回馈模板',
    type: '客户回馈',
    description: '长期客户专属回馈活动',
    popularity: 'high',
    channels: ['短信', '专属客户经理', '电子邮件'],
    targetFields: ['客户等级', '回馈内容', '活动期限'],
    content: '【{bankName}】尊敬的{customerTier}客户，感谢您{customerYears}年来对我们的支持与信任！特为您奉上{rewardDescription}，活动期限{activityPeriod}。详情请咨询您的客户经理或拨打{contactNumber}。回T退订'
  },
  {
    id: 5,
    name: '流失挽回模板',
    type: '客户挽留',
    description: '针对流失风险客户的挽回活动',
    popularity: 'medium',
    channels: ['短信', '电话营销', '专属客户经理'],
    targetFields: ['客户称呼', '特殊优惠', '有效期'],
    content: '【{bankName}】{customerName}，久未为您服务，我们深表歉意。为表诚意，特为您准备{specialOffer}专属优惠，有效期至{validDate}。如有任何需求，请联系{contactInfo}，我们竭诚为您服务！回T退订'
  }
];

// Marketing channel statistics
export const channelStats = [
  {
    channel: '短信',
    reachRate: 92.5,
    responseRate: 8.3,
    conversionRate: 2.1,
    costPerResponse: 12,
    bestTimeSlots: ['上午9-11点', '晚上7-9点']
  },
  {
    channel: '手机银行',
    reachRate: 88.2,
    responseRate: 12.7,
    conversionRate: 4.5,
    costPerResponse: 8,
    bestTimeSlots: ['中午12-2点', '晚上8-10点']
  },
  {
    channel: '微信',
    reachRate: 85.0,
    responseRate: 15.2,
    conversionRate: 3.8,
    costPerResponse: 7,
    bestTimeSlots: ['中午12-2点', '傍晚5-7点']
  },
  {
    channel: 'APP推送',
    reachRate: 78.5,
    responseRate: 10.5,
    conversionRate: 3.2,
    costPerResponse: 6,
    bestTimeSlots: ['早上7-9点', '晚上9-11点']
  },
  {
    channel: '电子邮件',
    reachRate: 65.3,
    responseRate: 5.2,
    conversionRate: 1.8,
    costPerResponse: 15,
    bestTimeSlots: ['上午10-12点', '下午3-5点']
  },
  {
    channel: '专属客户经理',
    reachRate: 95.8,
    responseRate: 45.2,
    conversionRate: 22.5,
    costPerResponse: 120,
    bestTimeSlots: ['工作日上午', '工作日下午']
  }
];

// AI-Based marketing recommendations
export const aiRecommendations = [
  {
    targetGroup: '高净值年轻客户',
    topProducts: ['高端理财产品', '私人银行服务', '高端信用卡'],
    bestChannels: ['专属客户经理', '手机银行', '微信'],
    bestTiming: '月末/季末',
    messagingTips: '强调专属性和高端体验，注重数字化和便捷服务',
    potentialROI: 5.2,
    confidence: 0.87
  },
  {
    targetGroup: '养老理财客户',
    topProducts: ['稳健型理财产品', '养老保障计划', '健康管理服务'],
    bestChannels: ['专属客户经理', '短信', '网点服务'],
    bestTiming: '每月初',
    messagingTips: '强调安全性和稳定收益，提供清晰简单的产品说明',
    potentialROI: 3.8,
    confidence: 0.92
  },
  {
    targetGroup: '小微企业主',
    topProducts: ['经营贷款', '结算服务', '企业理财'],
    bestChannels: ['专属客户经理', '电子邮件', '电话营销'],
    bestTiming: '季度初',
    messagingTips: '强调融资便利性和资金效率，提供一站式企业金融解决方案',
    potentialROI: 4.5,
    confidence: 0.85
  },
  {
    targetGroup: '年轻职场人士',
    topProducts: ['信用卡', '消费贷款', '便捷支付服务'],
    bestChannels: ['APP推送', '微信', '手机银行'],
    bestTiming: '发薪日前后',
    messagingTips: '强调便利性和即时性，运用年轻化语言和创新互动形式',
    potentialROI: 3.2,
    confidence: 0.90
  },
  {
    targetGroup: '即将退休客户',
    topProducts: ['养老储蓄', '稳健型理财', '财富传承规划'],
    bestChannels: ['专属客户经理', '短信', '网点服务'],
    bestTiming: '政策调整期',
    messagingTips: '强调财富保值和传承，提供专业财务规划建议',
    potentialROI: 4.0,
    confidence: 0.88
  }
];

export default {
  marketingCampaigns,
  campaignPerformance,
  marketingTemplates,
  channelStats,
  aiRecommendations
};

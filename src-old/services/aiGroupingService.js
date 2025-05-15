// 智能分群AI服务
// 模拟实现，实际项目中应该连接到后端AI服务

// 业务目标映射到分群模板
const BUSINESS_GOAL_TEMPLATES = {
  HIGH_VALUE: 'high_value_customers',  // 高价值客户
  CHURN_RISK: 'churn_risk',            // 流失风险客户
  CROSS_SELL: 'cross_sell',            // 交叉销售潜力客户
  UP_SELL: 'up_sell',                  // 升级潜力客户
  ACQUISITION: 'acquisition',          // 获客目标客户
  ACTIVATION: 'activation',            // 激活目标客户
  RETENTION: 'retention',              // 挽留目标客户
  LOYALTY: 'loyalty',                  // 忠诚度提升客户
  CUSTOM: 'custom'                     // 自定义分群
};

// 自然语言分析服务，将自然语言转换为查询条件
export const analyzeNaturalLanguageQuery = async (query) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 这里模拟自然语言处理，实际项目中应该调用NLP服务
  // 简单模拟一些关键词匹配
  const conditions = [];
  
  if (query.includes('高价值')) {
    conditions.push({
      field: '客户价值',
      operator: '大于',
      value: '80'
    });
  }
  
  if (query.includes('流失风险')) {
    conditions.push({
      field: '流失风险评分',
      operator: '大于',
      value: '60'
    });
  }
  
  if (query.includes('最近3个月') || query.includes('最近三个月')) {
    conditions.push({
      field: '时间范围',
      operator: '最近',
      value: '90',
      unit: '天'
    });
  }
  
  if (query.includes('消费增长')) {
    conditions.push({
      field: '消费增长率',
      operator: '大于',
      value: '10',
      unit: '%'
    });
  }
  
  // 如果没有匹配到任何关键词，返回一个默认条件
  if (conditions.length === 0) {
    conditions.push({
      field: '新条件',
      operator: '等于',
      value: '0'
    });
  }
  
  return conditions;
};

// 获取可用的业务目标选项
export const getBusinessGoals = async () => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: BUSINESS_GOAL_TEMPLATES.HIGH_VALUE,
      name: '高价值客户识别',
      description: '识别对企业贡献最大的客户群体',
      icon: 'crown',
      tags: ['客户价值', '消费能力', '产品持有', '活跃度']
    },
    {
      id: BUSINESS_GOAL_TEMPLATES.CHURN_RISK,
      name: '流失风险客户挽留',
      description: '识别有流失风险的高价值客户',
      icon: 'disconnect',
      tags: ['流失风险', '活跃度变化', '客户价值', '投诉历史']
    },
    {
      id: BUSINESS_GOAL_TEMPLATES.CROSS_SELL,
      name: '交叉销售潜力客户',
      description: '识别适合产品交叉销售的客户',
      icon: 'interaction',
      tags: ['产品偏好', '购买力', '生命周期', '渠道活跃度']
    },
    {
      id: BUSINESS_GOAL_TEMPLATES.UP_SELL,
      name: '产品升级潜力客户',
      description: '识别有产品升级潜力的客户',
      icon: 'rise',
      tags: ['资产规模', '产品使用', '消费能力', '价值提升潜力']
    },
    {
      id: BUSINESS_GOAL_TEMPLATES.ACQUISITION,
      name: '精准获客目标群体',
      description: '识别与现有高价值客户相似的潜在客户',
      icon: 'usergroup-add',
      tags: ['相似度模型', '获客成本', '转化概率', '生命周期价值']
    },
    {
      id: BUSINESS_GOAL_TEMPLATES.ACTIVATION,
      name: '客户激活目标群体',
      description: '识别可被重新激活的沉默客户',
      icon: 'thunderbolt',
      tags: ['沉默期限', '历史活跃度', '产品持有', '营销响应率']
    },
    {
      id: BUSINESS_GOAL_TEMPLATES.RETENTION,
      name: '客户保持目标群体',
      description: '识别需要重点保持关系的客户群体',
      icon: 'heart',
      tags: ['客户价值', '关系年限', '产品使用', '互动频率']
    },
    {
      id: BUSINESS_GOAL_TEMPLATES.LOYALTY,
      name: '忠诚度提升目标群体',
      description: '识别适合提升忠诚度的客户群体',
      icon: 'like',
      tags: ['客户满意度', '推荐意愿', '品牌认同', '活跃度']
    },
    {
      id: BUSINESS_GOAL_TEMPLATES.CUSTOM,
      name: '自定义业务目标',
      description: '根据自定义条件创建客户群体',
      icon: 'edit',
      tags: ['自定义标签', '自定义规则', '自定义模型']
    }
  ];
};

// 根据业务目标获取推荐标签
export const getRecommendedTags = async (businessGoalId) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 基础标签（所有业务目标都会用到）
  const baseTags = [
    { id: 'tag001', name: '客户ID', type: 'id', required: true, selected: true },
    { id: 'tag002', name: '客户状态', type: 'basic', required: true, selected: true },
    { id: 'tag003', name: '开户时间', type: 'basic', required: true, selected: true }
  ];
  
  // 根据业务目标返回不同的标签集
  let goalSpecificTags = [];
  
  switch (businessGoalId) {
    case BUSINESS_GOAL_TEMPLATES.HIGH_VALUE:
      goalSpecificTags = [
        { id: 'tag101', name: '客户价值评分', type: 'derived', required: true, selected: true },
        { id: 'tag102', name: '资产规模', type: 'basic', required: false, selected: true },
        { id: 'tag103', name: '月均交易金额', type: 'behavioral', required: false, selected: true },
        { id: 'tag104', name: '产品持有数', type: 'derived', required: false, selected: true },
        { id: 'tag105', name: '客户贡献度', type: 'derived', required: true, selected: true },
        { id: 'tag106', name: '活跃度', type: 'behavioral', required: false, selected: true },
        { id: 'tag107', name: '客户生命周期价值', type: 'derived', required: false, selected: true },
        { id: 'tag108', name: '成长潜力', type: 'derived', required: false, selected: false }
      ];
      break;
      
    case BUSINESS_GOAL_TEMPLATES.CHURN_RISK:
      goalSpecificTags = [
        { id: 'tag201', name: '流失风险评分', type: 'derived', required: true, selected: true },
        { id: 'tag202', name: '活跃度变化', type: 'behavioral', required: true, selected: true },
        { id: 'tag203', name: '交易频次下降率', type: 'behavioral', required: false, selected: true },
        { id: 'tag204', name: '客户价值评分', type: 'derived', required: true, selected: true },
        { id: 'tag205', name: '投诉历史', type: 'behavioral', required: false, selected: true },
        { id: 'tag206', name: '产品退订率', type: 'behavioral', required: false, selected: true },
        { id: 'tag207', name: '最近登录时间', type: 'behavioral', required: false, selected: true },
        { id: 'tag208', name: '竞品使用情况', type: 'external', required: false, selected: false }
      ];
      break;
      
    case BUSINESS_GOAL_TEMPLATES.CROSS_SELL:
      goalSpecificTags = [
        { id: 'tag301', name: '产品偏好', type: 'behavioral', required: true, selected: true },
        { id: 'tag302', name: '购买力', type: 'derived', required: true, selected: true },
        { id: 'tag303', name: '产品持有情况', type: 'basic', required: true, selected: true },
        { id: 'tag304', name: '渠道偏好', type: 'behavioral', required: false, selected: true },
        { id: 'tag305', name: '营销响应概率', type: 'derived', required: false, selected: true },
        { id: 'tag306', name: '生命周期阶段', type: 'derived', required: false, selected: true },
        { id: 'tag307', name: '相关产品购买意向', type: 'derived', required: false, selected: true },
        { id: 'tag308', name: '客户价值评分', type: 'derived', required: false, selected: false }
      ];
      break;
      
    // 可以添加更多业务目标的标签集...
    
    default:
      goalSpecificTags = [
        { id: 'tag901', name: '客户分群', type: 'derived', required: false, selected: true },
        { id: 'tag902', name: '客户标签', type: 'derived', required: false, selected: true }
      ];
  }
  
  return [...baseTags, ...goalSpecificTags];
};

// 生成智能分群
export const generateIntelligentGroup = async (params) => {
  const { businessGoalId, selectedTags, dataRange, additionalFilters } = params;
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // 返回分群结果和洞察
  return {
    groupId: `group_${Date.now()}`,
    groupName: getGroupName(businessGoalId),
    customerCount: getCustomerCount(businessGoalId),
    coverage: getCoverage(businessGoalId),
    businessValue: getBusinessValue(businessGoalId),
    
    // 分群特征
    groupCharacteristics: getGroupCharacteristics(businessGoalId),
    
    // 分群统计
    statistics: getGroupStatistics(businessGoalId),
    
    // 客户示例
    customerSamples: getCustomerSamples(businessGoalId),
    
    // 业务洞察
    businessInsights: getBusinessInsights(businessGoalId),
    
    // 行动建议
    actionRecommendations: getActionRecommendations(businessGoalId)
  };
};

// 以下是辅助函数，用于生成模拟数据

// 获取分群名称
const getGroupName = (businessGoalId) => {
  const nameMap = {
    [BUSINESS_GOAL_TEMPLATES.HIGH_VALUE]: '高价值客户群',
    [BUSINESS_GOAL_TEMPLATES.CHURN_RISK]: '流失风险客户群',
    [BUSINESS_GOAL_TEMPLATES.CROSS_SELL]: '交叉销售潜力客户群',
    [BUSINESS_GOAL_TEMPLATES.UP_SELL]: '产品升级潜力客户群',
    [BUSINESS_GOAL_TEMPLATES.ACQUISITION]: '精准获客目标群',
    [BUSINESS_GOAL_TEMPLATES.ACTIVATION]: '待激活客户群',
    [BUSINESS_GOAL_TEMPLATES.RETENTION]: '核心保持客户群',
    [BUSINESS_GOAL_TEMPLATES.LOYALTY]: '忠诚度提升目标群',
    [BUSINESS_GOAL_TEMPLATES.CUSTOM]: '自定义客户群'
  };
  
  return nameMap[businessGoalId] || '智能客户群';
};

// 获取客户数量
const getCustomerCount = (businessGoalId) => {
  const countRanges = {
    [BUSINESS_GOAL_TEMPLATES.HIGH_VALUE]: [5000, 8000],
    [BUSINESS_GOAL_TEMPLATES.CHURN_RISK]: [3000, 5000],
    [BUSINESS_GOAL_TEMPLATES.CROSS_SELL]: [10000, 15000],
    [BUSINESS_GOAL_TEMPLATES.UP_SELL]: [8000, 12000],
    [BUSINESS_GOAL_TEMPLATES.ACQUISITION]: [20000, 30000],
    [BUSINESS_GOAL_TEMPLATES.ACTIVATION]: [15000, 25000],
    [BUSINESS_GOAL_TEMPLATES.RETENTION]: [7000, 10000],
    [BUSINESS_GOAL_TEMPLATES.LOYALTY]: [5000, 9000],
    [BUSINESS_GOAL_TEMPLATES.CUSTOM]: [3000, 7000]
  };
  
  const range = countRanges[businessGoalId] || [5000, 10000];
  return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
};

// 获取覆盖率
const getCoverage = (businessGoalId) => {
  const coverageRanges = {
    [BUSINESS_GOAL_TEMPLATES.HIGH_VALUE]: [5, 10],
    [BUSINESS_GOAL_TEMPLATES.CHURN_RISK]: [3, 8],
    [BUSINESS_GOAL_TEMPLATES.CROSS_SELL]: [10, 20],
    [BUSINESS_GOAL_TEMPLATES.UP_SELL]: [8, 15],
    [BUSINESS_GOAL_TEMPLATES.ACQUISITION]: [15, 25],
    [BUSINESS_GOAL_TEMPLATES.ACTIVATION]: [12, 20],
    [BUSINESS_GOAL_TEMPLATES.RETENTION]: [6, 12],
    [BUSINESS_GOAL_TEMPLATES.LOYALTY]: [5, 10],
    [BUSINESS_GOAL_TEMPLATES.CUSTOM]: [2, 8]
  };
  
  const range = coverageRanges[businessGoalId] || [5, 15];
  return (Math.random() * (range[1] - range[0]) + range[0]).toFixed(1);
};

// 获取业务价值
const getBusinessValue = (businessGoalId) => {
  const valueRanges = {
    [BUSINESS_GOAL_TEMPLATES.HIGH_VALUE]: [80, 95],
    [BUSINESS_GOAL_TEMPLATES.CHURN_RISK]: [75, 90],
    [BUSINESS_GOAL_TEMPLATES.CROSS_SELL]: [70, 85],
    [BUSINESS_GOAL_TEMPLATES.UP_SELL]: [75, 90],
    [BUSINESS_GOAL_TEMPLATES.ACQUISITION]: [65, 80],
    [BUSINESS_GOAL_TEMPLATES.ACTIVATION]: [60, 80],
    [BUSINESS_GOAL_TEMPLATES.RETENTION]: [70, 85],
    [BUSINESS_GOAL_TEMPLATES.LOYALTY]: [75, 90],
    [BUSINESS_GOAL_TEMPLATES.CUSTOM]: [60, 75]
  };
  
  const range = valueRanges[businessGoalId] || [60, 80];
  return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
};

// 获取分群特征
const getGroupCharacteristics = (businessGoalId) => {
  switch (businessGoalId) {
    case BUSINESS_GOAL_TEMPLATES.HIGH_VALUE:
      return [
        { name: '客户价值评分', value: '≥ 85分', importance: 95 },
        { name: '资产规模', value: '≥ 50万元', importance: 90 },
        { name: '月均交易金额', value: '≥ 2万元', importance: 85 },
        { name: '产品持有数', value: '≥ 3个', importance: 80 },
        { name: '活跃度', value: '高', importance: 75 }
      ];
      
    case BUSINESS_GOAL_TEMPLATES.CHURN_RISK:
      return [
        { name: '流失风险评分', value: '≥ 70分', importance: 95 },
        { name: '活跃度变化', value: '下降', importance: 90 },
        { name: '交易频次下降率', value: '≥ 40%', importance: 85 },
        { name: '客户价值评分', value: '≥ 75分', importance: 80 },
        { name: '最近登录时间', value: '≥ 30天', importance: 75 }
      ];
      
    case BUSINESS_GOAL_TEMPLATES.CROSS_SELL:
      return [
        { name: '产品偏好', value: '理财型', importance: 90 },
        { name: '购买力', value: '中高', importance: 85 },
        { name: '产品持有情况', value: '存款+2个以上产品', importance: 80 },
        { name: '营销响应概率', value: '≥ 15%', importance: 75 },
        { name: '生命周期阶段', value: '成长期/成熟期', importance: 70 }
      ];
      
    // 其他业务目标的特征...
    
    default:
      return [
        { name: '特征1', value: '值1', importance: 90 },
        { name: '特征2', value: '值2', importance: 85 },
        { name: '特征3', value: '值3', importance: 80 }
      ];
  }
};

// 获取分群统计
const getGroupStatistics = (businessGoalId) => {
  // 根据不同业务目标返回不同的统计数据
  switch (businessGoalId) {
    case BUSINESS_GOAL_TEMPLATES.HIGH_VALUE:
      return {
        // 年龄分布
        ageDist: [
          { name: '25岁以下', value: 5 },
          { name: '25-35岁', value: 25 },
          { name: '36-45岁', value: 40 },
          { name: '46-55岁', value: 20 },
          { name: '55岁以上', value: 10 }
        ],
        // 性别分布
        genderDist: [
          { name: '男', value: 65 },
          { name: '女', value: 35 }
        ],
        // 资产分布
        assetDist: [
          { name: '50-100万', value: 40 },
          { name: '100-300万', value: 35 },
          { name: '300-500万', value: 15 },
          { name: '500万以上', value: 10 }
        ],
        // 产品持有
        productDist: [
          { name: '存款', value: 100 },
          { name: '理财', value: 85 },
          { name: '基金', value: 65 },
          { name: '保险', value: 50 },
          { name: '信用卡', value: 70 },
          { name: '贷款', value: 45 }
        ]
      };
      
    case BUSINESS_GOAL_TEMPLATES.CHURN_RISK:
      return {
        // 流失风险等级分布
        riskLevelDist: [
          { name: '极高风险', value: 15 },
          { name: '高风险', value: 40 },
          { name: '中等风险', value: 35 },
          { name: '低风险', value: 10 }
        ],
        // 账户活跃度下降幅度
        activityDropDist: [
          { name: '轻微', value: 10 },
          { name: '中等', value: 30 },
          { name: '显著', value: 45 },
          { name: '严重', value: 15 }
        ],
        // 客户价值分布
        valueDist: [
          { name: '超高价值', value: 30 },
          { name: '高价值', value: 45 },
          { name: '中价值', value: 20 },
          { name: '一般价值', value: 5 }
        ],
        // 主要流失原因
        churnReasonDist: [
          { name: '竞品吸引', value: 35 },
          { name: '服务不满', value: 25 },
          { name: '价格因素', value: 20 },
          { name: '需求变化', value: 15 },
          { name: '其他原因', value: 5 }
        ]
      };
      
    // 其他业务目标的统计...
    
    default:
      return {
        distribution1: [
          { name: '类别1', value: 40 },
          { name: '类别2', value: 30 },
          { name: '类别3', value: 20 },
          { name: '类别4', value: 10 }
        ],
        distribution2: [
          { name: '类别A', value: 55 },
          { name: '类别B', value: 45 }
        ]
      };
  }
};

// 获取客户示例
const getCustomerSamples = (businessGoalId) => {
  // 生成5个示例客户
  const samples = [];
  
  for (let i = 1; i <= 5; i++) {
    // 根据业务目标生成不同的示例客户
    switch (businessGoalId) {
      case BUSINESS_GOAL_TEMPLATES.HIGH_VALUE:
        samples.push({
          id: `HV10000${i}`,
          name: `客户${i}`,
          avatar: `avatar${i}.jpg`,
          value: Math.floor(Math.random() * 10 + 90),
          assets: `${(Math.random() * 450 + 50).toFixed(0)}万`,
          products: Math.floor(Math.random() * 3 + 3),
          activity: '高',
          lastTransaction: `${Math.floor(Math.random() * 7 + 1)}天前`
        });
        break;
        
      case BUSINESS_GOAL_TEMPLATES.CHURN_RISK:
        samples.push({
          id: `CR20000${i}`,
          name: `客户${i}`,
          avatar: `avatar${i}.jpg`,
          riskScore: Math.floor(Math.random() * 15 + 75),
          value: Math.floor(Math.random() * 10 + 80),
          activityDrop: `${Math.floor(Math.random() * 30 + 40)}%`,
          lastLogin: `${Math.floor(Math.random() * 20 + 30)}天前`,
          reason: i % 2 === 0 ? '竞品吸引' : '服务不满'
        });
        break;
        
      // 其他业务目标的客户示例...
      
      default:
        samples.push({
          id: `CU90000${i}`,
          name: `客户${i}`,
          avatar: `avatar${i}.jpg`,
          property1: `值${i}`,
          property2: `值${Math.floor(Math.random() * 100)}`
        });
    }
  }
  
  return samples;
};

// 获取业务洞察
const getBusinessInsights = (businessGoalId) => {
  switch (businessGoalId) {
    case BUSINESS_GOAL_TEMPLATES.HIGH_VALUE:
      return [
        '该客群贡献了全行36%的利润，是核心价值客群',
        '客群中85%的客户同时持有理财和保险产品，交叉销售效果显著',
        '相比普通客群，该客群对高端增值服务的需求高出3倍',
        '客群中40%的客户同时是企业主，存在公私联动机会',
        '客群中的年轻客户（45岁以下）增长速度快于平均水平'
      ];
      
    case BUSINESS_GOAL_TEMPLATES.CHURN_RISK:
      return [
        '该客群流失将导致年均收入损失约1.8亿元',
        '客群中68%的客户在过去3个月交易频次显著下降',
        '32%的客户已经开始使用竞争对手的同类产品',
        '客户投诉处理满意度低于平均水平25%',
        '30%的客户最近一次营销活动未响应，高于历史水平'
      ];
      
    // 其他业务目标的洞察...
    
    default:
      return [
        '业务洞察1',
        '业务洞察2',
        '业务洞察3'
      ];
  }
};

// 获取行动建议
const getActionRecommendations = (businessGoalId) => {
  switch (businessGoalId) {
    case BUSINESS_GOAL_TEMPLATES.HIGH_VALUE:
      return [
        {
          title: '专属增值服务',
          description: '为高价值客户提供专属理财顾问和增值服务，提升客户体验',
          expectedEffect: '提高客户满意度15%，增加产品持有量',
          priority: 'high'
        },
        {
          title: '个性化产品组合',
          description: '基于客户资产情况和风险偏好，推荐个性化产品组合',
          expectedEffect: '提高产品渗透率18%，增加客户贡献度',
          priority: 'high'
        },
        {
          title: '客户关系维护',
          description: '定期高管拜访和专属活动邀请，维护客户关系',
          expectedEffect: '提高客户忠诚度，减少流失率',
          priority: 'medium'
        }
      ];
      
    case BUSINESS_GOAL_TEMPLATES.CHURN_RISK:
      return [
        {
          title: '客户挽留计划',
          description: '针对高价值流失风险客户，实施专属挽留方案，包括专人服务和专属优惠',
          expectedEffect: '降低流失率35%，挽回约1.8亿元年收入',
          priority: 'high'
        },
        {
          title: '客户问题排查',
          description: '深入分析客户投诉和问题，进行针对性解决',
          expectedEffect: '提高客户满意度25%，减少投诉率',
          priority: 'high'
        },
        {
          title: '产品体验优化',
          description: '根据客户反馈优化产品体验，提高产品竞争力',
          expectedEffect: '提升产品使用率20%，减少客户流失',
          priority: 'medium'
        }
      ];
      
    // 其他业务目标的建议...
    
    default:
      return [
        {
          title: '行动建议1',
          description: '建议描述1',
          expectedEffect: '预期效果1',
          priority: 'high'
        },
        {
          title: '行动建议2',
          description: '建议描述2',
          expectedEffect: '预期效果2',
          priority: 'medium'
        }
      ];
  }
};

// 获取分群洞察
export const getGroupInsights = async (groupId) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 返回分群洞察
  return [
    {
      type: 'profile',
      title: '用户画像特征',
      content: '该群体主要为25-35岁的年轻白领，消费能力强，对品质要求高，但近期访问频次明显下降。'
    },
    {
      type: 'behavior',
      title: '行为特征',
      content: '平均每月访问次数：5.8次，平均停留时间：15分钟，主要访问时间段：20:00-22:00。'
    },
    {
      type: 'trend',
      title: '发展趋势',
      content: '该群体规模较上季度增长15%，但客单价略有下降，消费频次保持稳定。'
    },
    {
      type: 'action',
      title: '营销建议',
      content: '建议通过个性化推送高品质新品信息，并提供专属优惠券，提升用户活跃度。'
    }
  ];
};

// 获取相似分群
export const getSimilarGroups = async (groupId) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // 返回相似分群列表
  return [
    {
      id: 'sg001',
      name: '高消费低频次用户',
      description: '近90天内消费金额高但访问频次低的用户',
      matchRate: 89,
      customerCount: 9872
    },
    {
      id: 'sg002',
      name: '潜在流失用户',
      description: '有流失风险的高价值用户',
      matchRate: 76,
      customerCount: 12560
    },
    {
      id: 'sg003',
      name: '高成长潜力用户',
      description: '消费增长率高的中价值用户',
      matchRate: 68,
      customerCount: 18340
    }
  ];
}; 
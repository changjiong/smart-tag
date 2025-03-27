// 标签生成AI服务
// 模拟版本，实际项目中应该连接到后端AI服务

// 从业务需求生成标签
export const generateTagsFromRequirements = async (input) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const { businessRequirement, businessDomain } = input;
  
  // 将需求转换为小写以便匹配
  const lowerReq = businessRequirement.toLowerCase();
  
  // 根据业务需求和领域动态生成不同的标签
  let tags = [];
  
  // 不同业务领域的基础标签集
  const baseTags = {
    retail: [
      {
        id: 'base_retail_001',
        name: '零售客户分层',
        code: 'RETAIL_LAYER',
        type: 'basic',
        dataType: '枚举型',
        description: '根据客户资产、贡献度等维度划分的客户层级',
        coverage: 98,
        accuracy: 95,
        timeliness: 99,
        updateFrequency: '日更新',
        dataSource: '核心系统',
        distributionDesc: '金字塔分布',
        isRecommended: true
      },
      {
        id: 'base_retail_002',
        name: '客户年龄段',
        code: 'CUST_AGE_RANGE',
        type: 'basic',
        dataType: '枚举型',
        description: '客户年龄区间划分',
        coverage: 92,
        accuracy: 100,
        timeliness: 100,
        updateFrequency: '月更新',
        dataSource: '客户信息表',
        distributionDesc: '正态分布',
        isRecommended: false
      }
    ],
    corporate: [
      {
        id: 'base_corp_001',
        name: '企业规模',
        code: 'ENT_SIZE',
        type: 'basic',
        dataType: '枚举型',
        description: '根据注册资本、员工数等划分的企业规模',
        coverage: 95,
        accuracy: 90,
        timeliness: 85,
        updateFrequency: '季更新',
        dataSource: '企业信息库',
        distributionDesc: '金字塔分布',
        isRecommended: true
      },
      {
        id: 'base_corp_002',
        name: '行业类别',
        code: 'INDUSTRY_TYPE',
        type: 'basic',
        dataType: '枚举型',
        description: '企业所属行业分类',
        coverage: 99,
        accuracy: 94,
        timeliness: 90,
        updateFrequency: '季更新',
        dataSource: '企业信息库',
        distributionDesc: '多峰分布',
        isRecommended: false
      }
    ],
    risk: [
      {
        id: 'base_risk_001',
        name: '风险评级',
        code: 'RISK_RATING',
        type: 'basic',
        dataType: '枚举型',
        description: '客户风险等级评估结果',
        coverage: 99,
        accuracy: 98,
        timeliness: 95,
        updateFrequency: '日更新',
        dataSource: '风控系统',
        distributionDesc: '正态分布',
        isRecommended: true
      },
      {
        id: 'base_risk_002',
        name: '信用评分',
        code: 'CREDIT_SCORE',
        type: 'basic',
        dataType: '数值型',
        description: '综合评估的客户信用分数',
        coverage: 85,
        accuracy: 92,
        timeliness: 88,
        updateFrequency: '周更新',
        dataSource: '征信系统',
        distributionDesc: '正态分布',
        isRecommended: false
      }
    ],
    service: [
      {
        id: 'base_serv_001',
        name: '服务偏好',
        code: 'SERV_PREF',
        type: 'basic',
        dataType: '枚举型',
        description: '客户对服务渠道的偏好',
        coverage: 78,
        accuracy: 85,
        timeliness: 80,
        updateFrequency: '月更新',
        dataSource: '交易系统',
        distributionDesc: '多峰分布',
        isRecommended: true
      },
      {
        id: 'base_serv_002',
        name: '投诉历史',
        code: 'COMPLAINT_HIST',
        type: 'basic',
        dataType: '布尔型',
        description: '客户是否有投诉历史',
        coverage: 100,
        accuracy: 100,
        timeliness: 95,
        updateFrequency: '日更新',
        dataSource: '客服系统',
        distributionDesc: '二项分布',
        isRecommended: false
      }
    ],
    operations: [
      {
        id: 'base_ops_001',
        name: '渠道活跃度',
        code: 'CHANNEL_ACTIVENESS',
        type: 'basic',
        dataType: '数值型',
        description: '客户在各渠道的活跃程度',
        coverage: 96,
        accuracy: 90,
        timeliness: 97,
        updateFrequency: '日更新',
        dataSource: '交易系统',
        distributionDesc: '偏态分布',
        isRecommended: true
      },
      {
        id: 'base_ops_002',
        name: '登录频率',
        code: 'LOGIN_FREQ',
        type: 'basic',
        dataType: '数值型',
        description: '客户登录系统的频率',
        coverage: 100,
        accuracy: 100,
        timeliness: 100,
        updateFrequency: '实时',
        dataSource: '登录日志',
        distributionDesc: '偏态分布',
        isRecommended: false
      }
    ]
  };
  
  // 添加基础标签
  if (baseTags[businessDomain]) {
    tags = [...baseTags[businessDomain]];
  }
  
  // 根据具体需求添加特定标签
  if (lowerReq.includes('高价值') || lowerReq.includes('价值')) {
    tags.push({
      id: 'derived_value_001',
      name: '客户价值评分',
      code: 'CUST_VALUE_SCORE',
      type: 'derived',
      dataType: '数值型',
      description: '综合资产、贡献、潜力等维度计算的客户价值评分',
      coverage: 96,
      accuracy: 88,
      timeliness: 92,
      updateFrequency: '周更新',
      dataSource: '数据仓库',
      distributionDesc: '正态分布',
      isRecommended: true
    });
    
    tags.push({
      id: 'derived_value_002',
      name: '价值等级',
      code: 'VALUE_LEVEL',
      type: 'derived',
      dataType: '枚举型',
      description: '基于价值评分划分的客户价值等级',
      coverage: 96,
      accuracy: 88,
      timeliness: 92,
      updateFrequency: '周更新',
      dataSource: '数据仓库',
      distributionDesc: '金字塔分布',
      isRecommended: true
    });
    
    tags.push({
      id: 'derived_value_003',
      name: '价值增长潜力',
      code: 'VALUE_POTENTIAL',
      type: 'derived',
      dataType: '枚举型',
      description: '客户价值的未来增长潜力预测',
      coverage: 80,
      accuracy: 75,
      timeliness: 85,
      updateFrequency: '月更新',
      dataSource: '模型预测',
      distributionDesc: '正态分布',
      isRecommended: true
    });
  }
  
  if (lowerReq.includes('营销') || lowerReq.includes('推荐')) {
    tags.push({
      id: 'derived_mkt_001',
      name: '营销响应概率',
      code: 'MKT_RESP_PROB',
      type: 'derived',
      dataType: '数值型',
      description: '客户对营销活动响应的概率预测',
      coverage: 92,
      accuracy: 82,
      timeliness: 90,
      updateFrequency: '周更新',
      dataSource: '模型预测',
      distributionDesc: '偏态分布',
      isRecommended: true
    });
    
    tags.push({
      id: 'derived_mkt_002',
      name: '产品偏好',
      code: 'PROD_PREF',
      type: 'behavioral',
      dataType: '集合型',
      description: '基于历史行为分析的客户产品偏好',
      coverage: 85,
      accuracy: 88,
      timeliness: 92,
      updateFrequency: '周更新',
      dataSource: '交易系统',
      distributionDesc: '多峰分布',
      isRecommended: true
    });
    
    tags.push({
      id: 'derived_mkt_003',
      name: '最佳触达时间',
      code: 'BEST_CONTACT_TIME',
      type: 'behavioral',
      dataType: '枚举型',
      description: '客户最容易响应营销的时间段',
      coverage: 78,
      accuracy: 80,
      timeliness: 85,
      updateFrequency: '月更新',
      dataSource: '模型预测',
      distributionDesc: '多峰分布',
      isRecommended: true
    });
  }
  
  if (lowerReq.includes('流失') || lowerReq.includes('挽留')) {
    tags.push({
      id: 'derived_churn_001',
      name: '流失风险评分',
      code: 'CHURN_RISK_SCORE',
      type: 'derived',
      dataType: '数值型',
      description: '客户流失可能性的预测评分',
      coverage: 94,
      accuracy: 86,
      timeliness: 90,
      updateFrequency: '日更新',
      dataSource: '模型预测',
      distributionDesc: '偏态分布',
      isRecommended: true
    });
    
    tags.push({
      id: 'derived_churn_002',
      name: '流失原因类型',
      code: 'CHURN_REASON_TYPE',
      type: 'derived',
      dataType: '枚举型',
      description: '预测的客户可能流失的主要原因',
      coverage: 85,
      accuracy: 78,
      timeliness: 88,
      updateFrequency: '周更新',
      dataSource: '模型预测',
      distributionDesc: '离散分布',
      isRecommended: true
    });
    
    tags.push({
      id: 'derived_churn_003',
      name: '活跃度变化',
      code: 'ACTIVENESS_CHANGE',
      type: 'behavioral',
      dataType: '枚举型',
      description: '客户近期活跃度的变化趋势',
      coverage: 96,
      accuracy: 92,
      timeliness: 95,
      updateFrequency: '日更新',
      dataSource: '交易系统',
      distributionDesc: '正态分布',
      isRecommended: true
    });
  }
  
  if (lowerReq.includes('风险') || lowerReq.includes('信用')) {
    tags.push({
      id: 'derived_risk_001',
      name: '违约概率',
      code: 'DEFAULT_PROB',
      type: 'derived',
      dataType: '数值型',
      description: '客户发生违约的概率预测',
      coverage: 90,
      accuracy: 85,
      timeliness: 92,
      updateFrequency: '日更新',
      dataSource: '模型预测',
      distributionDesc: '偏态分布',
      isRecommended: true
    });
    
    tags.push({
      id: 'derived_risk_002',
      name: '异常行为评分',
      code: 'ANOMALY_SCORE',
      type: 'behavioral',
      dataType: '数值型',
      description: '客户交易行为的异常程度评分',
      coverage: 98,
      accuracy: 90,
      timeliness: 99,
      updateFrequency: '实时',
      dataSource: '风控系统',
      distributionDesc: '偏态分布',
      isRecommended: true
    });
    
    tags.push({
      id: 'derived_risk_003',
      name: '欺诈风险等级',
      code: 'FRAUD_RISK_LEVEL',
      type: 'derived',
      dataType: '枚举型',
      description: '客户可能存在欺诈行为的风险等级',
      coverage: 95,
      accuracy: 88,
      timeliness: 96,
      updateFrequency: '实时',
      dataSource: '风控系统',
      distributionDesc: '偏态分布',
      isRecommended: true
    });
  }
  
  // 如果没有匹配到特定需求，添加一些通用标签
  if (tags.length <= 2) {
    tags.push({
      id: 'general_001',
      name: '活跃度分级',
      code: 'ACTIVITY_LEVEL',
      type: 'behavioral',
      dataType: '枚举型',
      description: '根据交易频次、登录次数等综合评定的活跃度等级',
      coverage: 100,
      accuracy: 95,
      timeliness: 98,
      updateFrequency: '周更新',
      dataSource: '交易系统',
      distributionDesc: '正态分布',
      isRecommended: true
    });
    
    tags.push({
      id: 'general_002',
      name: '渠道偏好',
      code: 'CHANNEL_PREF',
      type: 'behavioral',
      dataType: '枚举型',
      description: '客户主要使用的交易渠道',
      coverage: 98,
      accuracy: 90,
      timeliness: 95,
      updateFrequency: '月更新',
      dataSource: '交易系统',
      distributionDesc: '多峰分布',
      isRecommended: false
    });
    
    tags.push({
      id: 'general_003',
      name: '潜在需求',
      code: 'POTENTIAL_NEED',
      type: 'derived',
      dataType: '集合型',
      description: '基于客户特征和行为预测的潜在产品需求',
      coverage: 85,
      accuracy: 78,
      timeliness: 80,
      updateFrequency: '月更新',
      dataSource: '模型预测',
      distributionDesc: '多峰分布',
      isRecommended: false
    });
  }
  
  // 为避免标签过少，补充一些相关标签
  if (tags.length < 6) {
    tags.push({
      id: 'additional_001',
      name: '客户生命周期',
      code: 'CUST_LIFECYCLE',
      type: 'derived',
      dataType: '枚举型',
      description: '客户当前所处的生命周期阶段',
      coverage: 92,
      accuracy: 85,
      timeliness: 90,
      updateFrequency: '月更新',
      dataSource: '模型预测',
      distributionDesc: '多段分布',
      isRecommended: false
    });
    
    tags.push({
      id: 'additional_002',
      name: '消费能力',
      code: 'CONSUMPTION_CAPACITY',
      type: 'derived',
      dataType: '枚举型',
      description: '基于收入、资产等评估的客户消费能力',
      coverage: 88,
      accuracy: 82,
      timeliness: 85,
      updateFrequency: '季更新',
      dataSource: '模型预测',
      distributionDesc: '正态分布',
      isRecommended: false
    });
  }
  
  // 随机调整标签的某些属性，使每次生成结果有差异
  tags = tags.map(tag => {
    const randomVariation = Math.floor(Math.random() * 5) - 2; // -2到2的随机数
    return {
      ...tag,
      coverage: Math.min(100, Math.max(75, tag.coverage + randomVariation)),
      accuracy: Math.min(100, Math.max(75, tag.accuracy + randomVariation)),
      timeliness: Math.min(100, Math.max(75, tag.timeliness + randomVariation))
    };
  });
  
  // 返回生成的标签
  return { 
    tags,
    analysisResults: {
      businessGoal: getBusinessGoal(lowerReq),
      detectedFields: getDetectedFields(lowerReq, businessDomain),
      suggestedCategory: getSuggestedCategory(businessDomain)
    }
  };
};

// 根据需求判断业务目标
const getBusinessGoal = (req) => {
  if (req.includes('营销') || req.includes('推荐')) {
    return '营销获客';
  } else if (req.includes('流失') || req.includes('挽留')) {
    return '客户挽留';
  } else if (req.includes('风险') || req.includes('信用')) {
    return '风险管控';
  } else if (req.includes('高价值') || req.includes('价值')) {
    return '客户价值提升';
  } else {
    return '客户洞察';
  }
};

// 根据需求和领域推测数据字段
const getDetectedFields = (req, domain) => {
  const baseFields = ['客户ID', '开户日期', '客户状态'];
  
  let specificFields = [];
  
  if (domain === 'retail') {
    specificFields = ['年龄', '性别', '职业', '收入', '教育'];
  } else if (domain === 'corporate') {
    specificFields = ['企业规模', '注册资本', '行业', '成立年限'];
  } else if (domain === 'risk') {
    specificFields = ['逾期记录', '授信额度', '风险等级', '信用评分'];
  }
  
  if (req.includes('营销') || req.includes('推荐')) {
    specificFields = [...specificFields, '购买历史', '浏览记录', '产品偏好', '营销响应率'];
  } else if (req.includes('流失') || req.includes('挽留')) {
    specificFields = [...specificFields, '活跃度', '交易频次', '最后交易日期', '投诉记录'];
  } else if (req.includes('风险') || req.includes('信用')) {
    specificFields = [...specificFields, '逾期次数', '负债率', '还款行为', '风险事件'];
  } else if (req.includes('高价值') || req.includes('价值')) {
    specificFields = [...specificFields, '资产规模', '月均收入', '产品持有', '交易金额'];
  }
  
  // 返回不重复的字段列表
  return [...new Set([...baseFields, ...specificFields])];
};

// 根据业务领域推荐标签分类
const getSuggestedCategory = (domain) => {
  switch (domain) {
    case 'retail':
      return '零售客户标签';
    case 'corporate':
      return '对公客户标签';
    case 'risk':
      return '风险管理标签';
    case 'service':
      return '客户服务标签';
    case 'operations':
      return '运营管理标签';
    default:
      return '通用客户标签';
  }
}; 
// 客户挽留助手服务
// 模拟实现，实际项目中应该连接到后端API

/**
 * 获取流失风险指标
 * 返回系统定义的流失风险评估指标
 */
export const getChurnRiskMetrics = async () => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: 'metric_001',
      name: '账户活跃度',
      description: '客户账户活跃度变化趋势',
      weight: 0.25,
      negative: true,
      threshold: 30,
      tags: ['行为', '活跃度', '交易'],
      icon: 'interaction'
    },
    {
      id: 'metric_002',
      name: '产品持有量变化',
      description: '客户产品持有数量变化趋势',
      weight: 0.15,
      negative: true,
      threshold: 20,
      tags: ['产品', '持有', '变化'],
      icon: 'fall'
    },
    {
      id: 'metric_003',
      name: '交易频次下降',
      description: '客户交易频次环比下降幅度',
      weight: 0.20,
      negative: true,
      threshold: 25,
      tags: ['交易', '频次', '下降'],
      icon: 'line-chart'
    },
    {
      id: 'metric_004',
      name: '投诉次数',
      description: '客户近期投诉或负面反馈次数',
      weight: 0.15,
      negative: true,
      threshold: 1,
      tags: ['投诉', '满意度', '服务'],
      icon: 'message'
    },
    {
      id: 'metric_005',
      name: '竞品查询',
      description: '客户查询竞争对手产品服务频次',
      weight: 0.15,
      negative: true,
      threshold: 2,
      tags: ['竞争', '查询', '对比'],
      icon: 'search'
    },
    {
      id: 'metric_006',
      name: '余额减少',
      description: '客户账户余额显著减少',
      weight: 0.10,
      negative: true,
      threshold: 30,
      tags: ['资产', '余额', '减少'],
      icon: 'fund'
    }
  ];
};

/**
 * 获取高流失风险客群
 * 基于指定的风险指标返回流失风险较高的客群
 */
export const getChurnRiskGroups = async (metricIds) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // 根据选择的指标决定返回的客群
  const riskGroups = [
    {
      id: 'risk_group_101',
      name: '高价值低活跃客户',
      count: 3280,
      churnProbability: 0.68,
      value: 'high',
      features: ['高资产', '低活跃度', '年龄40+'],
      source: 'ai',
      selected: metricIds.includes('metric_001') && metricIds.includes('metric_006')
    },
    {
      id: 'risk_group_102',
      name: '产品流失风险客户',
      count: 5750,
      churnProbability: 0.52,
      value: 'medium',
      features: ['产品减少', '查询竞品', '年龄30-45'],
      source: 'ai',
      selected: metricIds.includes('metric_002') && metricIds.includes('metric_005')
    },
    {
      id: 'risk_group_103',
      name: '交易下降客户',
      count: 8900,
      churnProbability: 0.45,
      value: 'medium',
      features: ['交易减少', '登录减少', '余额减少'],
      source: 'ai',
      selected: metricIds.includes('metric_003')
    },
    {
      id: 'risk_group_104',
      name: '服务不满意客户',
      count: 2650,
      churnProbability: 0.62,
      value: 'high',
      features: ['有投诉记录', '负面反馈', '满意度低'],
      source: 'ai',
      selected: metricIds.includes('metric_004')
    },
    {
      id: 'risk_group_105',
      name: '综合高风险客户',
      count: 1850,
      churnProbability: 0.78,
      value: 'critical',
      features: ['多维度风险', '高价值', '竞品活跃'],
      source: 'ai',
      selected: metricIds.length >= 4
    }
  ];
  
  // 根据选中的指标筛选客群
  return riskGroups.filter(group => group.selected);
};

/**
 * 获取干预措施推荐
 * 基于客群特征和流失风险返回推荐的干预措施
 */
export const getInterventionRecommendations = async (groupId) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 根据客群ID返回对应的干预措施
  const interventionMap = {
    'risk_group_101': [
      {
        id: 'intervention_1001',
        type: '专属优惠',
        title: '会员等级专属优惠',
        content: '根据客户会员等级提供专属金融优惠，包括费率减免、专属理财产品等',
        effectiveness: 0.75,
        cost: 'medium',
        timeframe: '即时',
        tags: ['会员特权', '专属优惠', '差异化'],
        selected: true
      },
      {
        id: 'intervention_1002',
        type: '产品推荐',
        title: '个性化理财产品推荐',
        content: '基于客户投资偏好和风险特征，提供个性化定制的理财产品推荐',
        effectiveness: 0.68,
        cost: 'low',
        timeframe: '1周内',
        tags: ['个性化', '理财产品', '精准推荐'],
        selected: false
      },
      {
        id: 'intervention_1003',
        type: '增值服务',
        title: '高净值客户专属服务',
        content: '为高净值客户提供专属客户经理服务，包括财务规划、专家咨询等增值服务',
        effectiveness: 0.82,
        cost: 'high',
        timeframe: '即时',
        tags: ['专属服务', '高净值', '人工服务'],
        selected: false
      }
    ],
    'risk_group_102': [
      {
        id: 'intervention_2001',
        type: '产品引导',
        title: '产品优势对比',
        content: '针对客户查询的竞品，提供我行产品的优势对比，突出差异化价值',
        effectiveness: 0.65,
        cost: 'low',
        timeframe: '即时',
        tags: ['产品对比', '差异化', '竞品分析'],
        selected: true
      },
      {
        id: 'intervention_2002',
        type: '限时优惠',
        title: '产品升级优惠',
        content: '为即将流失的客户提供产品升级的专属优惠，提升产品粘性',
        effectiveness: 0.72,
        cost: 'medium',
        timeframe: '1周内',
        tags: ['产品升级', '限时优惠', '专属方案'],
        selected: false
      }
    ],
    'risk_group_103': [
      {
        id: 'intervention_3001',
        type: '活动邀请',
        title: '专属活动邀请',
        content: '邀请客户参与专属金融活动，提供专业讲座和互动体验',
        effectiveness: 0.58,
        cost: 'medium',
        timeframe: '2周内',
        tags: ['活动邀请', '互动体验', '客户教育'],
        selected: true
      },
      {
        id: 'intervention_3002',
        type: '福利发放',
        title: '交易激励福利',
        content: '提供交易激励方案，包括手续费减免、积分加倍等福利',
        effectiveness: 0.69,
        cost: 'medium',
        timeframe: '即时',
        tags: ['交易激励', '手续费', '积分'],
        selected: false
      }
    ],
    'risk_group_104': [
      {
        id: 'intervention_4001',
        type: '问题解决',
        title: '专属问题解决方案',
        content: '针对客户投诉内容，提供定制化解决方案，并跟进服务体验改善',
        effectiveness: 0.85,
        cost: 'low',
        timeframe: '即时',
        tags: ['问题解决', '体验改善', '投诉处理'],
        selected: true
      },
      {
        id: 'intervention_4002',
        type: '补偿方案',
        title: '服务补偿与升级',
        content: '为有投诉的客户提供服务补偿和未来服务升级承诺',
        effectiveness: 0.78,
        cost: 'medium',
        timeframe: '即时',
        tags: ['服务补偿', '体验升级', '关系修复'],
        selected: false
      }
    ],
    'risk_group_105': [
      {
        id: 'intervention_5001',
        type: '综合方案',
        title: '客户挽留综合方案',
        content: '针对高风险客户提供综合挽留方案，包括产品优化、服务升级和专属优惠等',
        effectiveness: 0.88,
        cost: 'high',
        timeframe: '即时',
        tags: ['综合方案', '定制挽留', '多维干预'],
        selected: true
      },
      {
        id: 'intervention_5002',
        type: '高管关怀',
        title: '高管层客户关怀',
        content: '由分支机构高管直接联系高价值客户，提供一对一定制化服务方案',
        effectiveness: 0.92,
        cost: 'very_high',
        timeframe: '1周内',
        tags: ['高管关怀', '一对一服务', '高价值客户'],
        selected: false
      }
    ]
  };
  
  return interventionMap[groupId] || [];
};

/**
 * 获取渠道推荐
 * 基于客群特征和干预措施返回推荐的触达渠道
 */
export const getChannelRecommendations = async (groupId, interventionIds) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 通用渠道列表
  const channelList = [
    {
      name: '电话沟通',
      reachRate: 85.6,
      responseRate: 38.5,
      conversionRate: 18.2,
      costPerResponse: 65,
      bestTimeSlots: ['工作日上午9-11点', '工作日下午2-5点'],
      recommendation: 0.8,
      selected: true,
      suitable: ['高价值', '投诉处理', '关系修复', '综合方案']
    },
    {
      name: '短信通知',
      reachRate: 92.5,
      responseRate: 8.3,
      conversionRate: 2.1,
      costPerResponse: 12,
      bestTimeSlots: ['上午9-11点', '晚上7-9点'],
      recommendation: 0.5,
      selected: false,
      suitable: ['活动邀请', '限时优惠', '交易激励']
    },
    {
      name: '手机银行',
      reachRate: 88.2,
      responseRate: 12.7,
      conversionRate: 4.5,
      costPerResponse: 8,
      bestTimeSlots: ['中午12-2点', '晚上8-10点'],
      recommendation: 0.7,
      selected: true,
      suitable: ['产品推荐', '限时优惠', '福利发放']
    },
    {
      name: '微信推送',
      reachRate: 85.0,
      responseRate: 15.2,
      conversionRate: 3.8,
      costPerResponse: 7,
      bestTimeSlots: ['中午12-2点', '傍晚5-7点'],
      recommendation: 0.6,
      selected: false,
      suitable: ['活动邀请', '福利发放', '问题解决']
    },
    {
      name: '专属客户经理',
      reachRate: 95.8,
      responseRate: 45.2,
      conversionRate: 22.5,
      costPerResponse: 120,
      bestTimeSlots: ['工作日上午', '工作日下午'],
      recommendation: 0.9,
      selected: groupId === 'risk_group_101' || groupId === 'risk_group_105',
      suitable: ['高价值', '综合方案', '关系修复', '高管关怀']
    },
    {
      name: '邮件通知',
      reachRate: 65.3,
      responseRate: 5.2,
      conversionRate: 1.8,
      costPerResponse: 15,
      bestTimeSlots: ['上午10-12点', '下午3-5点'],
      recommendation: 0.4,
      selected: false,
      suitable: ['产品对比', '综合方案', '专业分析']
    }
  ];
  
  // 根据客群和选中的干预措施调整渠道推荐度
  let adjustedChannels = [...channelList];
  
  // 根据客群特征调整渠道推荐度
  if (groupId === 'risk_group_101') { // 高价值客户
    adjustedChannels = adjustedChannels.map(channel => {
      if (channel.name === '专属客户经理' || channel.name === '电话沟通') {
        return {...channel, recommendation: 0.95, selected: true};
      }
      return channel;
    });
  } else if (groupId === 'risk_group_104') { // 服务不满意客户
    adjustedChannels = adjustedChannels.map(channel => {
      if (channel.name === '电话沟通') {
        return {...channel, recommendation: 0.95, selected: true};
      }
      return channel;
    });
  }
  
  return adjustedChannels;
};

/**
 * 生成客户挽留方案
 * 基于选择的客群、干预措施和渠道生成完整的挽留方案
 */
export const generateRetentionPlan = async (params) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  const { groupId, interventionIds, channelNames, timing } = params;
  
  // 获取客群数据
  const allRiskGroups = [
    {
      id: 'risk_group_101',
      name: '高价值低活跃客户',
      count: 3280,
      churnProbability: 0.68,
      value: 'high',
      features: ['高资产', '低活跃度', '年龄40+']
    },
    {
      id: 'risk_group_102',
      name: '产品流失风险客户',
      count: 5750,
      churnProbability: 0.52,
      value: 'medium',
      features: ['产品减少', '查询竞品', '年龄30-45']
    },
    {
      id: 'risk_group_103',
      name: '交易下降客户',
      count: 8900,
      churnProbability: 0.45,
      value: 'medium',
      features: ['交易减少', '登录减少', '余额减少']
    },
    {
      id: 'risk_group_104',
      name: '服务不满意客户',
      count: 2650,
      churnProbability: 0.62,
      value: 'high',
      features: ['有投诉记录', '负面反馈', '满意度低']
    },
    {
      id: 'risk_group_105',
      name: '综合高风险客户',
      count: 1850,
      churnProbability: 0.78,
      value: 'critical',
      features: ['多维度风险', '高价值', '竞品活跃']
    }
  ];
  
  // 获取干预措施数据 (简化实现)
  const allInterventions = await getInterventionRecommendations(groupId);
  
  // 获取渠道数据
  const allChannels = await getChannelRecommendations(groupId, interventionIds);
  
  // 获取选中的数据
  const selectedGroup = allRiskGroups.find(group => group.id === groupId);
  const selectedInterventions = allInterventions.filter(item => 
    interventionIds.includes(item.id)
  );
  const selectedChannels = allChannels.filter(channel => 
    channelNames.includes(channel.name)
  );
  
  // 计算预期保留率
  const baseRetentionRate = 1 - selectedGroup.churnProbability;
  
  // 计算干预措施的有效性
  const interventionEffectiveness = selectedInterventions.reduce(
    (sum, item) => sum + item.effectiveness, 0
  ) / selectedInterventions.length;
  
  // 计算渠道有效性
  const channelEffectiveness = selectedChannels.reduce(
    (sum, channel) => sum + channel.recommendation, 0
  ) / selectedChannels.length;
  
  // 计算最终预期保留率 (基础保留率 + 干预提升 + 渠道提升)
  const expectedRetentionRate = Math.min(
    baseRetentionRate + (interventionEffectiveness * 0.15) + (channelEffectiveness * 0.1),
    0.95
  );
  
  // 生成干预计划的执行步骤
  const executionSteps = [
    {
      phase: '准备阶段',
      duration: '1周',
      activities: [
        '确认客群数据准确性与完整性',
        '准备干预措施所需资源与材料',
        '配置渠道投放参数与内容',
        '设置追踪指标与监控机制'
      ]
    },
    {
      phase: '执行阶段',
      duration: '2-4周',
      activities: [
        '按计划分批次实施干预措施',
        '监控客户响应情况，进行实时调整',
        '收集客户反馈，优化干预策略',
        '定期评估干预效果，调整资源分配'
      ]
    },
    {
      phase: '评估阶段',
      duration: '1-2周',
      activities: [
        '分析客户保留率与流失率变化',
        '评估各干预措施的有效性',
        '总结成功经验和需改进点',
        '形成长期客户保留策略建议'
      ]
    }
  ];
  
  // 生成预期结果
  const expectedResults = {
    originalCustomers: selectedGroup.count,
    originalChurnRate: selectedGroup.churnProbability,
    expectedRetentionRate,
    expectedRetained: Math.round(selectedGroup.count * expectedRetentionRate),
    customerValueSaved: selectedGroup.value === 'high' ? '高' : selectedGroup.value === 'medium' ? '中' : '极高',
    roi: selectedGroup.value === 'high' ? 4.2 : selectedGroup.value === 'medium' ? 3.1 : 5.8,
    timeToEffect: timing === 'immediate' ? '1-2周' : timing === 'nextWeek' ? '2-3周' : '3-4周'
  };
  
  // 生成优化建议
  const optimizationSuggestions = [
    {
      title: '客户分层精细化',
      description: '建议对目标客群进行更精细的分层，针对不同价值层级的客户制定差异化的挽留策略。',
      expectedImprovement: '预计可提升保留率5-8%'
    },
    {
      title: '触达时机优化',
      description: '根据客户的历史行为数据，选择最佳触达时机，提高客户响应率。',
      expectedImprovement: '预计可提升响应率10-15%'
    },
    {
      title: '多渠道协同策略',
      description: '建议采用多渠道协同触达策略，针对同一客户使用2-3个不同渠道，提高信息触达效果。',
      expectedImprovement: '预计可提升整体触达率8-12%'
    },
    {
      title: '干预措施个性化',
      description: '进一步个性化干预内容，基于客户的具体流失原因和偏好提供更精准的挽留方案。',
      expectedImprovement: '预计可提升挽留效果12-18%'
    }
  ];
  
  // 构建完整的挽留方案
  return {
    id: `plan_${Date.now()}`,
    name: `${selectedGroup.name}挽留方案-${new Date().toLocaleDateString('zh-CN')}`,
    createdAt: new Date().toISOString(),
    targetGroup: selectedGroup,
    interventions: selectedInterventions,
    channels: selectedChannels,
    timing,
    executionSteps,
    expectedResults,
    optimizationSuggestions
  };
}; 
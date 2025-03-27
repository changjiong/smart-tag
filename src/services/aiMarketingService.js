// 精准营销引擎服务
// 模拟实现，实际项目中应该连接到后端API

import { marketingCampaigns, marketingTemplates, channelStats, aiRecommendations } from '../mockData/marketing';

// 获取营销业务目标选项
export const getMarketingGoals = async () => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: 'goal_001',
      name: '新客户获取',
      description: '吸引潜在客户，提高客户获取率',
      icon: 'usergroup-add',
      tags: ['获客', '新用户', '市场扩张'],
      kpis: ['获客成本', '转化率', '新增客户数']
    },
    {
      id: 'goal_002',
      name: '产品交叉销售',
      description: '向现有客户推广其他产品',
      icon: 'interaction',
      tags: ['交叉销售', '产品推广', '客户价值'],
      kpis: ['产品渗透率', '客均产品持有', 'ROI']
    },
    {
      id: 'goal_003',
      name: '客户活跃度提升',
      description: '提高现有客户的活跃度和参与度',
      icon: 'thunderbolt',
      tags: ['客户活跃', '参与度', '交易频率'],
      kpis: ['活跃度', '交易频次', '留存率']
    },
    {
      id: 'goal_004',
      name: '高价值客户培育',
      description: '提升高价值客户的忠诚度和贡献',
      icon: 'crown',
      tags: ['高价值', '忠诚度', '客户培育'],
      kpis: ['客户贡献', '忠诚度', '客户满意度']
    },
    {
      id: 'goal_005',
      name: '休眠客户唤醒',
      description: '重新激活长期未活动的休眠客户',
      icon: 'rise',
      tags: ['休眠唤醒', '客户恢复', '再激活'],
      kpis: ['唤醒率', '活跃恢复', '二次转化']
    },
    {
      id: 'goal_006',
      name: '客户满意度提升',
      description: '提高客户体验和满意度',
      icon: 'heart',
      tags: ['客户体验', '满意度', '品牌形象'],
      kpis: ['NPS评分', '满意度', '投诉率']
    }
  ];
};

// 获取目标客群推荐
export const getTargetGroupRecommendations = async (goalId) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // 根据业务目标返回匹配的客群推荐
  const goalToGroupMap = {
    'goal_001': [
      {
        id: 'group_101',
        name: '潜在高价值客户',
        count: 5280,
        conversionPotential: 0.18,
        features: ['高收入', '年龄25-40', '移动银行活跃'],
        source: 'ai',
        selected: true
      },
      {
        id: 'group_102',
        name: '竞品银行客户',
        count: 8950,
        conversionPotential: 0.12,
        features: ['他行主要客户', '有理财需求', '年龄30-45'],
        source: 'ai',
        selected: false
      },
      {
        id: 'group_103',
        name: '新兴白领',
        count: 12500,
        conversionPotential: 0.15,
        features: ['大学毕业3-5年', '中高收入', '消费活跃'],
        source: 'ai',
        selected: false
      }
    ],
    'goal_002': [
      {
        id: 'group_201',
        name: '单一产品客户',
        count: 15800,
        conversionPotential: 0.22,
        features: ['仅持有信用卡', '活跃度高', '年龄25-35'],
        source: 'ai',
        selected: true
      },
      {
        id: 'group_202',
        name: '存款稳定客户',
        count: 7620,
        conversionPotential: 0.25,
        features: ['大额存款', '理财需求未满足', '年龄35-50'],
        source: 'ai',
        selected: false
      },
      {
        id: 'group_203',
        name: '工资代发客户',
        count: 9350,
        conversionPotential: 0.19,
        features: ['工资卡用户', '低产品持有', '消费潜力高'],
        source: 'ai',
        selected: false
      }
    ],
    'goal_003': [
      {
        id: 'group_301',
        name: '低活跃客户',
        count: 18650,
        conversionPotential: 0.15,
        features: ['月均登录1-2次', '产品持有2+', '年龄30-45'],
        source: 'ai',
        selected: true
      },
      {
        id: 'group_302',
        name: '交易频次下降',
        count: 7350,
        conversionPotential: 0.17,
        features: ['交易频次环比-30%', '曾经高活跃', '产品持有3+'],
        source: 'ai',
        selected: false
      }
    ],
    'goal_004': [
      {
        id: 'group_401',
        name: '高净值客户',
        count: 3250,
        conversionPotential: 0.30,
        features: ['资产5百万+', '年龄40+', '产品持有3+'],
        source: 'ai',
        selected: true
      },
      {
        id: 'group_402',
        name: '快速成长客户',
        count: 4820,
        conversionPotential: 0.28,
        features: ['资产增长>30%', '年龄30-45', '高频交易'],
        source: 'ai',
        selected: false
      }
    ],
    'goal_005': [
      {
        id: 'group_501',
        name: '半年无活跃',
        count: 28500,
        conversionPotential: 0.08,
        features: ['6-12个月无登录', '曾经活跃', '产品持有2+'],
        source: 'ai',
        selected: true
      },
      {
        id: 'group_502',
        name: '流失风险客户',
        count: 9750,
        conversionPotential: 0.12,
        features: ['余额减少>50%', '3个月无交易', '近期查询竞品'],
        source: 'ai',
        selected: false
      }
    ],
    'goal_006': [
      {
        id: 'group_601',
        name: '投诉记录客户',
        count: 4280,
        conversionPotential: 0.25,
        features: ['近6个月有投诉', '产品持有3+', '高价值'],
        source: 'ai',
        selected: true
      },
      {
        id: 'group_602',
        name: 'NPS中等评分',
        count: 12850,
        conversionPotential: 0.18,
        features: ['NPS评分6-8', '活跃度高', '产品持有2+'],
        source: 'ai',
        selected: false
      }
    ]
  };
  
  return goalToGroupMap[goalId] || [];
};

// 获取营销内容推荐
export const getContentRecommendations = async (goalId, groupId) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 根据业务目标和客群生成营销内容建议
  const baseRecommendations = [
    {
      id: 'content_001',
      type: '短信',
      title: '个性化产品推荐',
      content: '【XX银行】尊敬的客户，根据您的需求，我们为您推荐了这款{productName}，专享{interestRate}利率和{benefitDescription}。详情请登录手机银行或咨询客服热线{servicePhone}。回T退订',
      effectiveness: 0.85,
      tags: ['个性化', '产品推荐', '专属权益'],
      selected: true
    },
    {
      id: 'content_002',
      type: '微信',
      title: '活动邀请',
      content: '尊敬的{customerName}，诚邀您参加我行于{eventDate}举办的"{eventName}"专享活动，活动期间可享{benefitDescription}。点击链接了解详情并预约参与。',
      effectiveness: 0.78,
      tags: ['活动邀请', '专属活动', '预约参与'],
      selected: false
    },
    {
      id: 'content_003',
      type: '手机银行',
      title: '专享优惠通知',
      content: '尊敬的客户，您有一项专属优惠待领取：{discountDescription}，有效期至{validDate}。点击立即领取并使用。',
      effectiveness: 0.92,
      tags: ['专属优惠', '限时领取', '一键使用'],
      selected: false
    },
    {
      id: 'content_004',
      type: '电子邮件',
      title: '财务规划建议',
      content: '尊敬的{customerName}：\n\n根据您的财务状况分析，我们为您制定了专属的{planType}规划方案，包含以下几个方面：\n\n1. {recommendation1}\n2. {recommendation2}\n3. {recommendation3}\n\n如需了解更多详情或预约专业顾问，请回复此邮件或致电{advisorPhone}。\n\n您的财务顾问：{advisorName}\n{bankName}',
      effectiveness: 0.75,
      tags: ['财务规划', '专业建议', '顾问服务'],
      selected: false
    }
  ];
  
  // 根据不同目标和客群调整内容
  const goalToContentMap = {
    'goal_001': [
      {
        id: 'content_g1_001',
        type: '短信',
        title: '新客开户礼遇',
        content: '【XX银行】开启财富增值新旅程！即日起新开户即送{giftDescription}，首次定期存款可享{interestRate}高息。详情请访问离您最近的网点或致电{servicePhone}咨询。回T退订',
        effectiveness: 0.88,
        tags: ['开户礼遇', '高息存款', '新客专享'],
        selected: true
      },
      {
        id: 'content_g1_002',
        type: '社交媒体',
        title: '新人礼包推广',
        content: '【开户即享千元好礼】下载XX银行APP，新用户注册开户可领取{giftValue}元新人礼包，更有机会抽取{prizeDescription}！首次定期存款享受年化收益率高达{interestRate}！戳👉{appLink}立即开启',
        effectiveness: 0.82,
        tags: ['新人礼包', '高额奖励', '简易开户'],
        selected: false
      }
    ],
    'goal_004': [
      {
        id: 'content_g4_001',
        type: '专属客户经理',
        title: '高净值客户专享服务',
        content: '尊敬的{customerName}，作为我行贵宾客户，诚邀您体验{serviceName}专属服务，包含{benefitDescription}等特权。您的专属客户经理{managerName}将于{contactDate}与您联系，为您详细介绍并安排服务。',
        effectiveness: 0.95,
        tags: ['贵宾服务', '专属特权', '一对一服务'],
        selected: true
      },
      {
        id: 'content_g4_002',
        type: '电子邮件',
        title: '资产配置方案',
        content: '尊敬的{customerName}：\n\n感谢您一直以来对我行的信任。基于您的财富状况和风险偏好，我们为您定制了专属资产配置方案：\n\n- 固定收益类：{fixedIncomeRatio}%\n- 权益类资产：{equityRatio}%\n- 另类投资：{alternativeRatio}%\n- 现金及等价物：{cashRatio}%\n\n附件包含详细配置建议及产品推荐。如您有任何疑问，欢迎随时联系您的专属财富顾问{advisorName}（电话：{advisorPhone}）。\n\n祝您投资顺利！\n\n{bankName}财富管理中心',
        effectiveness: 0.90,
        tags: ['资产配置', '专属方案', '全球视野'],
        selected: false
      }
    ],
    'goal_005': [
      {
        id: 'content_g5_001',
        type: '短信',
        title: '休眠客户唤醒',
        content: '【XX银行】{customerName}，好久不见，我们想您了！登录手机银行即得{pointsAmount}积分，兑换多种精美好礼。另有{discountDescription}专属福利等您领取。详情咨询{servicePhone}。回T退订',
        effectiveness: 0.75,
        tags: ['休眠唤醒', '积分好礼', '专属福利'],
        selected: true
      },
      {
        id: 'content_g5_002',
        type: '电话',
        title: '客户回访脚本',
        content: '您好，{customerName}，我是XX银行的客户经理{managerName}。注意到您已有一段时间未使用我们的服务，特致电了解您的金融需求是否有变化，并通知您我行最新的{promotionDescription}活动，专为像您这样的重要客户准备。此外，我们还为您准备了{giftDescription}，欢迎您再次光临体验。',
        effectiveness: 0.82,
        tags: ['回访唤醒', '专属优惠', '礼品赠送'],
        selected: false
      }
    ]
  };
  
  // 合并基础推荐和特定目标推荐
  const specificRecommendations = goalToContentMap[goalId] || [];
  return [...specificRecommendations, ...baseRecommendations];
};

// 获取渠道推荐
export const getChannelRecommendations = async (goalId, groupId) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 基础渠道数据
  const baseChannels = [
    {
      name: '短信',
      reachRate: 92.5,
      responseRate: 8.3,
      conversionRate: 2.1,
      costPerResponse: 12,
      bestTimeSlots: ['上午9-11点', '晚上7-9点'],
      recommendation: 0.85,
      selected: true
    },
    {
      name: '手机银行',
      reachRate: 88.2,
      responseRate: 12.7,
      conversionRate: 4.5,
      costPerResponse: 8,
      bestTimeSlots: ['中午12-2点', '晚上8-10点'],
      recommendation: 0.92,
      selected: true
    },
    {
      name: '微信',
      reachRate: 85.0,
      responseRate: 15.2,
      conversionRate: 3.8,
      costPerResponse: 7,
      bestTimeSlots: ['中午12-2点', '傍晚5-7点'],
      recommendation: 0.88,
      selected: false
    },
    {
      name: 'APP推送',
      reachRate: 78.5,
      responseRate: 10.5,
      conversionRate: 3.2,
      costPerResponse: 6,
      bestTimeSlots: ['早上7-9点', '晚上9-11点'],
      recommendation: 0.75,
      selected: false
    },
    {
      name: '电子邮件',
      reachRate: 65.3,
      responseRate: 5.2,
      conversionRate: 1.8,
      costPerResponse: 15,
      bestTimeSlots: ['上午10-12点', '下午3-5点'],
      recommendation: 0.60,
      selected: false
    },
    {
      name: '专属客户经理',
      reachRate: 95.8,
      responseRate: 45.2,
      conversionRate: 22.5,
      costPerResponse: 120,
      bestTimeSlots: ['工作日上午', '工作日下午'],
      recommendation: 0.65,
      selected: false
    }
  ];
  
  // 根据目标和客群调整渠道推荐度
  const adjustedChannels = baseChannels.map(channel => {
    let adjustedRecommendation = channel.recommendation;
    
    // 根据目标调整推荐度
    if (goalId === 'goal_001' && ['短信', 'APP推送', '社交媒体'].includes(channel.name)) {
      adjustedRecommendation += 0.1;
    }
    
    if (goalId === 'goal_004' && ['专属客户经理', '电子邮件'].includes(channel.name)) {
      adjustedRecommendation += 0.2;
    }
    
    if (goalId === 'goal_005' && ['短信', '电话营销'].includes(channel.name)) {
      adjustedRecommendation += 0.15;
    }
    
    // 确保推荐度在0-1范围内
    adjustedRecommendation = Math.min(Math.max(adjustedRecommendation, 0), 1);
    
    return {
      ...channel,
      recommendation: adjustedRecommendation
    };
  });
  
  // 根据推荐度排序
  return adjustedChannels.sort((a, b) => b.recommendation - a.recommendation);
};

// 生成营销策略
export const generateMarketingStrategy = async (params) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // 提取参数
  const { goalId, targetGroups, contents, channels, budget, timing } = params;
  
  // 获取目标名称
  const goals = await getMarketingGoals();
  const selectedGoal = goals.find(goal => goal.id === goalId);
  
  // 计算总客户数量
  const totalCustomers = targetGroups.reduce((sum, group) => sum + group.count, 0);
  
  // 计算平均转化潜力
  const avgConversionPotential = targetGroups.reduce((sum, group) => sum + group.conversionPotential, 0) / targetGroups.length;
  
  // 计算预期响应率和转化率 (模拟基于内容和渠道的综合效果)
  const contentEffectiveness = contents.reduce((sum, content) => sum + (content.effectiveness || 0.75), 0) / contents.length;
  const channelEffectiveness = channels.reduce((sum, channel) => {
    const channelData = channelStats.find(c => c.channel === channel.name);
    return sum + (channelData ? channelData.responseRate / 100 : 0.1);
  }, 0) / channels.length;
  
  // 基于上述因素计算关键指标
  const responseRate = Math.min(Math.round((contentEffectiveness * channelEffectiveness * 100 + 5) * 10) / 10, 35);
  const conversionRate = Math.min(Math.round((avgConversionPotential * 100 + 2) * 10) / 10, 25);
  
  // 计算达到客户数
  const reachCount = Math.round(totalCustomers * 0.9); // 假设可达到90%的目标客户
  
  // 计算转化客户数
  const convertedCount = Math.round(reachCount * responseRate / 100 * conversionRate / 100);
  
  // 计算每次转化成本
  const costPerConversion = Math.round(budget / convertedCount);
  
  // 计算ROI (假设每个转化客户的平均价值)
  const customerValue = costPerConversion * (3 + Math.random() * 2); // 假设ROI在3-5之间
  const roi = Math.round((customerValue * convertedCount - budget) / budget * 10) / 10;
  
  // 构建营销策略结果
  return {
    id: 'strategy_' + Date.now(),
    name: `${selectedGoal.name}营销策略-${new Date().toLocaleDateString('zh-CN')}`,
    goalId,
    goal: selectedGoal.name,
    targetGroups,
    selectedContents: contents,
    selectedChannels: channels,
    budget,
    timing,
    
    // 预期效果
    expectedResults: {
      reachCount,
      responseRate,
      conversionRate,
      convertedCount,
      costPerConversion,
      roi,
      estimatedRevenue: Math.round(customerValue * convertedCount),
    },
    
    // 执行计划
    executionPlan: [
      {
        phase: '准备阶段',
        duration: '1-2周',
        activities: [
          '完善客群数据，确保联系信息准确性',
          '优化营销内容，根据客群特征进行个性化调整',
          '配置营销渠道，准备投放资源',
          '设置跟踪指标，确保数据采集正确'
        ]
      },
      {
        phase: '执行阶段',
        duration: '4-6周',
        activities: [
          '按计划分批次执行内容投放',
          '监控客户响应情况，进行实时调整',
          '收集客户反馈，优化后续批次内容',
          '协调各渠道资源，确保一致的客户体验'
        ]
      },
      {
        phase: '评估优化阶段',
        duration: '2-3周',
        activities: [
          '分析营销效果数据，评估与预期的差距',
          '总结成功经验和需改进的方面',
          '针对未响应客户制定二次触达计划',
          '形成营销策略报告，为后续活动提供参考'
        ]
      }
    ],
    
    // 优化建议
    optimizationSuggestions: [
      {
        title: '客群细分优化',
        description: '建议将目标客群按响应概率进一步细分，对高响应概率客群增加投入，提高整体转化效率。',
        expectedImprovement: '预计可提升转化率10-15%'
      },
      {
        title: '内容个性化提升',
        description: '基于客户历史行为和偏好，提高内容个性化程度，尤其是在产品推荐和优惠设计方面。',
        expectedImprovement: '预计可提升响应率15-20%'
      },
      {
        title: '多渠道协同策略',
        description: '建议采用多渠道协同触达策略，针对同一客户使用2-3个不同渠道，提高信息触达效果。',
        expectedImprovement: '预计可提升整体触达率8-12%'
      },
      {
        title: '触达时间优化',
        description: '根据不同客群的活跃时间规律，优化内容发送时间，提高客户打开率和响应率。',
        expectedImprovement: '预计可提升响应率5-10%'
      }
    ],
    
    // 创建时间
    createdAt: new Date().toISOString()
  };
};

// 辅助函数：生成策略名称
const getStrategyName = (goalId) => {
  const goalNameMap = {
    'goal_001': '新客户获取计划',
    'goal_002': '产品交叉销售策略',
    'goal_003': '客户活跃度提升计划',
    'goal_004': '高价值客户培育方案',
    'goal_005': '休眠客户唤醒活动',
    'goal_006': '客户满意度提升项目'
  };
  
  return goalNameMap[goalId] || '智能营销策略';
};

// 辅助函数：计算触达人数
const calculateReachCount = (targetGroups, channels) => {
  const totalCustomers = targetGroups.reduce((sum, group) => sum + group.count, 0);
  const avgReachRate = channels.reduce((sum, channel) => sum + channel.reachRate, 0) / channels.length / 100;
  
  return Math.floor(totalCustomers * avgReachRate);
};

// 辅助函数：计算响应率
const calculateResponseRate = (contents, channels) => {
  const avgContentEffectiveness = contents.reduce((sum, content) => sum + content.effectiveness, 0) / contents.length;
  const avgChannelResponseRate = channels.reduce((sum, channel) => sum + channel.responseRate, 0) / channels.length;
  
  return +(avgContentEffectiveness * avgChannelResponseRate / 10).toFixed(1);
};

// 辅助函数：计算转化率
const calculateConversionRate = (goalId, targetGroups) => {
  const baseRate = targetGroups.reduce((sum, group) => sum + (group.conversionPotential || 0.1), 0) / targetGroups.length;
  
  // 根据目标类型调整
  const goalMultipliers = {
    'goal_001': 0.8,  // 新客户获取通常转化率较低
    'goal_002': 1.2,  // 交叉销售通常转化率较高
    'goal_004': 1.5,  // 高价值客户通常转化率高
    'goal_005': 0.6   // 休眠客户唤醒通常转化率低
  };
  
  const multiplier = goalMultipliers[goalId] || 1;
  return +(baseRate * multiplier * 100).toFixed(1);
};

// 辅助函数：计算投入产出比
const calculateROI = (goalId, targetGroups, contents, budget) => {
  const baseROI = 3;  // 基础ROI
  
  // 根据目标和内容调整ROI
  const goalROIMultipliers = {
    'goal_001': 0.9,
    'goal_002': 1.3,
    'goal_004': 1.5,
    'goal_005': 0.7
  };
  
  const goalMultiplier = goalROIMultipliers[goalId] || 1;
  const avgEffectiveness = contents.reduce((sum, content) => sum + content.effectiveness, 0) / contents.length;
  
  return +((baseROI * goalMultiplier * avgEffectiveness).toFixed(1));
};

// 辅助函数：计算每次转化成本
const calculateCostPerConversion = (budget, targetGroups, contents, channels) => {
  const totalCustomers = targetGroups.reduce((sum, group) => sum + group.count, 0);
  const estimatedConversionRate = calculateConversionRate('', targetGroups) / 100;
  const estimatedConversions = totalCustomers * estimatedConversionRate;
  
  return Math.round(budget / estimatedConversions);
};

// 辅助函数：生成执行计划
const generateExecutionPlan = (goalId, channels, timing) => {
  // 默认执行计划
  const defaultPlan = [
    { phase: '准备阶段', duration: '1周', activities: ['客群数据准备', '营销内容制作', '渠道测试'] },
    { phase: '执行阶段', duration: '2周', activities: ['分批次触达客户', '多渠道协同', '实时监控反馈'] },
    { phase: '优化阶段', duration: '1周', activities: ['数据分析', '策略优化', '追加触达'] },
    { phase: '评估阶段', duration: '1周', activities: ['效果评估', '经验总结', '后续计划'] }
  ];
  
  // 根据目标调整执行计划
  if (goalId === 'goal_005') {
    // 休眠客户唤醒需要更长的执行周期
    defaultPlan[1].duration = '4周';
    defaultPlan[1].activities.push('多次触达');
  }
  
  if (goalId === 'goal_004') {
    // 高价值客户培育需要更多个性化服务
    defaultPlan[0].activities.push('个性化方案设计');
    defaultPlan[1].activities = ['一对一服务', '专属活动邀约', '持续关怀'];
  }
  
  return defaultPlan;
};

// 辅助函数：生成优化建议
const generateOptimizationSuggestions = (goalId, targetGroups, contents, channels) => {
  // 通用优化建议
  const commonSuggestions = [
    {
      title: '优化触达时间',
      description: '根据目标客群的活跃时间模式，调整触达时间以提高响应率。',
      expectedImprovement: '响应率提升15-20%'
    },
    {
      title: '增强内容个性化',
      description: '进一步细分客群，针对不同特征客户提供更个性化的内容。',
      expectedImprovement: '转化率提升10-15%'
    },
    {
      title: '优化渠道组合',
      description: '根据初步响应数据，调整渠道投入比例，增加高效渠道投入。',
      expectedImprovement: 'ROI提升5-10%'
    }
  ];
  
  // 根据目标添加特定建议
  let specificSuggestions = [];
  
  if (goalId === 'goal_001') {
    specificSuggestions.push({
      title: '增强获客激励',
      description: '提高首次交易奖励力度，降低新客户准入门槛。',
      expectedImprovement: '新客转化率提升20-25%'
    });
  }
  
  if (goalId === 'goal_002') {
    specificSuggestions.push({
      title: '优化产品组合推荐',
      description: '基于客户已有产品使用情况，提供更精准的交叉销售产品组合。',
      expectedImprovement: '产品渗透率提升15-20%'
    });
  }
  
  if (goalId === 'goal_005') {
    specificSuggestions.push({
      title: '分阶段唤醒策略',
      description: '对休眠时间不同的客户采用阶梯式唤醒策略，逐步提高活跃度。',
      expectedImprovement: '唤醒率提升25-30%'
    });
  }
  
  return [...specificSuggestions, ...commonSuggestions];
}; 
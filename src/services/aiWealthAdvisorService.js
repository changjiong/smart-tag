export const getWealthGoals = async () => {
  return [
    { id: '1', name: '子女教育基金', description: '为子女高等教育储备资金' },
    { id: '2', name: '退休养老计划', description: '保障退休后生活质量' },
    { id: '3', name: '资产保值增值', description: '通过投资实现资产长期增长' },
    { id: '4', name: '购置不动产', description: '计划购买房产或商业地产' },
    { id: '5', name: '企业经营资金', description: '支持企业扩大再生产' }
  ];
};

export const getRiskAssessmentQuestions = async () => {
  return [
    {
      id: 'q1',
      question: '您的投资期限是？',
      options: [
        { value: 'a', text: '1-3年', score: 1 },
        { value: 'b', text: '3-5年', score: 2 },
        { value: 'c', text: '5-10年', score: 3 },
        { value: 'd', text: '10年以上', score: 4 }
      ]
    },
    {
      id: 'q2',
      question: '您能接受的最大年度亏损比例？',
      options: [
        { value: 'a', text: '不能接受亏损', score: 1 },
        { value: 'b', text: '不超过5%', score: 2 },
        { value: 'c', text: '5%-10%', score: 3 },
        { value: 'd', text: '10%-20%', score: 4 },
        { value: 'e', text: '20%以上', score: 5 }
      ]
    },
    {
      id: 'q3',
      question: '您更关注以下哪个方面？',
      options: [
        { value: 'a', text: '本金安全，不愿承担任何风险', score: 1 },
        { value: 'b', text: '保证大部分本金安全，能承受小幅波动', score: 2 },
        { value: 'c', text: '平衡风险与收益', score: 3 },
        { value: 'd', text: '愿意承担较大风险以追求较高收益', score: 4 },
        { value: 'e', text: '追求最大收益，能承受较大亏损', score: 5 }
      ]
    },
    {
      id: 'q4',
      question: '如果您的投资在短期内下跌20%，您会怎么做？',
      options: [
        { value: 'a', text: '立即全部卖出以避免更大亏损', score: 1 },
        { value: 'b', text: '卖出一部分以减少风险', score: 2 },
        { value: 'c', text: '继续持有，等待市场回暖', score: 3 },
        { value: 'd', text: '买入更多，摊低成本', score: 5 }
      ]
    },
    {
      id: 'q5',
      question: '您的投资知识和经验如何？',
      options: [
        { value: 'a', text: '几乎没有投资经验', score: 1 },
        { value: 'b', text: '有少量投资经验，了解基础投资概念', score: 2 },
        { value: 'c', text: '有一定投资经验，了解不同类型的投资产品', score: 3 },
        { value: 'd', text: '有丰富的投资经验和知识', score: 4 }
      ]
    }
  ];
};

export const generateAssetAllocation = async (goalId, riskLevel) => {
  // Mock allocation based on goal and risk
  const allocations = {
    '1': { // 教育基金
      stocks: 30,
      bonds: 50,
      cash: 20
    },
    '2': { // 养老计划
      stocks: 20,
      bonds: 60,
      realEstate: 20
    },
    '3': { // 保值增值
      stocks: 60,
      crypto: 15,
      commodities: 25
    },
    '4': { // 购置不动产
      stocks: 15,
      bonds: 25,
      realEstate: 60
    },
    '5': { // 企业经营资金
      stocks: 40,
      bonds: 35,
      cash: 25
    }
  };
  
  const defaultAllocation = {
    stocks: 40,
    bonds: 40,
    cash: 20
  };
  
  // 根据风险等级调整资产配置
  let allocation = allocations[goalId] || defaultAllocation;
  
  // 基于风险等级进行调整
  if (riskLevel === 1) { // 保守型
    allocation = adjustAllocationForRisk(allocation, 'conservative');
  } else if (riskLevel === 5) { // 进取型
    allocation = adjustAllocationForRisk(allocation, 'aggressive');
  }
  
  // 返回包含 allocation 属性的对象
  return { allocation: allocation };
};

// 辅助函数：根据风险偏好调整资产配置
const adjustAllocationForRisk = (allocation, riskType) => {
  const result = { ...allocation };
  
  if (riskType === 'conservative') {
    // 保守型配置：减少股票等高风险资产，增加债券和现金等低风险资产
    if (result.stocks) result.stocks = Math.max(10, result.stocks - 20);
    if (result.bonds) result.bonds = Math.min(70, result.bonds + 15);
    if (result.cash) result.cash = Math.min(50, result.cash + 15);
    if (result.crypto) result.crypto = Math.max(0, result.crypto - 10);
    if (result.commodities) result.commodities = Math.max(5, result.commodities - 10);
  } else if (riskType === 'aggressive') {
    // 进取型配置：增加股票等高风险资产，减少债券和现金等低风险资产
    if (result.stocks) result.stocks = Math.min(80, result.stocks + 20);
    if (result.bonds) result.bonds = Math.max(10, result.bonds - 15);
    if (result.cash) result.cash = Math.max(5, result.cash - 15);
    if (result.crypto) result.crypto = Math.min(25, (result.crypto || 0) + 10);
    if (result.commodities) result.commodities = Math.min(30, (result.commodities || 0) + 10);
  }
  
  return result;
};

export const getProductRecommendations = async (allocation, investmentAmount) => {
  const products = {
    stocks: [
      { name: '沪深300ETF', type: 'ETF', risk: '中', fee: 0.15 },
      { name: '标普500指数基金', type: '指数基金', risk: '中', fee: 0.2 }
    ],
    bonds: [
      { name: '国债', type: '固定收益', risk: '低', fee: 0.05 },
      { name: '企业债', type: '信用债', risk: '中低', fee: 0.1 }
    ],
    realEstate: [
      { name: '房地产信托基金', type: 'REITs', risk: '中', fee: 0.3 }
    ]
  };

  return Object.keys(allocation).reduce((acc, assetType) => {
    const selectedProducts = products[assetType] || [];
    const selected = selectedProducts.slice(0, 3);
    acc[assetType] = selected.map(p => ({
      ...p,
      allocation: allocation[assetType] * investmentAmount / 100
    }));
    return acc;
  }, {});
};

export const generatePerformanceProjection = async (allocation, amount, years) => {
  // 模拟年度收益率数据
  const annualReturns = [7.2, 8.1, 6.5, 9.3, 7.8, 6.9, 8.4, 7.5, 6.8, 8.0];
  
  // 扩展收益率数组至所需年数
  while (annualReturns.length < years) {
    // 使用前面的收益率循环填充
    annualReturns.push(annualReturns[annualReturns.length % 10]);
  }
  
  // 生成年度预测数据
  const yearlyProjections = [];
  let currentAmount = amount;
  
  for (let year = 1; year <= years; year++) {
    const returnRate = annualReturns[(year - 1) % annualReturns.length];
    const startAmount = currentAmount;
    currentAmount = Math.round(currentAmount * (1 + returnRate / 100));
    const growthFromInitial = Math.round((currentAmount / amount - 1) * 100);
    
    yearlyProjections.push({
      year,
      returnRate,
      startAmount,
      amount: currentAmount,
      growthFromInitial
    });
  }
  
  // 计算复合年增长率 (CAGR)
  const expectedCagr = Math.round(((Math.pow(currentAmount / amount, 1 / years) - 1) * 100) * 10) / 10;
  
  // 计算波动率 (标准差)
  const meanReturn = annualReturns.slice(0, years).reduce((sum, r) => sum + r, 0) / years;
  const squaredDiffs = annualReturns.slice(0, years).map(r => Math.pow(r - meanReturn, 2));
  const volatility = Math.round(Math.sqrt(squaredDiffs.reduce((sum, d) => sum + d, 0) / years) * 10) / 10;
  
  // 生成不同情境下的最终金额
  const pessimisticReturn = expectedCagr - volatility;
  const optimisticReturn = expectedCagr + volatility;
  
  const pessimisticAmount = Math.round(amount * Math.pow(1 + pessimisticReturn / 100, years));
  const expectedAmount = Math.round(amount * Math.pow(1 + expectedCagr / 100, years));
  const optimisticAmount = Math.round(amount * Math.pow(1 + optimisticReturn / 100, years));
  
  return {
    annualReturns: annualReturns.slice(0, years),
    yearlyProjections,
    expectedCagr,
    volatility,
    finalAmount: currentAmount,
    finalValue: currentAmount,  // 兼容旧代码
    scenarios: [
      { scenario: '保守', returnRate: pessimisticReturn, value: pessimisticAmount },
      { scenario: '中性', returnRate: expectedCagr, value: expectedAmount },
      { scenario: '乐观', returnRate: optimisticReturn, value: optimisticAmount }
    ],
    probabilityDistribution: {
      pessimistic: pessimisticAmount,
      expected: expectedAmount,
      optimistic: optimisticAmount
    }
  };
};

export const generateWealthPlan = async (params) => {
  // 根据目标ID确定实施建议
  const implementationSteps = [
    {
      title: '建立应急资金',
      description: '在开始投资前，确保您有3-6个月的生活支出作为应急资金储备，存放在活期或短期理财产品中。',
      timeframe: '立即执行'
    },
    {
      title: '分步骤投资',
      description: '避免一次性投入全部资金，建议在3-6个月内分批次投入，降低市场时点风险。',
      timeframe: '1-6个月'
    },
    {
      title: '定期审视资产配置',
      description: '每季度回顾一次投资组合表现，每年重新平衡一次资产配置比例，确保风险敞口符合预期。',
      timeframe: '持续进行'
    }
  ];
  
  // 根据风险等级添加特定建议
  if (params.riskLevel <= 2) {
    implementationSteps.push({
      title: '建立稳健的被动收入',
      description: '重点关注股息和利息收益，构建现金流稳定的投资组合。',
      timeframe: '长期策略'
    });
  } else if (params.riskLevel >= 4) {
    implementationSteps.push({
      title: '适度配置成长型资产',
      description: '可以考虑适当增加部分高增长潜力但风险较高的资产，如新兴市场股票或科技股。',
      timeframe: '市场合适时机'
    });
  }
  
  // 根据财富目标添加特定建议
  if (params.goalId === '1') {  // 子女教育基金
    implementationSteps.push({
      title: '设立教育专项账户',
      description: '单独设立教育基金账户，并根据子女年龄逐步调整风险偏好，越接近使用时间越保守。',
      timeframe: '立即开始'
    });
  } else if (params.goalId === '2') {  // 退休养老计划
    implementationSteps.push({
      title: '充分利用税收优惠',
      description: '积极参与税优养老产品投资，如个人养老金账户等，实现税收递延优势。',
      timeframe: '持续进行'
    });
  } else if (params.goalId === '4') {  // 购置不动产
    implementationSteps.push({
      title: '研究目标地产市场',
      description: '除金融资产投资外，同步进行房产市场研究，关注政策变化、地段发展和价格趋势。',
      timeframe: '3-6个月内'
    });
  }
  
  // 风险提示
  const considerations = [
    {
      title: '市场波动风险',
      description: '投资市场存在周期性波动，短期回报可能与预期存在显著差异，需保持长期投资视角。'
    },
    {
      title: '通胀风险',
      description: '通货膨胀可能导致实际购买力下降，投资策略应考虑对冲通胀因素。'
    },
    {
      title: '流动性考量',
      description: '部分投资产品可能存在流动性限制，提前变现可能导致损失或额外费用。'
    }
  ];
  
  // 根据风险等级添加特定风险提示
  if (params.riskLevel >= 3) {
    considerations.push({
      title: '波动性风险',
      description: '您选择的中高风险配置可能面临较大市场波动，需具备相应的风险承受能力和较长投资期限。'
    });
  }
  
  if (Object.keys(params.assetAllocation).includes('crypto') || 
      Object.keys(params.assetAllocation).includes('commodities')) {
    considerations.push({
      title: '另类资产风险',
      description: '加密货币、大宗商品等另类资产波动性更大，可能存在监管政策变化风险，建议仅小比例配置。'
    });
  }

  return {
    planId: `PLAN-${Date.now()}`,
    summary: `为${params.goalId}目标设计的${params.riskLevel}风险等级方案，总投资¥${params.investmentAmount}`,
    details: {
      allocation: params.assetAllocation,
      products: params.productRecommendations,
      projection: params.projectionYears+'年预期收益：¥' + 
        params.performanceProjection.finalValue.toLocaleString()
    },
    implementationSteps,
    considerations
  };
};

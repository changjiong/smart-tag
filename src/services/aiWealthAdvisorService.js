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
    }
  };
  
  return allocations[goalId] || {
    stocks: 40,
    bonds: 40,
    cash: 20
  };
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
  return {
    annualReturns: [7.2, 8.1, 6.5, 9.3, 7.8],
    finalValue: Math.round(amount * Math.pow(1.075, years)),
    scenarios: [
      { scenario: '保守', returnRate: 5, value: Math.round(amount * Math.pow(1.05, years)) },
      { scenario: '中性', returnRate: 7.5, value: Math.round(amount * Math.pow(1.075, years)) },
      { scenario: '乐观', returnRate: 10, value: Math.round(amount * Math.pow(1.10, years)) }
    ]
  };
};

export const generateWealthPlan = async (params) => {
  return {
    planId: `PLAN-${Date.now()}`,
    summary: `为${params.goalId}目标设计的${params.riskLevel}风险等级方案，总投资¥${params.investmentAmount}`,
    details: {
      allocation: params.assetAllocation,
      products: params.productRecommendations,
      projection: params.projectionYears+'年预期收益：¥' + 
        params.performanceProjection.finalValue.toLocaleString()
    }
  };
};

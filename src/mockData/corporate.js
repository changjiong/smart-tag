/**
 * 企业客户画像模拟数据
 */

// 企业客户列表
export const mockCompanyList = Array(100)
  .fill()
  .map((_, index) => {
    const id = String(index + 1).padStart(3, '0');
    const industries = ['金融服务', '制造业', '科技行业', '零售业', '医疗健康', '教育培训', '房地产', '能源电力'];
    const regions = ['上海', '北京', '广州', '深圳', '杭州', '南京', '成都', '武汉', '西安', '重庆'];
    const scales = ['大型企业', '中型企业', '小型企业'];
    const valueLevels = ['A', 'B', 'C', 'D'];
    
    return {
      id,
      name: `企业${id}`,
      industry: industries[index % industries.length],
      scale: scales[index % scales.length],
      region: regions[index % regions.length],
      valueLevel: valueLevels[Math.floor(Math.random() * valueLevels.length)],
      years: 1 + Math.floor(Math.random() * 10),
      yearTransactionAmount: 100000 + Math.floor(Math.random() * 900000),
      employees: 50 + Math.floor(Math.random() * 950),
      lastTransactionDate: '2024-05-01',
      createdAt: '2024-01-01',
    };
  });

// 企业客户统计数据
export const mockCompanyStatistics = {
  totalCompanies: mockCompanyList.length,
  highValuePercentage: 28.5,
  avgYearTransaction: 485000.75,
  retentionRate: 92.3,
  newCompaniesThisYear: 24,
  growthRate: 15.2,
  avgEmployees: 320,
};

// 分布数据
export const mockDistributionData = {
  // 行业分布
  industry: [
    { name: '金融服务', value: 32 },
    { name: '制造业', value: 28 },
    { name: '科技行业', value: 24 },
    { name: '零售业', value: 16 },
    { name: '医疗健康', value: 12 },
    { name: '教育培训', value: 8 },
    { name: '房地产', value: 6 },
    { name: '能源电力', value: 4 },
  ],
  
  // 地区分布
  region: [
    { name: '上海', value: 25 },
    { name: '北京', value: 22 },
    { name: '广州', value: 15 },
    { name: '深圳', value: 13 },
    { name: '杭州', value: 10 },
    { name: '南京', value: 8 },
    { name: '成都', value: 7 },
    { name: '武汉', value: 6 },
    { name: '西安', value: 5 },
    { name: '重庆', value: 4 },
  ],
  
  // 规模分布
  scale: [
    { name: '大型企业', value: 35 },
    { name: '中型企业', value: 45 },
    { name: '小型企业', value: 20 },
  ],
};

// 增长趋势数据
export const mockGrowthTrend = [
  { month: '1月', count: 78 },
  { month: '2月', count: 82 },
  { month: '3月', count: 86 },
  { month: '4月', count: 88 },
  { month: '5月', count: 90 },
  { month: '6月', count: 92 },
  { month: '7月', count: 94 },
  { month: '8月', count: 95 },
  { month: '9月', count: 97 },
  { month: '10月', count: 98 },
  { month: '11月', count: 99 },
  { month: '12月', count: 100 },
];

// 交易额分布数据
export const mockTransactionDistribution = [
  { range: '0-10万', count: 15 },
  { range: '10-30万', count: 25 },
  { range: '30-50万', count: 30 },
  { range: '50-70万', count: 20 },
  { range: '70-100万', count: 10 },
  { range: '100万以上', count: 5 },
];

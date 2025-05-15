import axios from 'axios';
import { mockCompanyList, mockCompanyStatistics, mockDistributionData, mockGrowthTrend, mockTransactionDistribution } from '@/mockData/corporate';

/**
 * 企业客户画像服务
 * 提供企业客户数据相关的API接口
 */
const corporateService = {
  /**
   * 获取企业客户列表
   * @returns {Promise} 企业客户列表数据
   */
  getCompanyList: async () => {
    // 实际开发中，这里应替换为真实的API调用
    // return axios.get('/api/corporate/companies');
    
    // 使用模拟数据
    return Promise.resolve({
      data: mockCompanyList,
      total: mockCompanyList.length
    });
  },
  
  /**
   * 获取企业客户统计数据
   * @returns {Promise} 企业客户统计数据
   */
  getCompanyStatistics: async () => {
    // 实际开发中，这里应替换为真实的API调用
    // return axios.get('/api/corporate/statistics');
    
    // 使用模拟数据
    return Promise.resolve(mockCompanyStatistics);
  },
  
  /**
   * 获取行业分布数据
   * @returns {Promise} 行业分布数据
   */
  getIndustryDistribution: async () => {
    // 实际开发中，这里应替换为真实的API调用
    // return axios.get('/api/corporate/distribution/industry');
    
    // 使用模拟数据
    return Promise.resolve(mockDistributionData.industry);
  },
  
  /**
   * 获取地区分布数据
   * @returns {Promise} 地区分布数据
   */
  getRegionDistribution: async () => {
    // 实际开发中，这里应替换为真实的API调用
    // return axios.get('/api/corporate/distribution/region');
    
    // 使用模拟数据
    return Promise.resolve(mockDistributionData.region);
  },
  
  /**
   * 获取规模分布数据
   * @returns {Promise} 规模分布数据
   */
  getScaleDistribution: async () => {
    // 实际开发中，这里应替换为真实的API调用
    // return axios.get('/api/corporate/distribution/scale');
    
    // 使用模拟数据
    return Promise.resolve(mockDistributionData.scale);
  },
  
  /**
   * 获取企业客户增长趋势数据
   * @returns {Promise} 增长趋势数据
   */
  getGrowthTrend: async () => {
    // 实际开发中，这里应替换为真实的API调用
    // return axios.get('/api/corporate/growth');
    
    // 使用模拟数据
    return Promise.resolve(mockGrowthTrend);
  },
  
  /**
   * 获取交易额分布数据
   * @returns {Promise} 交易额分布数据
   */
  getTransactionDistribution: async () => {
    // 实际开发中，这里应替换为真实的API调用
    // return axios.get('/api/corporate/distribution/transaction');
    
    // 使用模拟数据
    return Promise.resolve(mockTransactionDistribution);
  },
  
  /**
   * 获取企业客户详情
   * @param {string} companyId 企业ID
   * @returns {Promise} 企业客户详情数据
   */
  getCompanyDetail: async (companyId) => {
    // 实际开发中，这里应替换为真实的API调用
    // return axios.get(`/api/corporate/companies/${companyId}`);
    
    // 使用模拟数据
    const company = mockCompanyList.find(item => item.id === companyId);
    
    // 添加更多详细信息
    const detail = {
      ...company,
      establishYear: 2010 + (parseInt(companyId) % 10),
      address: `上海市浦东新区张江高科技园区${companyId}号`,
      legalPerson: ['张三', '李四', '王五', '赵六'][parseInt(companyId) % 4],
      contactPerson: ['陈经理', '林总监', '黄主管', '吴经理'][parseInt(companyId) % 4],
      contactPhone: `1391234${companyId.padStart(4, '0')}`,
      email: `contact${companyId}@example.com`,
      businessScope: '金融科技、企业软件、数据服务、技术咨询',
      cooperationHistory: [
        { year: '2022', products: ['智能理财', '企业信贷'], amount: 128000 + parseInt(companyId) * 1000 },
        { year: '2023', products: ['智能理财', '企业信贷', '风险管理'], amount: 156000 + parseInt(companyId) * 1200 },
        { year: '2024', products: ['智能理财', '企业信贷', '风险管理', '财富管理'], amount: 210000 + parseInt(companyId) * 1500 }
      ],
      riskLevel: ['低风险', '中低风险', '中风险', '中高风险'][parseInt(companyId) % 4],
      growthPotential: ['高', '中', '低'][parseInt(companyId) % 3],
      customerManager: ['张经理', '王经理', '李经理'][parseInt(companyId) % 3],
      lastContactDate: '2024-05-10',
      nextFollowupDate: '2024-05-20',
      tags: ['高净值', '稳定增长', '多产品合作', '长期客户'][parseInt(companyId) % 4].split(' ')
    };
    
    return Promise.resolve(detail);
  }
};

export default corporateService;

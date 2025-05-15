import { useState, useEffect } from 'react';
import { corporateService } from '../services';

/**
 * 企业客户画像数据管理Hook
 * 提供企业客户画像功能所需的数据和方法
 */
export const useCorporatePortrait = () => {
  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    totalCompanies: 0,
    highValuePercentage: 0,
    avgYearTransaction: 0,
    retentionRate: 0,
  });
  const [industryData, setIndustryData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [scaleData, setScaleData] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);

  const loadCompanyData = async () => {
    setLoading(true);
    try {
      // 加载企业客户列表
      const companiesResponse = await corporateService.getCompanyList();
      setCompanyList(companiesResponse.data);
      
      // 加载统计数据
      const statsResponse = await corporateService.getCompanyStatistics();
      setStatistics(statsResponse);
      
      // 加载行业分布数据
      const industryResponse = await corporateService.getIndustryDistribution();
      setIndustryData(industryResponse);
      
      // 加载地区分布数据
      const regionResponse = await corporateService.getRegionDistribution();
      setRegionData(regionResponse);
      
      // 加载规模分布数据
      const scaleResponse = await corporateService.getScaleDistribution();
      setScaleData(scaleResponse);
      
      // 加载增长趋势数据
      const growthResponse = await corporateService.getGrowthTrend();
      setGrowthData(growthResponse);
      
      // 加载交易额分布数据
      const transactionResponse = await corporateService.getTransactionDistribution();
      setTransactionData(transactionResponse);
    } catch (error) {
      console.error('Failed to load corporate portrait data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyDetail = async (companyId) => {
    try {
      const response = await corporateService.getCompanyDetail(companyId);
      return response;
    } catch (error) {
      console.error(`Failed to load company detail for ID ${companyId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    loadCompanyData();
  }, []);

  return {
    companyList,
    loading,
    statistics,
    industryData,
    regionData,
    scaleData,
    growthData,
    transactionData,
    loadCompanyData,
    getCompanyDetail,
  };
};

export default useCorporatePortrait;

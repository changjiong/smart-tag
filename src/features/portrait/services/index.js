/**
 * 客群画像服务导出文件
 * 重导出项目中的服务，以便客群画像模块使用
 */

// 从原有的服务目录中导出
export { 
  fetchCustomerData,
  fetchGroupData,
  createCustomerGroup,
  updateCustomerGroup,
  deleteCustomerGroup,
  fetchGroupInsights,
  fetchFunnelData,
  fetchYRFMData
} from '../../../services/portraitService';

// 如有需要可以添加更多导出

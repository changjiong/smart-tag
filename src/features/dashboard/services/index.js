/**
 * 仪表盘服务导出文件
 * 重导出项目中的服务，以便仪表盘模块使用
 */

// 从原有的服务目录中导出，保持代码结构一致性
export { 
  fetchDashboardData,
  fetchUserTasks,
  fetchRecentActivities,
  fetchMetrics
} from '../../../services/dashboardService';

// 如有需要可以添加更多导出

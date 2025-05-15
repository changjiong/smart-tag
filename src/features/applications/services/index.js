/**
 * 业务场景服务导出文件
 * 重导出项目中的服务，以便业务场景模块使用
 */

// 从原有的服务目录中导出，保持代码结构一致性
export { 
  getMarketingGoals, 
  getTargetGroupRecommendations, 
  getContentRecommendations,
  getChannelRecommendations,
  generateMarketingStrategy
} from '@/services/aiMarketingService';

export { 
  getChurnRiskMetrics, 
  getChurnRiskGroups, 
  getInterventionRecommendations,
  generateRetentionPlan
} from '@/services/aiRetentionService';

export { 
  getWealthGoals,
  getRiskAssessmentQuestions,
  generateAssetAllocation,
  getProductRecommendations,
  generatePerformanceProjection,
  generateWealthPlan
} from '@/services/aiWealthAdvisorService';

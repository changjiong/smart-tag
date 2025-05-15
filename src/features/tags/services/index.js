/**
 * 标签中心服务导出文件
 * 重导出项目中的服务，以便标签中心模块使用
 */

// 从原有的服务目录中导出
export { 
  fetchTags,
  fetchTagCategories,
  fetchTagMetadata,
  createTag,
  updateTag,
  deleteTag,
  fetchTagQualityMetrics,
  fetchTagAlerts
} from '../../../services/tagService';

// 如有需要可以添加更多导出

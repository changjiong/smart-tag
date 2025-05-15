/**
 * 业务场景模块导出文件
 * 集中导出模块中的所有组件，便于在其他地方引用
 */

// 主页面
export { default as ApplicationsPage } from './ApplicationsPage';
export { default as ApplicationsRoutes } from './ApplicationsRoutes';

// 业务场景页面
export { default as BusinessApplicationsPage } from './BusinessApplicationsPage';
export { default as PrecisionMarketingPage } from './PrecisionMarketingPage';
export { default as RetentionAssistantPage } from './RetentionAssistantPage';
export { default as WealthAdvisorPage } from './WealthAdvisorPage';

// 导出服务
export * from './services';

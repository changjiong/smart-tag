/**
 * 标签中心模块导出文件
 * 集中导出模块中的所有组件，便于在其他地方引用
 */

// 主页面
export { default as TagsPage } from './TagsPage';
export { default as TagsRoutes, tagsRoutes } from './TagsRoutes';

// 标签管理页面
export { default as MarketPage } from './management/MarketPage';
export { default as CategoriesPage } from './management/CategoriesPage';
export { default as InfoPage } from './management/InfoPage';
export { default as MetadataPage } from './management/MetadataPage';
export { default as UninstallPage } from './management/UninstallPage';
export { default as BatchUpdatePage } from './management/BatchUpdatePage';

// 标签创建页面
export { default as RequirementsPage } from './creation/RequirementsPage';
export { default as RegistrationPage } from './creation/RegistrationPage';
export { default as FactoryPage } from './creation/FactoryPage';
export { default as AIPage } from './creation/AIPage';

// 标签质量页面
export { default as QualityDashboardPage } from './quality/DashboardPage';
export { default as AlertsPage } from './quality/AlertsPage';
export { default as AlertConfigPage } from './quality/AlertConfigPage';
export { default as RuleAlertsPage } from './quality/RuleAlertsPage';
export { default as HistoryPage } from './quality/HistoryPage';

// 标签价值页面
export { default as ValueInsightsPage } from './value/InsightsPage';

// 导出服务和钩子
export * from './services';
export * from './hooks';

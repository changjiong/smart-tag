/**
 * 客群画像模块导出文件
 * 集中导出模块中的所有组件，便于在其他地方引用
 */

// 主页面
export { default as PortraitPage } from './PortraitPage';
export { default as PortraitRoutes, portraitRoutes } from './PortraitRoutes';

// 客群管理页面
export { default as CreatePage } from './groups/CreatePage';
export { default as PortraitAIPage } from './groups/AIPage';

// 客群分析页面
export { default as CustomerPage } from './analysis/CustomerPage';
export { default as GroupInsightsPage } from './analysis/GroupInsightsPage';
export { default as GroupPortraitPage } from './analysis/GroupPortraitPage';
export { default as FunnelPage } from './analysis/FunnelPage';
export { default as ComparisonPage } from './analysis/ComparisonPage';
export { default as YRFMPage } from './analysis/YRFMPage';

// 导出服务和钩子
export * from './services';
export * from './hooks';

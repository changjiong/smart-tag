/**
 * 仪表盘模块导出文件
 * 集中导出模块中的所有组件，便于在其他地方引用
 */

// 主页面
export { default as DashboardPage } from './DashboardPage';
export { default as DashboardRoutes, dashboardRoutes } from './DashboardRoutes';

// 仪表盘子页面
export { default as CockpitPage } from './CockpitPage';
export { default as AIAssistantPage } from './AIAssistantPage';

// 导出服务和钩子
export * from './services';
export * from './hooks';

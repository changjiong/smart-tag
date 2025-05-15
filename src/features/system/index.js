/**
 * 系统管理模块导出文件
 * 集中导出模块中的所有组件，便于在其他地方引用
 */

// 主页面
export { default as SystemPage } from './SystemPage';
export { default as SystemRoutes, systemRoutes } from './SystemRoutes';

// 用户管理页面
export { default as UserListPage } from './users/UserListPage';
export { default as RoleManagementPage } from './users/RoleManagementPage';
export { default as OrganizationManagementPage } from './users/OrganizationManagementPage';
export { default as WorkflowManagementPage } from './users/WorkflowManagementPage';

// 系统设置页面
export { default as ParametersPage } from './settings/ParametersPage';
export { default as AnnouncementsPage } from './settings/AnnouncementsPage';
export { default as SchedulesPage } from './settings/SchedulesPage';

// AI管理页面
export { default as ModelsPage } from './ai/ModelsPage';
export { default as PromptsPage } from './ai/PromptsPage';
export { default as KnowledgePage } from './ai/KnowledgePage';

// 监控管理页面
export { default as PlatformPage } from './monitoring/PlatformPage';
export { default as ServicesPage } from './monitoring/ServicesPage';
export { default as LogsPage } from './monitoring/LogsPage';
export { default as TrafficPage } from './monitoring/TrafficPage';

// OpenAPI管理页面
export { default as APITagsPage } from './openapi/APITagsPage';
export { default as DataOutputPage } from './openapi/DataOutputPage';

// 导出服务和钩子
export * from './services';
export * from './hooks';

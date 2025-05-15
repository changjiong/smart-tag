/**
 * 组件映射文件
 * 集中管理所有路由组件的导入
 * **注意:** 此文件应只包含 routeConfig.jsx 中实际使用的组件
 */

import React from 'react';

// --- 布局与基础组件 ---
import MainLayout from '../components/Layout/MainLayout';
import Login from '../pages/Login/Login';
import NotFoundPage from '../components/ErrorPages/NotFoundPage';

// --- 仪表盘 (根据路由调整) ---
import Dashboard from '../pages/Dashboard/Cockpit/Dashboard';
import Cockpit from '../pages/Dashboard/Cockpit/index';
import Assistant from '../pages/Dashboard/Aiassistant/AIAssistant';

// --- 标签中心 ---
import TagsRouter from '../pages/Tags/TagsRouter';
import TagMarket from '../pages/Tags/Management/Market';
import TagCategories from '../pages/Tags/Management/Categories';
import TagInfo from '../pages/Tags/Management/Info';
import TagMetadata from '../pages/Tags/Management/Metadata';
import TagUninstall from '../pages/Tags/Management/Uninstall';
import TagBatchUpdate from '../pages/Tags/Management/BatchUpdate';
import TagRequirements from '../pages/Tags/Creation/Requirements';
import TagRegistration from '../pages/Tags/Creation/Registration';
import TagFactory from '../pages/Tags/Creation/Factory';
import TagAI from '../pages/Tags/Creation/AI';
import TagQualityDashboard from '../pages/Tags/Quality/Dashboard';
import TagAlerts from '../pages/Tags/Quality/Alerts';
import TagAlertConfig from '../pages/Tags/Quality/AlertConfig';
import TagRuleAlerts from '../pages/Tags/Quality/RuleAlerts';
import TagHistory from '../pages/Tags/Quality/History';
import TagValueInsights from '../pages/Tags/Value/insights';

// --- 客群画像 ---
import PortraitRouter from '../pages/Portrait/PortraitRouter';
import GroupCreate from '../pages/Portrait/Groups/Create';
import GroupAI from '../pages/Portrait/Groups/AI';
import CustomerView from '../pages/Portrait/Analysis/Customer';
import GroupInsights from '../pages/Portrait/Analysis/GroupInsights';
import GroupPortrait from '../pages/Portrait/Analysis/GroupPortrait';
import FunnelAnalysis from '../pages/Portrait/Analysis/Funnel';
import GroupComparison from '../pages/Portrait/Analysis/Comparison';
import YRFMAnalysis from '../pages/Portrait/Analysis/YRFM';

// --- 业务场景 ---
import ApplicationsRouter from '../pages/Applications/ApplicationsRouter';
import BusinessRouter from '../pages/Applications/business/BusinessRouter';
import BusinessApplications from '../pages/Applications/business/BusinessApplications';
import PrecisionMarketing from '../pages/Applications/business/PrecisionMarketing';
import RetentionAssistant from '../pages/Applications/business/RetentionAssistant';
import WealthAdvisor from '../pages/Applications/business/WealthAdvisor';
import RiskMonitor from '../pages/Applications/business/RiskMonitor';
import CorporatePortrait from '../pages/Applications/business/CorporatePortrait';

// --- 系统管理 ---
import SystemRouter from '../pages/System/SystemRouter';
import Organizations from '../pages/System/Users/Organizations';
import Accounts from '../pages/System/Users/Accounts';
import Roles from '../pages/System/Users/Roles';
import Workflows from '../pages/System/Users/Workflows';
import Schedules from '../pages/System/Settings/Schedules';
import Parameters from '../pages/System/Settings/Parameters';
import Announcements from '../pages/System/Settings/Announcements';
import AIModels from '../pages/System/AI/Models';
import AIPrompts from '../pages/System/AI/Prompts';
import AIKnowledge from '../pages/System/AI/Knowledge';
import TrafficMonitoring from '../pages/System/Monitoring/Traffic';
import LogsMonitoring from '../pages/System/Monitoring/Logs';
import PlatformMonitoring from '../pages/System/Monitoring/Platform';
import DataOutput from '../pages/System/OpenAPI/DataOutput';
import APITags from '../pages/System/OpenAPI/APITags';

// --- 组件映射对象 (与 routeConfig.jsx 对应) ---
export const componentMap = {
  // 布局与基础
  mainLayout: MainLayout,
  login: Login,
  notFound: NotFoundPage,

  // 仪表盘
  dashboard: Dashboard,
  cockpit: Cockpit,
  assistant: Assistant,

  // 标签中心
  tagsRouter: TagsRouter,
  tagMarket: TagMarket,
  tagCategories: TagCategories,
  tagInfo: TagInfo,
  tagMetadata: TagMetadata,
  tagUninstall: TagUninstall,
  tagBatchUpdate: TagBatchUpdate,
  tagRequirements: TagRequirements,
  tagRegistration: TagRegistration,
  tagFactory: TagFactory,
  tagAI: TagAI,
  tagQualityDashboard: TagQualityDashboard,
  tagAlerts: TagAlerts,
  tagAlertConfig: TagAlertConfig,
  tagRuleAlerts: TagRuleAlerts,
  tagHistory: TagHistory,
  tagValueInsights: TagValueInsights,

  // 客群画像
  portraitRouter: PortraitRouter,
  groupCreate: GroupCreate,
  groupAI: GroupAI,
  customerView: CustomerView,
  groupInsights: GroupInsights,
  groupPortrait: GroupPortrait,
  funnelAnalysis: FunnelAnalysis,
  groupComparison: GroupComparison,
  yrfmAnalysis: YRFMAnalysis,

  // 业务场景
  applicationsRouter: ApplicationsRouter,
  businessRouter: BusinessRouter,
  businessApplications: BusinessApplications,
  precisionMarketing: PrecisionMarketing,
  retentionAssistant: RetentionAssistant,
  wealthAdvisor: WealthAdvisor,
  riskMonitor: RiskMonitor,
  corporatePortrait: CorporatePortrait,

  // 系统管理
  systemRouter: SystemRouter,
  organizations: Organizations,
  accounts: Accounts,
  roles: Roles,
  workflows: Workflows,
  schedules: Schedules,
  parameters: Parameters,
  announcements: Announcements,
  aiModels: AIModels,
  aiPrompts: AIPrompts,
  aiKnowledge: AIKnowledge,
  trafficMonitoring: TrafficMonitoring,
  logsMonitoring: LogsMonitoring,
  platformMonitoring: PlatformMonitoring,
  dataOutput: DataOutput,
  apiTags: APITags
};

// 辅助函数：根据组件名获取组件
export const getComponent = (componentName) => {
  const component = componentMap[componentName];
  if (!component) {
    console.warn(`Component \"${componentName}\" not found in componentMap`);
    return () => React.createElement('div', null, `Component not found: ${componentName}`);
  }
  return component;
};

export default componentMap;
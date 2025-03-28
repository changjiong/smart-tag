import React from 'react';
import { Outlet } from 'react-router-dom';
import { createPlaceholderPage } from '../../components/Common/PageFactory';

// 零售营销应用页面
import RetailMarketingPage from './RetailMarketing/RetailMarketingPage';
import PrecisionMarketing from './RetailMarketing/PrecisionMarketing';
const CustomerAcquisition = createPlaceholderPage('新客获取平台', '通过数字渠道高效获取潜在客户，提升获客转化率和降低获客成本。');
const CrossSelling = createPlaceholderPage('交叉销售助手', '基于客户画像和产品关联分析，推荐最适合的交叉销售产品组合。');
const DigitalMarketing = createPlaceholderPage('数字营销平台', '一站式数字营销解决方案，支持多渠道营销活动的策划、执行和效果评估。');

// 客户经营应用页面
import CustomerManagementPage from './CustomerManagement/CustomerManagementPage';
import RetentionAssistant from './CustomerManagement/RetentionAssistant';
import RetentionAssistantRedirect from './business/RetentionAssistantRedirect';

// 业务应用中心
import BusinessApplications from './business/BusinessApplications';
import SceneTemplates from './business/SceneTemplates';
import TemplatesRouter from './templates/TemplatesRouter';

const ValueEnhancement = createPlaceholderPage('客户价值提升', '通过深度分析客户行为和需求，提供客户价值提升的策略和工具。');
const LifecycleManagement = createPlaceholderPage('客户生命周期管理', '全面管理客户从获取到忠诚的全生命周期，优化每个阶段的客户体验。');
const LoyaltyProgram = createPlaceholderPage('忠诚度计划管理', '设计和管理客户忠诚度计划，提高客户粘性和复购率。');

// 财富管理应用页面
const WealthManagementPage = createPlaceholderPage('财富管理应用', '智能化的财富管理解决方案，提供个性化的投资建议和资产配置。');

// 风险管控应用页面
const RiskManagementPage = createPlaceholderPage('风险管控应用', '全面的风险管理解决方案，帮助识别、评估和应对各类风险。');

// 对公业务应用页面
const CorporatePage = createPlaceholderPage('对公业务应用', '针对企业客户的全方位业务解决方案，提升企业服务能力。');

// 应用分类管理页面
const ApplicationManagementPage = createPlaceholderPage('应用分类管理', '管理和分类所有业务应用，便于用户快速查找和使用。');

export {
  // 路由组件
  RetailMarketingPage,
  CustomerManagementPage,
  WealthManagementPage,
  RiskManagementPage,
  CorporatePage,
  ApplicationManagementPage,
  TemplatesRouter,
  
  // 具体页面组件
  PrecisionMarketing,
  CustomerAcquisition,
  CrossSelling,
  DigitalMarketing,
  RetentionAssistant,
  RetentionAssistantRedirect,
  BusinessApplications,
  SceneTemplates,
  ValueEnhancement,
  LifecycleManagement,
  LoyaltyProgram
}; 
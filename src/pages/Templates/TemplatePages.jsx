import React from 'react';
import { createPlaceholderPage } from '../../components/Common/PageFactory';

// 模板库页面
const TemplateLibraryPage = createPlaceholderPage('模板库', '选择和使用预设的业务场景模板，快速构建应用。');
const RetailTemplate = createPlaceholderPage('零售金融场景包', '针对零售金融业务的场景模板集合，包含获客、转化、留存等完整链路。');
const CorporateTemplate = createPlaceholderPage('对公业务场景包', '面向对公业务的场景模板集合，助力企业客户服务升级。');
const RiskTemplate = createPlaceholderPage('风控合规场景包', '风险管控和合规管理相关的场景模板集合，提升风控效率。');
const CustomerTemplate = createPlaceholderPage('客户经营场景包', '客户全生命周期经营的场景模板集合，优化客户体验和价值提升。');

// 模板应用页面
const TemplateApplicationsPage = createPlaceholderPage('模板应用', '将模板应用到实际业务场景中，实现快速部署。');
const TemplateMapping = createPlaceholderPage('模板业务映射', '将场景模板与实际业务流程进行映射，实现业务场景的快速落地。');
const TemplateConfiguration = createPlaceholderPage('模板实例化配置', '根据业务需求对场景模板进行参数配置和实例化。');
const TemplateMonitoring = createPlaceholderPage('模板应用监控', '监控场景模板的应用状态和效果，及时调整优化。');

// 模板管理页面
const TemplateManagementPage = createPlaceholderPage('模板管理', '创建、配置和管理场景模板，支持模板的版本管理和迭代优化。');
const TemplateCreation = createPlaceholderPage('模板创建', '创建新的场景模板，定义模板的业务逻辑和参数配置。');
const TemplateParameters = createPlaceholderPage('模板参数化配置', '对场景模板进行参数化设置，支持灵活的业务规则配置。');
const TemplateVersions = createPlaceholderPage('模板版本管理', '管理场景模板的版本历史，支持版本的回退和比较。');
const TemplateEvaluation = createPlaceholderPage('模板效果评估', '评估场景模板的应用效果，提供优化建议。');

export {
  // 模板库
  TemplateLibraryPage,
  RetailTemplate,
  CorporateTemplate,
  RiskTemplate,
  CustomerTemplate,
  
  // 模板应用
  TemplateApplicationsPage,
  TemplateMapping,
  TemplateConfiguration,
  TemplateMonitoring,
  
  // 模板管理
  TemplateManagementPage,
  TemplateCreation,
  TemplateParameters,
  TemplateVersions,
  TemplateEvaluation
}; 
import React from 'react';
import { createPlaceholderPage } from '../../components/Common/PageFactory';

// API服务页面
const APIServicesPage = createPlaceholderPage('API服务', '提供标准化的API接口，支持外部系统调用标签和分析能力。');
const TagsAPI = createPlaceholderPage('标签快递（API）', '通过API接口快速获取客户标签数据，支持实时调用和批量获取。');
const PortraitsAPI = createPlaceholderPage('画像输出', '提供客户画像数据的API接口，支持多维度的客户特征输出。');
const GroupsAPI = createPlaceholderPage('客群输出', '通过API接口输出客群数据，支持客群的实时查询和订阅更新。');

// 数据服务页面
const DataServicesPage = createPlaceholderPage('数据服务', '提供标准化的数据服务，支持数据的订阅、推送和管理。');
const DataCatalog = createPlaceholderPage('数据资产目录', '展示和管理所有可用的数据资产，方便用户查找和使用。');
const DataSubscription = createPlaceholderPage('数据订阅', '支持用户订阅所需的数据资产，并定期接收数据更新。');
const DataPush = createPlaceholderPage('数据推送配置', '配置数据推送的目标系统、频率和格式，实现数据的自动分发。');

// 服务监控页面
const MonitoringPage = createPlaceholderPage('服务监控', '监控API和数据服务的运行状态和性能指标，确保服务质量。');
const APIStatistics = createPlaceholderPage('调用统计', '统计分析API的调用情况，包括调用次数、成功率和响应时间等指标。');
const PerformanceMonitoring = createPlaceholderPage('性能监控', '监控API和数据服务的性能指标，及时发现和解决性能问题。');
const AlertManagement = createPlaceholderPage('告警管理', '设置和管理服务监控的告警规则，及时响应异常情况。');

export {
  // API服务
  APIServicesPage,
  TagsAPI,
  PortraitsAPI,
  GroupsAPI,
  
  // 数据服务
  DataServicesPage,
  DataCatalog,
  DataSubscription,
  DataPush,
  
  // 服务监控
  MonitoringPage,
  APIStatistics,
  PerformanceMonitoring,
  AlertManagement
}; 
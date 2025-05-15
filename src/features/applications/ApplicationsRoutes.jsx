import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import ApplicationsPage from './ApplicationsPage';

// 懒加载业务场景子页面
const PrecisionMarketingPage = lazy(() => import('./PrecisionMarketingPage'));
const RetentionAssistantPage = lazy(() => import('./RetentionAssistantPage'));
const WealthAdvisorPage = lazy(() => import('./WealthAdvisorPage'));
const BusinessApplicationsPage = lazy(() => import('./BusinessApplicationsPage'));
const RiskMonitorPage = lazy(() => import('./RiskMonitorPage'));
const CorporatePortraitPage = lazy(() => import('./CorporatePortraitPage'));

// 懒加载Templates页面
const TemplatesPage = lazy(() => import('./templates/TemplatesPage'));

/**
 * 业务场景模块路由配置
 * 使用懒加载提高性能
 */
const ApplicationsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ApplicationsPage />}>
        {/* 默认重定向到业务应用入口页 */}
        <Route index element={<Navigate to="home" replace />} />
        
        {/* 业务应用入口页路由 */}
        <Route path="home" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <BusinessApplicationsPage />
          </Suspense>
        } />

        {/* 精准营销路由 */}
        <Route path="marketing" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <PrecisionMarketingPage />
          </Suspense>
        } />

        {/* 客户振留路由 */}
        <Route path="retention" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <RetentionAssistantPage />
          </Suspense>
        } />

        {/* 财富顾问路由 */}
        <Route path="wealth" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <WealthAdvisorPage />
          </Suspense>
        } />

        {/* 风险监控路由 */}
        <Route path="risk" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <RiskMonitorPage />
          </Suspense>
        } />

        {/* 企业画像路由 */}
        <Route path="corporate" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <CorporatePortraitPage />
          </Suspense>
        } />
        
        {/* 模板路由 */}
        <Route path="templates" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <TemplatesPage />
          </Suspense>
        } />
        
        {/* 兼容旧版业务场景路由结构 */}
        <Route path="business" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <BusinessApplicationsPage />
          </Suspense>
        } />
        
        <Route path="business/marketing-engine" element={<Navigate to="/applications/marketing" replace />} />
        <Route path="business/retention-assistant" element={<Navigate to="/applications/retention" replace />} />
        <Route path="business/wealth-advisor" element={<Navigate to="/applications/wealth" replace />} />
        <Route path="business/risk-monitor" element={<Navigate to="/applications/risk" replace />} />
        <Route path="business/corporate-portrait" element={<Navigate to="/applications/corporate" replace />} />
      </Route>
    </Routes>
  );
};

export default ApplicationsRoutes;

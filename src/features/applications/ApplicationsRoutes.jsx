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
        {/* 默认重定向到业务场景 */}
        <Route index element={<Navigate to="business" replace />} />
        
        {/* 业务场景路由 */}
        <Route path="business" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <BusinessApplicationsPage />
          </Suspense>
        } />

        {/* 业务专项路由 */}
        <Route path="business/marketing-engine" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <PrecisionMarketingPage />
          </Suspense>
        } />

        <Route path="business/retention-assistant" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <RetentionAssistantPage />
          </Suspense>
        } />

        <Route path="business/wealth-advisor" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <WealthAdvisorPage />
          </Suspense>
        } />

        <Route path="business/risk-monitor" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <RiskMonitorPage />
          </Suspense>
        } />

        <Route path="business/corporate-portrait" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <CorporatePortraitPage />
          </Suspense>
        } />
        
        {/* 原有的路由保留兼容性 */}
        <Route path="marketing" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <PrecisionMarketingPage />
          </Suspense>
        } />
        
        <Route path="retention" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <RetentionAssistantPage />
          </Suspense>
        } />
        
        <Route path="wealth" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <WealthAdvisorPage />
          </Suspense>
        } />

        {/* 模板路由 */}
        <Route path="templates" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <TemplatesPage />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
};

export default ApplicationsRoutes;

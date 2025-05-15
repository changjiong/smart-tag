import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import ApplicationsPage from './ApplicationsPage';

// 懒加载业务场景子页面
const PrecisionMarketingPage = lazy(() => import('./PrecisionMarketingPage'));
const RetentionAssistantPage = lazy(() => import('./RetentionAssistantPage'));
const WealthAdvisorPage = lazy(() => import('./WealthAdvisorPage'));
const BusinessApplicationsPage = lazy(() => import('./BusinessApplicationsPage'));

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
        
        {/* 精准营销 */}
        <Route path="marketing" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <PrecisionMarketingPage />
          </Suspense>
        } />
        
        {/* 客户挽留 */}
        <Route path="retention" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <RetentionAssistantPage />
          </Suspense>
        } />
        
        {/* 财富顾问 */}
        <Route path="wealth" element={
          <Suspense fallback={<div className="loading-container"><Spin size="large" /></div>}>
            <WealthAdvisorPage />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
};

export default ApplicationsRoutes;

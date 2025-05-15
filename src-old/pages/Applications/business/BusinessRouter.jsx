import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

/**
 * 业务应用路由组件
 * 负责业务应用中心所有页面的路由管理
 * 包括场景模板、客户挽留助手等功能
 */
const BusinessRouter = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('[BusinessRouter] Current path:', location.pathname);
  }, [location]);

  return (
    <div className="flex-1 w-full min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default BusinessRouter; 
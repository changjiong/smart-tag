import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

/**
 * 业务应用中心路由组件
 * 负责处理业务应用中心相关的路由导航
 */
const ApplicationsRouter = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('[ApplicationsRouter] Current path:', location.pathname);
  }, [location]);
  
  return (
    <div className="flex-1 w-full">
      <Outlet />
    </div>
  );
};

export default ApplicationsRouter; 
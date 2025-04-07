import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 业务应用中心路由组件
 * 负责处理业务应用中心相关的路由导航
 */
const ApplicationsRouter = () => {
  useEffect(() => {
    console.log('[ApplicationsRouter] Rendering ApplicationsRouter component');
  }, []);
  
  return (
    <Outlet />
  );
};

export default ApplicationsRouter; 
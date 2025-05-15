import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 仪表盘主页面组件
 * 作为仪表盘模块的入口组件，使用Outlet渲染子路由
 */
const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <Outlet />
    </div>
  );
};

export default DashboardPage;

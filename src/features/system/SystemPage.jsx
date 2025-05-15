import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 系统管理主页面组件
 * 作为系统管理模块的入口组件，使用Outlet渲染子路由
 */
const SystemPage = () => {
  return (
    <div className="system-container">
      <Outlet />
    </div>
  );
};

export default SystemPage;

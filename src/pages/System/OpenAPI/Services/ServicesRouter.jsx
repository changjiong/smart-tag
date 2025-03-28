import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * API服务路由组件
 * 负责管理API服务相关的路由
 */
const ServicesRouter = () => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-800 mb-3">API服务</h3>
      <p className="text-gray-600 mb-5">管理系统对外提供的API服务和接口</p>
      <Outlet />
    </div>
  );
};

export default ServicesRouter; 
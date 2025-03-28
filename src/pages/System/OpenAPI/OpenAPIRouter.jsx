import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

/**
 * 开放能力路由组件
 * 负责处理系统管理中的开放能力相关路由导航
 */
const OpenAPIRouter = () => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-medium text-gray-800 mb-4">开放能力</h2>
      <p className="text-gray-600 mb-6">管理系统对外开放的API和数据服务</p>
      <Outlet />
    </div>
  );
};

export default OpenAPIRouter; 
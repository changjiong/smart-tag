import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

/**
 * 系统管理路由组件
 * 负责处理系统管理相关的路由导航
 */
const SystemRouter = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">系统管理</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default SystemRouter; 
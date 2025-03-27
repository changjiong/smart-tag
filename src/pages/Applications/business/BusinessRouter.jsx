import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 业务应用路由组件
 * 负责业务应用模块的路由导航
 */
const BusinessRouter = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">业务解决方案</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default BusinessRouter; 
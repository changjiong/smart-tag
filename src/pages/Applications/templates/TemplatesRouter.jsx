import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 业务应用模板路由组件
 * 负责业务应用模板的路由导航
 */
const TemplatesRouter = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">业务应用中心</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default TemplatesRouter; 
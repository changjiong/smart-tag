import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 客群画像路由组件
 * 负责处理客群画像相关的路由导航
 */
const PortraitRouter = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">客群画像</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default PortraitRouter; 
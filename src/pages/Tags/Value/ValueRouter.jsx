import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 标签价值路由组件
 * 负责处理标签价值相关的路由导航
 */
const ValueRouter = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-1">
      <div className="p-3 border-b border-gray-100">
        <h2 className="text-lg font-semibold">标签价值</h2>
      </div>
      
      {/* 渲染嵌套路由内容 */}
      <Outlet />
    </div>
  );
};

export default ValueRouter; 
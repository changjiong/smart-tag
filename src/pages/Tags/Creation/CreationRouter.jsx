import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

/**
 * 标签创建模块的路由组件
 * 负责渲染标签创建相关的子路由内容
 */
const CreationRouter = () => {
  const location = useLocation();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-1">
      <div className="p-3 border-b border-gray-100">
      </div>
      
      {/* 渲染嵌套路由内容 */}
      <Outlet />
    </div>
  );
};

export default CreationRouter; 
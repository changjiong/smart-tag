import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFoundPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">页面未找到</h2>
        
        <div className="mb-6 p-4 bg-gray-50 rounded text-left">
          <p className="text-sm font-medium">当前路径信息:</p>
          <p className="text-sm font-mono mt-1 text-gray-700 break-all">{currentPath}</p>
        </div>
        
        <p className="text-gray-600 mb-8">
          您访问的页面不存在或已被移除。请检查菜单路径与路由配置是否匹配。
        </p>
        
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 
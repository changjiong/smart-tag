import React from 'react';

/**
 * 基础页面模板组件
 * 用于快速创建新页面，提供统一的页面结构和样式
 */
const PageTemplate = ({ title, children }) => {
  return (
    <div className="min-h-full bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            {children || (
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-gray-500">页面开发中...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTemplate; 
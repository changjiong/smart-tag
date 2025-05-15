import React from 'react';

/**
 * 通用占位页面组件
 * 用于快速创建尚未实现的页面
 */
const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-medium text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description || '此页面正在开发中...'}</p>
      
      <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        <p className="text-gray-500 text-center">该功能即将上线，敬请期待！</p>
      </div>
    </div>
  );
};

export default PlaceholderPage; 
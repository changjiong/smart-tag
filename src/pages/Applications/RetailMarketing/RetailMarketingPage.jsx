import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

/**
 * 零售营销应用页面组件
 */
const RetailMarketingPage = () => {
  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-4">零售营销应用</h2>
      <Outlet />
    </div>
  );
};

export default RetailMarketingPage; 
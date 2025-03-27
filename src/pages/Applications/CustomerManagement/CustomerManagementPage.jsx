import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 客户经营应用页面组件
 */
const CustomerManagementPage = () => {
  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-4">客户经营应用</h2>
      <Outlet />
    </div>
  );
};

export default CustomerManagementPage; 
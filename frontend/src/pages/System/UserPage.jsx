import React from 'react';
import { Outlet } from 'react-router-dom';

const UserPage = () => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">用户权限管理</h2>
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p>用户权限管理页面，包括机构管理、用户管理、角色管理等功能。</p>
      </div>
      <Outlet />
    </div>
  );
};

export default UserPage; 
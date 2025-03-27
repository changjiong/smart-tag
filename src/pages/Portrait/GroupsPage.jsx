import React from 'react';
import { Outlet } from 'react-router-dom';

const GroupsPage = () => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">客群管理</h2>
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p>客群管理页面，包括客群创建、智能分群、相似客群发现和客群洞察库等功能。</p>
      </div>
      <Outlet />
    </div>
  );
};

export default GroupsPage; 
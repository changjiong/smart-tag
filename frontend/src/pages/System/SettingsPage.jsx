import React from 'react';
import { Outlet } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">系统配置</h2>
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p>系统配置页面，包括调度任务、参数设置、公告管理等功能。</p>
      </div>
      <Outlet />
    </div>
  );
};

export default SettingsPage; 
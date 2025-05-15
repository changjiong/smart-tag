import React from 'react';
import { Outlet } from 'react-router-dom';
import { Typography } from 'antd';

/**
 * 业务场景模块主页面
 * 作为业务场景相关页面的容器，使用Outlet渲染子路由
 */
const ApplicationsPage = () => {
  return (
    <div className="applications-page">
      <Outlet />
    </div>
  );
};

export default ApplicationsPage;

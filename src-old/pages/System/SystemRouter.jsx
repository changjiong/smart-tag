import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

/**
 * 系统管理路由组件
 * 负责处理系统管理相关的路由导航
 */
const SystemRouter = () => {
  return (
    <Outlet />
  );
};

export default SystemRouter; 
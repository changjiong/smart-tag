import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 客群画像主页面组件
 * 作为客群画像模块的入口组件，使用Outlet渲染子路由
 */
const PortraitPage = () => {
  return (
    <div className="portrait-container">
      <Outlet />
    </div>
  );
};

export default PortraitPage;

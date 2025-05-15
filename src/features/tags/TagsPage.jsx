import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 标签中心主页面组件
 * 作为标签中心模块的入口组件，使用Outlet渲染子路由
 */
const TagsPage = () => {
  return (
    <div className="tags-container">
      <Outlet />
    </div>
  );
};

export default TagsPage;

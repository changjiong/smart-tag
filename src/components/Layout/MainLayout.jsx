import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { MenuProvider } from './MenuContext';

/**
 * 主布局组件
 * 负责整体页面布局结构，包括侧边栏、顶部导航和内容区域
 * 使用MenuProvider提供菜单状态管理
 */
const MainLayout = ({ children, handleLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // 处理响应式侧边栏
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);

      // 在移动视图下默认关闭侧边栏，桌面视图下默认打开
      if (isMobileView !== isMobile) {
        setSidebarOpen(!isMobileView);
      }
    };

    // 初始化和监听窗口大小变化
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // 切换侧边栏开关状态
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 关闭侧边栏（通常在移动视图点击菜单项后）
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <MenuProvider>
      <div className="flex h-screen bg-gray-100">
        {/* 侧边栏 */}
        <Sidebar
          isOpen={sidebarOpen}
          isMobile={isMobile}
          closeSidebar={closeSidebar}
        />

        {/* 主内容区域 */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen && !isMobile ? 'ml-64' : ''}`}>
          {/* 顶部导航 */}
          <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

          {/* 内容区域 */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children || <Outlet />}
          </main>

          {/* 页脚 */}
          <Footer />
        </div>

        {/* 移动设备下的遮罩层 */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
      </div>
    </MenuProvider>
  );
};

export default MainLayout;
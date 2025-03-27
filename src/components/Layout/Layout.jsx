import React, { useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { MenuProvider } from './MenuContext';
import AIAssistant from '../AIAssistant/AIAssistant';

// 临时导入仪表盘服务用于获取数据
import { fetchDashboardData } from '../../services/dashboardService';
import { useUserRole } from '../../hooks/useUserRole';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const location = useLocation();
  const { userRole } = useUserRole();
  
  // 响应式侧边栏
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 获取仪表盘数据，用于智能助手上下文
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        if (userRole) {
          const data = await fetchDashboardData('month', userRole);
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Failed to load dashboard data for assistant:', error);
      }
    };
    
    loadDashboardData();
  }, [userRole]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <MenuProvider>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: '#1677ff',
            borderRadius: 4,
          },
        }}
      >
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {/* === Sidebar === */}
          <Sidebar 
            isOpen={isSidebarOpen} 
            isMobile={isMobile} 
            closeSidebar={closeSidebar} 
          />

          {/* === Overlay === */}
          <div
            onClick={() => setIsSidebarOpen(false)}
            className={`fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-30 lg:hidden ${
              isSidebarOpen ? 'block' : 'hidden'
            }`}
          ></div>

          <div className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ${
            isSidebarOpen ? 'lg:ml-72.5' : ''
          }`}>
            {/* === Header === */}
            <Header
              toggleSidebar={toggleSidebar}
            />

            {/* === Main Content === */}
            <main className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </main>
          </div>
          
          {/* 智能助手组件 */}
          <AIAssistant dashboardData={dashboardData} />
        </div>
      </ConfigProvider>
    </MenuProvider>
  );
};

export default Layout; 
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { MenuProvider } from './MenuContext';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // 响应式侧边栏
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <MenuProvider>
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
      </div>
    </MenuProvider>
  );
};

export default Layout; 
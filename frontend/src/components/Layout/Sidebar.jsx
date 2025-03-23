import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// 导入与Header相同的菜单结构
import { menuItems } from './menuData';

const Sidebar = ({ isOpen, isMobile, closeSidebar, activeMenu }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedMenus, setExpandedMenus] = useState({});
  
  // 获取当前活动的一级菜单
  const activeMainMenu = menuItems.find(item => item.name === activeMenu) || menuItems[0];
  
  // 检测路径变化，自动展开当前路径对应的菜单
  useEffect(() => {
    const currentPath = location.pathname;
    
    // 查找当前路径匹配的菜单项并展开
    if (activeMainMenu && activeMainMenu.children) {
      activeMainMenu.children.forEach(level2Item => {
        // 检查二级菜单是否匹配当前路径
        if (currentPath.startsWith(level2Item.path)) {
          setExpandedMenus(prev => ({
            ...prev,
            [level2Item.name]: true
          }));
          
          // 检查三级菜单
          if (level2Item.children) {
            level2Item.children.forEach(level3Item => {
              if (currentPath.startsWith(level3Item.path)) {
                setExpandedMenus(prev => ({
                  ...prev,
                  [level3Item.name]: true
                }));
              }
            });
          }
        }
      });
    }
  }, [location.pathname, activeMainMenu]);
  
  const handleNavClick = () => {
    if (isMobile) closeSidebar();
  };
  
  const toggleSubmenu = (menuName, event) => {
    event.preventDefault();
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md overflow-y-auto transition-transform transform z-40 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } ${isMobile ? 'z-50' : 'z-30'}`}>
      {/* 侧边栏头部 - 显示当前活动的菜单名称 */}
      <div className="h-16 px-4 flex items-center border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">{activeMainMenu.name}</h2>
      </div>
      
      {/* 侧边栏内容 - 只显示当前活动一级菜单的子菜单 */}
      <nav className="px-2 pt-4">
        {activeMainMenu && activeMainMenu.children && activeMainMenu.children.map((level2Item, index) => (
          <div key={index} className="mb-4">
            {/* 二级菜单项 - 可折叠 */}
            <div className="mb-2">
              <button
                onClick={(e) => toggleSubmenu(level2Item.name, e)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPath.startsWith(level2Item.path) 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{level2Item.name}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${expandedMenus[level2Item.name] ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
            
            {/* 三级菜单项 */}
            {expandedMenus[level2Item.name] && level2Item.children && (
              <div className="ml-4 space-y-1">
                {level2Item.children.map((level3Item, idx) => (
                  <NavLink
                    key={idx}
                    to={level3Item.path}
                    onClick={handleNavClick}
                    className={({ isActive }) => `
                      block px-3 py-2 text-sm rounded-md ${
                        isActive
                        ? 'text-blue-600 bg-blue-50 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {level3Item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
import React, { useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useMenuContext } from './MenuContext';

// 导入与Header相同的菜单结构
import { menuItems } from './menuData';

const Sidebar = ({ isOpen, isMobile, closeSidebar }) => {
  const location = useLocation();
  
  // 使用Context获取菜单状态和方法
  const { 
    activeMenu, 
    activeSubMenu, 
    expandedMenus, 
    setExpandedMenus, 
    handleMenuChange, 
    toggleSubmenu, 
    activePath 
  } = useMenuContext();
  
  // 更安全地获取当前活动的一级菜单，确保它是有效的
  const activeMainMenu = activeMenu && menuItems.find(item => item.name === activeMenu);
  // 如果找不到活动菜单，回退到第一个菜单项（如果存在）
  const mainMenu = activeMainMenu || (menuItems && menuItems.length > 0 ? menuItems[0] : null);
  
  // 处理导航项点击
  const handleNavClick = useCallback(() => {
    if (isMobile) closeSidebar();
  }, [isMobile, closeSidebar]);
  
  // 处理菜单项点击 - 将信息传递给Layout
  const handleMenuItemClick = useCallback((level2Item, level3Item = null) => {
    try {
      // 确保activeMenu存在
      if (!activeMenu) {
        console.error("[DEBUG-Sidebar] activeMenu is undefined in handleMenuItemClick");
        return;
      }
      
      // 打印当前点击的菜单项
      console.log("[DEBUG-Sidebar] Handling menu item click:", { 
        activeMenu, 
        level2Name: level2Item?.name, 
        level3Name: level3Item?.name,
        level2Path: level2Item?.path,
        level3Path: level3Item?.path,
        currentPath: location.pathname
      });
      
      // 特殊处理场景模板菜单项
      if (level2Item.name === "场景模板") {
        console.log("[DEBUG-Sidebar] Special handling for 场景模板 menu item");
        console.log("[DEBUG-Sidebar] 直接导航到路径:", level2Item.path);
        
        // 为了确保场景模板页面正确显示，直接处理菜单点击
        handleMenuChange({
          menuName: activeMenu,
          subMenuName: level2Item.name,
          path: level2Item.path
        });
        
        return;
      }
      
      // 如果是三级菜单项
      if (level3Item) {
        console.log("[DEBUG-Sidebar] 处理三级菜单点击:", level3Item.name);
        handleMenuChange({
          menuName: activeMenu,
          subMenuName: level2Item.name,
          thirdMenuName: level3Item.name,
          path: level3Item.path
        });
      } 
      // 如果是二级菜单项
      else {
        console.log("[DEBUG-Sidebar] 处理二级菜单点击:", level2Item.name);
        
        // 如果二级菜单有子菜单，优先选择第一个子菜单
        if (level2Item.children && level2Item.children.length > 0) {
          console.log("[DEBUG-Sidebar] 二级菜单有子菜单，选择第一个:", level2Item.children[0].name);
          handleMenuChange({
            menuName: activeMenu,
            subMenuName: level2Item.name,
            path: level2Item.children[0].path
          });
        } else {
          console.log("[DEBUG-Sidebar] 二级菜单无子菜单，直接导航:", level2Item.path);
          handleMenuChange({
            menuName: activeMenu,
            subMenuName: level2Item.name,
            path: level2Item.path
          });
        }
      }
    } catch (error) {
      console.error("[DEBUG-Sidebar] ❌ Error in handleMenuItemClick:", error, { level2Item, level3Item });
    }
  }, [activeMenu, handleMenuChange, location.pathname]);
  
  // 确保菜单数据始终可用
  if (!menuItems || menuItems.length === 0) {
    console.error("No menu items available in Sidebar");
    return null;
  }
  
  // 检查mainMenu是否有效，增加防御性编程
  if (!mainMenu) {
    console.error("Invalid mainMenu in Sidebar", { activeMenu });
    return null;
  }
  
  if (!isOpen) return null;
  
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md transform z-40 flex flex-col ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } ${isMobile ? 'z-50' : 'z-30'} transition-transform`}>
      {/* 侧边栏头部 - 显示SmartTag标识 - 固定不滚动 */}
      <div className="h-16 px-6 flex items-center justify-between bg-blue-600 flex-shrink-0">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white">Smart</span>
          <span className="text-2xl font-bold text-white">Tag</span>
        </div>
        {isMobile && (
          <button 
            onClick={closeSidebar}
            className="p-1 rounded text-white hover:text-blue-200 focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
      
      {/* 侧边栏内容 - 可滚动区域 */}
      <div className="flex-1 overflow-y-auto">
        <nav className="px-4 py-5">
          {/* 显示当前活动一级菜单的子菜单 */}
          {mainMenu && mainMenu.children && mainMenu.children.map((level2Item, index) => (
            <div key={index} className="mb-4">
              {/* 二级菜单项 - 可折叠 */}
              <div className="mb-2">
                <button
                  onClick={(e) => {
                    toggleSubmenu(level2Item.name, e);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    (activePath && level2Item.path && activePath.startsWith(level2Item.path)) || activeSubMenu === level2Item.name
                    ? 'text-blue-700 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{level2Item.name}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${expandedMenus && expandedMenus[level2Item.name] ? 'transform rotate-180' : ''}`} 
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
              {expandedMenus && expandedMenus[level2Item.name] && level2Item.children && (
                <div className="ml-4 pl-2 space-y-1 border-l border-gray-200">
                  {level2Item.children.map((level3Item, idx) => (
                    <NavLink
                      key={idx}
                      to={level3Item.path || '#'}
                      onClick={() => {
                        handleNavClick();
                        handleMenuItemClick(level2Item, level3Item);
                      }}
                      className={({ isActive }) => {
                        const isPathActive = activePath && level3Item.path && activePath === level3Item.path;
                        return `
                          block px-3 py-2 text-sm rounded-lg ${
                            isActive || isPathActive
                            ? 'text-blue-700 bg-blue-50 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                          }
                        `;
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{level3Item.name}</span>
                        {level3Item.isNew && (
                          <span className="ml-1 px-1.5 text-xs text-white bg-red-500 rounded-sm font-normal leading-4">NEW</span>
                        )}
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
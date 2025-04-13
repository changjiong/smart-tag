import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMenuContext } from './MenuContext';

// 导入菜单数据
import { menuItems } from './menuData';

const Header = ({ toggleSidebar, handleLogout }) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const location = useLocation();

  // 使用Context获取菜单状态和方法
  const { handleMenuChange, activeMenu, activePath: currentPath } = useMenuContext();

  // 主菜单点击处理 - 简化版
  const handleMainMenuClick = useCallback((menu) => {
    try {
      console.log("[Header] handleMainMenuClick called for menu:", menu.name);

      if (!handleMenuChange || typeof handleMenuChange !== 'function') {
        console.error("[Header] handleMenuChange is not a function", { handleMenuChange });
        return;
      }

      // 只需传递顶级菜单名称，Context会处理导航和状态
      handleMenuChange(menu.name);

    } catch (error) {
      console.error("[Header] Error in handleMainMenuClick:", error, { menu });
    }
  }, [handleMenuChange]);

  // 处理二级菜单点击 - 简化版
  const handleSubMenuClick = useCallback((mainMenu, subMenu, event) => {
    try {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (!handleMenuChange || typeof handleMenuChange !== 'function') {
        console.error("handleMenuChange is not a function in handleSubMenuClick", { handleMenuChange });
        return;
      }

      console.log(`[Header] Handling submenu click: ${mainMenu.name} > ${subMenu.name}`);

      let targetPath;
      // 如果二级菜单有子菜单，导航到第一个子菜单
      if (subMenu.children && subMenu.children.length > 0) {
        targetPath = subMenu.children[0].path;
      } else {
        targetPath = subMenu.path;
      }

      handleMenuChange({
        menuName: mainMenu.name,
        subMenuName: subMenu.name,
        path: targetPath
      });

    } catch (error) {
      console.error("Error in handleSubMenuClick:", error);
    }
  }, [handleMenuChange]);

  // 处理三级菜单点击 - 保持不变
  const handleThirdMenuClick = useCallback((mainMenu, subMenu, thirdMenu, event) => {
    try {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (!handleMenuChange || typeof handleMenuChange !== 'function') {
        console.error("handleMenuChange is not a function in handleThirdMenuClick", { handleMenuChange });
        return;
      }

      console.log(`[Header] Handling third menu click: ${mainMenu.name} > ${subMenu.name} > ${thirdMenu.name}`);

      handleMenuChange({
        menuName: mainMenu.name,
        subMenuName: subMenu.name,
        thirdMenuName: thirdMenu.name,
        path: thirdMenu.path
      });
    } catch (error) {
      console.error("Error in handleThirdMenuClick:", error);
    }
  }, [handleMenuChange]);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    if (notificationOpen) setNotificationOpen(false);
  };

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
    if (userDropdownOpen) setUserDropdownOpen(false);
  };

  const notifications = [
    { id: 1, message: '标签"高价值潜在客户"已创建', time: '10分钟前', read: false },
    { id: 2, message: '客群"理财达人"分析报告已生成', time: '30分钟前', read: false },
    { id: 3, message: '系统更新完成', time: '1小时前', read: true },
    { id: 4, message: '营销活动"年终理财"已启动', time: '2小时前', read: true },
  ];

  // 确保菜单数据始终可用
  if (!menuItems || menuItems.length === 0) {
    console.error("No menu items available in Header");
    return <div>加载中...</div>;
  }

  return (
    <header className="bg-white border-b border-gray-200 z-50 shadow-sm">
      {/* 主菜单栏 */}
      <div className="flex items-center px-4 py-2 border-b border-gray-100">
        {/* Logo区域 */}
        <div className="flex items-center ">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-blue-600 focus:outline-none mr-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* 顶部主菜单 */}
        <nav className="relative hidden md:flex flex-1 items-center">
          <ul className="flex space-x-1">
            {menuItems.map((menu, index) => (
              <li key={index} className="relative group"
                  onMouseEnter={() => setHoveredMenu(menu.name)}
                  onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  onClick={() => handleMainMenuClick(menu)}
                  className={`px-4 py-2 text-sm font-medium rounded-md flex items-center hover:bg-gray-100 transition-colors ${
                    activeMenu === menu.name || hoveredMenu === menu.name
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700'
                  }`}
                >
                  {menu.name}
                  {menu.children && menu.children.length > 0 && (
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform duration-200 ${hoveredMenu === menu.name ? 'transform rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  )}
                </button>

                {/* 二级菜单和三级菜单的下拉面板 */}
                {menu.children && menu.children.length > 0 && hoveredMenu === menu.name && (
                  <div
                    className="absolute left-0 top-[40px] bg-white shadow-lg border border-gray-200 z-50 w-auto rounded-sm transition-opacity duration-300"
                    style={{ minWidth: '750px', padding: '15px 20px' }}
                    onMouseEnter={() => setHoveredMenu(menu.name)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    {/* 三级菜单表格式布局 - 每列都有自己的二级菜单标题 */}
                    <div className="grid grid-cols-3 gap-x-8 gap-y-2">
                      {menu.children.map((submenu, subIdx) => (
                        <div key={subIdx} className="mb-2 px-2 py-1 rounded hover:bg-gray-50">
                          {/* 二级菜单标题 - 下划线与整个三级菜单列同宽 */}
                          <div className="mb-2 border-b border-gray-200 pb-1.5 w-full">
                            <button
                              onClick={(e) => handleSubMenuClick(menu, submenu, e)}
                              className="font-medium text-sm text-gray-800 hover:text-blue-600 block w-full text-left"
                            >
                              {submenu.name}
                            </button>
                          </div>

                          {/* 该二级菜单下的三级菜单项 - 超过4行时分列显示 */}
                          {submenu.children && submenu.children.length > 0 ? (
                            <div className="grid grid-cols-1 gap-x-2">
                              {/* 将三级菜单分组，每组最多4个项目 */}
                              {(() => {
                                try {
                                  // 如果三级菜单超过4个，分列显示
                                  if (submenu.children.length > 4) {
                                    // 计算需要的列数
                                    const columns = Math.ceil(submenu.children.length / 4);
                                    // 每列最多显示的项目数
                                    const itemsPerColumn = 4;

                                    return (
                                      <div className="flex space-x-4">
                                        {Array.from({ length: columns }).map((_, colIndex) => (
                                          <div key={colIndex} className="flex flex-col space-y-1.5">
                                            {submenu.children
                                              .slice(colIndex * itemsPerColumn, (colIndex + 1) * itemsPerColumn)
                                              .map((item, index) => (
                                                <button
                                                  key={index}
                                                  onClick={(e) => handleThirdMenuClick(menu, submenu, item, e)}
                                                  className="flex items-center py-0.5 text-sm text-gray-600 hover:text-blue-600 text-left w-full"
                                                >
                                                  {item.name}
                                                  {item.isNew && (
                                                    <span className="ml-1 px-1.5 text-xs text-white bg-red-500 rounded-sm font-normal leading-4">NEW</span>
                                                  )}
                                                </button>
                                              ))}
                                          </div>
                                        ))}
                                      </div>
                                    );
                                  } else {
                                    // 如果不超过4个，则单列显示
                                    return submenu.children.map((item, index) => (
                                      <button
                                        key={index}
                                        onClick={(e) => handleThirdMenuClick(menu, submenu, item, e)}
                                        className="flex items-center py-0.5 text-sm text-gray-600 hover:text-blue-600 text-left w-full"
                                      >
                                        {item.name}
                                        {item.isNew && (
                                          <span className="ml-1 px-1.5 text-xs text-white bg-red-500 rounded-sm font-normal leading-4">NEW</span>
                                        )}
                                      </button>
                                    ));
                                  }
                                } catch (error) {
                                  console.error("Error rendering third level menu:", error);
                                  return null;
                                }
                              })()}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* 右侧操作区 */}
        <div className="flex items-center ml-auto">
          {/* 通知图标 */}
          <div className="relative">
            <button
              onClick={toggleNotification}
              className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="sr-only">View notifications</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
              )}
            </button>

            {/* 通知下拉面板 */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
                <div className="py-2 px-3 border-b border-gray-200 font-semibold text-sm text-gray-700">通知中心</div>
                <ul className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                  {notifications.map(notification => (
                    <li key={notification.id} className={`px-3 py-2 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </li>
                  ))}
                </ul>
                <div className="py-1 px-3 border-t border-gray-200">
                  <Link to="/notifications" className="block text-center text-sm text-blue-600 hover:underline">查看所有通知</Link>
                </div>
              </div>
            )}
          </div>

          {/* 用户头像和下拉菜单 */}
          <div className="relative ml-3">
            <div>
              <button
                onClick={toggleUserDropdown}
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://via.placeholder.com/40/92c9e0/ffffff?text=U"
                  alt="User avatar"
                />
              </button>
            </div>
            {/* 用户下拉面板 */}
            {userDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50">
                <div className="py-1 rounded-md bg-white shadow-xs">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm leading-5 text-gray-700">当前用户</p>
                    <p className="text-sm font-medium leading-5 text-gray-900 truncate">admin@example.com</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">个人中心</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">系统设置</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    退出登录
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
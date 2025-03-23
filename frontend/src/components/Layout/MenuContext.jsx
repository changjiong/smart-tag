import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from './menuData';

// 用于深度比较的辅助函数
const isEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// 创建Context
const MenuContext = createContext();

// 创建Provider组件
export const MenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('首页');
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activePath, setActivePath] = useState('/');
  
  // 使用ref存储状态，避免依赖数组问题
  const activeMenuRef = useRef(activeMenu);
  const activeSubMenuRef = useRef(activeSubMenu);
  const expandedMenusRef = useRef(expandedMenus);
  
  // 同步ref和state
  useEffect(() => {
    activeMenuRef.current = activeMenu;
    activeSubMenuRef.current = activeSubMenu;
    expandedMenusRef.current = expandedMenus;
  }, [activeMenu, activeSubMenu, expandedMenus]);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // 根据路径更新活动菜单
  useEffect(() => {
    try {
      const currentPath = location.pathname;
      if (currentPath !== activePath) {
        setActivePath(currentPath);
      }
      
      let foundMatch = false;
      
      // 查找匹配当前路径的菜单
      for (const menuItem of menuItems) {
        if (currentPath === menuItem.path || (menuItem.path && currentPath.startsWith(menuItem.path + '/'))) {
          if (activeMenuRef.current !== menuItem.name) {
            setActiveMenu(menuItem.name);
          }
          
          foundMatch = true;
          
          // 查找匹配的二级菜单
          if (menuItem.children) {
            for (const subMenu of menuItem.children) {
              if (currentPath === subMenu.path || (subMenu.path && currentPath.startsWith(subMenu.path + '/'))) {
                if (activeSubMenuRef.current !== subMenu.name) {
                  setActiveSubMenu(subMenu.name);
                  // 自动展开找到的菜单
                  setExpandedMenus(prev => {
                    const newExpandedMenus = {
                      ...prev,
                      [subMenu.name]: true
                    };
                    
                    // 只有在真正变化时才返回新对象
                    return isEqual(prev, newExpandedMenus) ? prev : newExpandedMenus;
                  });
                }
                break;
              }
            }
          }
          
          break;
        }
      }
      
      if (!foundMatch && activeMenuRef.current !== menuItems[0].name) {
        setActiveMenu(menuItems[0].name);
        setActiveSubMenu(null);
      }
    } catch (error) {
      console.error("Error updating active menu based on path:", error);
    }
  }, [location.pathname, activePath]); // 移除了activeMenu和activeSubMenu依赖
  
  // 处理菜单点击
  const handleMenuChange = useCallback((data) => {
    try {
      // 如果只传入了字符串，则按照之前的逻辑处理
      if (typeof data === 'string') {
        setActiveMenu(data);
        const menuItem = menuItems.find(item => item.name === data);
        if (menuItem) {
          navigate(menuItem.path);
        }
        return;
      }
      
      const { menuName, subMenuName, thirdMenuName, path } = data;
      
      // 更新活动菜单状态
      if (menuName) {
        setActiveMenu(menuName);
      }
      
      // 更新活动子菜单状态
      if (subMenuName) {
        setActiveSubMenu(subMenuName);
        
        // 设置展开状态
        setExpandedMenus(prev => {
          const newExpandedMenus = {
            ...prev,
            [subMenuName]: true
          };
          
          // 只有在真正变化时才返回新对象
          return isEqual(prev, newExpandedMenus) ? prev : newExpandedMenus;
        });
      } else {
        // 如果没有指定二级菜单，则默认清空展开状态
        setExpandedMenus({});
        setActiveSubMenu(null);
      }
      
      // 导航到指定路径
      if (path) {
        navigate(path);
      }
    } catch (error) {
      console.error("Error handling menu change:", error);
    }
  }, [navigate]);
  
  // 切换子菜单的展开状态
  const toggleSubmenu = useCallback((menuName, event) => {
    if (event) {
      event.preventDefault();
    }
    setExpandedMenus(prev => {
      const newExpandedMenus = {
        ...prev,
        [menuName]: !prev[menuName]
      };
      
      // 只有在真正变化时才返回新对象
      return isEqual(prev, newExpandedMenus) ? prev : newExpandedMenus;
    });
  }, []);

  // 提供的Context值
  const contextValue = {
    activeMenu,
    activeSubMenu,
    expandedMenus,
    activePath,
    handleMenuChange,
    toggleSubmenu,
    setExpandedMenus
  };

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  );
};

// 自定义Hook，方便组件使用Context
export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};

export default MenuContext; 
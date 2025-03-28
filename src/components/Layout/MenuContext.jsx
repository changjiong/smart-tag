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
        console.log(`Updating active path from ${activePath} to ${currentPath}`);
        setActivePath(currentPath);
      }
      
      let foundMatch = false;
      
      // 查找匹配当前路径的菜单
      for (const menuItem of menuItems) {
        // 精确匹配或路径前缀匹配
        const exactMatch = currentPath === menuItem.path;
        const prefixMatch = menuItem.path && currentPath.startsWith(menuItem.path + '/');
        
        if (exactMatch || prefixMatch) {
          if (activeMenuRef.current !== menuItem.name) {
            console.log(`Setting active menu to: ${menuItem.name} for path: ${currentPath}`);
            setActiveMenu(menuItem.name);
          }
          
          foundMatch = true;
          
          // 查找匹配的二级菜单
          if (menuItem.children) {
            let subMenuFound = false;
            
            for (const subMenu of menuItem.children) {
              // 精确匹配或路径前缀匹配
              const subExactMatch = currentPath === subMenu.path;
              const subPrefixMatch = subMenu.path && currentPath.startsWith(subMenu.path + '/');
              
              if (subExactMatch || subPrefixMatch) {
                if (activeSubMenuRef.current !== subMenu.name) {
                  console.log(`Setting active submenu to: ${subMenu.name} for path: ${currentPath}`);
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
                
                subMenuFound = true;
                
                // 如果有三级菜单也可以在这里处理
                
                break;
              }
            }
            
            // 如果没有找到匹配的二级菜单，但当前是该一级菜单的路径
            // 可以考虑默认选择第一个二级菜单
            if (!subMenuFound && prefixMatch && menuItem.children.length > 0) {
              const firstSubMenu = menuItem.children[0];
              setActiveSubMenu(firstSubMenu.name);
              setExpandedMenus(prev => ({
                ...prev,
                [firstSubMenu.name]: true
              }));
            }
          }
          
          break;
        }
      }
      
      if (!foundMatch && activeMenuRef.current !== menuItems[0].name) {
        console.log(`No menu match found for path: ${currentPath}, reverting to default menu`);
        setActiveMenu(menuItems[0].name);
        setActiveSubMenu(null);
      }
    } catch (error) {
      console.error("Error updating active menu based on path:", error);
    }
  }, [location.pathname]);
  
  // 处理菜单点击
  const handleMenuChange = useCallback((data) => {
    try {
      console.log("MenuContext: handleMenuChange called with data:", data);
      
      // 如果只传入了字符串，则按照之前的逻辑处理
      if (typeof data === 'string') {
        console.log(`MenuContext: Setting active menu to string: ${data}`);
        setActiveMenu(data);
        const menuItem = menuItems.find(item => item.name === data);
        if (menuItem) {
          console.log(`MenuContext: Navigating to path: ${menuItem.path}`);
          navigate(menuItem.path);
        } else {
          console.warn(`MenuContext: No menu item found with name: ${data}`);
        }
        return;
      }
      
      const { menuName, subMenuName, thirdMenuName, path } = data;
      console.log("MenuContext: Menu navigation:", { menuName, subMenuName, thirdMenuName, path });
      
      // 更新活动菜单状态
      if (menuName) {
        console.log(`MenuContext: Setting active menu to: ${menuName}`);
        setActiveMenu(menuName);
      }
      
      // 更新活动子菜单状态
      if (subMenuName) {
        console.log(`MenuContext: Setting active submenu to: ${subMenuName}`);
        setActiveSubMenu(subMenuName);
        
        // 设置展开状态
        console.log(`MenuContext: Expanding submenu: ${subMenuName}`);
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
        console.log("MenuContext: No submenu specified, clearing expanded menus");
        setExpandedMenus({});
        setActiveSubMenu(null);
      }
      
      // 导航到指定路径
      if (path) {
        console.log(`MenuContext: Navigating to path: ${path}`);
        navigate(path);
      } else {
        console.warn("MenuContext: No path provided for navigation");
      }
    } catch (error) {
      console.error("MenuContext: Error handling menu change:", error);
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
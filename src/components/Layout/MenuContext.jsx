import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from './menuData';

// 用于深度比较的辅助函数
const isEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// 创建Context
const MenuContext = createContext();

// 递归查找当前路径对应的菜单项
const findActiveMenuItems = (items, pathname) => {
  console.log('[DEBUG-MenuContext] 🔍 Finding menu items for path:', pathname);
  
  let activeItems = [];
  let exactMatch = false;

  const search = (menuList, parentPath = '') => {
    for (const item of menuList) {
      const isExactPathMatch = pathname === item.path;
      const isSubPathMatch = pathname.startsWith(item.path) && item.path !== '/';
      
      console.log(`[DEBUG-MenuContext] Checking item "${item.name}" (${item.path}):`, {
        isExactPathMatch, 
        isSubPathMatch,
        pathname
      });
      
      if (isExactPathMatch) {
        activeItems.push(item);
        exactMatch = true;
        console.log(`[DEBUG-MenuContext] ✅ Exact match found for "${item.name}"`);
        return true;
      }
      
      if (isSubPathMatch) {
        console.log(`[DEBUG-MenuContext] 🔶 Partial match found for "${item.name}"`);
        activeItems.push(item);
        
        if (item.children && item.children.length > 0) {
          const foundInChildren = search(item.children, item.path);
          if (!foundInChildren) {
            console.log(`[DEBUG-MenuContext] ℹ️ No exact match in children of "${item.name}", keeping as active`);
          }
          return foundInChildren;
        }
        return false;
      }
      
      if (item.children && item.children.length > 0) {
        const foundInChildren = search(item.children, item.path);
        if (foundInChildren) {
          activeItems.push(item);
          return true;
        }
      }
    }
    
    return false;
  };

  search(items);
  
  console.log('[DEBUG-MenuContext] Active menu items found:', activeItems.map(i => i.name).join(' > '));
  console.log('[DEBUG-MenuContext] Exact match found:', exactMatch);
  
  return { activeItems: activeItems.reverse(), exactMatch };
};

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
  
  // 更新激活的菜单项
  useEffect(() => {
    console.log('[DEBUG-MenuContext] ⭐⭐⭐ Location changed to:', location.pathname);
    
    const { activeItems, exactMatch } = findActiveMenuItems(menuItems, location.pathname);
    
    if (activeItems.length > 0) {
      const newOpenKeys = activeItems.slice(0, -1).map(item => item.path);
      const newSelectedKey = activeItems[activeItems.length - 1].path;
      
      console.log('[DEBUG-MenuContext] Setting new menu state:', {
        openKeys: newOpenKeys,
        selectedKey: newSelectedKey
      });
      
      setActivePath(newSelectedKey);
    } else {
      console.log('[DEBUG-MenuContext] ⚠️ No matching menu items found for path:', location.pathname);
    }
  }, [location.pathname]);
  
  // 处理菜单点击
  const handleMenuChange = useCallback((data) => {
    try {
      console.log("[DEBUG-MenuContext] ⭐⭐⭐ handleMenuChange called with data:", data);
      
      // 如果只传入了字符串，则按照之前的逻辑处理
      if (typeof data === 'string') {
        console.log(`[DEBUG-MenuContext] Setting active menu to string: ${data}`);
        setActiveMenu(data);
        const menuItem = menuItems.find(item => item.name === data);
        if (menuItem) {
          console.log(`[DEBUG-MenuContext] Navigating to path: ${menuItem.path}`);
          navigate(menuItem.path);
        } else {
          console.warn(`[DEBUG-MenuContext] No menu item found with name: ${data}`);
        }
        return;
      }
      
      const { menuName, subMenuName, thirdMenuName, path } = data;
      console.log("[DEBUG-MenuContext] Menu navigation:", { menuName, subMenuName, thirdMenuName, path });
      
      // 场景模板特殊处理
      if (subMenuName === "场景模板") {
        console.log("[DEBUG-MenuContext] 🚩🚩🚩 Special handling for 场景模板 submenu");
        
        // 直接导航到场景模板路径
        const businessMenuItem = menuItems.find(item => item.name === "业务场景");
        if (businessMenuItem && businessMenuItem.children) {
          const sceneTemplateItem = businessMenuItem.children.find(item => item.name === "场景模板");
          
          if (sceneTemplateItem) {
            console.log(`[DEBUG-MenuContext] Found 场景模板 path: ${sceneTemplateItem.path}`);
            
            // 强制激活这个菜单项
            setActiveMenu("业务场景");
            setActiveSubMenu("场景模板");
            
            // 设置展开状态
            setExpandedMenus(prev => ({
              ...prev,
              "场景模板": true
            }));
            
            // 导航到场景模板页面
            console.log(`[DEBUG-MenuContext] 🚀 Navigating to scene template path: ${sceneTemplateItem.path}`);
            navigate(sceneTemplateItem.path);
            
            // 提前返回，不执行后续逻辑
            return;
          }
        }
      }
      
      // 更新活动菜单状态
      if (menuName) {
        console.log(`[DEBUG-MenuContext] Setting active menu to: ${menuName}`);
        setActiveMenu(menuName);
      }
      
      // 更新活动子菜单状态
      if (subMenuName) {
        console.log(`[DEBUG-MenuContext] Setting active submenu to: ${subMenuName}`);
        setActiveSubMenu(subMenuName);
        
        // 设置展开状态
        console.log(`[DEBUG-MenuContext] Expanding submenu: ${subMenuName}`);
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
        console.log("[DEBUG-MenuContext] No submenu specified, clearing expanded menus");
        setExpandedMenus({});
        setActiveSubMenu(null);
      }
      
      // 导航到指定路径
      if (path) {
        console.log(`[DEBUG-MenuContext] Navigating to path: ${path}`);
        navigate(path);
      } else {
        console.warn("[DEBUG-MenuContext] No path provided for navigation");
      }
    } catch (error) {
      console.error("[DEBUG-MenuContext] Error handling menu change:", error);
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
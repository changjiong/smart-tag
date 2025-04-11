import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from './menuData';

// 用于深度比较的辅助函数
const isEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// 创建Context
const MenuContext = createContext();

// 菜单状态存储键
const MENU_STATE_KEY = 'smarttag_menu_state';

// 递归查找当前路径对应的菜单项
const findActiveMenuItems = (items, pathname) => {
  console.log('[DEBUG-MenuContext] 🔍 Finding menu items for path:', pathname);
  
  let activeItems = [];
  let bestMatchLength = 0;

  const search = (menuList, currentPathStack) => {
    for (const item of menuList) {
      // 检查当前路径是否以菜单项路径开头
      if (pathname.startsWith(item.path)) {
        // 记录当前菜单项路径栈
        const newItemPathStack = [...currentPathStack, item];
        
        // 如果当前菜单项路径比之前的最佳匹配更长，则更新最佳匹配
        if (item.path.length > bestMatchLength) {
          bestMatchLength = item.path.length;
          activeItems = newItemPathStack;
          console.log(`[DEBUG-MenuContext] 🔶 New best match found: "${item.name}" (${item.path}), length: ${item.path.length}`);
        }

        // 如果有子菜单，递归搜索
        if (item.children && item.children.length > 0) {
          search(item.children, newItemPathStack);
        }
      }
    }
  };

  search(items, []);
  
  console.log('[DEBUG-MenuContext] Final active items found:', activeItems.map(i => i.name).join(' > '));
  
  return { activeItems }; // 直接返回找到的路径栈
};

// 保存菜单状态到本地存储
const saveMenuState = (menuState) => {
  try {
    localStorage.setItem(MENU_STATE_KEY, JSON.stringify(menuState));
  } catch (error) {
    console.error('[DEBUG-MenuContext] Error saving menu state:', error);
  }
};

// 从本地存储加载菜单状态
const loadMenuState = () => {
  try {
    const savedState = localStorage.getItem(MENU_STATE_KEY);
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('[DEBUG-MenuContext] Error loading menu state:', error);
    return null;
  }
};

// 根据路径确定顶级菜单
const getTopLevelMenuFromPath = (pathname) => {
  // 跳过根路径
  if (pathname === '/' || !pathname) {
    return '首页';
  }
  
  // 提取第一级路径
  const firstLevelPath = '/' + pathname.split('/')[1];
  
  // 查找匹配的顶级菜单
  const matchedMenuItem = menuItems.find(item => 
    item.path === firstLevelPath || pathname.startsWith(item.path)
  );
  
  return matchedMenuItem ? matchedMenuItem.name : '首页';
};

// 创建Provider组件
export const MenuProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 初始化菜单状态
  const initMenuState = () => {
    const pathname = location.pathname;
    console.log('[DEBUG-MenuContext] 初始化菜单状态, pathname:', pathname);
    
    // 尝试从localStorge获取保存的状态
    const savedState = loadMenuState();
    console.log('[DEBUG-MenuContext] 加载的保存状态:', savedState);
    
    // 根据当前路径查找匹配的菜单项
    const { activeItems } = findActiveMenuItems(menuItems, pathname);
    console.log('[DEBUG-MenuContext] 初始化时基于路径找到的菜单项:', activeItems.map(i=>i.name));

    let initialState = {
      activeMenu: '首页', // 默认值
      activeSubMenu: null,
      expandedMenus: {},
      activePath: pathname,
    };

    // 如果从URL找到了匹配的菜单项
    if (activeItems.length > 0) {
      initialState.activeMenu = activeItems[0]?.name;
      if (activeItems.length > 1) {
        initialState.activeSubMenu = activeItems[1]?.name;
        // 默认展开找到的二级菜单
        initialState.expandedMenus[activeItems[1].name] = true;
      }
      // 确保activePath是最精确的匹配路径（最后一个）
      initialState.activePath = activeItems[activeItems.length - 1]?.path || pathname;
      console.log('[DEBUG-MenuContext] 使用URL路径设置初始状态:', initialState);
    } 
    // 否则，如果保存的状态与当前路径相关，则使用它
    else if (savedState && savedState.activePath && pathname.startsWith(savedState.activePath)) {
        console.log('[DEBUG-MenuContext] URL无匹配，但找到相关的保存状态，使用保存状态');
        initialState = savedState;
        initialState.activePath = pathname; // 更新为当前路径
    } else if (savedState) {
      console.log('[DEBUG-MenuContext] URL无匹配，使用旧的保存状态作为基础 (可能不准确)');
      initialState = savedState;
      initialState.activePath = pathname; // 更新为当前路径
    }
     else {
      console.log('[DEBUG-MenuContext] URL无匹配，无有效保存状态，使用默认首页状态');
    }

    return initialState;
  };
  
  // 使用函数初始化状态
  const [menuState, setMenuState] = useState(initMenuState);

  // 使用ref跟踪状态变化，避免不必要的effect触发
  const prevPathnameRef = useRef(location.pathname);
  
  // 当路径变化时，重新计算激活的菜单状态
  useEffect(() => {
    const pathname = location.pathname;
    console.log(`[DEBUG-MenuContext] ⭐⭐⭐ 路径变化: ${prevPathnameRef.current} -> ${pathname}`);
    
    // 如果路径没有实际变化，则不执行
    if (pathname === prevPathnameRef.current && menuState.activePath === pathname) {
       console.log('[DEBUG-MenuContext] 路径未变化，跳过状态更新');
       return;
    }
    prevPathnameRef.current = pathname;

    // 查找匹配的菜单项
    const { activeItems } = findActiveMenuItems(menuItems, pathname);
    console.log('[DEBUG-MenuContext] 路径变化后找到的菜单项:', activeItems.map(i=>i.name));

    let newActiveMenu = menuState.activeMenu;
    let newActiveSubMenu = menuState.activeSubMenu;
    let newExpandedMenus = { ...menuState.expandedMenus }; // 复制现有展开状态
    let newActivePath = pathname;

    if (activeItems.length > 0) {
      newActiveMenu = activeItems[0]?.name;
      newActiveSubMenu = activeItems.length > 1 ? activeItems[1]?.name : null;
      newActivePath = activeItems[activeItems.length - 1]?.path || pathname;

      // 确保匹配的二级菜单是展开的
      if (newActiveSubMenu && !newExpandedMenus[newActiveSubMenu]) {
        console.log(`[DEBUG-MenuContext] 路径变化，自动展开二级菜单: ${newActiveSubMenu}`);
        newExpandedMenus[newActiveSubMenu] = true;
      }
    } else {
      // 如果没有找到匹配项，可能需要根据情况重置或保留部分状态
      console.log('[DEBUG-MenuContext] ⚠️ 路径变化后没有找到精确匹配项，可能保留当前顶级菜单');
      // 可以选择保留 activeMenu，或者重置为默认值
       // newActiveMenu = '首页'; 
       newActiveSubMenu = null;
       // 可以选择清空展开状态
       // newExpandedMenus = {};
    }

    // 更新状态
    const newState = {
      activeMenu: newActiveMenu,
      activeSubMenu: newActiveSubMenu,
      expandedMenus: newExpandedMenus,
      activePath: newActivePath,
    };
    
    if (!isEqual(menuState, newState)) {
      console.log('[DEBUG-MenuContext] 应用路径变化引起的状态更新:', newState);
      setMenuState(newState);
      saveMenuState(newState);
    } else {
       console.log('[DEBUG-MenuContext] 路径变化，但计算出的状态与当前相同，不更新');
    }

  }, [location.pathname]); // 仅依赖路径变化

  // 处理菜单点击
  const handleMenuChange = useCallback((data) => {
    try {
      console.log("[DEBUG-MenuContext] ⭐⭐⭐ handleMenuChange called with data:", data);
      let newMenuState = { ...menuState }; // Start with current state
      let targetPath = null;

      // 如果只传入了字符串 (顶级菜单点击)
      if (typeof data === 'string') {
        const menuName = data;
        const menuItem = menuItems.find(item => item.name === menuName);
        if (menuItem) {
          newMenuState.activeMenu = menuName;
          newMenuState.activeSubMenu = null; // 点击顶级菜单时重置二级菜单
          newMenuState.expandedMenus = {}; // 点击顶级菜单时折叠其他菜单
          targetPath = menuItem.path;
          
          // 如果顶级菜单有子菜单，默认导航到第一个子菜单（或其子项）
          if (menuItem.children && menuItem.children.length > 0) {
            const firstSubMenu = menuItem.children[0];
            targetPath = (firstSubMenu.children && firstSubMenu.children.length > 0) 
                          ? firstSubMenu.children[0].path 
                          : firstSubMenu.path;
             newMenuState.activeSubMenu = firstSubMenu.name;
             newMenuState.expandedMenus[firstSubMenu.name] = true; 
          }
          newMenuState.activePath = targetPath;
          console.log(`[DEBUG-MenuContext] 顶级菜单点击 (${menuName}), 状态更新为:`, newMenuState, `导航至: ${targetPath}`);
        } else {
          console.warn(`[DEBUG-MenuContext] No menu item found with name: ${data}`);
          return; // Exit if menu item not found
        }
      } 
      // 如果传入了对象 (子菜单点击)
      else {
        const { menuName, subMenuName, thirdMenuName, path } = data;
        targetPath = path;
        if (menuName) newMenuState.activeMenu = menuName;
        if (subMenuName) {
           newMenuState.activeSubMenu = subMenuName;
           // 确保被点击的子菜单是展开的
           if (!newMenuState.expandedMenus[subMenuName]) {
              newMenuState.expandedMenus = { ...newMenuState.expandedMenus, [subMenuName]: true };
           }
        } else {
          newMenuState.activeSubMenu = null; // 如果没有二级菜单，则清除
        }
        newMenuState.activePath = path;
        console.log("[DEBUG-MenuContext] 子菜单点击, 状态更新为:", newMenuState, `导航至: ${targetPath}`);
      }

      // 应用状态更新和导航
      if (!isEqual(menuState, newMenuState)) {
        setMenuState(newMenuState);
        saveMenuState(newMenuState);
      }
      if (targetPath && targetPath !== location.pathname) {
         console.log(`[DEBUG-MenuContext] 🚀 Navigating to: ${targetPath}`);
         navigate(targetPath);
      } else {
         console.log(`[DEBUG-MenuContext] ⚠️ 导航路径 (${targetPath}) 与当前路径相同或无效，不导航`);
      }

    } catch (error) {
      console.error("[DEBUG-MenuContext] Error handling menu change:", error);
    }
  }, [navigate, menuState, location.pathname]);
  
  // 切换子菜单的展开状态
  const toggleSubmenu = useCallback((menuName, event) => {
    if (event) {
      event.preventDefault();
    }
    setMenuState(prev => {
      const newExpandedMenus = {
        ...prev.expandedMenus,
        [menuName]: !prev.expandedMenus[menuName]
      };
       // 只有在真正变化时才返回新对象
      if (isEqual(prev.expandedMenus, newExpandedMenus)) {
         return prev;
      }
      const newState = { ...prev, expandedMenus: newExpandedMenus };
      saveMenuState(newState); // Save state when toggling
      console.log(`[DEBUG-MenuContext] Toggled submenu ${menuName}, new expanded state:`, newExpandedMenus);
      return newState;
    });
  }, []);

  // 提供的Context值 - 直接从组合状态中解构
  const contextValue = {
    ...menuState,
    handleMenuChange,
    toggleSubmenu,
    // setExpandedMenus 不再直接暴露，通过 toggleSubmenu 控制
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
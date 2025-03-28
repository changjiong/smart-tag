import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

/**
 * 业务应用路由组件
 * 负责业务应用中心所有页面的路由管理
 * 包括场景模板、客户挽留助手等功能
 */
const BusinessRouter = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('[DEBUG-BusinessRouter] BusinessRouter mounted at path:', location.pathname);
    console.log('[DEBUG-BusinessRouter] Component loaded at:', new Date().toISOString());
    
    // 检查Outlet是否存在子组件
    const outletElement = document.getElementById('business-outlet-container');
    if (outletElement) {
      console.log('[DEBUG-BusinessRouter] Outlet element exists, content height:', outletElement.clientHeight);
      console.log('[DEBUG-BusinessRouter] Outlet element children count:', outletElement.children.length);
      if (outletElement.children.length === 0) {
        console.warn('[DEBUG-BusinessRouter] ⚠️ Outlet has no children! This might indicate a routing issue.');
      }
    } else {
      console.error('[DEBUG-BusinessRouter] ❌ Outlet element not found in DOM!');
    }
    
    return () => {
      console.log('[DEBUG-BusinessRouter] Component unmounting from path:', location.pathname);
    };
  }, [location.pathname]);

  console.log('[DEBUG-BusinessRouter] Rendering at path:', location.pathname);

  return (
    <div id="business-outlet-container" style={{width: '100%', minHeight: '300px'}}>
      <Outlet />
    </div>
  );
};

export default BusinessRouter; 
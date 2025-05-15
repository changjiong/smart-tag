import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * 场景模板组件
 * 基于业务应用中心HTML实现的场景模板管理页面
 */
const SceneTemplates = () => {
  const [viewMode, setViewMode] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    console.log('[DEBUG-SceneTemplates] Rendering SceneTemplates component at path:', location.pathname);
    console.log('[DEBUG-SceneTemplates] Component loaded at:', new Date().toISOString());
    
    const interval = setInterval(() => {
      console.log('[DEBUG-SceneTemplates] Still mounted at:', new Date().toISOString());
    }, 5000);
    
    return () => {
      console.log('[DEBUG-SceneTemplates] Component unmounting');
      clearInterval(interval);
    };
  }, [location.pathname]);
  
  // 处理模板使用跳转
  const handleUseTemplate = (templatePath) => {
    console.log("[DEBUG-SceneTemplates] Navigating to template:", templatePath);
    navigate(templatePath);
  };
  
  console.log('[DEBUG-SceneTemplates] Rendering JSX');
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="page-header flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">场景模板中心</h2>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700">
            + 创建新模板
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <div 
          className={`px-5 py-3 cursor-pointer ${viewMode === 'favorite' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setViewMode('favorite')}
        >
          我的收藏
        </div>
        <div 
          className={`px-5 py-3 cursor-pointer ${viewMode === 'recent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setViewMode('recent')}
        >
          最近使用
        </div>
        <div 
          className={`px-5 py-3 cursor-pointer ${viewMode === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setViewMode('all')}
        >
          全部
        </div>
      </div>

      <h3 className="text-xl font-medium mb-4">常用模板</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* 模板卡片 */}
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm" style={{borderLeft: '4px solid #ff9800'}}>
          <div>
            <div className="text-2xl mb-2" style={{color: '#ff9800'}}>🔶</div>
            <div className="text-lg font-bold mb-2">精准营销引擎</div>
            <div className="text-gray-600 mb-3">快速创建和执行精准营销活动</div>
          </div>
          <button 
            className="w-full bg-blue-600 text-white px-3 py-1.5 rounded shadow-sm hover:bg-blue-700"
            onClick={() => handleUseTemplate('/applications/retail-marketing/precision')}
          >
            立即使用
          </button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm" style={{borderLeft: '4px solid #2196f3'}}>
          <div>
            <div className="text-2xl mb-2" style={{color: '#2196f3'}}>🔵</div>
            <div className="text-lg font-bold mb-2">智能财富顾问</div>
            <div className="text-gray-600 mb-3">为客户提供专业资产配置建议</div>
          </div>
          <button 
            className="w-full bg-blue-600 text-white px-3 py-1.5 rounded shadow-sm hover:bg-blue-700"
            onClick={() => handleUseTemplate('/applications/business/wealth-advisor')}
          >
            立即使用
          </button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm" style={{borderLeft: '4px solid #4caf50'}}>
          <div>
            <div className="text-2xl mb-2" style={{color: '#4caf50'}}>🟢</div>
            <div className="text-lg font-bold mb-2">流失预警平台</div>
            <div className="text-gray-600 mb-3">提前识别流失风险，执行挽留措施</div>
          </div>
          <button 
            className="w-full bg-blue-600 text-white px-3 py-1.5 rounded shadow-sm hover:bg-blue-700"
            onClick={() => handleUseTemplate('/applications/business/retention-assistant')}
          >
            立即使用
          </button>
        </div>
      </div>

      <h3 className="text-xl font-medium mb-4">模板分类</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="font-bold text-blue-600 border-b pb-2 mb-3">零售营销模板</div>
          <div className="py-2">
            <div className="mb-2 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              <span>新客获取活动模板</span>
            </div>
            <div className="mb-2 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span>跨产品营销模板</span>
            </div>
            <div className="mb-2 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span>数字渠道转化模板</span>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="font-bold text-blue-600 border-b pb-2 mb-3">客户经营模板</div>
          <div className="py-2">
            <div className="mb-2 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              <span>客户流失预警模板</span>
            </div>
            <div className="mb-2 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              <span>客户价值提升模板</span>
            </div>
            <div className="mb-2 flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              <span>生命周期管理模板</span>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="font-bold text-blue-600 border-b pb-2 mb-3">财富管理模板</div>
          <div className="py-2">
            <div className="mb-2 flex items-center">
              <span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>
              <span>智能投顾模板</span>
            </div>
            <div className="mb-2 flex items-center">
              <span className="w-2 h-2 bg-green-700 rounded-full mr-2"></span>
              <span>退休规划模板</span>
            </div>
            <div className="mb-2 flex items-center">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
              <span>资产配置模板</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <div className="flex items-center mb-2">
          <span className="text-orange-500 mr-2">🔔</span>
          <span className="font-bold">基于您的角色和历史使用行为，我们推荐以下模板</span>
        </div>
        <div className="py-2">
          <div className="mb-2 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            <span className="font-medium">交叉销售助手</span>
            <span className="text-xs bg-blue-100 text-blue-800 ml-2 px-2 py-0.5 rounded">98% 匹配</span>
          </div>
          <div className="mb-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="font-medium">客户生命周期管理平台</span>
            <span className="text-xs bg-green-100 text-green-800 ml-2 px-2 py-0.5 rounded">89% 匹配</span>
          </div>
          <div className="mb-2 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            <span className="font-medium">零售存款营销方案</span>
            <span className="text-xs bg-purple-100 text-purple-800 ml-2 px-2 py-0.5 rounded">85% 匹配</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneTemplates; 
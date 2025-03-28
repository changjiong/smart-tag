import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 场景模板组件
 * 基于业务应用中心HTML实现的场景模板管理页面
 */
const SceneTemplates = () => {
  const [viewMode, setViewMode] = useState('all');
  const navigate = useNavigate();
  
  // 处理模板使用跳转
  const handleUseTemplate = (templatePath) => {
    console.log("Navigating to template:", templatePath);
    navigate(templatePath);
  };
  
  return (
    <div className="container mx-auto">
      <div className="page-header flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">场景模板</h2>
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
          <ul className="space-y-2 mb-3">
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">精准营销引擎</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">新客获取平台</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">交叉销售助手</li>
          </ul>
          <div className="text-right">
            <a href="#" className="text-blue-600 text-sm">查看全部</a>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="font-bold text-blue-600 border-b pb-2 mb-3">客户经营模板</div>
          <ul className="space-y-2 mb-3">
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">流失预警与挽留平台</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">客户价值提升</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">客户生命周期管理</li>
          </ul>
          <div className="text-right">
            <a href="#" className="text-blue-600 text-sm">查看全部</a>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="font-bold text-blue-600 border-b pb-2 mb-3">财富管理模板</div>
          <ul className="space-y-2 mb-3">
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">智能财富顾问</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">投资者画像</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">产品匹配推荐</li>
          </ul>
          <div className="text-right">
            <a href="#" className="text-blue-600 text-sm">查看全部</a>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="font-bold text-blue-600 border-b pb-2 mb-3">风险管控模板</div>
          <ul className="space-y-2 mb-3">
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">风险预警平台</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">欺诈检测系统</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">信用风险评估</li>
          </ul>
          <div className="text-right">
            <a href="#" className="text-blue-600 text-sm">查看全部</a>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="font-bold text-blue-600 border-b pb-2 mb-3">对公业务模板</div>
          <ul className="space-y-2 mb-3">
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">企业客户画像</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">供应链金融分析</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">企业关系图谱</li>
          </ul>
          <div className="text-right">
            <a href="#" className="text-blue-600 text-sm">查看全部</a>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="font-bold text-blue-600 border-b pb-2 mb-3">业务价值模板</div>
          <ul className="space-y-2 mb-3">
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">应用价值看板</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">标签ROI分析</li>
            <li className="before:content-['•'] before:mr-2 before:text-blue-600">成功案例库</li>
          </ul>
          <div className="text-right">
            <a href="#" className="text-blue-600 text-sm">查看全部</a>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <div className="flex items-center mb-2">
          <span className="text-orange-500 mr-2">🔔</span>
          <span className="font-bold">基于您的角色和历史使用行为，我们推荐以下模板:</span>
        </div>
        <div className="py-1 pl-5 before:content-['→'] before:mr-2 before:text-blue-600">交叉销售助手: 您管理的客户中有72位适合推荐基金产品</div>
        <div className="py-1 pl-5 before:content-['→'] before:mr-2 before:text-blue-600">客户价值提升: 本月有23位客户价值等级变动，需要调整服务策略</div>
        <div className="py-1 pl-5 before:content-['→'] before:mr-2 before:text-blue-600">新功能: 智能财富顾问现已支持养老金规划模块</div>
      </div>
    </div>
  );
};

export default SceneTemplates; 
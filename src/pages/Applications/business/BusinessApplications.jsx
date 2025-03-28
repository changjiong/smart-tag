import React, { useState } from 'react';

/**
 * 业务应用中心组件
 * 基于应用开发中心HTML实现的业务应用管理页面
 */
const BusinessApplications = () => {
  const [activeTab, setActiveTab] = useState('my');
  
  return (
    <div className="container mx-auto">
      <div className="page-header flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">应用开发中心</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700">
          + 创建新应用
        </button>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <div 
          className={`px-5 py-3 cursor-pointer ${activeTab === 'my' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('my')}
        >
          我的应用
        </div>
        <div 
          className={`px-5 py-3 cursor-pointer ${activeTab === 'team' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('team')}
        >
          团队应用
        </div>
        <div 
          className={`px-5 py-3 cursor-pointer ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('all')}
        >
          全部应用
        </div>
      </div>

      <h3 className="text-xl font-medium mb-4">当前开发中的应用</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* 应用卡片 */}
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="text-lg font-bold mb-2 text-blue-600">精准营销工作站</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">版本:</span> v1.2 (开发中)</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">基于模板:</span> 信用卡目标客群模板</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">创建时间:</span> 2023-10-15</div>
          <div className="mb-3"><span className="font-medium inline-block w-24">状态:</span> <span className="text-orange-500">开发中</span></div>
          <div className="flex gap-3">
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-200">继续开发</button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-200">预览</button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="text-lg font-bold mb-2 text-blue-600">客户流失预警平台</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">版本:</span> v2.0 (测试)</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">基于模板:</span> 客户流失预测模板</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">创建时间:</span> 2023-09-05</div>
          <div className="mb-3"><span className="font-medium inline-block w-24">状态:</span> <span className="text-blue-500">测试中</span></div>
          <div className="flex gap-3">
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-200">编辑应用</button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-200">发布申请</button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="text-lg font-bold mb-2 text-blue-600">企业关系图谱应用</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">版本:</span> v1.0 (规划中)</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">基于模板:</span> 企业关联分析模板</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">创建时间:</span> 2023-11-10</div>
          <div className="mb-3"><span className="font-medium inline-block w-24">状态:</span> <span className="text-gray-500">规划中</span></div>
          <div className="flex gap-3">
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-200">继续规划</button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-200">删除</button>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium mb-4">已发布的应用</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="text-lg font-bold mb-2 text-blue-600">智能财富顾问</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">版本:</span> v2.3 (生产)</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">基于模板:</span> 投资组合优化模板</div>
          <div className="mb-1"><span className="font-medium inline-block w-24">发布时间:</span> 2023-08-20</div>
          <div className="mb-3"><span className="font-medium inline-block w-24">使用情况:</span> 日活跃用户 45</div>
          <div className="flex gap-3">
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-200">查看详情</button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-200">新版开发</button>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium mb-4">创建新应用</h3>
      <div className="flex mb-8">
        {['选择模板', '配置参数', '设计界面', '测试验证', '发布应用'].map((step, index) => (
          <div key={index} className="flex-1 text-center relative">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white mb-2">
              {index + 1}
            </div>
            <div className="font-medium">{step}</div>
            <div className="text-sm text-gray-600">
              {index === 0 && '从模板库中选择基础模板'}
              {index === 1 && '设置应用参数和界面映射'}
              {index === 2 && '定制应用界面和用户体验'}
              {index === 3 && '测试应用功能和性能'}
              {index === 4 && '发布到业务应用中心'}
            </div>
            {index < 4 && (
              <div className="absolute top-4 w-full flex justify-center">
                <div className="h-0.5 bg-gray-300 w-full ml-10 mr-10"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-medium mb-4">选择基础模板</h3>
        
        <div className="flex py-3 border-b border-gray-200">
          <div className="text-2xl text-blue-600 mr-4">📊</div>
          <div className="flex-grow">
            <div className="font-medium">信用卡目标客群模板</div>
            <div className="text-gray-600">用于识别潜在信用卡客户，支持多维度参数配置和个性化推荐</div>
          </div>
          <div>
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded shadow-sm hover:bg-blue-700">选择</button>
          </div>
        </div>
        
        <div className="flex py-3 border-b border-gray-200">
          <div className="text-2xl text-blue-600 mr-4">📈</div>
          <div className="flex-grow">
            <div className="font-medium">客户流失预测模板</div>
            <div className="text-gray-600">预测客户流失风险，分析流失原因，提供挽留建议</div>
          </div>
          <div>
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded shadow-sm hover:bg-blue-700">选择</button>
          </div>
        </div>
        
        <div className="flex py-3 border-b border-gray-200">
          <div className="text-2xl text-blue-600 mr-4">🔄</div>
          <div className="flex-grow">
            <div className="font-medium">交叉销售模板</div>
            <div className="text-gray-600">基于客户行为识别产品交叉销售机会，最大化客户价值</div>
          </div>
          <div>
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded shadow-sm hover:bg-blue-700">选择</button>
          </div>
        </div>
        
        <div className="flex py-3">
          <div className="text-2xl text-blue-600 mr-4">📝</div>
          <div className="flex-grow">
            <div className="font-medium">空白应用模板</div>
            <div className="text-gray-600">不基于任何现有模板，从零开始创建自定义应用</div>
          </div>
          <div>
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded shadow-sm hover:bg-blue-700">选择</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessApplications; 
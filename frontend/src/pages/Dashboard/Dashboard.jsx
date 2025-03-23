import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Transition } from '@headlessui/react';

/**
 * 首页主组件
 * 包含工作台、个性化推荐和智能助手功能
 */
const Dashboard = () => {
  // 智能助手显示状态
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <div className="dashboard-container">
      {/* 页面主内容区 */}
      <div className="flex-1 p-6">
        <Outlet />

        {/* 工作台和主内容 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 业务任务看板 */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">业务任务看板</h2>
              <button className="text-blue-600 hover:text-blue-800">
                查看全部
              </button>
            </div>
            <div className="space-y-4">
              {/* 任务卡片示例 */}
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r">
                <div className="flex justify-between">
                  <h3 className="font-medium">标签质量检查</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    进行中
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  检查近期新增的客户行为标签质量
                </p>
                <div className="flex justify-between mt-2 text-sm">
                  <span>截止日期: 2023-10-30</span>
                  <span>优先级: 高</span>
                </div>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r">
                <div className="flex justify-between">
                  <h3 className="font-medium">金融资产标签更新申请</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    已批准
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  金融资产分层标签更新申请已获批准
                </p>
                <div className="flex justify-between mt-2 text-sm">
                  <span>更新日期: 2023-10-28</span>
                  <span>申请人: 张明</span>
                </div>
              </div>
            </div>
          </div>

          {/* 数据洞察快报 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">数据洞察快报</h2>
              <span className="text-sm text-gray-500">今日更新</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded">
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-indigo-900">信用卡活跃度增长</h3>
                    <p className="text-sm text-indigo-700">
                      青年客群信用卡活跃度环比增长12%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-red-50 rounded">
                <div className="flex items-center">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-red-900">数据异常提醒</h3>
                    <p className="text-sm text-red-700">
                      中间收入客群标签更新失败
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 系统使用指南与价值成果 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 系统使用指南 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">系统使用指南</h2>
              <button className="text-blue-600 hover:text-blue-800">
                全部指南
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center p-3 hover:bg-gray-50 rounded cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">场景模板快速入门</h3>
                  <p className="text-sm text-gray-500">3分钟视频教程</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 hover:bg-gray-50 rounded cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">如何创建高质量标签</h3>
                  <p className="text-sm text-gray-500">最佳实践指南</p>
                </div>
              </div>
            </div>
          </div>

          {/* 价值成果展示 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">价值成果展示</h2>
              <button className="text-blue-600 hover:text-blue-800">
                详细报告
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-center">
                <div className="p-3">
                  <div className="text-2xl font-bold text-blue-600">127</div>
                  <div className="text-sm text-gray-600">新增标签</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl font-bold text-green-600">58</div>
                  <div className="text-sm text-gray-600">业务应用</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl font-bold text-purple-600">32%</div>
                  <div className="text-sm text-gray-600">营销转化提升</div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">标签使用率</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 个性化推荐 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">个性化推荐</h2>
            <div className="flex space-x-3">
              <button className="text-blue-600 hover:text-blue-800">更多</button>
              <button className="text-blue-600 hover:text-blue-800">设置</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-blue-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-1">信用卡活跃度分析</h3>
              <p className="text-sm text-gray-600">
                深入了解信用卡活跃客群特征和行为模式
              </p>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-green-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-1">定期存款到期提醒</h3>
              <p className="text-sm text-gray-600">
                本月将有大量定期存款到期客户
              </p>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-purple-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-1">新增高端客户提醒</h3>
              <p className="text-sm text-gray-600">
                近期新增20位高净值客户，建议及时跟进
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 全局智能助手(悬浮) */}
      <button 
        onClick={() => setShowAssistant(!showAssistant)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      </button>

      {/* 智能助手面板 */}
      <Transition
        show={showAssistant}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed bottom-24 right-8 w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
          <div className="flex justify-between items-center bg-blue-600 text-white p-4">
            <h3 className="font-medium">智能助手</h3>
            <button onClick={() => setShowAssistant(false)} className="text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="mb-4">
              <p className="text-center text-gray-600 mb-2">您好，我可以帮您：</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex items-center">
                  <span className="mr-2">•</span>分析数据和回答问题
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>解读标签和客群特征
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>指导您完成操作
                </li>
              </ul>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">最近问题:</p>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  如何创建新客群?
                </div>
                <div className="p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  上月信用卡活跃用户画像是什么?
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="有什么可以帮您？"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-3 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Dashboard;
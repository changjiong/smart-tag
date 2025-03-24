import React, { useState, useEffect } from 'react';

/**
 * 智能标签生成页面
 * 使用大语言模型将业务人员的自然语言描述转换为结构化的标签规则
 */
const AI = () => {
  const [userInput, setUserInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [quickMode, setQuickMode] = useState(true);
  const [toast, setToast] = useState(null);

  // 示例规则
  const mockRules = [
    { field: '购买金额', operator: '>=', value: 1000 },
    { field: '购买次数', operator: '>=', value: 3 },
    { field: '时间范围', operator: '最近', value: 30, unit: '天' }
  ];

  // 示例对话历史
  const mockChatHistory = [
    {
      role: 'user',
      content: '我想创建一个标识30天内购买3次以上高价值商品的用户'
    },
    {
      role: 'assistant',
      content: '已生成规则：\n1. 时间范围：最近30天\n2. 购买次数 >= 3次\n3. 单次购买金额 >= 1000元'
    }
  ];

  // 显示提示信息
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // 生成标签规则
  const handleGenerate = () => {
    if (!userInput.trim()) return;
    
    setGenerating(true);
    
    // 模拟API调用
    setTimeout(() => {
      setGenerating(false);
      showToast('规则生成成功');
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm mb-6">
          <span className="text-gray-500">标签中心</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-500">标签管理</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-500">标签生成</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900">智能生成</span>
        </nav>

        {/* 模式切换和操作按钮 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md ${quickMode ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setQuickMode(true)}
            >
              快速创建
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md ${!quickMode ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setQuickMode(false)}
            >
              专家模式
            </button>
          </div>

          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              新建
            </button>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              导入
            </button>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              导出
            </button>
            <button className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="flex gap-6">
          {/* 左侧主内容 */}
          <div className="w-8/12 bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">自然语言描述</label>
              <div className="relative">
                <textarea 
                  className="w-full h-32 p-4 border border-gray-200 rounded resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入您想要创建的标签描述，例如：'我想创建一个标识30天内购买3次以上高价值商品的用户'"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <button 
                  className={`absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center ${generating ? 'opacity-75 cursor-not-allowed' : ''}`}
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      生成中...
                    </>
                  ) : '开始生成'}
                </button>
              </div>
            </div>

            {/* 规则编辑器 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-700">规则编辑器</h3>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-600">满足以下</span>
                  <select className="border border-gray-200 rounded px-2 py-1 text-sm">
                    <option>所有</option>
                    <option>任一</option>
                  </select>
                  <span className="text-sm text-gray-600">条件</span>
                </div>
                <div className="space-y-3">
                  {mockRules.map((rule, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded">
                      <select className="border border-gray-200 rounded px-2 py-1 text-sm">
                        <option>{rule.field}</option>
                      </select>
                      <select className="border border-gray-200 rounded px-2 py-1 text-sm">
                        <option>{rule.operator}</option>
                      </select>
                      <input type="text" value={rule.value} className="border border-gray-200 rounded px-2 py-1 text-sm w-20" readOnly />
                      {rule.unit && <span className="text-sm text-gray-600">{rule.unit}</span>}
                      <button className="ml-auto text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button className="mt-3 text-blue-600 text-sm hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  添加条件
                </button>
              </div>
            </div>

            {/* 对话历史 */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">对话历史</h3>
                <button className="text-sm text-gray-500 hover:text-gray-700">清空历史</button>
              </div>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {mockChatHistory.map((msg, index) => (
                  <div key={index} className="flex gap-3">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                      {msg.role === 'user' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">{msg.content}</pre>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input type="text" className="flex-1 border border-gray-200 rounded px-4 py-2 text-sm" placeholder="输入修改建议..." />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">发送</button>
              </div>
            </div>
          </div>

          {/* 右侧边栏 */}
          <div className="w-4/12 space-y-6">
            {/* 标签预览 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">标签预览</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">标签名称</label>
                  <p className="text-sm text-gray-900">高价值用户（近30天）</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">覆盖人群</label>
                  <p className="text-sm text-gray-900">预计 2,453 人</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">更新频率</label>
                  <p className="text-sm text-gray-900">每日更新</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">SQL 规则</label>
                  <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
                    <code>{`SELECT user_id 
FROM user_orders
WHERE created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
AND order_amount >= 1000
GROUP BY user_id
HAVING COUNT(*) >= 3;`}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* 相关推荐 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">相关推荐</h3>
              <div className="space-y-3">
                <div className="p-3 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">高频消费用户</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">90天内消费次数≥5次的用户</p>
                </div>
                <div className="p-3 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">奢侈品偏好用户</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">购买过单价≥5000元商品的用户</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast消息 */}
      {toast && (
        <div className="fixed top-4 right-4 bg-white border border-gray-100 shadow-lg rounded-lg p-4 flex items-center animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-gray-700">{toast}</span>
        </div>
      )}
    </div>
  );
};

export default AI; 
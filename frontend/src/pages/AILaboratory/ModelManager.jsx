import React, { useState } from 'react';

/**
 * Model Manager component for AI model training and tuning.
 * Provides interfaces for model creation, training configuration, parameter tuning, and monitoring.
 */
const ModelManager = () => {
  const [activeTab, setActiveTab] = useState('myModels');
  const [selectedModel, setSelectedModel] = useState(null);
  
  // Mock data for models
  const models = [
    { 
      id: 1, 
      name: '客户流失预测模型', 
      type: 'Classification', 
      accuracy: 87.5, 
      status: 'deployed',
      lastTrained: '2023-08-15',
      features: 28,
      description: '预测客户流失风险的模型，基于交易历史、客户行为和基本信息'
    },
    { 
      id: 2, 
      name: '产品推荐引擎', 
      type: 'Recommendation', 
      accuracy: 91.2, 
      status: 'training',
      lastTrained: '2023-09-20',
      features: 42,
      description: '基于客户画像和交易历史的个性化产品推荐模型'
    },
    { 
      id: 3, 
      name: '欺诈检测系统', 
      type: 'Anomaly Detection', 
      accuracy: 94.7, 
      status: 'ready',
      lastTrained: '2023-09-01',
      features: 36,
      description: '实时交易欺诈检测模型，采用异常检测和规则引擎相结合的方式'
    },
    { 
      id: 4, 
      name: '标签生成模型', 
      type: 'Clustering', 
      accuracy: 83.6, 
      status: 'draft',
      lastTrained: '2023-07-30',
      features: 24,
      description: '自动化客户分群和标签发现的聚类模型'
    },
  ];
  
  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      deployed: 'bg-green-100 text-green-800',
      training: 'bg-blue-100 text-blue-800 animate-pulse',
      ready: 'bg-yellow-100 text-yellow-800',
      draft: 'bg-gray-100 text-gray-800'
    };
    
    const statusLabels = {
      deployed: '已部署',
      training: '训练中',
      ready: '待部署',
      draft: '草稿'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'myModels'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('myModels')}
          >
            我的模型
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'marketplace'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('marketplace')}
          >
            模型市场
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'training'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('training')}
          >
            模型训练
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'evaluation'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('evaluation')}
          >
            效果评估
          </button>
        </nav>
      </div>
      
      {/* Content area */}
      <div className="p-6">
        {activeTab === 'myModels' && (
          <div>
            {/* Header with action buttons */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800">我的模型 ({models.length})</h2>
              <div className="flex space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  新建模型
                </button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索模型..."
                    className="pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Model cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <div
                  key={model.id}
                  className={`border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer ${
                    selectedModel === model.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedModel(model.id === selectedModel ? null : model.id)}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-medium text-gray-800">{model.name}</h3>
                      <StatusBadge status={model.status} />
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{model.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">模型类型</p>
                        <p className="text-sm font-medium">{model.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">准确率</p>
                        <p className="text-sm font-medium">{model.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">特征数量</p>
                        <p className="text-sm font-medium">{model.features}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">最近训练</p>
                        <p className="text-sm font-medium">{model.lastTrained}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100">
                        查看详情
                      </button>
                      <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded hover:bg-gray-100">
                        编辑
                      </button>
                      {model.status === 'ready' && (
                        <button className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded hover:bg-green-100">
                          部署
                        </button>
                      )}
                      {model.status === 'draft' && (
                        <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100">
                          开始训练
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* New model card */}
              <div className="border border-dashed rounded-lg flex flex-col items-center justify-center p-6 hover:bg-gray-50 cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-700">新建模型</h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  创建新的机器学习模型，开始训练和调优
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'marketplace' && (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">模型市场</h3>
            <p className="mt-2 text-gray-500">
              浏览预训练模型，从市场中选择适合您业务场景的AI模型
            </p>
            <div className="mt-6">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200">
                浏览模型市场
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'training' && (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">模型训练</h3>
            <p className="mt-2 text-gray-500">
              选择一个模型并配置数据集，开始训练流程
            </p>
            <div className="mt-6">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200">
                开始新的训练任务
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'evaluation' && (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">效果评估</h3>
            <p className="mt-2 text-gray-500">
              评估模型性能指标，分析模型效果报告
            </p>
            <div className="mt-6">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200">
                查看评估报告
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelManager;
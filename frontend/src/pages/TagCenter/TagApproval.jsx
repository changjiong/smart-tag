import React, { useState } from 'react';
import clsx from 'clsx';

/**
 * 标签审核组件
 * 用于管理标签的审批流程，显示待审核的标签及其详情，并提供审核操作
 */
const TagApproval = () => {
  // 标签状态选项
  const statusOptions = [
    { value: 'all', label: '全部' },
    { value: 'pending', label: '待审核', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'approved', label: '已通过', color: 'bg-green-100 text-green-800' },
    { value: 'rejected', label: '已拒绝', color: 'bg-red-100 text-red-800' },
    { value: 'revision', label: '需修改', color: 'bg-blue-100 text-blue-800' },
  ];

  // 标签类型选项
  const tagTypes = [
    { value: 'all', label: '全部类型' },
    { value: 'basic', label: '基础标签' },
    { value: 'derived', label: '衍生标签' },
    { value: 'model', label: '模型标签' },
    { value: 'external', label: '外部标签' },
  ];

  // 状态过滤器
  const [statusFilter, setStatusFilter] = useState('pending');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  
  // 示例标签数据
  const [tags, setTags] = useState([
    {
      id: 1,
      name: '信用卡高消费人群',
      code: 'CC_HIGH_SPEND',
      type: 'derived',
      category: '消费行为',
      description: '近3个月信用卡月均消费金额超过10000元的客户',
      creator: '张明',
      createdAt: '2023-10-25',
      lastUpdated: '2023-10-25',
      status: 'pending',
      updateFrequency: '每日',
      dataSource: '交易系统',
      calculation: '月均消费 = SUM(近3个月消费金额) / 3，筛选条件：月均消费 > 10000',
      sampleValue: '11527人',
      sampleRatio: '5.7%',
      comments: [],
    },
    {
      id: 2,
      name: '银行APP活跃用户',
      code: 'APP_ACTIVE_USER',
      type: 'basic',
      category: '渠道偏好',
      description: '最近30天内使用手机银行APP登录次数≥5次的用户',
      creator: '李华',
      createdAt: '2023-10-23',
      lastUpdated: '2023-10-24',
      status: 'pending',
      updateFrequency: '每日',
      dataSource: '移动银行系统',
      calculation: 'COUNT(最近30天登录次数) >= 5',
      sampleValue: '28732人',
      sampleRatio: '14.2%',
      comments: [],
    },
    {
      id: 3,
      name: '潜在流失风险客户',
      code: 'CHURN_RISK',
      type: 'model',
      category: '流失预警',
      description: '基于机器学习模型预测的30天内可能流失的客户',
      creator: '王强',
      createdAt: '2023-10-21',
      lastUpdated: '2023-10-22',
      status: 'revision',
      updateFrequency: '每周',
      dataSource: '客户行为数据库',
      calculation: '使用随机森林模型，基于交易频次下降、余额减少、服务投诉等特征计算',
      sampleValue: '5218人',
      sampleRatio: '2.6%',
      comments: [
        {
          id: 1,
          user: '刘伟',
          role: '模型评审员',
          content: '模型准确率需要进一步提高，建议添加更多历史行为特征',
          timestamp: '2023-10-22 14:30',
        }
      ],
    },
    {
      id: 4,
      name: '高净值客户',
      code: 'HIGH_NET_WORTH',
      type: 'basic',
      category: '财富等级',
      description: '总资产金额超过50万元的个人客户',
      creator: '赵芳',
      createdAt: '2023-10-20',
      lastUpdated: '2023-10-21',
      status: 'approved',
      updateFrequency: '每日',
      dataSource: '客户资产系统',
      calculation: '总资产 = SUM(存款 + 理财 + 基金 + 保险 + 贵金属)，筛选条件：总资产 > 500000',
      sampleValue: '8254人',
      sampleRatio: '4.1%',
      comments: [],
    },
    {
      id: 5,
      name: '理财产品偏好者',
      code: 'INV_PRODUCT_PREF',
      type: 'derived',
      category: '产品偏好',
      description: '过去6个月内购买过2次及以上理财产品的客户',
      creator: '钱磊',
      createdAt: '2023-10-19',
      lastUpdated: '2023-10-20',
      status: 'rejected',
      updateFrequency: '每周',
      dataSource: '理财交易系统',
      calculation: 'COUNT(过去6个月理财产品购买记录) >= 2',
      sampleValue: '15362人',
      sampleRatio: '7.6%',
      comments: [
        {
          id: 2,
          user: '周总监',
          role: '业务审核人',
          content: '标签定义过于宽泛，建议细分为不同风险等级的理财产品偏好',
          timestamp: '2023-10-20 11:15',
        }
      ],
    },
  ]);

  // 获取状态样式
  const getStatusStyle = (status) => {
    return statusOptions.find(option => option.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  // 过滤标签
  const filteredTags = tags.filter(tag => {
    const matchesStatus = statusFilter === 'all' || tag.status === statusFilter;
    const matchesType = typeFilter === 'all' || tag.type === typeFilter;
    const matchesSearch = 
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  // 处理标签审核状态变更
  const handleStatusChange = (tagId, newStatus) => {
    setTags(prevTags => 
      prevTags.map(tag => 
        tag.id === tagId ? { ...tag, status: newStatus } : tag
      )
    );
    setSelectedTag(prev => prev && prev.id === tagId ? { ...prev, status: newStatus } : prev);
  };

  // 添加评审意见
  const [commentText, setCommentText] = useState('');
  const handleAddComment = () => {
    if (!commentText.trim() || !selectedTag) return;
    
    const newComment = {
      id: new Date().getTime(),
      user: '当前用户',
      role: '标签审核员',
      content: commentText,
      timestamp: new Date().toLocaleString(),
    };
    
    setTags(prevTags => 
      prevTags.map(tag => 
        tag.id === selectedTag.id 
          ? { ...tag, comments: [...tag.comments, newComment] } 
          : tag
      )
    );
    
    setSelectedTag(prev => ({
      ...prev,
      comments: [...prev.comments, newComment]
    }));
    
    setCommentText('');
  };

  return (
    <div className="tag-approval-container animate-fade-in">
      {/* 页面标题 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">标签审核中心</h1>
            <p className="text-gray-600">管理并审核标签定义，确保标签质量和规范</p>
          </div>
          <div className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
            当前待审核: {tags.filter(tag => tag.status === 'pending').length} 个标签
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 左侧标签列表 */}
        <div className="lg:w-2/5">
          {/* 过滤器区域 */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索标签名称、编码或描述..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setStatusFilter(option.value)}
                    className={clsx(
                      "px-3 py-1 text-sm rounded-full",
                      statusFilter === option.value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="tagType" className="block text-sm font-medium text-gray-700 mb-1">标签类型</label>
              <select
                id="tagType"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {tagTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 标签列表 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredTags.length > 0 ? (
                filteredTags.map(tag => (
                  <div
                    key={tag.id}
                    onClick={() => setSelectedTag(tag)}
                    className={clsx(
                      "p-4 hover:bg-gray-50 cursor-pointer transition-colors",
                      selectedTag?.id === tag.id && "bg-blue-50"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-medium text-gray-900">{tag.name}</h3>
                      <span className={clsx(
                        "text-xs px-2 py-1 rounded-full",
                        getStatusStyle(tag.status)
                      )}>
                        {statusOptions.find(option => option.value === tag.status)?.label || '未知'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      <span className="font-medium">编码:</span> {tag.code}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tag.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <div>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tagTypes.find(type => type.value === tag.type)?.label.replace('全部', '') || '未知'}
                        </span>
                      </div>
                      <div>
                        <span className="mr-3">提交人: {tag.creator}</span>
                        <span>提交日期: {tag.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">没有找到标签</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    尝试调整过滤条件以查看更多标签。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧标签详情 */}
        <div className="lg:w-3/5">
          {selectedTag ? (
            <div className="bg-white rounded-lg shadow">
              {/* 标签详情头部 */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{selectedTag.name}</h2>
                  <span className={clsx(
                    "text-xs px-2 py-1 rounded-full",
                    getStatusStyle(selectedTag.status)
                  )}>
                    {statusOptions.find(option => option.value === selectedTag.status)?.label || '未知'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{selectedTag.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">编码:</span> {selectedTag.code}
                  </div>
                  <div>
                    <span className="font-medium">类型:</span> {tagTypes.find(type => type.value === selectedTag.type)?.label.replace('全部', '') || '未知'}
                  </div>
                  <div>
                    <span className="font-medium">分类:</span> {selectedTag.category}
                  </div>
                </div>
              </div>

              {/* 标签详情内容 */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">提交信息</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex">
                        <span className="text-gray-500 w-24">提交人:</span>
                        <span className="text-gray-900">{selectedTag.creator}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-24">创建日期:</span>
                        <span className="text-gray-900">{selectedTag.createdAt}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-24">最后更新:</span>
                        <span className="text-gray-900">{selectedTag.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">数据指标</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex">
                        <span className="text-gray-500 w-24">样本值:</span>
                        <span className="text-gray-900">{selectedTag.sampleValue}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-24">样本占比:</span>
                        <span className="text-gray-900">{selectedTag.sampleRatio}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-24">更新频率:</span>
                        <span className="text-gray-900">{selectedTag.updateFrequency}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">数据来源与计算逻辑</h3>
                  <div className="bg-gray-50 p-4 rounded text-sm">
                    <div className="mb-3">
                      <span className="font-medium text-gray-700">数据源:</span> {selectedTag.dataSource}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">计算逻辑:</span>
                      <div className="mt-1 text-gray-600 whitespace-pre-line">{selectedTag.calculation}</div>
                    </div>
                  </div>
                </div>

                {/* 评审意见 */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">评审意见</h3>
                  {selectedTag.comments.length > 0 ? (
                    <div className="space-y-4">
                      {selectedTag.comments.map(comment => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded">
                          <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <div>
                              <span className="font-medium">{comment.user}</span>
                              <span className="ml-1">({comment.role})</span>
                            </div>
                            <div>{comment.timestamp}</div>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">暂无评审意见</div>
                  )}
                </div>

                {/* 添加评审意见 */}
                <div className="mb-8">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    添加评审意见
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="输入您对此标签的评审意见..."
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={handleAddComment}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                    >
                      添加意见
                    </button>
                  </div>
                </div>

                {/* 审核操作 */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">审核操作</h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleStatusChange(selectedTag.id, 'approved')}
                      className={clsx(
                        "px-4 py-2 text-sm rounded-md",
                        selectedTag.status === 'approved' 
                          ? "bg-green-600 text-white" 
                          : "bg-white border border-green-600 text-green-600 hover:bg-green-50"
                      )}
                    >
                      通过
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedTag.id, 'rejected')}
                      className={clsx(
                        "px-4 py-2 text-sm rounded-md",
                        selectedTag.status === 'rejected' 
                          ? "bg-red-600 text-white" 
                          : "bg-white border border-red-600 text-red-600 hover:bg-red-50"
                      )}
                    >
                      拒绝
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedTag.id, 'revision')}
                      className={clsx(
                        "px-4 py-2 text-sm rounded-md",
                        selectedTag.status === 'revision' 
                          ? "bg-blue-600 text-white" 
                          : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
                      )}
                    >
                      需修改
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedTag.id, 'pending')}
                      className={clsx(
                        "px-4 py-2 text-sm rounded-md",
                        selectedTag.status === 'pending' 
                          ? "bg-yellow-600 text-white" 
                          : "bg-white border border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                      )}
                    >
                      重置为待审核
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-10 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mt-2 text-base font-medium text-gray-900">未选择标签</h3>
              <p className="mt-1 text-sm text-gray-500">
                从左侧列表中选择一个标签以查看详情并进行审核
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagApproval; 
import React from 'react';
import { useState } from 'react';

const Market = () => {
  const [tags] = useState([
    {
      id: 1,
      name: '高净值客户',
      category: '客户特征',
      status: '已上线',
      usage: 2341,
      rating: 4.8,
      updateTime: '2024-01-03'
    },
    {
      id: 2, 
      name: '理财偏好型',
      category: '行为特征',
      status: '已上线',
      usage: 1892,
      rating: 4.6,
      updateTime: '2024-01-02'
    },
    {
      id: 3,
      name: '年轻白领',
      category: '客户特征',
      status: '已上线', 
      usage: 3102,
      rating: 4.7,
      updateTime: '2024-01-02'
    }
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">标签市场</h1>
      
      {/* Search & Filter Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-64">
          <input
            type="text"
            placeholder="搜索标签..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">所有类别</option>
            <option value="customer">客户特征</option>
            <option value="behavior">行为特征</option>
            <option value="risk">风险特征</option>
          </select>
          
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">按使用量排序</option>
            <option value="rating">按评分排序</option>
            <option value="time">按更新时间排序</option>
          </select>
        </div>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-3 gap-6">
        {tags.map(tag => (
          <div key={tag.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{tag.name}</h3>
              <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded">
                {tag.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <span className="w-20">类别：</span>
                <span>{tag.category}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-20">使用量：</span>
                <span>{tag.usage}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-20">评分：</span>
                <span className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  {tag.rating}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-20">更新时间：</span>
                <span>{tag.updateTime}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                申请使用
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
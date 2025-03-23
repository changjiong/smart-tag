// src/pages/Tags/TagMonitoring/Health.jsx
import React, { useState } from 'react';

const Health = () => {
  const [healthData] = useState([
    {
      id: 1,
      name: '高净值客户',
      status: '健康',
      score: 95,
      issues: [],
      updateTime: '2024-01-04 10:00'
    },
    {
      id: 2,
      name: '理财偏好型',
      status: '警告',
      score: 78,
      issues: ['数据更新延迟', '空值率偏高'],
      updateTime: '2024-01-04 10:00'
    }
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">标签健康度</h1>

      <div className="grid grid-cols-2 gap-6">
        {healthData.map(tag => (
          <div key={tag.id} className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {tag.name}
              </h3>
              <span className={`px-2 py-1 text-sm rounded ${
                tag.status === '健康'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {tag.status}
              </span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm text-gray-600">健康分数</span>
                <span className="text-2xl font-bold text-gray-900">{tag.score}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className={`h-full rounded ${
                    tag.score >= 90
                      ? 'bg-green-500'
                      : tag.score >= 70
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${tag.score}%` }}
                />
              </div>
            </div>

            {tag.issues.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  存在的问题：
                </h4>
                <ul className="space-y-1">
                  {tag.issues.map((issue, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-yellow-800"
                    >
                      <span className="mr-2">⚠️</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-sm text-gray-500">
              更新时间：{tag.updateTime}
            </div>

            <button className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800">
              查看诊断报告 →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Health;
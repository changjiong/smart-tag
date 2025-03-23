// src/pages/Tags/TagMonitoring/Quality.jsx
import React from 'react';
import { useState } from 'react';

const Quality = () => {
  const [qualityData] = useState([
    {
      tagName: '高净值客户',
      coverage: 95.8,
      accuracy: 98.2,
      completeness: 97.5,
      consistency: 96.8,
      updateTime: '2024-01-04'
    },
    {
      tagName: '理财偏好型',
      coverage: 92.4,
      accuracy: 96.5,
      completeness: 94.8,
      consistency: 95.2,
      updateTime: '2024-01-04'
    }
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">质量报告</h1>

      <div className="space-y-6">
        {qualityData.map((tag, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {tag.tagName}
              </h3>
              <span className="text-sm text-gray-500">
                更新时间：{tag.updateTime}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Coverage */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">覆盖率</span>
                  <span className="text-sm font-medium">{tag.coverage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-green-500 rounded"
                    style={{ width: `${tag.coverage}%` }}
                  />
                </div>
              </div>

              {/* Accuracy */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">准确率</span>
                  <span className="text-sm font-medium">{tag.accuracy}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-blue-500 rounded"
                    style={{ width: `${tag.accuracy}%` }}
                  />
                </div>
              </div>

              {/* Completeness */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">完整性</span>
                  <span className="text-sm font-medium">{tag.completeness}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-yellow-500 rounded"
                    style={{ width: `${tag.completeness}%` }}
                  />
                </div>
              </div>

              {/* Consistency */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">一致性</span>
                  <span className="text-sm font-medium">{tag.consistency}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-purple-500 rounded"
                    style={{ width: `${tag.consistency}%` }}
                  />
                </div>
              </div>
            </div>

            <button className="mt-6 px-4 py-2 text-blue-600 hover:text-blue-800">
              查看详情 →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quality;
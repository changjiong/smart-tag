// src/pages/Tags/TagMonitoring/HealthDiagnostics.jsx
import React, { useState } from 'react';

const HealthDiagnostics = () => {
  const [diagnostics] = useState({
    tagName: '理财偏好型',
    score: 78,
    lastCheck: '2024-01-04 10:00',
    metrics: [
      {
        name: '数据质量',
        score: 82,
        items: [
          { name: '完整性', score: 85, status: '正常' },
          { name: '准确性', score: 90, status: '正常' },
          { name: '一致性', score: 75, status: '警告' }
        ]
      },
      {
        name: '更新情况',
        score: 70,
        items: [
          { name: '更新及时性', score: 65, status: '警告' },
          { name: '更新成功率', score: 95, status: '正常' },
          { name: '数据量变化', score: 88, status: '正常' }
        ]
      }
    ],
    recommendations: [
      '优化数据更新调度，确保按时更新',
      '检查数据一致性问题，进行数据清洗',
      '考虑增加数据质量监控规则'
    ]
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">健康诊断报告</h1>
        <p className="text-gray-500 mt-1">
          标签：{diagnostics.tagName} | 检查时间：{diagnostics.lastCheck}
        </p>
      </div>

      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">总体健康度</h2>
            <p className="text-gray-500 mt-1">基于多个维度的综合评分</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {diagnostics.score}
            </div>
            <div className="text-sm text-gray-500">健康分数</div>
          </div>
        </div>

        <div className="h-2 bg-gray-200 rounded">
          <div
            className={`h-full rounded ${
              diagnostics.score >= 90
                ? 'bg-green-500'
                : diagnostics.score >= 70
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${diagnostics.score}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {diagnostics.metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {metric.name}
              </h3>
              <div className="text-2xl font-bold text-gray-900">
                {metric.score}
              </div>
            </div>

            <div className="space-y-4">
              {metric.items.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-sm rounded ${
                        item.status === '正常'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                      <span className="font-medium">{item.score}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div
                      className={`h-full rounded ${
                        item.score >= 90
                          ? 'bg-green-500'
                          : item.score >= 70
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          优化建议
        </h3>
        <ul className="space-y-2">
          {diagnostics.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-600">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HealthDiagnostics;
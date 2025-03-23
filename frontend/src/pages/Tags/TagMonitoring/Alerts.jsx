// src/pages/Tags/TagMonitoring/Alerts.jsx
import React, { useState } from 'react';

const Alerts = () => {
  const [alerts] = useState([
    {
      id: 1,
      tagName: '高净值客户',
      type: '数据质量',
      level: '严重',
      message: '标签空值率超过阈值',
      time: '2024-01-04 09:15',
      status: '未处理'
    },
    {
      id: 2,
      tagName: '理财偏好型',
      type: '更新延迟',
      level: '警告',
      message: '标签更新时间超过24小时',
      time: '2024-01-04 08:30',
      status: '处理中'
    }
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">告警监控</h1>

      <div className="space-y-4">
        {alerts.map(alert => (
          <div key={alert.id} className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {alert.tagName}
                  </h3>
                  <span className={`px-2 py-1 text-sm rounded ${
                    alert.level === '严重'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alert.level}
                  </span>
                  <span className={`px-2 py-1 text-sm rounded ${
                    alert.status === '未处理'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.status}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-600">{alert.message}</p>
                  <p className="text-sm text-gray-500">
                    类型：{alert.type} | 时间：{alert.time}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-blue-600 hover:text-blue-800">
                  处理
                </button>
                <button className="px-3 py-1 text-gray-600 hover:text-gray-800">
                  忽略
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
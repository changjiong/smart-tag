// src/pages/Tags/TagMonitoring/AlertRules.jsx
import React, { useState } from 'react';

const AlertRules = () => {
  const [rules] = useState([
    {
      id: 1,
      name: '空值率告警',
      condition: '空值率 > 5%',
      level: '严重',
      notification: ['邮件', '短信'],
      status: '启用',
      lastModified: '2024-01-03'
    },
    {
      id: 2,
      name: '更新延迟告警',
      condition: '更新间隔 > 24小时',
      level: '警告',
      notification: ['邮件'],
      status: '启用',
      lastModified: '2024-01-02'
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">告警规则配置</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          新建规则
        </button>
      </div>

      <div className="space-y-4">
        {rules.map(rule => (
          <div key={rule.id} className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {rule.name}
                  </h3>
                  <span className={`px-2 py-1 text-sm rounded ${
                    rule.level === '严重'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {rule.level}
                  </span>
                  <span className={`px-2 py-1 text-sm rounded ${
                    rule.status === '启用'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {rule.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-600">
                    触发条件：{rule.condition}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">通知方式：</span>
                    {rule.notification.map((method, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    最后修改：{rule.lastModified}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="px-3 py-1 text-blue-600 hover:text-blue-800">
                  编辑
                </button>
                <button className="px-3 py-1 text-red-600 hover:text-red-800">
                  删除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertRules;
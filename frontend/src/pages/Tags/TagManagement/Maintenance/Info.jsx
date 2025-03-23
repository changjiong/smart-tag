// src/pages/Tags/TagManagement/Maintenance/Info.jsx
import React, { useState } from 'react';

const Info = () => {
  const [tags] = useState([
    {
      id: 1,
      name: '高净值客户',
      category: '客户特征',
      status: '已上线',
      version: '1.2.0',
      owner: '数据中心',
      updateTime: '2024-01-03'
    },
    {
      id: 2,
      name: '理财偏好型',
      category: '行为特征',
      status: '已上线',
      version: '1.1.0',
      owner: '数据中心',
      updateTime: '2024-01-02'
    }
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">标签信息维护</h1>

      <div className="space-y-6">
        {tags.map(tag => (
          <div key={tag.id} className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {tag.name}
                </h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-500">
                    类别：{tag.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    版本：{tag.version}
                  </p>
                  <p className="text-sm text-gray-500">
                    责任部门：{tag.owner}
                  </p>
                  <p className="text-sm text-gray-500">
                    更新时间：{tag.updateTime}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">
                {tag.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                编辑信息
              </button>
              <button className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50">
                查看历史版本
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
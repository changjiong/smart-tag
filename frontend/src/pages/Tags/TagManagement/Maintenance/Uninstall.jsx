// src/pages/Tags/TagManagement/Maintenance/Uninstall.jsx
import React, { useState } from 'react';

const Uninstall = () => {
  const [tags] = useState([
    {
      id: 1,
      name: '高净值客户',
      category: '客户特征',
      dependencies: ['客户资产分析', '理财产品推荐'],
      usage: 2341,
      lastUsed: '2024-01-03'
    },
    {
      id: 2,
      name: '理财偏好型',
      category: '行为特征',
      dependencies: ['产品推荐引擎', '营销活动筛选'],
      usage: 1892,
      lastUsed: '2024-01-02'
    }
  ]);

  const [selectedTags, setSelectedTags] = useState(new Set());

  const handleTagSelect = (id) => {
    const newSelected = new Set(selectedTags);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTags(newSelected);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">标签卸载</h1>
        <button
          disabled={selectedTags.size === 0}
          className={`px-4 py-2 rounded-lg ${
            selectedTags.size === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600'
          } text-white`}
        >
          批量卸载
        </button>
      </div>

      <div className="space-y-4">
        {tags.map(tag => (
          <div
            key={tag.id}
            className={`bg-white p-6 rounded-lg border ${
              selectedTags.has(tag.id) ? 'border-red-500' : ''
            }`}
          >
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={selectedTags.has(tag.id)}
                onChange={() => handleTagSelect(tag.id)}
                className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              
              <div className="ml-4 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tag.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      类别：{tag.category}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>使用量：{tag.usage}</div>
                    <div>最后使用：{tag.lastUsed}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    依赖项：
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tag.dependencies.map((dep, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-50 text-yellow-800 rounded-full text-sm"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-4 bg-red-50 rounded">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="text-sm text-red-800">
                      <p className="font-medium">卸载警告</p>
                      <p className="mt-1">卸载该标签可能会影响依赖项的正常运行，请确认是否继续。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uninstall;
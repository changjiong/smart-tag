// src/pages/Tags/TagManagement/Maintenance/Categories.jsx
import React, { useState } from 'react';

const Categories = () => {
  const [categories] = useState([
    {
      id: 1,
      name: '客户特征',
      count: 156,
      description: '描述客户的基本属性和特征',
      subCategories: ['人口属性', '资产特征', '职业特征']
    },
    {
      id: 2,
      name: '行为特征',
      count: 89,
      description: '描述客户的行为模式和偏好',
      subCategories: ['交易行为', '渠道偏好', '产品偏好']
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">标签类别管理</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          新建类别
        </button>
      </div>

      <div className="space-y-6">
        {categories.map(category => (
          <div key={category.id} className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  标签数量：{category.count}
                </p>
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

            <p className="text-gray-600 mb-4">
              {category.description}
            </p>

            <div className="bg-gray-50 p-4 rounded">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                子类别
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.subCategories.map((sub, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white border rounded-full text-sm text-gray-600"
                  >
                    {sub}
                  </span>
                ))}
                <button className="px-3 py-1 border border-dashed rounded-full text-sm text-gray-500 hover:border-blue-500 hover:text-blue-500">
                  + 添加子类别
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
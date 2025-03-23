// src/pages/Tags/TagSystem/MarketDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MarketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tagDetail, setTagDetail] = useState({
    id: '',
    name: '',
    type: '',
    description: '',
    businessDomain: '',
    updateFrequency: '',
    coverage: '',
    accuracy: '',
    creator: '',
    createTime: '',
    lastUpdateTime: '',
  });

  useEffect(() => {
    // Fetch tag details from API
    // This is a placeholder for actual API call
    const mockTagDetail = {
      id: id,
      name: '用户活跃度标签',
      type: '衍生标签',
      description: '基于用户行为数据计算的活跃度评分',
      businessDomain: '用户画像',
      updateFrequency: '日更新',
      coverage: '95%',
      accuracy: '98%',
      creator: '张三',
      createTime: '2024-01-01',
      lastUpdateTime: '2024-03-15',
    };
    setTagDetail(mockTagDetail);
  }, [id]);

  const handleApply = () => {
    navigate(`/tags/market/apply/${id}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{tagDetail.name}</h2>
        <p className="text-sm text-gray-500">ID: {tagDetail.id}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">基本信息</h3>
          <dl className="grid grid-cols-2 gap-4">
            <dt className="text-gray-600">标签类型</dt>
            <dd>{tagDetail.type}</dd>
            <dt className="text-gray-600">业务域</dt>
            <dd>{tagDetail.businessDomain}</dd>
            <dt className="text-gray-600">更新频率</dt>
            <dd>{tagDetail.updateFrequency}</dd>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">质量指标</h3>
          <dl className="grid grid-cols-2 gap-4">
            <dt className="text-gray-600">覆盖率</dt>
            <dd>{tagDetail.coverage}</dd>
            <dt className="text-gray-600">准确率</dt>
            <dd>{tagDetail.accuracy}</dd>
          </dl>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">标签描述</h3>
        <p className="text-gray-700">{tagDetail.description}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">管理信息</h3>
        <dl className="grid grid-cols-2 gap-4">
          <dt className="text-gray-600">创建人</dt>
          <dd>{tagDetail.creator}</dd>
          <dt className="text-gray-600">创建时间</dt>
          <dd>{tagDetail.createTime}</dd>
          <dt className="text-gray-600">最后更新</dt>
          <dd>{tagDetail.lastUpdateTime}</dd>
        </dl>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          申请使用
        </button>
      </div>
    </div>
  );
};

export default MarketDetail;
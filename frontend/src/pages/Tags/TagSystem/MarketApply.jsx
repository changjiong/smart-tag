// src/pages/Tags/TagSystem/MarketApply.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MarketApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    purpose: '',
    usage: '',
    frequency: 'daily',
    dataSecurity: '',
    applicant: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit application logic here
    console.log('Application submitted:', { tagId: id, ...formData });
    navigate('/tags/market');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">标签使用申请</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            使用目的
          </label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border rounded-lg p-2"
            placeholder="请详细描述使用该标签的业务目的..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            使用场景
          </label>
          <input
            type="text"
            name="usage"
            value={formData.usage}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
            placeholder="请说明具体的使用场景"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            调用频率
          </label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          >
            <option value="daily">每日</option>
            <option value="weekly">每周</option>
            <option value="monthly">每月</option>
            <option value="realtime">实时</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            数据安全说明
          </label>
          <textarea
            name="dataSecurity"
            value={formData.dataSecurity}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border rounded-lg p-2"
            placeholder="请说明数据安全保护措施..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              申请人
            </label>
            <input
              type="text"
              name="applicant"
              value={formData.applicant}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              所属部门
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/tags/market')}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
          >
            取消
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            提交申请
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarketApply;
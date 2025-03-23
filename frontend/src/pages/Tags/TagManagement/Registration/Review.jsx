// src/pages/Tags/TagManagement/Registration/Review.jsx
import React, { useState } from 'react';

const Review = () => {
  const [reviews] = useState([
    {
      id: 1,
      name: '高净值客户标签',
      applicant: '张三',
      department: '数据中心',
      submitTime: '2024-01-03 14:30',
      status: '待审核',
      urgency: '普通'
    },
    {
      id: 2,
      name: '信用卡活跃度标签',
      applicant: '李四',
      department: '信用卡中心',
      submitTime: '2024-01-03 11:20',
      status: '待审核',
      urgency: '紧急'
    }
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">标签审核</h1>

      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-white p-6 rounded-lg border">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  申请人：{review.applicant} | 部门：{review.department}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  提交时间：{review.submitTime}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded text-sm ${
                  review.urgency === '紧急' 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {review.urgency}
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                  {review.status}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">业务审核</div>
                  <div className="text-sm text-gray-500">检查业务价值和合规性</div>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50">
                    驳回
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    通过
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded opacity-50">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">技术审核</div>
                  <div className="text-sm text-gray-500">检查技术实现的可行性</div>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 text-gray-400 rounded" disabled>
                    驳回
                  </button>
                  <button className="px-4 py-2 bg-gray-300 text-white rounded" disabled>
                    通过
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                审核意见
              </label>
              <textarea
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入审核意见..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
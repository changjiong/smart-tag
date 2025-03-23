import React from 'react';
import { useState } from 'react';

const Profile = () => {
  const [userProfile] = useState({
    avatar: '/assets/avatars/default-avatar.png',
    name: '张三',
    role: '数据分析师',
    department: '数据中心',
    email: 'zhangsan@example.com',
    phone: '138****1234',
    lastLogin: '2024-01-04 09:30:22'
  });

  return (
    <div className="h-full w-full p-6">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-start space-x-8">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <img 
              src={userProfile.avatar} 
              alt="用户头像"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-sm"
            />
          </div>

          {/* Profile Info Section */}
          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {userProfile.name}
            </h1>
            
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <span>{userProfile.role}</span>
              <span>|</span>
              <span>{userProfile.department}</span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">邮箱：</span>
                  <span className="text-gray-900">{userProfile.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">手机：</span>
                  <span className="text-gray-900">{userProfile.phone}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">上次登录：</span>
                  <span className="text-gray-900">{userProfile.lastLogin}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">最近活动</h2>
          <div className="border rounded-lg">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-gray-900">查看标签库</span>
                <span className="text-gray-500 text-sm">2024-01-04 10:15</span>
              </div>
            </div>
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <span className="text-gray-900">更新用户画像配置</span>
                <span className="text-gray-500 text-sm">2024-01-04 09:45</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-900">提交标签注册申请</span>
                <span className="text-gray-500 text-sm">2024-01-03 16:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
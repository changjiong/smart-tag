// src/pages/PortraitAnalysis/CustomerPortrait.jsx
import React from 'react';

export default function CustomerPortrait() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">客户画像</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">基本信息</h2>
          <div className="space-y-2">
            <p><span className="font-medium">姓名：</span>张三</p>
            <p><span className="font-medium">年龄：</span>35</p>
            <p><span className="font-medium">性别：</span>男</p>
            <p><span className="font-medium">地区：</span>北京市</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">消费特征</h2>
          <div className="space-y-2">
            <p><span className="font-medium">月均消费：</span>¥5,000</p>
            <p><span className="font-medium">消费频次：</span>高频</p>
            <p><span className="font-medium">偏好品类：</span>电子产品</p>
            <p><span className="font-medium">忠诚度：</span>高</p>
          </div>
        </div>
      </div>
    </div>
  );
}
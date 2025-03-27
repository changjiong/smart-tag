import React from 'react';
import { Outlet } from 'react-router-dom';

const AnalysisPage = () => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">画像分析</h2>
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p>画像分析页面，包括单客户视图、行为序列分析、群体洞察等多种分析功能。</p>
      </div>
      <Outlet />
    </div>
  );
};

export default AnalysisPage; 
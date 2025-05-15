import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Space } from 'antd';

/**
 * AI功能测试组件
 * 用于测试路由和导航
 */
const AiTest = () => {
  useEffect(() => {
    console.log('AiTest组件已加载，测试路由是否正常');
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-medium text-gray-800 mb-4">AI功能测试页面</h2>
      <p className="text-gray-600 mb-6">这个页面用于测试大模型配置路由是否正常工作</p>
      
      <Card title="路由测试">
        <p className="mb-4">当前路径: {window.location.pathname}</p>
        <Space>
          <Link to="/system/ai/models">
            <Button type="primary">模型服务</Button>
          </Link>
          <Link to="/system/ai/prompts">
            <Button>提示词管理</Button>
          </Link>
          <Link to="/system/ai/knowledge">
            <Button>知识库</Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
};

export default AiTest; 
import React from 'react';
import { Breadcrumb, Typography } from 'antd';
import { HomeOutlined, TagsOutlined, RobotOutlined } from '@ant-design/icons';
import AITagGenerator from './AITagGenerator';

const { Title } = Typography;

const AITagGenerationPage = () => {
  return (
    <div className="ai-tag-generation-page">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item href="/dashboard">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/tags">标签中心</Breadcrumb.Item>
        <Breadcrumb.Item href="/tags/creation">标签创建</Breadcrumb.Item>
        <Breadcrumb.Item>智能标签生成</Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="page-content">
        <AITagGenerator />
      </div>
      
      <style jsx>{`
        .ai-tag-generation-page {
          padding: 24px;
        }
        
        .breadcrumb {
          margin-bottom: 16px;
        }
        
        .page-content {
          background: #fff;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default AITagGenerationPage; 
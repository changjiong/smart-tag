import React from 'react';
import { Card, Row, Col, Typography, Button, Divider, Tag, List } from 'antd';
import { 
  FileTemplateOutlined, 
  UserOutlined, 
  StarOutlined, 
  ClockCircleOutlined,
  DownloadOutlined,
  EyeOutlined,
  ShareAltOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

/**
 * 业务模板页面
 * 提供各类业务场景的模板管理与下载
 */
const TemplatesPage = () => {
  // 模拟数据 - 实际应用中应从API获取
  const templates = [
    {
      id: 1,
      title: '零售客户流失预警模板',
      description: '基于购买频次、交易间隔和客户价值预测流失风险',
      category: '客户管理',
      downloads: 235,
      author: '数据科学团队',
      rating: 4.8,
      tags: ['流失预警', '零售', '预测分析'],
      updateTime: '2025-04-22'
    },
    {
      id: 2,
      title: '高净值客户精准营销方案',
      description: '针对高净值客户的产品推荐与活动邀约策略',
      category: '营销推广',
      downloads: 187,
      author: '财富管理团队',
      rating: 4.6,
      tags: ['高净值', '精准营销', '推荐引擎'],
      updateTime: '2025-05-01'
    },
    {
      id: 3,
      title: '企业客户信贷风险评估',
      description: '基于多维指标的企业客户信贷风险综合评估模型',
      category: '风险控制',
      downloads: 156,
      author: '风险管理部',
      rating: 4.9,
      tags: ['信贷风险', '企业客户', '评分模型'],
      updateTime: '2025-04-15'
    },
    {
      id: 4,
      title: '客户生命周期价值分析',
      description: '从获客、活跃、成长到忠诚的全生命周期分析',
      category: '客户洞察',
      downloads: 203,
      author: '数据分析团队',
      rating: 4.7,
      tags: ['生命周期', '价值分析', 'YRFM模型'],
      updateTime: '2025-05-10'
    }
  ];

  // 模板分类
  const categories = [
    { name: '全部', count: 26 },
    { name: '客户管理', count: 8 },
    { name: '营销推广', count: 6 },
    { name: '风险控制', count: 5 },
    { name: '客户洞察', count: 4 },
    { name: '智能运营', count: 3 }
  ];

  return (
    <div className="templates-container">
      <div className="page-header">
        <Title level={2}>业务模板库</Title>
        <Paragraph className="page-description">
          快速应用预置的业务模板，加速您的业务场景实施
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={6}>
          <Card title="模板分类" className="category-card">
            <List
              itemLayout="horizontal"
              dataSource={categories}
              renderItem={item => (
                <List.Item>
                  <div className="category-item">
                    <Text>{item.name}</Text>
                    <Tag color="blue">{item.count}</Tag>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={18}>
          <Card 
            title={
              <div className="templates-header">
                <span>推荐模板</span>
                <div className="templates-actions">
                  <Button type="primary">上传模板</Button>
                </div>
              </div>
            }
          >
            <Row gutter={[16, 16]}>
              {templates.map(template => (
                <Col xs={24} sm={12} lg={12} key={template.id}>
                  <Card 
                    className="template-card"
                    hoverable
                  >
                    <div className="template-header">
                      <FileTemplateOutlined className="template-icon" />
                      <div className="template-title">
                        <Text strong>{template.title}</Text>
                        <Tag color="blue">{template.category}</Tag>
                      </div>
                    </div>
                    <Paragraph className="template-description">
                      {template.description}
                    </Paragraph>
                    <div className="template-meta">
                      <div className="meta-item">
                        <UserOutlined /> {template.author}
                      </div>
                      <div className="meta-item">
                        <StarOutlined /> {template.rating}
                      </div>
                      <div className="meta-item">
                        <ClockCircleOutlined /> {template.updateTime}
                      </div>
                    </div>
                    <Divider />
                    <div className="template-tags">
                      {template.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <div className="template-actions">
                      <Button type="primary" icon={<DownloadOutlined />}>
                        下载 ({template.downloads})
                      </Button>
                      <div>
                        <Button type="text" icon={<EyeOutlined />} />
                        <Button type="text" icon={<ShareAltOutlined />} />
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .templates-container {
          padding: 24px;
        }
        
        .page-header {
          margin-bottom: 24px;
        }
        
        .page-description {
          max-width: 800px;
        }
        
        .category-card {
          height: 100%;
        }
        
        .category-item {
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
        }
        
        .templates-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .template-card {
          height: 100%;
        }
        
        .template-header {
          display: flex;
          margin-bottom: 12px;
        }
        
        .template-icon {
          font-size: 24px;
          margin-right: 12px;
          color: #1890ff;
        }
        
        .template-title {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .template-description {
          height: 44px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 12px;
        }
        
        .template-meta {
          display: flex;
          font-size: 12px;
          color: #8c8c8c;
          gap: 16px;
          margin-bottom: 12px;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .template-tags {
          margin-bottom: 16px;
        }
        
        .template-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default TemplatesPage;

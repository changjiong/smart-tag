import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Checkbox, 
  Button, 
  Tag, 
  Space,
  Tooltip, 
  Spin,
  Empty,
  Alert,
  Row,
  Col,
  Collapse,
  Progress,
  Badge
} from 'antd';
import { 
  GiftOutlined,
  ShopOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  StarOutlined,
  ToolOutlined,
  FireOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  DollarOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

// 图标映射
const TYPE_ICON_MAP = {
  '专属优惠': <GiftOutlined />,
  '产品推荐': <ShopOutlined />,
  '增值服务': <CustomerServiceOutlined />,
  '产品引导': <StarOutlined />,
  '限时优惠': <FireOutlined />,
  '活动邀请': <RocketOutlined />,
  '福利发放': <GiftOutlined />,
  '问题解决': <ToolOutlined />,
  '补偿方案': <CustomerServiceOutlined />,
  '综合方案': <StarOutlined />,
  '高管关怀': <CustomerServiceOutlined />
};

// 成本等级映射
const COST_MAP = {
  'low': { text: '低', color: '#52c41a' },
  'medium': { text: '中', color: '#1890ff' },
  'high': { text: '高', color: '#faad14' },
  'very_high': { text: '很高', color: '#f5222d' }
};

/**
 * 干预措施选择器组件
 * 展示系统推荐的干预措施，支持用户选择
 */
const InterventionSelector = ({ 
  interventions = [], 
  selectedInterventions = [], 
  onChange, 
  loading = false,
  onNext,
  onPrev
}) => {
  // 处理干预措施选择变更
  const handleInterventionChange = (interventionId, checked) => {
    const newSelectedInterventions = checked
      ? [...selectedInterventions, interventionId]
      : selectedInterventions.filter(id => id !== interventionId);
    
    onChange(newSelectedInterventions);
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">加载干预措施建议...</div>
      </div>
    );
  }
  
  if (!interventions || interventions.length === 0) {
    return (
      <Empty 
        description="暂无可用的干预措施" 
        image={Empty.PRESENTED_IMAGE_SIMPLE} 
      />
    );
  }
  
  return (
    <div className="intervention-selector">
      <Title level={4}>选择客户干预措施</Title>
      <Paragraph type="secondary">
        系统已根据客群特征推荐了最有效的干预措施，您可以根据需要选择一种或多种措施
      </Paragraph>
      
      <Alert
        message="干预措施选择提示"
        description="选择有效性高的干预措施可以提升挽留成功率，但也要考虑成本和实施时间。组合使用多种措施通常能取得更好的效果。"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      
      <Row gutter={[16, 16]}>
        {interventions.map(intervention => (
          <Col xs={24} sm={24} md={12} key={intervention.id}>
            <Card 
              className={`intervention-card ${selectedInterventions.includes(intervention.id) ? 'selected' : ''}`}
              title={
                <div className="intervention-card-title">
                  <Space>
                    {TYPE_ICON_MAP[intervention.type] || <QuestionCircleOutlined />}
                    <Text strong>{intervention.title}</Text>
                  </Space>
                  <Checkbox
                    checked={selectedInterventions.includes(intervention.id)}
                    onChange={(e) => handleInterventionChange(intervention.id, e.target.checked)}
                  />
                </div>
              }
            >
              <div className="intervention-type">
                <Tag color="blue">{intervention.type}</Tag>
              </div>
              
              <Paragraph className="intervention-content">
                {intervention.content}
              </Paragraph>
              
              <Space wrap className="intervention-tags">
                {intervention.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </Space>
              
              <div className="intervention-metrics">
                <div className="intervention-metric">
                  <Text type="secondary">有效性：</Text>
                  <Progress 
                    percent={Math.round(intervention.effectiveness * 100)} 
                    size="small" 
                    status={intervention.effectiveness >= 0.8 ? 'success' : 'normal'}
                  />
                </div>
                
                <div className="intervention-metric-row">
                  <div className="intervention-metric-item">
                    <Text type="secondary">成本：</Text>
                    <Tag color={COST_MAP[intervention.cost].color}>
                      {COST_MAP[intervention.cost].text}
                    </Tag>
                  </div>
                  
                  <div className="intervention-metric-item">
                    <Text type="secondary">时效：</Text>
                    <Tag icon={<ClockCircleOutlined />}>
                      {intervention.timeframe}
                    </Tag>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      <div className="intervention-selector-actions">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onPrev}
        >
          上一步
        </Button>
        <Button 
          type="primary" 
          icon={<ArrowRightOutlined />} 
          onClick={onNext}
          disabled={selectedInterventions.length === 0}
        >
          下一步
        </Button>
      </div>
      
      <style jsx>{`
        .intervention-selector {
          padding: 0 0 20px;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
        }
        
        .loading-text {
          margin-top: 16px;
        }
        
        .intervention-card {
          height: 100%;
          transition: all 0.3s;
          border: 2px solid transparent;
        }
        
        .intervention-card.selected {
          border-color: #1890ff;
          background-color: rgba(24, 144, 255, 0.05);
        }
        
        .intervention-card-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .intervention-type {
          margin-bottom: 12px;
        }
        
        .intervention-content {
          margin-bottom: 16px;
          min-height: 60px;
        }
        
        .intervention-tags {
          margin-bottom: 16px;
        }
        
        .intervention-metrics {
          margin-top: 8px;
        }
        
        .intervention-metric {
          margin-bottom: 8px;
        }
        
        .intervention-metric-row {
          display: flex;
          justify-content: space-between;
        }
        
        .intervention-metric-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .intervention-selector-actions {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default InterventionSelector; 
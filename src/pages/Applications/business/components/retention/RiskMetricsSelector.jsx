import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Tag, 
  Spin, 
  Empty,
  Checkbox
} from 'antd';
import { 
  FallOutlined,
  LineChartOutlined,
  InteractionOutlined,
  MessageOutlined,
  SearchOutlined,
  FundOutlined,
  AlertOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

// 图标映射
const ICON_MAP = {
  'interaction': <InteractionOutlined />,
  'fall': <FallOutlined />,
  'line-chart': <LineChartOutlined />,
  'message': <MessageOutlined />,
  'search': <SearchOutlined />,
  'fund': <FundOutlined />,
  'alert': <AlertOutlined />,
  'info': <InfoCircleOutlined />
};

/**
 * 流失风险指标选择器组件
 * 展示可选的流失风险评估指标，支持用户选择
 */
const RiskMetricsSelector = ({ metrics, selectedMetrics, onChange, loading }) => {
  // 处理指标选择变更
  const handleMetricSelectionChange = (metricId, checked) => {
    const newSelectedMetrics = checked
      ? [...selectedMetrics, metricId]
      : selectedMetrics.filter(id => id !== metricId);
    
    onChange(newSelectedMetrics);
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">加载风险指标...</div>
      </div>
    );
  }
  
  if (!metrics || metrics.length === 0) {
    return (
      <Empty 
        description="暂无可用的风险指标" 
        image={Empty.PRESENTED_IMAGE_SIMPLE} 
      />
    );
  }
  
  return (
    <div className="metrics-selector">
      <Title level={4}>选择流失风险指标</Title>
      <Paragraph type="secondary">
        选择您关注的流失风险指标，系统将根据这些指标识别出高流失风险的客户群体
      </Paragraph>
      
      <Row gutter={[16, 16]} className="metrics-cards">
        {metrics.map(metric => (
          <Col xs={24} sm={12} md={8} key={metric.id}>
            <Card 
              hoverable
              className={`metric-card ${selectedMetrics.includes(metric.id) ? 'selected' : ''}`}
              onClick={() => handleMetricSelectionChange(metric.id, !selectedMetrics.includes(metric.id))}
            >
              <div className="metric-card-content">
                <div className="metric-icon">
                  {ICON_MAP[metric.icon] || <InfoCircleOutlined />}
                </div>
                <div className="metric-details">
                  <div className="metric-header">
                    <Title level={5}>{metric.name}</Title>
                    <Checkbox 
                      checked={selectedMetrics.includes(metric.id)}
                      onChange={(e) => handleMetricSelectionChange(metric.id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <Paragraph ellipsis={{ rows: 2 }} className="metric-description">
                    {metric.description}
                  </Paragraph>
                  <div className="metric-info">
                    <div className="metric-weight">
                      <Text type="secondary">权重：</Text>
                      <Tag color="blue">{metric.weight * 100}%</Tag>
                    </div>
                    <div className="metric-threshold">
                      <Text type="secondary">阈值：</Text>
                      <Tag color="orange">{metric.threshold}%</Tag>
                    </div>
                  </div>
                  <div className="metric-tags">
                    {metric.tags && metric.tags.map((tag, index) => (
                      <Tag key={index} color="green">{tag}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      <style jsx>{`
        .metrics-selector {
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
        
        .metrics-cards {
          margin-top: 20px;
        }
        
        .metric-card {
          height: 100%;
          transition: all 0.3s;
          border: 2px solid transparent;
        }
        
        .metric-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .metric-card.selected {
          border-color: #1890ff;
          background-color: rgba(24, 144, 255, 0.05);
        }
        
        .metric-card-content {
          display: flex;
          align-items: flex-start;
        }
        
        .metric-icon {
          font-size: 24px;
          color: #1890ff;
          margin-right: 16px;
          padding-top: 2px;
        }
        
        .metric-details {
          flex: 1;
        }
        
        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .metric-description {
          margin-bottom: 12px;
          color: rgba(0, 0, 0, 0.45);
        }
        
        .metric-info {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;
        }
        
        .metric-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
      `}</style>
    </div>
  );
};

export default RiskMetricsSelector; 
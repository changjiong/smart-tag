import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Tag, 
  Spin, 
  Empty 
} from 'antd';
import { 
  SafetyOutlined, 
  ReadOutlined, 
  FundOutlined,
  AuditOutlined,
  GiftOutlined,
  GlobalOutlined,
  EditOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

// 图标映射
const ICON_MAP = {
  'safety': <SafetyOutlined />,
  'read': <ReadOutlined />,
  'fund': <FundOutlined />,
  'audit': <AuditOutlined />,
  'gift': <GiftOutlined />,
  'global': <GlobalOutlined />,
  'edit': <EditOutlined />
};

/**
 * 财富目标评估组件
 * 展示可选的财富管理目标，支持用户选择
 */
const GoalAssessment = ({ goals, loading, onSelect }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">加载财富目标...</div>
      </div>
    );
  }
  
  if (!goals || goals.length === 0) {
    return (
      <Empty 
        description="暂无可用的财富管理目标" 
        image={Empty.PRESENTED_IMAGE_SIMPLE} 
      />
    );
  }
  
  return (
    <div className="goal-assessment">
      <Title level={4}>选择您的财富目标</Title>
      <Paragraph type="secondary">
        选择一项财富管理目标，系统将根据您的目标定制个性化的财富规划方案
      </Paragraph>
      
      <Row gutter={[16, 16]} className="goal-cards">
        {goals.map(goal => (
          <Col xs={24} sm={12} md={8} key={goal.id}>
            <Card 
              hoverable
              className="goal-card"
              onClick={() => onSelect(goal)}
            >
              <div className="goal-card-content">
                <div className="goal-icon">
                  {ICON_MAP[goal.icon] || <EditOutlined />}
                </div>
                <div className="goal-details">
                  <Title level={5}>{goal.name}</Title>
                  <Paragraph ellipsis={{ rows: 2 }} className="goal-description">
                    {goal.description}
                  </Paragraph>
                  <div className="goal-kpi">
                    <Text type="secondary">关键指标：</Text>
                    {goal.kpis && goal.kpis.map((kpi, index) => (
                      <Tag key={index} color="blue">{kpi}</Tag>
                    ))}
                  </div>
                  <div className="goal-tags">
                    {goal.tags && goal.tags.map((tag, index) => (
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
        .goal-assessment {
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
        
        .goal-cards {
          margin-top: 20px;
        }
        
        .goal-card {
          height: 100%;
          transition: all 0.3s;
        }
        
        .goal-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border-color: #1890ff;
        }
        
        .goal-card-content {
          display: flex;
          align-items: flex-start;
        }
        
        .goal-icon {
          font-size: 24px;
          color: #1890ff;
          margin-right: 16px;
          padding-top: 2px;
        }
        
        .goal-details {
          flex: 1;
        }
        
        .goal-description {
          margin-bottom: 12px;
          color: rgba(0, 0, 0, 0.45);
        }
        
        .goal-kpi {
          margin-bottom: 8px;
        }
        
        .goal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
      `}</style>
    </div>
  );
};

export default GoalAssessment;

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
  CrownOutlined, 
  DisconnectOutlined, 
  InteractionOutlined,
  RiseOutlined,
  UserAddOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  LikeOutlined,
  EditOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

// 图标映射
const ICON_MAP = {
  'crown': <CrownOutlined />,
  'disconnect': <DisconnectOutlined />,
  'interaction': <InteractionOutlined />,
  'rise': <RiseOutlined />,
  'usergroup-add': <UserAddOutlined />,
  'thunderbolt': <ThunderboltOutlined />,
  'heart': <HeartOutlined />,
  'like': <LikeOutlined />,
  'edit': <EditOutlined />
};

const BusinessGoalSelector = ({ goals, loading, onSelect }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">加载业务目标...</div>
      </div>
    );
  }
  
  if (!goals || goals.length === 0) {
    return (
      <Empty 
        description="暂无可用的业务目标" 
        image={Empty.PRESENTED_IMAGE_SIMPLE} 
      />
    );
  }
  
  return (
    <div className="business-goal-selector">
      <Title level={4}>选择您的业务目标</Title>
      <Paragraph type="secondary">
        选择一个业务目标，系统将根据目标自动推荐标签并生成最优客群
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
                  <div className="goal-tags">
                    {goal.tags.map((tag, index) => (
                      <Tag key={index} color="blue">{tag}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      <style jsx>{`
        .business-goal-selector {
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
        
        .goal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
      `}</style>
    </div>
  );
};

export default BusinessGoalSelector; 
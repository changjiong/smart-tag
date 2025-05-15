import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Typography, 
  Button, 
  Space, 
  Divider, 
  Tag,
  List,
  Avatar
} from 'antd';
import { 
  RocketOutlined, 
  UserSwitchOutlined, 
  BankOutlined, 
  SafetyOutlined, 
  TeamOutlined,
  SettingOutlined,
  StarOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

/**
 * 业务场景主页
 * 提供业务场景选择入口，包括精准营销、客户挽留、财富顾问等
 */
const BusinessApplicationsPage = () => {
  const navigate = useNavigate();
  const [featuredCategory, setFeaturedCategory] = useState('marketing');
  
  // 业务场景数据
  const businessScenarios = [
    {
      id: 'marketing',
      title: '精准营销引擎',
      description: '整合客户数据，使用AI算法推荐最佳营销策略，提升转化率和ROI',
      icon: <RocketOutlined style={{ fontSize: 36, color: '#1890ff' }} />,
      path: '/applications/marketing',
      stats: {
        users: 1256,
        scenarios: 8,
        tags: 42
      },
      color: '#1890ff',
      popular: true,
      new: false
    },
    {
      id: 'retention',
      title: '客户挽留助手',
      description: '识别流失风险客户，智能推荐挽留策略和渠道，提高客户保留率',
      icon: <UserSwitchOutlined style={{ fontSize: 36, color: '#52c41a' }} />,
      path: '/applications/retention',
      stats: {
        users: 875,
        scenarios: 5,
        tags: 28
      },
      color: '#52c41a',
      popular: true,
      new: false
    },
    {
      id: 'wealth',
      title: '财富增值顾问',
      description: '根据客户风险偏好，智能推荐资产配置和投资组合，提供个性化财富规划',
      icon: <BankOutlined style={{ fontSize: 36, color: '#722ed1' }} />,
      path: '/applications/wealth',
      stats: {
        users: 642,
        scenarios: 6,
        tags: 35
      },
      color: '#722ed1',
      popular: false,
      new: true
    },
    {
      id: 'corporate',
      title: '企业画像分析',
      description: '深度分析企业客户特征和行为模式，提供全方位企业客户洞察',
      icon: <SafetyOutlined style={{ fontSize: 36, color: '#fa8c16' }} />,
      path: '/applications/corporate',
      stats: {
        users: 389,
        scenarios: 4,
        tags: 21
      },
      color: '#fa8c16',
      popular: false,
      new: true
    },
    {
      id: 'risk',
      title: '风险监控平台',
      description: '实时监控客户风险指标变化，预警潜在风险，支持主动风险管理',
      icon: <SafetyOutlined style={{ fontSize: 36, color: '#eb2f96' }} />,
      path: '/applications/risk',
      stats: {
        users: 412,
        scenarios: 7,
        tags: 31
      },
      color: '#eb2f96',
      popular: false,
      new: false
    }
  ];

  // 获取当前选中的场景
  const currentScenario = businessScenarios.find(item => item.id === featuredCategory);
  
  // 模板列表
  const scenarioTemplates = [
    {
      id: 'template1',
      title: '季度营销活动',
      description: '针对高价值客户的季度专属优惠活动',
      category: 'marketing',
      usageCount: 245,
      tags: ['高价值', '营销', '优惠']
    },
    {
      id: 'template2',
      title: '存款客户流失预警',
      description: '针对大额存款即将到期的客户的挽留策略',
      category: 'retention',
      usageCount: 187,
      tags: ['存款', '预警', '挽留']
    },
    {
      id: 'template3',
      title: '投资组合优化',
      description: '根据市场环境变化推荐投资组合调整策略',
      category: 'wealth',
      usageCount: 132,
      tags: ['投资', '调整', '优化']
    },
    {
      id: 'template4',
      title: '企业风险评估',
      description: '综合分析企业客户的经营风险和信用状况',
      category: 'corporate',
      usageCount: 98,
      tags: ['企业', '风险', '评估']
    }
  ];
  
  // 筛选当前类别的模板
  const filteredTemplates = scenarioTemplates.filter(
    template => template.category === featuredCategory
  );

  // 处理场景卡片点击
  const handleScenarioClick = (path) => {
    navigate(path);
  };
  
  // 渲染场景卡片
  const renderScenarioCard = (scenario) => (
    <Card 
      hoverable
      className="scenario-card"
      onClick={() => handleScenarioClick(scenario.path)}
      style={{ 
        borderTop: `3px solid ${scenario.color}`,
        height: '100%'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        {scenario.icon}
        <div>
          {scenario.popular && <Tag color="volcano">热门</Tag>}
          {scenario.new && <Tag color="green">新上线</Tag>}
        </div>
      </div>
      <Meta
        title={scenario.title}
        description={scenario.description}
      />
      <div style={{ marginTop: 16 }}>
        <Space split={<Divider type="vertical" />}>
          <Text type="secondary">{scenario.stats.users} 用户</Text>
          <Text type="secondary">{scenario.stats.scenarios} 场景</Text>
          <Text type="secondary">{scenario.stats.tags} 标签</Text>
        </Space>
      </div>
    </Card>
  );

  return (
    <div className="business-applications-page">
      <div className="page-header">
        <Title level={2}>业务场景中心</Title>
        <Paragraph>
          选择合适的业务场景，应用标签体系解决实际业务问题，提升业务效率
        </Paragraph>
      </div>
      
      <div className="featured-scenarios">
        <Row gutter={[24, 24]}>
          {businessScenarios.map(scenario => (
            <Col xs={24} sm={12} md={8} key={scenario.id}>
              {renderScenarioCard(scenario)}
            </Col>
          ))}
        </Row>
      </div>
      
      <Divider />
      
      <div className="scenario-detail">
        <Row gutter={24}>
          <Col span={24}>
            <Title level={3} style={{ color: currentScenario?.color }}>
              <Space>
                {currentScenario?.icon}
                {currentScenario?.title}
              </Space>
            </Title>
            
            <Row gutter={24} style={{ marginTop: 24 }}>
              <Col xs={24} md={16}>
                <Card title="场景模板" extra={<Button type="link">查看全部</Button>}>
                  <List
                    itemLayout="horizontal"
                    dataSource={filteredTemplates}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Button 
                            type="primary" 
                            ghost 
                            icon={<ArrowRightOutlined />}
                            onClick={() => message.info('应用模板功能即将推出')}
                          >
                            应用
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<SettingOutlined />} style={{ backgroundColor: currentScenario?.color }} />}
                          title={
                            <Space>
                              {item.title}
                              <Text type="secondary">({item.usageCount}次使用)</Text>
                            </Space>
                          }
                          description={
                            <div>
                              <div>{item.description}</div>
                              <div style={{ marginTop: 8 }}>
                                {item.tags.map(tag => (
                                  <Tag key={tag}>{tag}</Tag>
                                ))}
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              
              <Col xs={24} md={8}>
                <Card title="快速操作" extra={<SettingOutlined />}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button 
                      type="primary" 
                      icon={<ThunderboltOutlined />} 
                      block
                      onClick={() => handleScenarioClick(currentScenario?.path)}
                    >
                      创建新{currentScenario?.title}
                    </Button>
                    <Button icon={<StarOutlined />} block>
                      添加到收藏
                    </Button>
                    <Button icon={<TeamOutlined />} block>
                      查看相关客群
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      
      <style jsx>{`
        .business-applications-page {
          padding: 24px;
        }
        
        .page-header {
          margin-bottom: 24px;
        }
        
        .featured-scenarios {
          margin-bottom: 24px;
        }
        
        .scenario-detail {
          margin-top: 24px;
        }
        
        :global(.scenario-card) {
          transition: all 0.3s;
        }
        
        :global(.scenario-card:hover) {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default BusinessApplicationsPage;

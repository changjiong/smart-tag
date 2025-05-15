import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Statistic, 
  Button, 
  Tabs, 
  List,
  Tag, 
  Space, 
  Row, 
  Col, 
  Progress,
  Divider,
  Empty,
  Steps,
  Result,
  Avatar,
  Badge,
  Tooltip
} from 'antd';
import { 
  SaveOutlined, 
  RetweetOutlined, 
  TeamOutlined,
  LineChartOutlined,
  BulbOutlined,
  SafetyOutlined,
  RiseOutlined,
  DollarOutlined,
  PhoneOutlined,
  MessageOutlined,
  MobileOutlined,
  WechatOutlined,
  UserOutlined,
  MailOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  ScheduleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { Column, Pie } from '@ant-design/plots';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;

// 渠道图标映射
const CHANNEL_ICON_MAP = {
  '电话沟通': <PhoneOutlined />,
  '短信通知': <MessageOutlined />,
  '手机银行': <MobileOutlined />,
  '微信推送': <WechatOutlined />,
  '专属客户经理': <UserOutlined />,
  '邮件通知': <MailOutlined />
};

/**
 * 客户挽留方案结果组件
 * 展示生成的客户挽留方案，包括预期效果、执行计划和优化建议
 */
const RetentionPlanResult = ({ plan, onReset, onSave }) => {
  const [activeTab, setActiveTab] = useState('1');
  
  if (!plan) {
    return (
      <Empty 
        description="暂无挽留方案" 
        image={Empty.PRESENTED_IMAGE_SIMPLE} 
      />
    );
  }
  
  // 渲染概览统计
  const renderOverview = () => {
    return (
      <Card className="overview-card">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Statistic
              title="挽留方案名称"
              value={plan.name}
              valueStyle={{ fontSize: '18px' }}
            />
          </Col>
          <Col xs={24} md={8}>
            <Statistic
              title="目标客户数量"
              value={plan.targetGroup.count.toLocaleString()}
              valueStyle={{ color: '#1890ff' }}
              prefix={<TeamOutlined />}
            />
          </Col>
          <Col xs={24} md={8}>
            <Statistic
              title="预期投入产出比"
              value={plan.expectedResults.roi}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix="倍"
            />
          </Col>
        </Row>
      </Card>
    );
  };
  
  // 渲染目标客群
  const renderTargetGroup = () => {
    const { targetGroup } = plan;
    
    // 流失风险值到状态映射
    const getChurnStatus = (value) => {
      if (value >= 0.7) return 'error';
      if (value >= 0.5) return 'warning';
      if (value >= 0.3) return 'processing';
      return 'success';
    };
    
    // 客户价值映射
    const getValueColor = (value) => {
      if (value === 'critical') return '#f50';
      if (value === 'high') return '#fa8c16';
      if (value === 'medium') return '#1890ff';
      return '#52c41a';
    };
    
    const getValueText = (value) => {
      if (value === 'critical') return '极高';
      if (value === 'high') return '高';
      if (value === 'medium') return '中';
      return '低';
    };
    
    return (
      <Card 
        title={<><TeamOutlined /> 目标客群</>} 
        className="group-card"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card type="inner" title="客群基本信息">
              <div className="group-info-item">
                <Text strong>客群名称：</Text>
                <Text>{targetGroup.name}</Text>
              </div>
              <div className="group-info-item">
                <Text strong>客户数量：</Text>
                <Text>{targetGroup.count.toLocaleString()}</Text>
              </div>
              <div className="group-info-item">
                <Text strong>流失概率：</Text>
                <Space>
                  <Progress 
                    percent={Math.round(targetGroup.churnProbability * 100)} 
                    size="small" 
                    status={getChurnStatus(targetGroup.churnProbability)}
                    showInfo={false}
                    style={{ width: 100 }}
                  />
                  <Badge 
                    status={getChurnStatus(targetGroup.churnProbability)} 
                    text={`${(targetGroup.churnProbability * 100).toFixed(0)}%`}
                  />
                </Space>
              </div>
              <div className="group-info-item">
                <Text strong>客户价值：</Text>
                <Tag color={getValueColor(targetGroup.value)}>
                  {getValueText(targetGroup.value)}
                </Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card type="inner" title="客群特征标签">
              <Space wrap className="group-features">
                {targetGroup.features.map((feature, index) => (
                  <Tag key={index} color="blue">{feature}</Tag>
                ))}
              </Space>
              
              <Divider />
              
              <div className="custom-funnel">
                <div className="funnel-stage">
                  <div className="funnel-bar" style={{ width: '100%', backgroundColor: '#ff4d4f' }}>
                    <Text className="funnel-text">
                      流失风险客户：{targetGroup.count.toLocaleString()}
                    </Text>
                  </div>
                </div>
                <div className="funnel-stage">
                  <div className="funnel-bar" style={{ 
                    width: `${plan.expectedResults.expectedRetentionRate * 100}%`, 
                    backgroundColor: '#52c41a' 
                  }}>
                    <Text className="funnel-text">
                      预计挽留客户：{plan.expectedResults.expectedRetained.toLocaleString()}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    );
  };
  
  // 渲染干预措施
  const renderInterventions = () => {
    const { interventions } = plan;
    
    // 成本等级映射
    const COST_MAP = {
      'low': { text: '低', color: '#52c41a' },
      'medium': { text: '中', color: '#1890ff' },
      'high': { text: '高', color: '#faad14' },
      'very_high': { text: '很高', color: '#f5222d' }
    };
    
    return (
      <Card 
        title={<><SafetyOutlined /> 客户干预措施</>} 
        className="interventions-card"
      >
        <List
          itemLayout="vertical"
          dataSource={interventions}
          renderItem={(item, index) => (
            <List.Item
              key={item.id}
              extra={
                <div className="intervention-metrics">
                  <div className="intervention-metric">
                    <Text type="secondary">有效性：</Text>
                    <Progress 
                      percent={Math.round(item.effectiveness * 100)} 
                      size="small" 
                      status={item.effectiveness >= 0.8 ? 'success' : 'normal'}
                      style={{ width: 120 }}
                    />
                  </div>
                  <div className="intervention-metric">
                    <Text type="secondary">成本：</Text>
                    <Tag color={COST_MAP[item.cost].color}>
                      {COST_MAP[item.cost].text}
                    </Tag>
                  </div>
                  <div className="intervention-metric">
                    <Text type="secondary">时效：</Text>
                    <Tag icon={<ClockCircleOutlined />}>
                      {item.timeframe}
                    </Tag>
                  </div>
                </div>
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar 
                    style={{ 
                      backgroundColor: '#1890ff', 
                      verticalAlign: 'middle' 
                    }} 
                    size="large"
                  >
                    {index + 1}
                  </Avatar>
                }
                title={
                  <Space>
                    <Text strong>{item.title}</Text>
                    <Tag color="blue">{item.type}</Tag>
                  </Space>
                }
                description={item.content}
              />
              <div className="intervention-tags">
                <Space wrap>
                  {item.tags.map((tag, idx) => (
                    <Tag key={idx}>{tag}</Tag>
                  ))}
                </Space>
              </div>
            </List.Item>
          )}
        />
      </Card>
    );
  };
  
  // 渲染渠道配置
  const renderChannels = () => {
    const { channels } = plan;
    
    return (
      <Card 
        title={<><LineChartOutlined /> 渠道配置</>} 
        className="channels-card"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card type="inner" title="选择的渠道">
              <List
                dataSource={channels}
                renderItem={channel => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar icon={CHANNEL_ICON_MAP[channel.name] || <MailOutlined />} />
                      }
                      title={channel.name}
                      description={
                        <Space>
                          <Tag>触达率: {channel.reachRate}%</Tag>
                          <Tag>响应率: {channel.responseRate}%</Tag>
                        </Space>
                      }
                    />
                    <Tag color={channel.recommendation >= 0.8 ? 'green' : 'blue'}>
                      推荐度: {(channel.recommendation * 100).toFixed(0)}%
                    </Tag>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card type="inner" title="最佳联系时间">
              <div className="timing-info">
                <div className="timing-item">
                  <Text strong>执行时间：</Text>
                  <Tag icon={<ClockCircleOutlined />} color="blue">
                    {plan.timing === 'immediate' ? '立即执行' : 
                     plan.timing === 'tomorrow' ? '明天开始' : 
                     plan.timing === 'nextWeek' ? '下周开始' : '自定义'}
                  </Tag>
                </div>
                <div className="timing-item">
                  <Text strong>预计生效时间：</Text>
                  <Tag icon={<ClockCircleOutlined />} color="green">
                    {plan.expectedResults.timeToEffect}
                  </Tag>
                </div>
              </div>
              
              <Divider orientation="left">渠道最佳时段</Divider>
              
              <List
                size="small"
                dataSource={channels}
                renderItem={channel => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={CHANNEL_ICON_MAP[channel.name] || <MailOutlined />} size="small" />}
                      title={channel.name}
                      description={
                        <Space wrap>
                          {channel.bestTimeSlots.map((slot, index) => (
                            <Tag key={index} icon={<ClockCircleOutlined />}>{slot}</Tag>
                          ))}
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    );
  };
  
  // 渲染预期效果
  const renderExpectedResults = () => {
    const { expectedResults } = plan;
    
    // 准备流失漏斗数据
    const funnelData = [
      { 
        type: '初始流失风险', 
        value: expectedResults.originalCustomers - expectedResults.expectedRetained 
      },
      { 
        type: '成功挽留', 
        value: expectedResults.expectedRetained 
      }
    ];
    
    // 准备客户状态变化饼图数据
    const pieData = [
      { 
        type: '成功挽留', 
        value: expectedResults.expectedRetainedRate * 100,
        color: '#52c41a' 
      },
      { 
        type: '仍存在流失风险', 
        value: (1 - expectedResults.expectedRetainedRate) * 100,
        color: '#ff4d4f' 
      }
    ];
    
    return (
      <Card 
        title={<><LineChartOutlined /> 预期效果</>} 
        className="results-card"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card size="small" title="初始流失率">
              <Statistic
                value={expectedResults.originalChurnRate * 100}
                suffix="%"
                precision={1}
                valueStyle={{ color: '#ff4d4f' }}
                prefix={<RiseOutlined rotate={180} />}
              />
              <Progress 
                percent={expectedResults.originalChurnRate * 100} 
                status="exception" 
                strokeColor="#ff4d4f"
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" title="预期保留率">
              <Statistic
                value={expectedResults.expectedRetentionRate * 100}
                suffix="%"
                precision={1}
                valueStyle={{ color: '#3f8600' }}
                prefix={<RiseOutlined />}
              />
              <Progress 
                percent={expectedResults.expectedRetentionRate * 100} 
                status="active" 
                strokeColor={{ 
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" title="预计投入产出比">
              <Statistic
                value={expectedResults.roi}
                prefix={<DollarOutlined />}
                precision={1}
                valueStyle={{ color: '#722ed1' }}
                suffix="倍"
              />
            </Card>
          </Col>
          <Col xs={24}>
            <Divider>客户挽留效果预估</Divider>
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Card type="inner" title="挽留客户数量">
                  <Column
                    data={funnelData}
                    xField="type"
                    yField="value"
                    label={{
                      position: 'middle',
                      style: {
                        fill: '#FFFFFF',
                        opacity: 0.6,
                      },
                      content: (item) => item.value.toLocaleString(),
                    }}
                    color={({ type }) => {
                      return type === '成功挽留' ? '#52c41a' : '#ff4d4f';
                    }}
                    height={200}
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card type="inner" title="客户保留比例">
                  <Pie
                    data={pieData}
                    colorField="type"
                    angleField="value"
                    color={({ type }) => {
                      return type === '成功挽留' ? '#52c41a' : '#ff4d4f';
                    }}
                    radius={0.8}
                    innerRadius={0.5}
                    label={{
                      type: 'inner',
                      offset: '-30%',
                      content: '{value}%',
                      style: {
                        fontSize: 14,
                        textAlign: 'center',
                      },
                    }}
                    height={200}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  };
  
  // 渲染执行计划
  const renderExecutionPlan = () => {
    const { executionSteps } = plan;
    
    return (
      <Card 
        title={<><ScheduleOutlined /> 执行计划</>} 
        className="plan-card"
      >
        <Steps
          direction="vertical"
          current={0}
          items={executionSteps.map((step, index) => ({
            title: step.phase,
            description: (
              <div>
                <Text>周期：{step.duration}</Text>
                <List
                  size="small"
                  dataSource={step.activities}
                  renderItem={(activity) => (
                    <List.Item>
                      <Text>{activity}</Text>
                    </List.Item>
                  )}
                />
              </div>
            ),
            icon: index === 0 ? <RocketOutlined /> : 
                  index === executionSteps.length - 1 ? <CheckCircleOutlined /> : 
                  <ScheduleOutlined />
          }))}
        />
      </Card>
    );
  };
  
  // 渲染优化建议
  const renderOptimizationSuggestions = () => {
    const { optimizationSuggestions } = plan;
    
    return (
      <Card 
        title={<><BulbOutlined /> 优化建议</>} 
        className="suggestions-card"
      >
        <List
          itemLayout="vertical"
          dataSource={optimizationSuggestions}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={
                  <Space>
                    <Badge count={index + 1} style={{ backgroundColor: '#52c41a' }} />
                    <Text strong>{item.title}</Text>
                  </Space>
                }
                description={item.description}
              />
              <div className="suggestion-effect">
                <Tag color="green">{item.expectedImprovement}</Tag>
              </div>
            </List.Item>
          )}
        />
      </Card>
    );
  };
  
  return (
    <div className="retention-plan-result">
      <Result
        status="success"
        title="客户挽留方案生成成功！"
        subTitle="系统已为您智能生成客户挽留方案，预期可有效降低客户流失率并维护客户价值"
        className="generation-result"
      />
      
      {renderOverview()}
      
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="result-tabs"
      >
        <TabPane 
          tab={<span><TeamOutlined />目标客群</span>} 
          key="1"
        >
          {renderTargetGroup()}
        </TabPane>
        <TabPane 
          tab={<span><SafetyOutlined />干预措施</span>} 
          key="2"
        >
          {renderInterventions()}
        </TabPane>
        <TabPane 
          tab={<span><LineChartOutlined />渠道配置</span>} 
          key="3"
        >
          {renderChannels()}
        </TabPane>
        <TabPane 
          tab={<span><RiseOutlined />预期效果</span>} 
          key="4"
        >
          {renderExpectedResults()}
        </TabPane>
        <TabPane 
          tab={<span><ScheduleOutlined />执行计划</span>} 
          key="5"
        >
          {renderExecutionPlan()}
        </TabPane>
        <TabPane 
          tab={<span><BulbOutlined />优化建议</span>} 
          key="6"
        >
          {renderOptimizationSuggestions()}
        </TabPane>
      </Tabs>
      
      <div className="retention-plan-actions">
        <Button 
          icon={<RetweetOutlined />} 
          onClick={onReset}
        >
          重新生成
        </Button>
        <Button 
          type="primary" 
          icon={<SaveOutlined />} 
          onClick={onSave}
        >
          保存方案
        </Button>
      </div>
      
      <style jsx>{`
        .retention-plan-result {
          padding: 0 0 20px;
        }
        
        .generation-result {
          margin-bottom: 24px;
        }
        
        .overview-card {
          margin-bottom: 24px;
        }
        
        .result-tabs {
          margin-top: 24px;
        }
        
        .group-card,
        .interventions-card,
        .channels-card,
        .results-card,
        .plan-card,
        .suggestions-card {
          margin-bottom: 16px;
        }
        
        .group-info-item {
          margin-bottom: 12px;
        }
        
        .group-features {
          margin-bottom: 16px;
        }
        
        .custom-funnel {
          margin-top: 16px;
        }
        
        .funnel-stage {
          margin-bottom: 8px;
        }
        
        .funnel-bar {
          height: 30px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          transition: all 0.3s;
        }
        
        .funnel-text {
          color: white;
          font-weight: 500;
        }
        
        .intervention-metrics {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .intervention-metric {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .intervention-tags {
          margin-top: 8px;
        }
        
        .timing-info {
          margin-bottom: 16px;
        }
        
        .timing-item {
          margin-bottom: 8px;
        }
        
        .suggestion-effect {
          margin-top: 8px;
        }
        
        .retention-plan-actions {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default RetentionPlanResult; 
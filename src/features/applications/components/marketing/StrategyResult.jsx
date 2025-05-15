import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Statistic, 
  Button, 
  Tabs, 
  Table,
  List, 
  Tag, 
  Space, 
  Row, 
  Col, 
  Divider,
  Progress,
  Empty,
  Badge,
  Tooltip,
  Result,
  Steps,
  Timeline
} from 'antd';
import { 
  SaveOutlined, 
  RetweetOutlined, 
  UserOutlined, 
  TeamOutlined,
  BarChartOutlined,
  PieChartOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  FireOutlined,
  LineChartOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  RiseOutlined,
  ScheduleOutlined,
  SendOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { Column, Pie } from '@ant-design/plots';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;

/**
 * 营销策略结果组件
 * 展示智能生成的营销策略，包括预期效果、执行计划和优化建议
 */
const StrategyResult = ({ result, onReset, onSave }) => {
  const [activeTab, setActiveTab] = useState('1');
  
  if (!result) {
    return (
      <Empty 
        description="暂无策略结果" 
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
              title="营销策略名称"
              value={result.name}
              valueStyle={{ fontSize: '18px' }}
            />
          </Col>
          <Col xs={24} md={8}>
            <Statistic
              title="目标客户数量"
              value={result.expectedResults.reachCount.toLocaleString()}
              valueStyle={{ color: '#1890ff' }}
              prefix={<TeamOutlined />}
            />
          </Col>
          <Col xs={24} md={8}>
            <Statistic
              title="预期投入产出比"
              value={result.expectedResults.roi}
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
  const renderTargetGroups = () => {
    const columns = [
      {
        title: '客群名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '客户数量',
        dataIndex: 'count',
        key: 'count',
        render: (text) => text.toLocaleString(),
      },
      {
        title: '转化潜力',
        dataIndex: 'conversionPotential',
        key: 'conversionPotential',
        render: (value) => (
          <Badge 
            status={value >= 0.25 ? 'success' : value >= 0.15 ? 'processing' : 'default'} 
            text={`${(value * 100).toFixed(1)}%`}
          />
        ),
      },
      {
        title: '客群特征',
        dataIndex: 'features',
        key: 'features',
        render: (features) => (
          <Space wrap>
            {features.map((feature, index) => (
              <Tag key={index}>{feature}</Tag>
            ))}
          </Space>
        ),
      },
    ];
    
    return (
      <Card 
        title={<><TeamOutlined /> 目标客群</>} 
        className="groups-card"
      >
        <Table
          dataSource={result.targetGroups}
          columns={columns}
          rowKey="id"
          pagination={false}
          size="middle"
        />
      </Card>
    );
  };
  
  // 渲染预期效果
  const renderExpectedResults = () => {
    const { expectedResults } = result;
    
    // 准备转化漏斗数据
    const funnelData = [
      { stage: '触达客户', value: expectedResults.reachCount },
      { stage: '产生响应', value: Math.round(expectedResults.reachCount * expectedResults.responseRate / 100) },
      { stage: '最终转化', value: Math.round(expectedResults.reachCount * expectedResults.responseRate / 100 * expectedResults.conversionRate / 100) }
    ];
    
    return (
      <Card 
        title={<><LineChartOutlined /> 预期效果</>} 
        className="results-card"
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card size="small" title="响应率">
              <Statistic
                value={expectedResults.responseRate}
                suffix="%"
                precision={1}
                valueStyle={{ color: '#1890ff' }}
                prefix={<RiseOutlined />}
              />
              <Progress 
                percent={expectedResults.responseRate} 
                status="active" 
                strokeColor={{ 
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" title="转化率">
              <Statistic
                value={expectedResults.conversionRate}
                suffix="%"
                precision={1}
                valueStyle={{ color: '#3f8600' }}
                prefix={<RiseOutlined />}
              />
              <Progress 
                percent={expectedResults.conversionRate * 2} // 放大显示效果
                status="active" 
                strokeColor={{ 
                  '0%': '#3f8600',
                  '100%': '#87d068',
                }}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" title="每次转化成本">
              <Statistic
                value={expectedResults.costPerConversion}
                prefix={<DollarOutlined />}
                precision={0}
                formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Card>
          </Col>
          <Col xs={24}>
            <Title level={5}>转化漏斗</Title>
            <Column
              data={funnelData}
              xField="stage"
              yField="value"
              label={{
                position: 'middle',
                style: {
                  fill: '#FFFFFF',
                  opacity: 0.6,
                },
                content: (item) => item.value.toLocaleString(),
              }}
              meta={{
                value: {
                  formatter: (v) => `${v.toLocaleString()} 人`,
                },
              }}
              height={250}
            />
          </Col>
        </Row>
      </Card>
    );
  };
  
  // 渲染执行计划
  const renderExecutionPlan = () => {
    const { executionPlan } = result;
    
    return (
      <Card 
        title={<><ScheduleOutlined /> 执行计划</>} 
        className="plan-card"
      >
        <Steps
          direction="vertical"
          current={0}
          items={executionPlan.map((phase, index) => ({
            title: phase.phase,
            description: (
              <div>
                <Text>周期：{phase.duration}</Text>
                <List
                  size="small"
                  dataSource={phase.activities}
                  renderItem={(activity) => (
                    <List.Item>
                      <Text>{activity}</Text>
                    </List.Item>
                  )}
                />
              </div>
            ),
            icon: index === 0 ? <RocketOutlined /> : 
                  index === executionPlan.length - 1 ? <CheckCircleOutlined /> : 
                  <ScheduleOutlined />
          }))}
        />
      </Card>
    );
  };
  
  // 渲染优化建议
  const renderOptimizationSuggestions = () => {
    const { optimizationSuggestions } = result;
    
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
    <div className="strategy-result">
      <Result
        status="success"
        title="营销策略生成成功！"
        subTitle="系统已为您智能生成最优营销策略，预期可产生显著的商业价值"
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
          {renderTargetGroups()}
        </TabPane>
        <TabPane 
          tab={<span><LineChartOutlined />预期效果</span>} 
          key="2"
        >
          {renderExpectedResults()}
        </TabPane>
        <TabPane 
          tab={<span><ScheduleOutlined />执行计划</span>} 
          key="3"
        >
          {renderExecutionPlan()}
        </TabPane>
        <TabPane 
          tab={<span><BulbOutlined />优化建议</span>} 
          key="4"
        >
          {renderOptimizationSuggestions()}
        </TabPane>
      </Tabs>
      
      <div className="strategy-result-actions">
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
          保存策略
        </Button>
      </div>
      
      <style jsx>{`
        .strategy-result {
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
        
        .groups-card,
        .results-card,
        .plan-card,
        .suggestions-card {
          margin-bottom: 16px;
        }
        
        .suggestion-effect {
          margin-top: 8px;
        }
        
        .strategy-result-actions {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default StrategyResult; 
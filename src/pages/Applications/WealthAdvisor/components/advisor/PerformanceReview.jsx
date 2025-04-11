import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Divider, 
  Button, 
  Table, 
  Tabs, 
  Tag, 
  Spin, 
  Alert, 
  Space,
  List,
  Slider,
  InputNumber
} from 'antd';
import { 
  ArrowLeftOutlined, 
  CheckCircleOutlined, 
  LineChartOutlined, 
  PercentageOutlined,
  BarChartOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  SaveOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

/**
 * 业绩回顾组件
 * 展示投资组合的预期收益和风险评估
 */
const PerformanceReview = ({ 
  projection, 
  investmentPlan,
  loading, 
  onComplete, 
  onPrev,
  onSave
}) => {
  const [projectionYears, setProjectionYears] = useState(10);
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">生成投资业绩预测...</div>
      </div>
    );
  }
  
  if (!projection) {
    return (
      <Alert
        message="无法生成业绩预测"
        description="暂时无法获取投资业绩预测，请稍后再试。"
        type="error"
        showIcon
      />
    );
  }
  
  // 显示业绩表格列
  const projectionColumns = [
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
      render: (year) => `第 ${year} 年`,
    },
    {
      title: '预期年度收益率',
      dataIndex: 'returnRate',
      key: 'returnRate',
      render: (rate) => (
        <Tag color={rate < 3 ? 'green' : rate < 6 ? 'blue' : rate < 9 ? 'orange' : 'red'}>
          {rate}%
        </Tag>
      ),
    },
    {
      title: '预期资产总值',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Text>{amount.toLocaleString('zh-CN')} 元</Text>,
    },
    {
      title: '累计收益率',
      dataIndex: 'growthFromInitial',
      key: 'growthFromInitial',
      render: (growth) => (
        <Tag color={growth < 20 ? 'green' : growth < 50 ? 'blue' : growth < 100 ? 'orange' : 'red'}>
          {growth}%
        </Tag>
      ),
    }
  ];
  
  // 调整预测年数
  const handleYearChange = (value) => {
    setProjectionYears(value);
  };
  
  // 获取表格数据
  const getTableData = () => {
    if (!projection || !projection.yearlyProjections) {
      return [];
    }
    return projection.yearlyProjections.slice(0, projectionYears);
  };
  
  return (
    <div className="performance-review">
      <Title level={4}>投资绩效预测</Title>
      <Paragraph type="secondary">
        以下是基于您的投资方案生成的长期业绩预测，帮助您了解投资预期收益和风险
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Statistic 
                  title="预期年化收益率" 
                  value={projection.expectedCagr} 
                  suffix="%" 
                  precision={1}
                  prefix={<PercentageOutlined />} 
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic 
                  title="预期波动率" 
                  value={projection.volatility} 
                  suffix="%" 
                  precision={1}
                  prefix={<BarChartOutlined />} 
                  valueStyle={{ color: '#faad14' }}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic 
                  title="期末资产总值" 
                  value={(projection.finalAmount / 10000).toFixed(2)} 
                  suffix="万元"
                  prefix={<LineChartOutlined />} 
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
            </Row>
            
            <Divider />
            
            <div className="projection-period">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text>选择预测期间：{projectionYears}年</Text>
                <Row>
                  <Col span={20}>
                    <Slider
                      min={1}
                      max={30}
                      value={projectionYears}
                      onChange={handleYearChange}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={1}
                      max={30}
                      value={projectionYears}
                      onChange={handleYearChange}
                      style={{ marginLeft: 16 }}
                    />
                  </Col>
                </Row>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Tabs defaultActiveKey="table" type="card">
            <TabPane tab="收益表格" key="table">
              <Card>
                <Table 
                  dataSource={getTableData()} 
                  columns={projectionColumns} 
                  pagination={false} 
                  rowKey="year"
                />
              </Card>
            </TabPane>
            
            <TabPane tab="概率分析" key="probability">
              <Card>
                <Title level={5}>投资回报概率分布（{projectionYears}年后）</Title>
                <Paragraph type="secondary">
                  以下展示了不同市场情境下的可能投资结果，帮助您理解投资的潜在风险和回报范围
                </Paragraph>
                
                <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                  <Col xs={24} sm={8}>
                    <Card className="scenario-card" style={{ borderColor: '#faad14' }}>
                      <Title level={5} style={{ color: '#faad14' }}>保守情境</Title>
                      <Title level={4}>{Math.round(projection.probabilityDistribution.pessimistic / 10000)} 万元</Title>
                      <Text type="secondary">年化收益率约 {(projection.expectedCagr - projection.volatility).toFixed(1)}%</Text>
                      <Divider />
                      <Text type="secondary">
                        <InfoCircleOutlined /> 较低的市场回报情境，通常在市场低迷或波动期间出现
                      </Text>
                    </Card>
                  </Col>
                  
                  <Col xs={24} sm={8}>
                    <Card className="scenario-card" style={{ borderColor: '#1890ff' }}>
                      <Title level={5} style={{ color: '#1890ff' }}>基准情境</Title>
                      <Title level={4}>{Math.round(projection.probabilityDistribution.expected / 10000)} 万元</Title>
                      <Text type="secondary">年化收益率约 {projection.expectedCagr.toFixed(1)}%</Text>
                      <Divider />
                      <Text type="secondary">
                        <InfoCircleOutlined /> 基于历史平均回报的预期情境，是最可能的投资结果
                      </Text>
                    </Card>
                  </Col>
                  
                  <Col xs={24} sm={8}>
                    <Card className="scenario-card" style={{ borderColor: '#52c41a' }}>
                      <Title level={5} style={{ color: '#52c41a' }}>乐观情境</Title>
                      <Title level={4}>{Math.round(projection.probabilityDistribution.optimistic / 10000)} 万元</Title>
                      <Text type="secondary">年化收益率约 {(projection.expectedCagr + projection.volatility).toFixed(1)}%</Text>
                      <Divider />
                      <Text type="secondary">
                        <InfoCircleOutlined /> 较高的市场回报情境，通常在经济强劲和市场繁荣时期出现
                      </Text>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </TabPane>
            
            <TabPane tab="执行建议" key="implementation">
              <Card>
                <Title level={5}>实施建议</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={investmentPlan?.implementationSteps || []}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<CheckCircleOutlined style={{ color: '#1890ff' }} />}
                        title={<Text strong>{item.title}</Text>}
                        description={
                          <div>
                            <Paragraph>{item.description}</Paragraph>
                            <Tag color="blue">{item.timeframe}</Tag>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
                
                <Divider />
                
                <Title level={5}>风险提示</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={investmentPlan?.considerations || []}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<WarningOutlined style={{ color: '#faad14' }} />}
                        title={<Text strong>{item.title}</Text>}
                        description={<Paragraph>{item.description}</Paragraph>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      
      <div className="action-buttons">
        <Button 
          type="default" 
          icon={<ArrowLeftOutlined />} 
          onClick={onPrev}>
          返回
        </Button>
        <Space>
          <Button 
            type="primary" 
            ghost
            icon={<SaveOutlined />} 
            onClick={onSave}>
            保存方案
          </Button>
          <Button 
            type="primary" 
            icon={<CheckCircleOutlined />} 
            onClick={onComplete}>
            完成
          </Button>
        </Space>
      </div>
      
      <style jsx>{`
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
        
        .performance-review {
          padding: 0 0 20px;
        }
        
        .action-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
        }
        
        .projection-period {
          margin-top: 16px;
        }
        
        .scenario-card {
          height: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default PerformanceReview;

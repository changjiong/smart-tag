import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Typography, 
  Breadcrumb,
  Spin, 
  Tabs, 
  List, 
  Tag as AntTag,
  Progress,
  Divider,
  Table,
  Badge
} from 'antd';
import { 
  ArrowUpOutlined, 
  HomeOutlined, 
  TagsOutlined,
  LineChartOutlined, 
  AppstoreOutlined,
  PieChartOutlined,
  RiseOutlined,
  DollarOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import {
  getTagValueOverview,
  getTagBusinessValue,
  getMostValuableTags
} from '../../../../services/tagValueService';

// 导入图表组件
import { Pie, Column, Line } from '@ant-design/plots';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const TagValueInsightsPage = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [businessValue, setBusinessValue] = useState(null);
  const [valuableTags, setValuableTags] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState('1');

  // 获取标签价值数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 并行加载数据
        const [overviewData, businessValueData, valuableTagsData] = await Promise.all([
          getTagValueOverview(),
          getTagBusinessValue(),
          getMostValuableTags()
        ]);
        
        setOverview(overviewData);
        setBusinessValue(businessValueData);
        setValuableTags(valuableTagsData);
      } catch (error) {
        console.error('Failed to fetch tag value data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // 处理标签类型的颜色和名称
  const getTagTypeInfo = (type) => {
    const typeMap = {
      basic: { color: 'blue', name: '基础标签' },
      derived: { color: 'green', name: '派生标签' },
      behavioral: { color: 'purple', name: '行为标签' },
      external: { color: 'orange', name: '外部标签' },
      calculated: { color: 'cyan', name: '计算标签' }
    };
    
    return typeMap[type] || { color: 'default', name: '未知类型' };
  };

  // 渲染概览统计卡片
  const renderOverviewCards = () => {
    if (!overview) return null;
    
    return (
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="标签总数"
              value={overview.totalTags}
              prefix={<TagsOutlined />}
              valueStyle={{ color: '#1677ff' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">其中活跃标签: {overview.activeTags}</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="业务覆盖率"
              value={overview.businessCoverage}
              precision={1}
              suffix="%"
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress percent={overview.businessCoverage} showInfo={false} status="success" size="small" style={{ marginTop: 8 }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="价值评分"
              value={overview.valueScore}
              precision={1}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <Progress percent={overview.valueScore} showInfo={false} status="active" size="small" style={{ marginTop: 8 }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="价值增长"
              value={overview.valueGrowth}
              precision={1}
              suffix="%"
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">较上季度</Text>
            </div>
          </Card>
        </Col>
      </Row>
    );
  };

  // 渲染价值趋势图表
  const renderValueTrends = () => {
    if (!overview) return null;

    const config = {
      data: overview.valueTrends,
      xField: 'month',
      yField: 'value',
      point: {
        size: 5,
        shape: 'diamond',
      },
      label: {
        style: {
          fill: '#aaa',
        },
      },
      smooth: true,
      lineStyle: {
        lineWidth: 3,
      },
      color: '#1677ff',
    };

    return (
      <Card title="标签价值趋势" className="chart-card">
        <Line {...config} />
      </Card>
    );
  };
  
  // 渲染领域价值分布
  const renderDomainDistribution = () => {
    if (!overview) return null;
    
    const config = {
      data: overview.domainValues,
      angleField: 'value',
      colorField: 'name',
      radius: 0.8,
      label: {
        type: 'outer',
        content: '{name}: {percentage}',
      },
      interactions: [{ type: 'element-active' }],
    };
    
    return (
      <Card title="业务领域价值分布" className="chart-card">
        <Pie {...config} />
      </Card>
    );
  };
  
  // 渲染应用场景分布
  const renderScenarioDistribution = () => {
    if (!overview) return null;
    
    const config = {
      data: overview.scenarioDistribution,
      xField: 'name',
      yField: 'value',
      label: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      color: ['#1677ff', '#13C2C2', '#52C41A', '#FAAD14', '#F5222D', '#722ED1'],
    };
    
    return (
      <Card title="标签应用场景分布" className="chart-card">
        <Column {...config} />
      </Card>
    );
  };
  
  // 渲染业务价值指标
  const renderBusinessMetrics = () => {
    if (!businessValue) return null;
    
    return (
      <Card title="业务价值指标" className="metrics-card">
        <List
          itemLayout="horizontal"
          dataSource={businessValue.businessMetrics}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<span>{item.name}</span>}
                description={item.description}
              />
              <div className="metric-value">
                <Statistic
                  value={item.currentValue}
                  suffix={item.unit}
                  precision={1}
                  valueStyle={{ 
                    color: item.trend === 'up' ? '#52c41a' : '#cf1322',
                    fontSize: '18px'
                  }}
                />
                <div className="previous-value">
                  <Text type="secondary">从 {item.previousValue}{item.unit}</Text>
                  <ArrowUpOutlined style={{ color: '#52c41a', marginLeft: 8 }} />
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    );
  };
  
  // 渲染业务案例
  const renderBusinessCases = () => {
    if (!businessValue) return null;
    
    return (
      <Card title="标签应用业务案例" className="cases-card">
        <List
          itemLayout="vertical"
          dataSource={businessValue.businessCases}
          renderItem={item => (
            <List.Item
              extra={
                <div className="case-roi">
                  <Statistic
                    title="投资回报率"
                    value={item.roi}
                    suffix="%"
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </div>
              }
            >
              <List.Item.Meta
                title={<span>{item.title}</span>}
                description={item.description}
              />
              <div style={{ marginTop: 12 }}>
                <span style={{ marginRight: 8 }}>相关标签:</span>
                {item.tags.map(tag => (
                  <AntTag color="blue" key={tag}>{tag}</AntTag>
                ))}
              </div>
            </List.Item>
          )}
        />
      </Card>
    );
  };
  
  // 渲染最具价值标签表格
  const renderValuableTagsTable = () => {
    if (!valuableTags.length) return null;
    
    const columns = [
      {
        title: '排名',
        key: 'rank',
        render: (_, __, index) => (
          <Badge 
            count={index + 1} 
            style={{ 
              backgroundColor: index < 3 ? '#faad14' : '#d9d9d9',
              fontWeight: 'bold'
            }} 
          />
        ),
        width: 80,
      },
      {
        title: '标签名称',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: '标签类型',
        dataIndex: 'type',
        key: 'type',
        render: (type) => {
          const { color, name } = getTagTypeInfo(type);
          return <AntTag color={color}>{name}</AntTag>;
        },
      },
      {
        title: '业务价值',
        dataIndex: 'businessValue',
        key: 'businessValue',
        render: (value) => (
          <Progress 
            percent={value} 
            size="small"
            format={(percent) => `${percent.toFixed(0)}`}
            strokeColor={value >= 90 ? '#52c41a' : value >= 80 ? '#faad14' : '#f5222d'}
          />
        ),
        sorter: (a, b) => a.businessValue - b.businessValue,
        defaultSortOrder: 'descend',
      },
      {
        title: '覆盖率',
        dataIndex: 'coverage',
        key: 'coverage',
        render: (value) => `${value}%`,
        sorter: (a, b) => a.coverage - b.coverage,
      },
      {
        title: '使用次数',
        dataIndex: 'usageCount',
        key: 'usageCount',
        sorter: (a, b) => a.usageCount - b.usageCount,
      },
      {
        title: '应用场景',
        dataIndex: 'scenarios',
        key: 'scenarios',
        render: (scenarios) => (
          <>
            {scenarios.map(item => (
              <AntTag key={item}>{item}</AntTag>
            ))}
          </>
        ),
      },
    ];
    
    return (
      <Card 
        title={
          <span>
            <TrophyOutlined style={{ color: '#faad14', marginRight: 8 }} />
            最具价值标签TOP10
          </span>
        } 
        className="valuable-tags-card"
      >
        <Table 
          columns={columns} 
          dataSource={valuableTags}
          rowKey="id"
          pagination={false}
        />
      </Card>
    );
  };

  return (
    <div className="tag-value-insights-page">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item href="/dashboard">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/tags">标签中心</Breadcrumb.Item>
        <Breadcrumb.Item href="/tags/value">标签价值</Breadcrumb.Item>
        <Breadcrumb.Item>标签价值洞察</Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="page-header">
        <Title level={2}>
          <LineChartOutlined /> 标签价值洞察
        </Title>
        <Paragraph>
          深入分析标签体系为业务带来的价值，帮助优化标签资源配置，提升标签的业务贡献度。
        </Paragraph>
      </div>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>加载数据中...</div>
        </div>
      ) : (
        <div className="insights-content">
          {renderOverviewCards()}
          
          <Divider />
          
          <Tabs activeKey={activeTabKey} onChange={setActiveTabKey}>
            <TabPane 
              tab={<span><LineChartOutlined />价值概览</span>} 
              key="1"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={24} lg={12}>
                  {renderValueTrends()}
                </Col>
                <Col xs={24} md={12} lg={12}>
                  {renderDomainDistribution()}
                </Col>
                <Col xs={24} md={12} lg={24}>
                  {renderScenarioDistribution()}
                </Col>
              </Row>
            </TabPane>
            <TabPane 
              tab={<span><PieChartOutlined />业务价值</span>} 
              key="2"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  {renderBusinessMetrics()}
                </Col>
                <Col xs={24} lg={12}>
                  {renderBusinessCases()}
                </Col>
              </Row>
            </TabPane>
            <TabPane 
              tab={<span><TrophyOutlined />价值排行</span>} 
              key="3"
            >
              {renderValuableTagsTable()}
            </TabPane>
          </Tabs>
        </div>
      )}
      
      <style jsx>{`
        .tag-value-insights-page {
          padding: 24px;
        }
        
        .breadcrumb {
          margin-bottom: 16px;
        }
        
        .page-header {
          margin-bottom: 24px;
        }
        
        .loading-container {
          text-align: center;
          padding: 100px 50px;
          background: #fff;
          border-radius: 4px;
        }
        
        .insights-content {
          margin-top: 24px;
        }
        
        .chart-card {
          height: 100%;
        }
        
        .chart-card .ant-card-body {
          height: 300px;
          padding: 12px;
        }
        
        .metrics-card .ant-list-item {
          display: flex;
          justify-content: space-between;
        }
        
        .metric-value {
          text-align: right;
          min-width: 100px;
        }
        
        .previous-value {
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        
        .case-roi {
          text-align: center;
          margin-left: 24px;
          min-width: 150px;
        }
        
        .valuable-tags-card .ant-table-thead > tr > th {
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .case-roi {
            margin-left: 0;
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default TagValueInsightsPage; 
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Progress, Tabs, Radio, Select, Typography, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, LineChartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

/**
 * 标签价值洞察页面
 * 分析标签使用效果和业务价值
 */
const InsightsPage = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // 模拟加载数据
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 标签价值数据
  const tagValueData = [
    {
      key: '1',
      name: '高价值客户标签',
      category: '客户价值',
      usageCount: 367,
      usageGrowth: 12.5,
      businessValue: 268000,
      businessValueGrowth: 15.3,
      roi: 27.4,
      effectiveness: 92,
    },
    {
      key: '2',
      name: '活跃度标签',
      category: '行为特征',
      usageCount: 423,
      usageGrowth: 8.7,
      businessValue: 156000,
      businessValueGrowth: 7.2,
      roi: 18.6,
      effectiveness: 86,
    },
    {
      key: '3',
      name: '购买偏好标签',
      category: '消费习惯',
      usageCount: 298,
      usageGrowth: 5.2,
      businessValue: 143000,
      businessValueGrowth: 9.5,
      roi: 16.8,
      effectiveness: 85,
    },
    {
      key: '4',
      name: '流失风险标签',
      category: '风险指标',
      usageCount: 387,
      usageGrowth: 18.3,
      businessValue: 205000,
      businessValueGrowth: 22.1,
      roi: 24.2,
      effectiveness: 90,
    },
    {
      key: '5',
      name: '渠道偏好标签',
      category: '渠道属性',
      usageCount: 256,
      usageGrowth: 6.8,
      businessValue: 98000,
      businessValueGrowth: 4.3,
      roi: 14.5,
      effectiveness: 82,
    },
  ];

  // 表格列定义
  const columns = [
    {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '使用次数',
      dataIndex: 'usageCount',
      key: 'usageCount',
      sorter: (a, b) => a.usageCount - b.usageCount,
    },
    {
      title: '使用增长',
      dataIndex: 'usageGrowth',
      key: 'usageGrowth',
      render: (text) => (
        <span>
          {text > 0 ? <ArrowUpOutlined style={{ color: '#3f8600' }} /> : <ArrowDownOutlined style={{ color: '#cf1322' }} />}
          {text}%
        </span>
      ),
      sorter: (a, b) => a.usageGrowth - b.usageGrowth,
    },
    {
      title: '业务价值(元)',
      dataIndex: 'businessValue',
      key: 'businessValue',
      render: (text) => text.toLocaleString(),
      sorter: (a, b) => a.businessValue - b.businessValue,
    },
    {
      title: '价值增长',
      dataIndex: 'businessValueGrowth',
      key: 'businessValueGrowth',
      render: (text) => (
        <span>
          {text > 0 ? <ArrowUpOutlined style={{ color: '#3f8600' }} /> : <ArrowDownOutlined style={{ color: '#cf1322' }} />}
          {text}%
        </span>
      ),
      sorter: (a, b) => a.businessValueGrowth - b.businessValueGrowth,
    },
    {
      title: 'ROI',
      dataIndex: 'roi',
      key: 'roi',
      render: (text) => `${text}x`,
      sorter: (a, b) => a.roi - b.roi,
    },
    {
      title: '有效性',
      dataIndex: 'effectiveness',
      key: 'effectiveness',
      render: (text) => <Progress percent={text} size="small" />,
      sorter: (a, b) => a.effectiveness - b.effectiveness,
    },
  ];

  return (
    <div className="tag-value-insights-container">
      <Title level={2}>标签价值洞察</Title>
      <Paragraph className="page-description">
        分析标签的使用效果和业务价值，衡量标签投资回报率和有效性
      </Paragraph>

      <div className="filter-container">
        <Radio.Group value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <Radio.Button value="week">本周</Radio.Button>
          <Radio.Button value="month">本月</Radio.Button>
          <Radio.Button value="quarter">本季度</Radio.Button>
          <Radio.Button value="year">本年度</Radio.Button>
        </Radio.Group>

        <Select 
          defaultValue="all" 
          style={{ width: 150 }} 
          onChange={setCategoryFilter}
        >
          <Option value="all">全部分类</Option>
          <Option value="客户价值">客户价值</Option>
          <Option value="行为特征">行为特征</Option>
          <Option value="消费习惯">消费习惯</Option>
          <Option value="风险指标">风险指标</Option>
          <Option value="渠道属性">渠道属性</Option>
        </Select>
      </div>

      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
          <p>正在加载数据...</p>
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} className="metrics-row">
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="标签总价值"
                  value={870000}
                  precision={0}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<LineChartOutlined />}
                  suffix="元"
                />
                <div className="stat-growth">
                  <ArrowUpOutlined /> 12.5% 较上期
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="平均ROI"
                  value={18.7}
                  precision={1}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<LineChartOutlined />}
                  suffix="x"
                />
                <div className="stat-growth">
                  <ArrowUpOutlined /> 7.2% 较上期
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="总使用次数"
                  value={1731}
                  precision={0}
                  valueStyle={{ color: '#0050b3' }}
                  prefix={<LineChartOutlined />}
                />
                <div className="stat-growth">
                  <ArrowUpOutlined /> 9.8% 较上期
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="平均有效性"
                  value={87}
                  precision={0}
                  valueStyle={{ color: '#0050b3' }}
                  prefix={<LineChartOutlined />}
                  suffix="%"
                />
                <div className="stat-growth">
                  <ArrowUpOutlined /> 3.5% 较上期
                </div>
              </Card>
            </Col>
          </Row>

          <Card className="table-card">
            <Tabs defaultActiveKey="1">
              <TabPane tab="标签价值排行" key="1">
                <Table 
                  columns={columns} 
                  dataSource={categoryFilter === 'all' 
                    ? tagValueData 
                    : tagValueData.filter(item => item.category === categoryFilter)
                  } 
                  pagination={{ pageSize: 10 }}
                />
              </TabPane>
              <TabPane tab="业务场景分析" key="2">
                <div className="placeholder-content">
                  <p>业务场景分析数据正在准备中...</p>
                </div>
              </TabPane>
              <TabPane tab="价值趋势" key="3">
                <div className="placeholder-content">
                  <p>价值趋势分析数据正在准备中...</p>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </>
      )}

      <style jsx>{`
        .tag-value-insights-container {
          padding: 24px;
        }
        
        .page-description {
          margin-bottom: 24px;
        }
        
        .filter-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        
        .metrics-row {
          margin-bottom: 24px;
        }
        
        .stat-growth {
          color: #3f8600;
          font-size: 12px;
          margin-top: 8px;
        }
        
        .table-card {
          margin-bottom: 24px;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
        }
        
        .placeholder-content {
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8c8c8c;
        }
      `}</style>
    </div>
  );
};

export default InsightsPage;

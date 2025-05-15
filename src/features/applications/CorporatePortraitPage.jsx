import React, { useState, useEffect } from 'react';
import { Tabs, Card, Row, Col, Statistic, Progress, Table, Tag, Spin, Select, Button, Divider } from 'antd';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { UserOutlined, BankOutlined, ShopOutlined, GlobalOutlined, RiseOutlined, TeamOutlined, DollarOutlined } from '@ant-design/icons';
import PageTemplate from '@/components/Common/PageTemplate';
import { useCorporatePortrait } from './hooks';
import CompanyDetailDrawer from './components/corporate/CompanyDetailDrawer';
import IndustryDistributionCard from './components/corporate/IndustryDistributionCard';
import RegionDistributionCard from './components/corporate/RegionDistributionCard';
import ScaleDistributionCard from './components/corporate/ScaleDistributionCard';
import CompanyGrowthTrend from './components/corporate/CompanyGrowthTrend';

/**
 * 企业客户画像页面
 * 展示和分析企业客户数据
 */
const CorporatePortraitPage = () => {
  const { 
    companyList, 
    loading, 
    statistics, 
    industryData, 
    regionData, 
    scaleData, 
    growthData, 
    transactionData,
    loadCompanyData,
    getCompanyDetail
  } = useCorporatePortrait();
  
  const [activeTabKey, setActiveTabKey] = useState('overview');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [companyDetail, setCompanyDetail] = useState(null);
  const [companyDetailLoading, setCompanyDetailLoading] = useState(false);

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  const viewCompanyDetail = async (companyId) => {
    setCompanyDetailLoading(true);
    setDrawerVisible(true);
    const detail = await getCompanyDetail(companyId);
    setCompanyDetail(detail);
    setSelectedCompany(detail);
    setCompanyDetailLoading(false);
  };

  const columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => viewCompanyDetail(record.id)}>{text}</a>
      ),
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '规模',
      dataIndex: 'scale',
      key: 'scale',
      filters: [
        { text: '大型企业', value: '大型企业' },
        { text: '中型企业', value: '中型企业' },
        { text: '小型企业', value: '小型企业' },
      ],
      onFilter: (value, record) => record.scale === value,
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: '价值等级',
      dataIndex: 'valueLevel',
      key: 'valueLevel',
      render: (level) => {
        const colors = { 'A': 'gold', 'B': 'green', 'C': 'blue', 'D': 'purple' };
        return <Tag color={colors[level] || 'default'}>{level}级</Tag>;
      },
      sorter: (a, b) => a.valueLevel.localeCompare(b.valueLevel),
    },
    {
      title: '客户年限',
      dataIndex: 'years',
      key: 'years',
      sorter: (a, b) => a.years - b.years,
    },
    {
      title: '年交易额',
      dataIndex: 'yearTransactionAmount',
      key: 'yearTransactionAmount',
      render: (amount) => `¥${amount.toLocaleString()}`,
      sorter: (a, b) => a.yearTransactionAmount - b.yearTransactionAmount,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => viewCompanyDetail(record.id)}>详情</Button>
      ),
    },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

  return (
    <PageTemplate title="企业客户画像">
      <Tabs activeKey={activeTabKey} onChange={handleTabChange}>
        <Tabs.TabPane tab="概览" key="overview">
          <Spin spinning={loading}>
            <Row gutter={[16, 16]} className="mb-4">
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic 
                    title="企业客户总数" 
                    value={statistics.totalCompanies} 
                    prefix={<BankOutlined />} 
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic 
                    title="高价值客户占比" 
                    value={statistics.highValuePercentage} 
                    suffix="%" 
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic 
                    title="年均交易额" 
                    value={statistics.avgYearTransaction} 
                    prefix="¥"
                    precision={2}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic 
                    title="客户留存率" 
                    value={statistics.retentionRate} 
                    suffix="%"
                    prefix={<TeamOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <IndustryDistributionCard data={industryData} />
              </Col>
              <Col xs={24} md={8}>
                <RegionDistributionCard data={regionData} />
              </Col>
              <Col xs={24} md={8}>
                <ScaleDistributionCard data={scaleData} />
              </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-4">
              <Col xs={24} md={12}>
                <Card title="企业客户增长趋势">
                  <CompanyGrowthTrend data={growthData} />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="交易额分布">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={transactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" name="企业数量" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
          </Spin>
        </Tabs.TabPane>

        <Tabs.TabPane tab="企业列表" key="list">
          <Card>
            <div className="mb-4 flex justify-between items-center">
              <div>
                <Select
                  placeholder="行业筛选"
                  style={{ width: 150, marginRight: 8 }}
                  allowClear
                  options={industryData.map(item => ({ value: item.name, label: item.name }))}
                />
                <Select
                  placeholder="地区筛选"
                  style={{ width: 150, marginRight: 8 }}
                  allowClear
                  options={regionData.map(item => ({ value: item.name, label: item.name }))}
                />
                <Select
                  placeholder="价值等级"
                  style={{ width: 150 }}
                  allowClear
                  options={[
                    { value: 'A', label: 'A级' },
                    { value: 'B', label: 'B级' },
                    { value: 'C', label: 'C级' },
                    { value: 'D', label: 'D级' },
                  ]}
                />
              </div>
              <Button type="primary" onClick={() => loadCompanyData()}>刷新数据</Button>
            </div>
            <Table 
              columns={columns} 
              dataSource={companyList} 
              rowKey="id" 
              loading={loading}
              pagination={{ 
                pageSize: 10,
                showTotal: (total) => `共 ${total} 家企业`
              }}
            />
          </Card>
        </Tabs.TabPane>
      </Tabs>

      <CompanyDetailDrawer 
        visible={drawerVisible} 
        company={companyDetail} 
        loading={companyDetailLoading}
        onClose={() => setDrawerVisible(false)} 
      />
    </PageTemplate>
  );
};

export default CorporatePortraitPage;

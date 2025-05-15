import React from 'react';
import { Drawer, Descriptions, Spin, Tabs, Table, Tag, Card, Divider, Timeline } from 'antd';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { UserOutlined, PhoneOutlined, MailOutlined, BankOutlined, EnvironmentOutlined } from '@ant-design/icons';

/**
 * 企业详情抽屉组件
 * 展示企业客户的详细信息
 */
const CompanyDetailDrawer = ({ visible, company, loading, onClose }) => {
  // 交易历史表格列定义
  const transactionColumns = [
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: '产品',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <>
          {products.map((product) => (
            <Tag color="blue" key={product}>
              {product}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '交易金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount.toLocaleString()}`,
    },
  ];

  const renderTrend = () => {
    if (!company?.cooperationHistory) return null;
    
    const data = company.cooperationHistory.map(item => ({
      year: item.year,
      amount: item.amount,
    }));

    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
          <Bar dataKey="amount" fill="#1890ff" name="交易金额" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Drawer
      title={company?.name || '企业详情'}
      placement="right"
      onClose={onClose}
      open={visible}
      width={720}
    >
      <Spin spinning={loading}>
        {company && (
          <>
            <Tabs defaultActiveKey="basic">
              <Tabs.TabPane tab="基本信息" key="basic">
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="企业名称" span={2}>{company.name}</Descriptions.Item>
                  <Descriptions.Item label="行业">{company.industry}</Descriptions.Item>
                  <Descriptions.Item label="规模">{company.scale}</Descriptions.Item>
                  <Descriptions.Item label="地区">{company.region}</Descriptions.Item>
                  <Descriptions.Item label="价值等级">
                    <Tag color={company.valueLevel === 'A' ? 'gold' : company.valueLevel === 'B' ? 'green' : company.valueLevel === 'C' ? 'blue' : 'purple'}>
                      {company.valueLevel}级
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="成立年份">{company.establishYear}</Descriptions.Item>
                  <Descriptions.Item label="客户年限">{company.years}年</Descriptions.Item>
                  <Descriptions.Item label="年交易额" span={2}>¥{company.yearTransactionAmount.toLocaleString()}</Descriptions.Item>
                  <Descriptions.Item label="法人代表" span={2}>
                    <UserOutlined /> {company.legalPerson}
                  </Descriptions.Item>
                  <Descriptions.Item label="联系人" span={2}>
                    <UserOutlined /> {company.contactPerson}
                  </Descriptions.Item>
                  <Descriptions.Item label="联系电话">
                    <PhoneOutlined /> {company.contactPhone}
                  </Descriptions.Item>
                  <Descriptions.Item label="电子邮箱">
                    <MailOutlined /> {company.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="地址" span={2}>
                    <EnvironmentOutlined /> {company.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="业务范围" span={2}>{company.businessScope}</Descriptions.Item>
                </Descriptions>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="合作历史" key="cooperation">
                <Card title="交易趋势" className="mb-4">
                  {renderTrend()}
                </Card>
                
                <Table 
                  dataSource={company.cooperationHistory} 
                  columns={transactionColumns} 
                  rowKey="year"
                  pagination={false}
                />
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="风险与价值" key="risk">
                <Card className="mb-4">
                  <Descriptions bordered column={1}>
                    <Descriptions.Item label="风险等级">
                      <Tag 
                        color={
                          company.riskLevel === '低风险' ? 'green' : 
                          company.riskLevel === '中低风险' ? 'cyan' : 
                          company.riskLevel === '中风险' ? 'blue' : 
                          'orange'
                        }
                      >
                        {company.riskLevel}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="增长潜力">
                      <Tag 
                        color={
                          company.growthPotential === '高' ? 'green' : 
                          company.growthPotential === '中' ? 'blue' : 
                          'orange'
                        }
                      >
                        {company.growthPotential}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="客户标签">
                      {company.tags?.map(tag => (
                        <Tag color="purple" key={tag}>{tag}</Tag>
                      ))}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Tabs.TabPane>
              
              <Tabs.TabPane tab="跟进记录" key="followup">
                <Card>
                  <Descriptions bordered column={1}>
                    <Descriptions.Item label="客户经理">{company.customerManager}</Descriptions.Item>
                    <Descriptions.Item label="最近联系日期">{company.lastContactDate}</Descriptions.Item>
                    <Descriptions.Item label="下次跟进日期">{company.nextFollowupDate}</Descriptions.Item>
                  </Descriptions>
                  
                  <Divider />
                  
                  <Timeline>
                    <Timeline.Item>2024-05-10 客户沟通会议，讨论新增产品需求</Timeline.Item>
                    <Timeline.Item>2024-04-15 完成季度服务评估，客户满意度95%</Timeline.Item>
                    <Timeline.Item>2024-03-22 新增产品合作协议签署</Timeline.Item>
                    <Timeline.Item>2024-02-10 客户回访，了解产品使用情况</Timeline.Item>
                  </Timeline>
                </Card>
              </Tabs.TabPane>
            </Tabs>
          </>
        )}
      </Spin>
    </Drawer>
  );
};

export default CompanyDetailDrawer;

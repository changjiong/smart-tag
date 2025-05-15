import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Descriptions, 
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
  Avatar,
  Empty,
  Badge,
  Tooltip,
  Result
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
  StarOutlined
} from '@ant-design/icons';
import { Pie, Column } from '@ant-design/plots';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const GroupResult = ({ result, onReset, onSave }) => {
  const [activeTab, setActiveTab] = useState('1');
  
  if (!result) {
    return (
      <Empty 
        description="暂无分群结果" 
        image={Empty.PRESENTED_IMAGE_SIMPLE} 
      />
    );
  }
  
  // 渲染概览统计
  const renderOverview = () => {
    return (
      <Card className="overview-card">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} lg={6}>
            <Statistic
              title="客群名称"
              value={result.groupName}
              valueStyle={{ fontSize: '18px' }}
            />
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Statistic
              title="客户数量"
              value={result.customerCount.toLocaleString()}
              valueStyle={{ color: '#1890ff' }}
              prefix={<TeamOutlined />}
            />
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Statistic
              title="客户覆盖率"
              value={result.coverage}
              suffix="%"
              valueStyle={{ color: '#52c41a' }}
              prefix={<PieChartOutlined />}
            />
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Statistic
              title="业务价值评分"
              value={result.businessValue}
              prefix={<StarOutlined />}
              valueStyle={{ color: '#faad14' }}
              suffix="/100"
            />
          </Col>
        </Row>
      </Card>
    );
  };
  
  // 渲染特征概览
  const renderCharacteristics = () => {
    const columns = [
      {
        title: '特征名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '特征值',
        dataIndex: 'value',
        key: 'value',
      },
      {
        title: '重要性',
        dataIndex: 'importance',
        key: 'importance',
        render: (value) => (
          <Progress
            percent={value}
            size="small"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            format={(percent) => `${percent}%`}
          />
        ),
      },
    ];
    
    return (
      <Card 
        title={<><BulbOutlined /> 客群关键特征</>} 
        className="characteristics-card"
      >
        <Table
          dataSource={result.groupCharacteristics}
          columns={columns}
          rowKey="name"
          pagination={false}
          size="middle"
        />
      </Card>
    );
  };
  
  // 渲染客群统计
  const renderStatistics = () => {
    if (!result.statistics) return null;
    
    // 获取统计数据的所有键
    const statKeys = Object.keys(result.statistics);
    if (statKeys.length === 0) return null;
    
    return (
      <Card 
        title={<><BarChartOutlined /> 客群统计分析</>} 
        className="statistics-card"
      >
        <Row gutter={[16, 16]}>
          {statKeys.map((key, index) => {
            const data = result.statistics[key];
            if (!Array.isArray(data) || data.length === 0) return null;
            
            // 处理图表标题
            let title;
            switch (key) {
              case 'ageDist':
                title = '年龄分布';
                break;
              case 'genderDist':
                title = '性别分布';
                break;
              case 'assetDist':
                title = '资产分布';
                break;
              case 'productDist':
                title = '产品持有情况';
                break;
              case 'riskLevelDist':
                title = '风险等级分布';
                break;
              case 'activityDropDist':
                title = '活跃度下降幅度';
                break;
              case 'valueDist':
                title = '价值分布';
                break;
              case 'churnReasonDist':
                title = '流失原因分布';
                break;
              default:
                title = `分布${index + 1}`;
            }
            
            return (
              <Col xs={24} md={12} key={key}>
                <div className="stat-card">
                  <Title level={5}>{title}</Title>
                  {data.length <= 5 ? (
                    <Pie
                      data={data}
                      angleField="value"
                      colorField="name"
                      radius={0.8}
                      label={{
                        type: 'outer',
                        content: '{name}: {percentage}',
                      }}
                      height={250}
                    />
                  ) : (
                    <Column
                      data={data}
                      xField="name"
                      yField="value"
                      height={250}
                    />
                  )}
                </div>
              </Col>
            );
          })}
        </Row>
      </Card>
    );
  };
  
  // 渲染客户示例
  const renderCustomerSamples = () => {
    if (!result.customerSamples || result.customerSamples.length === 0) return null;
    
    // 动态构建列
    const getColumns = () => {
      const sample = result.customerSamples[0];
      if (!sample) return [];
      
      const columns = [
        {
          title: '客户ID',
          dataIndex: 'id',
          key: 'id',
          width: 120,
        },
        {
          title: '客户名称',
          dataIndex: 'name',
          key: 'name',
          render: (name, record) => (
            <Space>
              <Avatar icon={<UserOutlined />} src={record.avatar} />
              {name}
            </Space>
          ),
        }
      ];
      
      // 添加特定业务目标的列
      if ('value' in sample) {
        columns.push({
          title: '价值评分',
          dataIndex: 'value',
          key: 'value',
          render: (value) => (
            <Tag color="gold">{value}</Tag>
          ),
        });
      }
      
      if ('assets' in sample) {
        columns.push({
          title: '资产规模',
          dataIndex: 'assets',
          key: 'assets',
        });
      }
      
      if ('products' in sample) {
        columns.push({
          title: '产品持有数',
          dataIndex: 'products',
          key: 'products',
        });
      }
      
      if ('activity' in sample) {
        columns.push({
          title: '活跃度',
          dataIndex: 'activity',
          key: 'activity',
        });
      }
      
      if ('lastTransaction' in sample) {
        columns.push({
          title: '最近交易',
          dataIndex: 'lastTransaction',
          key: 'lastTransaction',
        });
      }
      
      if ('riskScore' in sample) {
        columns.push({
          title: '风险评分',
          dataIndex: 'riskScore',
          key: 'riskScore',
          render: (value) => (
            <Tag color={value >= 85 ? 'red' : value >= 75 ? 'orange' : 'green'}>
              {value}
            </Tag>
          ),
        });
      }
      
      if ('activityDrop' in sample) {
        columns.push({
          title: '活跃度下降',
          dataIndex: 'activityDrop',
          key: 'activityDrop',
        });
      }
      
      if ('lastLogin' in sample) {
        columns.push({
          title: '最近登录',
          dataIndex: 'lastLogin',
          key: 'lastLogin',
        });
      }
      
      if ('reason' in sample) {
        columns.push({
          title: '流失原因',
          dataIndex: 'reason',
          key: 'reason',
        });
      }
      
      return columns;
    };
    
    return (
      <Card 
        title={<><TeamOutlined /> 典型客户示例</>} 
        className="samples-card"
      >
        <Paragraph type="secondary">
          以下是该客群中的典型客户示例，可帮助您更直观地了解客群特征
        </Paragraph>
        <Table
          dataSource={result.customerSamples}
          columns={getColumns()}
          rowKey="id"
          pagination={false}
          size="middle"
        />
      </Card>
    );
  };
  
  // 渲染业务洞察
  const renderBusinessInsights = () => {
    if (!result.businessInsights || result.businessInsights.length === 0) return null;
    
    return (
      <Card 
        title={<><LineChartOutlined /> 业务洞察</>} 
        className="insights-card"
      >
        <List
          dataSource={result.businessInsights}
          renderItem={(item, index) => (
            <List.Item>
              <Space>
                <Badge count={index + 1} style={{ backgroundColor: '#52c41a' }} />
                <Text>{item}</Text>
              </Space>
            </List.Item>
          )}
        />
      </Card>
    );
  };
  
  // 渲染行动建议
  const renderActionRecommendations = () => {
    if (!result.actionRecommendations || result.actionRecommendations.length === 0) return null;
    
    return (
      <Card 
        title={<><ThunderboltOutlined /> 行动建议</>} 
        className="actions-card"
      >
        <List
          itemLayout="vertical"
          dataSource={result.actionRecommendations}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Space>
                    <Badge 
                      status={item.priority === 'high' ? 'error' : item.priority === 'medium' ? 'warning' : 'default'} 
                    />
                    <Text strong>{item.title}</Text>
                    {item.priority === 'high' && (
                      <Tag color="red">高优先级</Tag>
                    )}
                  </Space>
                }
                description={item.description}
              />
              <div className="expected-effect">
                <Text type="secondary">预期效果: </Text>
                <Text>{item.expectedEffect}</Text>
              </div>
            </List.Item>
          )}
        />
      </Card>
    );
  };
  
  return (
    <div className="group-result">
      <Result
        status="success"
        title="客群生成成功！"
        subTitle={`已生成包含 ${result.customerCount.toLocaleString()} 名客户的智能客群`}
        className="generation-result"
      />
      
      {renderOverview()}
      
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="result-tabs"
      >
        <TabPane 
          tab={<span><BulbOutlined />客群特征</span>} 
          key="1"
        >
          {renderCharacteristics()}
          <Divider />
          {renderStatistics()}
        </TabPane>
        <TabPane 
          tab={<span><TeamOutlined />客户示例</span>} 
          key="2"
        >
          {renderCustomerSamples()}
        </TabPane>
        <TabPane 
          tab={<span><LineChartOutlined />业务洞察</span>} 
          key="3"
        >
          {renderBusinessInsights()}
          <Divider />
          {renderActionRecommendations()}
        </TabPane>
      </Tabs>
      
      <div className="group-result-actions">
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
          保存客群
        </Button>
      </div>
      
      <style jsx>{`
        .group-result {
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
        
        .characteristics-card,
        .statistics-card,
        .samples-card,
        .insights-card,
        .actions-card {
          margin-bottom: 16px;
        }
        
        .stat-card {
          margin-bottom: 16px;
        }
        
        .expected-effect {
          margin-top: 8px;
        }
        
        .group-result-actions {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default GroupResult; 
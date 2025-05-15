import React, { useState } from 'react';
import { 
  Typography, 
  Table, 
  Checkbox, 
  Button, 
  Space, 
  Card, 
  Alert,
  Spin,
  Row,
  Col,
  Progress,
  Slider,
  InputNumber,
  Form,
  Radio,
  DatePicker,
  Tag,
  Tooltip,
  Badge
} from 'antd';
import { 
  SendOutlined, 
  DollarOutlined, 
  CalendarOutlined,
  ArrowLeftOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined,
  PercentageOutlined,
  FieldTimeOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

/**
 * 渠道选择器组件
 * 展示系统推荐的渠道，支持用户选择和设置预算、时间等
 */
const ChannelSelector = ({ 
  channels = [], 
  selectedChannels = [], 
  onChange,
  budgetAmount = 500000,
  onBudgetChange,
  timingOption = 'immediate',
  onTimingChange,
  loading = false,
  onPrev,
  onGenerate,
  generating = false
}) => {
  const [form] = Form.useForm();
  const [customDateRange, setCustomDateRange] = useState(null);
  
  // 处理渠道选择变更
  const handleChannelSelectionChange = (channelName, checked) => {
    const newSelectedChannels = checked
      ? [...selectedChannels, channelName]
      : selectedChannels.filter(name => name !== channelName);
    
    onChange(newSelectedChannels);
  };
  
  // 处理全选/取消全选
  const handleSelectAll = (checked) => {
    if (checked) {
      const allChannelNames = channels.map(channel => channel.name);
      onChange(allChannelNames);
    } else {
      onChange([]);
    }
  };
  
  // 表格列定义
  const columns = [
    {
      title: '选择',
      dataIndex: 'name',
      key: 'select',
      width: 80,
      render: (name) => (
        <Checkbox 
          checked={selectedChannels.includes(name)}
          onChange={(e) => handleChannelSelectionChange(name, e.target.checked)}
        />
      ),
    },
    {
      title: '渠道名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '触达率',
      dataIndex: 'reachRate',
      key: 'reachRate',
      render: (value) => (
        <Progress 
          percent={value} 
          size="small" 
          status="active"
          strokeColor={{ from: '#108ee9', to: '#87d068' }}
        />
      ),
    },
    {
      title: '响应率',
      dataIndex: 'responseRate',
      key: 'responseRate',
      render: (value) => (
        <Badge 
          status={value >= 15 ? 'success' : value >= 10 ? 'processing' : 'default'} 
          text={`${value}%`}
        />
      ),
    },
    {
      title: '转化率',
      dataIndex: 'conversionRate',
      key: 'conversionRate',
      render: (value) => (
        <Badge 
          status={value >= 5 ? 'success' : value >= 3 ? 'processing' : 'default'} 
          text={`${value}%`}
        />
      ),
    },
    {
      title: '推荐度',
      dataIndex: 'recommendation',
      key: 'recommendation',
      render: (value) => (
        <Tag color={value >= 0.9 ? '#87d068' : value >= 0.8 ? '#108ee9' : '#2db7f5'}>
          {(value * 100).toFixed(0)}%
        </Tag>
      ),
    },
    {
      title: '最佳时段',
      dataIndex: 'bestTimeSlots',
      key: 'bestTimeSlots',
      render: (slots) => (
        <Space wrap>
          {slots.map((slot, index) => (
            <Tag key={index} icon={<FieldTimeOutlined />}>{slot}</Tag>
          ))}
        </Space>
      ),
    },
  ];
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">加载推荐渠道...</div>
      </div>
    );
  }
  
  // 计算预算分配
  const getBudgetAllocation = () => {
    if (selectedChannels.length === 0) return [];
    
    // 找出选中的渠道对象
    const selectedChannelObjects = channels.filter(channel => 
      selectedChannels.includes(channel.name)
    );
    
    // 根据推荐度计算预算分配比例
    const totalRecommendation = selectedChannelObjects.reduce(
      (sum, channel) => sum + channel.recommendation, 0
    );
    
    return selectedChannelObjects.map(channel => ({
      name: channel.name,
      allocation: (channel.recommendation / totalRecommendation) * 100,
      amount: Math.round((channel.recommendation / totalRecommendation) * budgetAmount)
    }));
  };
  
  const budgetAllocation = getBudgetAllocation();
  const isAllSelected = channels.length > 0 && selectedChannels.length === channels.length;
  const isPartialSelected = selectedChannels.length > 0 && selectedChannels.length < channels.length;
  
  return (
    <div className="channel-selector">
      <Title level={4}>优化投放渠道</Title>
      <Paragraph type="secondary">
        系统已根据营销目标、客群特征和内容类型推荐了最优渠道组合，您可以根据需要调整
      </Paragraph>
      
      <Alert
        message="多渠道协同提示"
        description="选择多个互补渠道可以提高营销覆盖面和有效性。系统会根据您的选择自动优化预算分配，但您也可以手动调整。"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      
      <div className="selector-toolbar">
        <Space size="middle" style={{ marginBottom: 16 }}>
          <Checkbox 
            indeterminate={isPartialSelected}
            checked={isAllSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
          >
            全选
          </Checkbox>
          
          <Text>
            已选择 <Text strong>{selectedChannels.length}</Text> 个渠道
          </Text>
        </Space>
      </div>
      
      <Table
        rowKey="name"
        columns={columns}
        dataSource={channels}
        pagination={false}
        size="middle"
        locale={{ emptyText: '没有找到可用渠道' }}
      />
      
      {selectedChannels.length > 0 && (
        <div className="budget-section">
          <Card title={<span><DollarOutlined /> 营销预算设置</span>} className="budget-card">
            <Row gutter={16}>
              <Col span={12}>
                <div className="budget-input">
                  <Title level={5}>总预算</Title>
                  <Space>
                    <InputNumber
                      value={budgetAmount}
                      onChange={onBudgetChange}
                      formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                      style={{ width: 200 }}
                      min={10000}
                      max={10000000}
                      step={10000}
                    />
                    <Tooltip title="预算建议">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </Space>
                  <Slider
                    min={10000}
                    max={2000000}
                    step={10000}
                    value={budgetAmount}
                    onChange={onBudgetChange}
                    tooltip={{ formatter: value => `¥${value.toLocaleString()}` }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="budget-allocation">
                  <Title level={5}>预算分配</Title>
                  {budgetAllocation.map(item => (
                    <div key={item.name} className="allocation-item">
                      <Space>
                        <Text>{item.name}</Text>
                        <Progress 
                          percent={Math.round(item.allocation)} 
                          size="small" 
                          format={percent => `${percent}%`}
                        />
                        <Text strong>¥{item.amount.toLocaleString()}</Text>
                      </Space>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Card>
          
          <Card title={<span><CalendarOutlined /> 营销时间设置</span>} className="timing-card">
            <Form
              layout="vertical"
              initialValues={{ timingOption }}
            >
              <Form.Item name="timingOption">
                <Radio.Group onChange={e => onTimingChange(e.target.value)}>
                  <Space direction="vertical">
                    <Radio value="immediate">立即开始</Radio>
                    <Radio value="tomorrow">明天开始</Radio>
                    <Radio value="nextWeek">下周开始</Radio>
                    <Radio value="custom">自定义时间范围</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              
              {timingOption === 'custom' && (
                <Form.Item>
                  <RangePicker 
                    value={customDateRange}
                    onChange={setCustomDateRange}
                    locale={locale}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              )}
              
              <Form.Item>
                <Alert
                  message="投放时间建议"
                  description={
                    <ul className="time-suggestions">
                      <li>短信：建议在工作日上午9-11点或晚上7-9点发送</li>
                      <li>APP推送：建议在早上7-9点或晚上9-11点发送</li>
                      <li>微信：建议在中午12-2点或傍晚5-7点发送</li>
                    </ul>
                  }
                  type="info"
                  showIcon
                />
              </Form.Item>
            </Form>
          </Card>
        </div>
      )}
      
      <div className="channel-selector-actions">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onPrev}
        >
          上一步
        </Button>
        <Button 
          type="primary" 
          icon={<ThunderboltOutlined />} 
          onClick={onGenerate}
          loading={generating}
          disabled={selectedChannels.length === 0}
        >
          {generating ? '正在生成策略...' : '智能生成营销策略'}
        </Button>
      </div>
      
      <style jsx>{`
        .channel-selector {
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
        
        .selector-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        
        .budget-section {
          margin-top: 24px;
        }
        
        .budget-card {
          margin-bottom: 16px;
        }
        
        .timing-card {
          margin-bottom: 16px;
        }
        
        .budget-input {
          margin-bottom: 16px;
        }
        
        .budget-allocation {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .allocation-item {
          margin-bottom: 8px;
        }
        
        .time-suggestions {
          margin: 0;
          padding-left: 20px;
        }
        
        .channel-selector-actions {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default ChannelSelector; 
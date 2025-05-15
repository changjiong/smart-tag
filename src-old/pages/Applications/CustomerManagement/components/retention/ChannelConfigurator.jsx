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
  Radio,
  DatePicker,
  Form,
  Progress,
  Badge,
  Tooltip,
  Tag
} from 'antd';
import { 
  PhoneOutlined,
  MessageOutlined,
  MobileOutlined,
  WechatOutlined,
  UserOutlined,
  MailOutlined,
  ArrowLeftOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  FieldTimeOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

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
 * 渠道配置器组件
 * 展示系统推荐的干预渠道，支持用户选择和配置时间
 */
const ChannelConfigurator = ({ 
  channels = [], 
  selectedChannels = [], 
  onChange,
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
  const handleChannelChange = (channelName, checked) => {
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
          onChange={(e) => handleChannelChange(name, e.target.checked)}
        />
      ),
    },
    {
      title: '渠道名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          {CHANNEL_ICON_MAP[text] || <InfoCircleOutlined />}
          <span>{text}</span>
        </Space>
      ),
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
          status={value >= 30 ? 'success' : value >= 15 ? 'processing' : 'default'} 
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
          status={value >= 15 ? 'success' : value >= 5 ? 'processing' : 'default'} 
          text={`${value}%`}
        />
      ),
    },
    {
      title: '成本',
      dataIndex: 'costPerResponse',
      key: 'costPerResponse',
      render: (value) => (
        <Tag color={value > 100 ? '#f50' : value > 50 ? '#fa8c16' : value > 10 ? '#1890ff' : '#52c41a'}>
          ¥{value}
        </Tag>
      ),
    },
    {
      title: '推荐度',
      dataIndex: 'recommendation',
      key: 'recommendation',
      render: (value) => (
        <Tag color={value >= 0.9 ? '#87d068' : value >= 0.7 ? '#108ee9' : '#2db7f5'}>
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
  
  // 获取与客群匹配的渠道
  const getSuitableChannels = () => {
    const suitableChannels = channels.filter(channel => 
      channel.recommendation >= 0.7
    );
    
    return suitableChannels.map(channel => channel.name);
  };
  
  const suitableChannels = getSuitableChannels();
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">加载推荐渠道...</div>
      </div>
    );
  }
  
  const isAllSelected = channels.length > 0 && selectedChannels.length === channels.length;
  const isPartialSelected = selectedChannels.length > 0 && selectedChannels.length < channels.length;
  
  return (
    <div className="channel-configurator">
      <Title level={4}>配置渠道与时间</Title>
      <Paragraph type="secondary">
        选择适合的渠道和时间进行客户干预，系统已根据客群特征和干预措施推荐了最优渠道组合
      </Paragraph>
      
      <Alert
        message="渠道选择建议"
        description={
          <div>
            <Paragraph>
              根据所选客群特征，系统建议优先使用以下渠道：
            </Paragraph>
            <Space wrap>
              {suitableChannels.map(channel => (
                <Tag key={channel} color="blue" icon={CHANNEL_ICON_MAP[channel]}>
                  {channel}
                </Tag>
              ))}
            </Space>
          </div>
        }
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
        <Card title={<span><CalendarOutlined /> 干预时间设置</span>} className="timing-card">
          <Form
            layout="vertical"
            initialValues={{ timingOption }}
            form={form}
          >
            <Form.Item name="timingOption">
              <Radio.Group onChange={e => onTimingChange(e.target.value)}>
                <Space direction="vertical">
                  <Radio value="immediate">立即执行</Radio>
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
                message="干预时间建议"
                description={
                  <ul className="time-suggestions">
                    <li>电话沟通：建议在工作日上午9-11点或下午2-5点进行</li>
                    <li>短信通知：建议在工作日上午9-11点或晚上7-9点发送</li>
                    <li>微信推送：建议在中午12-2点或傍晚5-7点发送</li>
                    <li>紧急干预：对于极高价值且流失风险高的客户，建议选择"立即执行"</li>
                  </ul>
                }
                type="info"
                showIcon
              />
            </Form.Item>
          </Form>
        </Card>
      )}
      
      <div className="channel-configurator-actions">
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
          {generating ? '正在生成挽留方案...' : '生成客户挽留方案'}
        </Button>
      </div>
      
      <style jsx>{`
        .channel-configurator {
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
        
        .timing-card {
          margin: 24px 0 16px;
        }
        
        .time-suggestions {
          margin: 0;
          padding-left: 20px;
        }
        
        .channel-configurator-actions {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default ChannelConfigurator; 
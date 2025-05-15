import React, { useState } from 'react';
import { 
  Typography, 
  Table, 
  Tag, 
  Radio,
  Button, 
  Alert,
  Space,
  Tooltip, 
  Spin,
  Card,
  Statistic,
  Row,
  Col,
  Progress,
  Badge
} from 'antd';
import { 
  TeamOutlined, 
  InfoCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  WarningOutlined,
  DollarOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

/**
 * 流失风险客群选择器组件
 * 展示系统识别出的高流失风险客群，支持用户选择
 */
const RiskGroupSelector = ({ 
  groups = [], 
  selectedGroup = null, 
  onSelect, 
  loading = false,
  onNext,
  onPrev
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">识别流失风险客群...</div>
      </div>
    );
  }
  
  if (!groups || groups.length === 0) {
    return (
      <Alert
        message="未找到流失风险客群"
        description="根据当前选择的风险指标，未能识别出明显的流失风险客群。请尝试调整风险指标或降低风险阈值。"
        type="info"
        showIcon
      />
    );
  }
  
  // 处理客群选择变更
  const handleGroupChange = (groupId) => {
    const group = groups.find(g => g.id === groupId);
    onSelect(group);
  };
  
  // 根据流失概率获取状态颜色
  const getChurnProbabilityStatus = (probability) => {
    if (probability >= 0.7) return 'error';
    if (probability >= 0.5) return 'warning';
    if (probability >= 0.3) return 'processing';
    return 'success';
  };
  
  // 根据客户价值获取标签颜色
  const getValueTagColor = (value) => {
    if (value === 'critical') return '#f50';
    if (value === 'high') return '#fa8c16';
    if (value === 'medium') return '#1890ff';
    return '#52c41a';
  };
  
  // 根据客户价值获取显示文字
  const getValueText = (value) => {
    if (value === 'critical') return '极高';
    if (value === 'high') return '高';
    if (value === 'medium') return '中';
    return '低';
  };
  
  // 表格列定义
  const columns = [
    {
      title: '选择',
      dataIndex: 'id',
      key: 'select',
      render: (id) => (
        <Radio
          checked={selectedGroup && selectedGroup.id === id}
          onChange={() => handleGroupChange(id)}
        />
      ),
    },
    {
      title: '客群名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          {record.source === 'ai' && (
            <Tooltip title="AI识别客群">
              <Tag color="purple">AI识别</Tag>
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: '客户数量',
      dataIndex: 'count',
      key: 'count',
      render: (text) => text.toLocaleString(),
    },
    {
      title: '流失概率',
      dataIndex: 'churnProbability',
      key: 'churnProbability',
      render: (value) => (
        <Space>
          <Progress 
            percent={Math.round(value * 100)} 
            size="small" 
            status={getChurnProbabilityStatus(value)}
            showInfo={false}
          />
          <Badge 
            status={getChurnProbabilityStatus(value)} 
            text={`${(value * 100).toFixed(0)}%`}
          />
        </Space>
      ),
    },
    {
      title: '客户价值',
      dataIndex: 'value',
      key: 'value',
      render: (value) => (
        <Tag color={getValueTagColor(value)}>{getValueText(value)}</Tag>
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
    <div className="risk-group-selector">
      <Title level={4}>选择流失风险客群</Title>
      <Paragraph type="secondary">
        系统已根据选择的风险指标识别出高流失风险的客群，请选择一个客群进行干预
      </Paragraph>
      
      {selectedGroup && (
        <Row gutter={16} className="statistics-row">
          <Col span={8}>
            <Card size="small">
              <Statistic
                title="客户数量"
                value={selectedGroup.count}
                prefix={<TeamOutlined />}
                formatter={value => value.toLocaleString()}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Statistic
                title="流失风险"
                value={selectedGroup.churnProbability * 100}
                suffix="%"
                prefix={<WarningOutlined />}
                valueStyle={{ color: selectedGroup.churnProbability >= 0.7 ? '#cf1322' : selectedGroup.churnProbability >= 0.5 ? '#fa8c16' : '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Statistic
                title="客户价值"
                value={getValueText(selectedGroup.value)}
                prefix={<DollarOutlined />}
                valueStyle={{ 
                  color: selectedGroup.value === 'critical' ? '#cf1322' : 
                         selectedGroup.value === 'high' ? '#fa8c16' : 
                         selectedGroup.value === 'medium' ? '#1890ff' : '#52c41a' 
                }}
              />
            </Card>
          </Col>
        </Row>
      )}
      
      <Alert
        message="流失风险客群提示"
        description="选择客户价值较高且流失概率较大的客群进行优先干预，可以最大化挽留策略的投入产出比。"
        type="info"
        showIcon
        style={{ marginBottom: 16, marginTop: 16 }}
      />
      
      <Table
        rowKey="id"
        columns={columns}
        dataSource={groups}
        pagination={false}
        rowClassName={(record) => selectedGroup && record.id === selectedGroup.id ? 'selected-row' : ''}
        onRow={(record) => {
          return {
            onClick: () => handleGroupChange(record.id),
          };
        }}
      />
      
      <div className="risk-group-selector-actions">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onPrev}
        >
          上一步
        </Button>
        <Button 
          type="primary" 
          icon={<ArrowRightOutlined />} 
          onClick={onNext}
          disabled={!selectedGroup}
        >
          下一步
        </Button>
      </div>
      
      <style jsx>{`
        .risk-group-selector {
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
        
        .statistics-row {
          margin-bottom: 16px;
        }
        
        .risk-group-selector-actions {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
        }
        
        :global(.selected-row) {
          background-color: #e6f7ff;
        }
      `}</style>
    </div>
  );
};

export default RiskGroupSelector; 
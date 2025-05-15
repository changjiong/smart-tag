import React, { useState } from 'react';
import { 
  Typography, 
  Table, 
  Tag, 
  Checkbox,
  Button, 
  Alert,
  Space,
  Tooltip, 
  Spin,
  Input,
  Radio,
  Badge,
  Statistic,
  Row,
  Col,
  Card
} from 'antd';
import { 
  SearchOutlined, 
  TeamOutlined, 
  InfoCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  UserOutlined,
  RadarChartOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

/**
 * 客群选择器组件
 * 展示系统推荐的目标客群，支持用户筛选和选择
 */
const GroupSelector = ({ 
  groups = [], 
  selectedGroups = [], 
  onChange, 
  loading = false,
  onNext,
  onPrev 
}) => {
  const [searchText, setSearchText] = useState('');
  const [groupViewMode, setGroupViewMode] = useState('all'); // 'all', 'selected'
  
  // 处理客群选择变更
  const handleGroupSelectionChange = (groupId, checked) => {
    const newSelectedGroups = checked
      ? [...selectedGroups, groupId]
      : selectedGroups.filter(id => id !== groupId);
    
    onChange(newSelectedGroups);
  };
  
  // 处理全选/取消全选
  const handleSelectAll = (checked) => {
    if (checked) {
      const allGroupIds = groups.map(group => group.id);
      onChange(allGroupIds);
    } else {
      onChange([]);
    }
  };
  
  // 筛选客群
  const getFilteredGroups = () => {
    let filteredGroups = [...groups];
    
    // 搜索文本筛选
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filteredGroups = filteredGroups.filter(group => 
        group.name.toLowerCase().includes(lowerSearchText) ||
        group.features.some(feature => 
          feature.toLowerCase().includes(lowerSearchText)
        )
      );
    }
    
    // 客群视图模式筛选
    if (groupViewMode === 'selected') {
      filteredGroups = filteredGroups.filter(group => 
        selectedGroups.includes(group.id)
      );
    }
    
    return filteredGroups;
  };
  
  // 表格列定义
  const columns = [
    {
      title: '选择',
      dataIndex: 'id',
      key: 'select',
      width: 80,
      render: (id) => (
        <Checkbox 
          checked={selectedGroups.includes(id)}
          onChange={(e) => handleGroupSelectionChange(id, e.target.checked)}
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
            <Tooltip title="AI推荐客群">
              <Tag color="purple">AI推荐</Tag>
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
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Tooltip title="查看详情">
          <Button 
            type="text" 
            icon={<InfoCircleOutlined />} 
            size="small"
            onClick={() => {
              // 可以在这里添加查看客群详情的逻辑
              console.log('View group details:', record);
            }}
          />
        </Tooltip>
      ),
    },
  ];
  
  const filteredGroups = getFilteredGroups();
  const isAllSelected = groups.length > 0 && selectedGroups.length === groups.length;
  const isPartialSelected = selectedGroups.length > 0 && selectedGroups.length < groups.length;
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">加载推荐客群...</div>
      </div>
    );
  }
  
  // 计算总客户数量
  const getTotalCustomerCount = () => {
    return groups
      .filter(group => selectedGroups.includes(group.id))
      .reduce((total, group) => total + group.count, 0)
      .toLocaleString();
  };
  
  // 计算平均转化潜力
  const getAverageConversionPotential = () => {
    const selectedGroupsData = groups.filter(group => selectedGroups.includes(group.id));
    if (selectedGroupsData.length === 0) return 0;
    
    const totalPotential = selectedGroupsData.reduce(
      (total, group) => total + group.conversionPotential, 0
    );
    return ((totalPotential / selectedGroupsData.length) * 100).toFixed(1);
  };
  
  return (
    <div className="group-selector">
      <Title level={4}>选择目标客群</Title>
      <Paragraph type="secondary">
        系统已根据营销目标自动推荐了最相关的客群，您可以根据需要调整
      </Paragraph>
      
      {selectedGroups.length > 0 && (
        <Row gutter={16} className="statistics-row">
          <Col span={8}>
            <Card size="small">
              <Statistic
                title="已选客群数"
                value={selectedGroups.length}
                suffix={`/ ${groups.length}`}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Statistic
                title="目标客户总数"
                value={getTotalCustomerCount()}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Statistic
                title="平均转化潜力"
                value={getAverageConversionPotential()}
                suffix="%"
                prefix={<RadarChartOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
        </Row>
      )}
      
      <Alert
        message="营销客群选择提示"
        description="选择转化潜力高的客群可以提升营销效果，但请确保客群规模与您的营销预算相匹配。"
        type="info"
        showIcon
        style={{ marginBottom: 16, marginTop: 16 }}
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
            已选择 <Text strong>{selectedGroups.length}</Text> 个客群
          </Text>
          
          <Radio.Group
            value={groupViewMode}
            onChange={(e) => setGroupViewMode(e.target.value)}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="all">全部客群</Radio.Button>
            <Radio.Button value="selected">已选客群</Radio.Button>
          </Radio.Group>
        </Space>
        
        <Search
          placeholder="搜索客群名称或特征"
          allowClear
          onSearch={setSearchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 250 }}
        />
      </div>
      
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredGroups}
        pagination={{ pageSize: 5 }}
        size="middle"
        locale={{ emptyText: '没有找到匹配的客群' }}
      />
      
      <div className="group-selector-actions">
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
          disabled={selectedGroups.length === 0}
        >
          下一步
        </Button>
      </div>
      
      <style jsx>{`
        .group-selector {
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
        
        .selector-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        
        .group-selector-actions {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default GroupSelector; 
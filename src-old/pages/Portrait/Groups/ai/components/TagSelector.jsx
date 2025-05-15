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
  Radio
} from 'antd';
import { 
  SearchOutlined, 
  TagOutlined, 
  InfoCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

// 标签类型和颜色映射
const TAG_TYPE_COLORS = {
  id: '#d9d9d9',       // 灰色
  basic: '#1890ff',    // 蓝色
  derived: '#52c41a',  // 绿色
  behavioral: '#722ed1', // 紫色
  external: '#fa8c16'  // 橙色
};

// 标签类型中文名称
const TAG_TYPE_NAMES = {
  id: '标识标签',
  basic: '基础标签',
  derived: '派生标签',
  behavioral: '行为标签',
  external: '外部标签'
};

const TagSelector = ({ 
  tags = [], 
  selectedTags = [], 
  onChange, 
  loading = false,
  onNext,
  onPrev 
}) => {
  const [searchText, setSearchText] = useState('');
  const [tagViewMode, setTagViewMode] = useState('all'); // 'all', 'selected', 'required'
  
  // 处理标签选择变更
  const handleTagSelectionChange = (tagId, checked) => {
    const newSelectedTags = checked
      ? [...selectedTags, tagId]
      : selectedTags.filter(id => id !== tagId);
    
    onChange(newSelectedTags);
  };
  
  // 处理全选/取消全选
  const handleSelectAll = (checked) => {
    if (checked) {
      // 不全选必选标签，因为它们已经被选中了
      const allTagIds = tags.map(tag => tag.id);
      onChange(allTagIds);
    } else {
      // 保留必选标签
      const requiredTagIds = tags
        .filter(tag => tag.required)
        .map(tag => tag.id);
      onChange(requiredTagIds);
    }
  };
  
  // 筛选标签
  const getFilteredTags = () => {
    let filteredTags = [...tags];
    
    // 搜索文本筛选
    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filteredTags = filteredTags.filter(tag => 
        tag.name.toLowerCase().includes(lowerSearchText)
      );
    }
    
    // 标签视图模式筛选
    if (tagViewMode === 'selected') {
      filteredTags = filteredTags.filter(tag => 
        selectedTags.includes(tag.id)
      );
    } else if (tagViewMode === 'required') {
      filteredTags = filteredTags.filter(tag => tag.required);
    }
    
    return filteredTags;
  };
  
  // 计算必选标签数量
  const getRequiredTagsCount = () => {
    return tags.filter(tag => tag.required).length;
  };
  
  // 表格列定义
  const columns = [
    {
      title: '选择',
      dataIndex: 'id',
      key: 'select',
      width: 80,
      render: (id, record) => (
        <Checkbox 
          checked={selectedTags.includes(id)}
          onChange={(e) => handleTagSelectionChange(id, e.target.checked)}
          disabled={record.required} // 必选标签不能取消选择
        />
      ),
    },
    {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          {record.required && (
            <Tooltip title="必选标签">
              <Tag color="red">必选</Tag>
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: '标签类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={TAG_TYPE_COLORS[type] || '#d9d9d9'}>
          {TAG_TYPE_NAMES[type] || type}
        </Tag>
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
              // 可以在这里添加查看标签详情的逻辑
              console.log('View tag details:', record);
            }}
          />
        </Tooltip>
      ),
    },
  ];
  
  const filteredTags = getFilteredTags();
  const requiredTagsCount = getRequiredTagsCount();
  const isAllSelected = tags.length > 0 && selectedTags.length === tags.length;
  const isPartialSelected = selectedTags.length > requiredTagsCount && selectedTags.length < tags.length;
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">加载推荐标签...</div>
      </div>
    );
  }
  
  return (
    <div className="tag-selector">
      <Title level={4}>选择分群标签</Title>
      <Paragraph type="secondary">
        系统已根据业务目标自动推荐了最相关的标签，您可以根据需要调整
      </Paragraph>
      
      <Alert
        message="必选标签不可取消，这些标签对于当前业务目标至关重要"
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
            已选择 <Text strong>{selectedTags.length}</Text> 个标签
            （其中 <Text type="danger">{requiredTagsCount}</Text> 个必选标签）
          </Text>
          
          <Radio.Group
            value={tagViewMode}
            onChange={(e) => setTagViewMode(e.target.value)}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="all">全部标签</Radio.Button>
            <Radio.Button value="selected">已选标签</Radio.Button>
            <Radio.Button value="required">必选标签</Radio.Button>
          </Radio.Group>
        </Space>
        
        <Search
          placeholder="搜索标签名称"
          allowClear
          onSearch={setSearchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 250 }}
        />
      </div>
      
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredTags}
        pagination={{ pageSize: 8 }}
        size="middle"
        locale={{ emptyText: '没有找到匹配的标签' }}
      />
      
      <div className="tag-selector-actions">
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
          disabled={selectedTags.length === 0}
        >
          下一步
        </Button>
      </div>
      
      <style jsx>{`
        .tag-selector {
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
        
        .tag-selector-actions {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default TagSelector; 
import React, { useState } from 'react';
import { Card, Switch, Tooltip, Tag, Space, Typography, Popover, Badge } from 'antd';
import { 
  CheckCircleOutlined, 
  InfoCircleOutlined, 
  EditOutlined,
  PieChartOutlined,
  HistoryOutlined,
  ApiOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Text, Paragraph } = Typography;

// 标签类型和颜色映射
const TAG_TYPE_COLORS = {
  basic: 'blue',
  derived: 'green',
  behavioral: 'purple',
  external: 'orange',
  calculated: 'cyan'
};

// 获取标签类型的展示名称
const getTagTypeName = (type) => {
  switch (type) {
    case 'basic': return '基础标签';
    case 'derived': return '派生标签';
    case 'behavioral': return '行为标签';
    case 'external': return '外部标签';
    case 'calculated': return '计算标签';
    default: return '未知类型';
  }
};

// 获取指标样式
const getMetricStyle = (value, threshold = 70) => {
  if (value >= threshold) {
    return { color: '#52c41a' }; // 绿色，良好
  } else if (value >= threshold - 20) {
    return { color: '#faad14' }; // 黄色，一般
  } else {
    return { color: '#f5222d' }; // 红色，较差
  }
};

const TagPreviewCard = ({ tag, selected, onSelectionChange }) => {
  const [expanded, setExpanded] = useState(false);
  
  // 计算标签质量指标
  const qualityScore = Math.round((tag.coverage + tag.accuracy + tag.timeliness) / 3);
  
  // 标签质量详情
  const qualityDetails = (
    <div className="quality-details">
      <div className="quality-item">
        <span className="quality-label">覆盖率：</span>
        <span style={getMetricStyle(tag.coverage)}>{tag.coverage}%</span>
      </div>
      <div className="quality-item">
        <span className="quality-label">准确率：</span>
        <span style={getMetricStyle(tag.accuracy)}>{tag.accuracy}%</span>
      </div>
      <div className="quality-item">
        <span className="quality-label">及时性：</span>
        <span style={getMetricStyle(tag.timeliness)}>{tag.timeliness}%</span>
      </div>
    </div>
  );
  
  // 标签元数据详情
  const metadataDetails = (
    <div className="metadata-details">
      <div className="metadata-item">
        <span className="metadata-label">更新频率：</span>
        <span>{tag.updateFrequency}</span>
      </div>
      <div className="metadata-item">
        <span className="metadata-label">数据来源：</span>
        <span>{tag.dataSource}</span>
      </div>
      <div className="metadata-item">
        <span className="metadata-label">标签层级：</span>
        <span>{tag.level || '一级'}</span>
      </div>
    </div>
  );

  return (
    <Card 
      className={`tag-preview-card ${selected ? 'selected' : ''}`}
      hoverable
      bordered
      title={
        <div className="card-title">
          <Switch 
            checked={selected}
            onChange={onSelectionChange}
            checkedChildren={<CheckCircleOutlined />}
          />
          <Text ellipsis style={{ maxWidth: '180px' }} strong>
            {tag.name}
          </Text>
          <Tag color={TAG_TYPE_COLORS[tag.type] || 'default'}>
            {getTagTypeName(tag.type)}
          </Tag>
        </div>
      }
      extra={
        tag.isRecommended ? (
          <Tooltip title="AI推荐：该标签与您的业务需求高度相关">
            <Badge status="processing" text="推荐" />
          </Tooltip>
        ) : null
      }
    >
      <div className="card-content">
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}>
          {tag.description}
        </Paragraph>
        
        <div className="tag-metrics">
          <Space>
            <Tooltip title="分布情况">
              <PieChartOutlined /> {tag.distributionDesc || '正态分布'}
            </Tooltip>
            <Tooltip title="质量评分">
              <Popover 
                content={qualityDetails} 
                title="标签质量详情"
                trigger="hover"
              >
                <span className="quality-score" style={getMetricStyle(qualityScore)}>
                  <CheckCircleOutlined /> {qualityScore}分
                </span>
              </Popover>
            </Tooltip>
          </Space>
        </div>
        
        <div className="tag-metadata">
          <div className="metadata-row">
            <Tooltip title="标签编码">
              <span className="metadata-item">
                <ApiOutlined /> {tag.code}
              </span>
            </Tooltip>
            <Tooltip title="标签类型">
              <span className="metadata-item">
                <InfoCircleOutlined /> {tag.dataType || '字符型'}
              </span>
            </Tooltip>
          </div>
          
          <div className="metadata-row">
            <Tooltip title="标签元数据">
              <Popover 
                content={metadataDetails} 
                title="元数据详情"
                trigger="hover"
              >
                <span className="metadata-item clickable">
                  <InfoCircleOutlined /> 元数据详情...
                </span>
              </Popover>
            </Tooltip>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .tag-preview-card {
          transition: all 0.3s;
        }
        
        .tag-preview-card.selected {
          border-color: #1890ff;
          box-shadow: 0 0 8px rgba(24, 144, 255, 0.5);
        }
        
        .card-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .card-content {
          min-height: 120px;
          display: flex;
          flex-direction: column;
        }
        
        .tag-metrics {
          margin-top: 12px;
          margin-bottom: 12px;
        }
        
        .quality-score {
          font-weight: 500;
        }
        
        .tag-metadata {
          margin-top: auto;
          font-size: 12px;
          color: #8c8c8c;
        }
        
        .metadata-row {
          display: flex;
          justify-content: space-between;
          margin-top: 4px;
        }
        
        .metadata-item {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        
        .metadata-item.clickable {
          cursor: pointer;
          color: #1890ff;
        }
        
        .quality-details, .metadata-details {
          min-width: 180px;
        }
        
        .quality-item, .metadata-item {
          margin-bottom: 4px;
        }
        
        .quality-label, .metadata-label {
          color: #8c8c8c;
          margin-right: 4px;
        }
      `}</style>
    </Card>
  );
};

export default TagPreviewCard; 
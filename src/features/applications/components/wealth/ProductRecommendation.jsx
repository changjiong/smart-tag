import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Tabs, 
  Button, 
  Table, 
  Tag, 
  InputNumber, 
  Slider, 
  Spin, 
  Alert, 
  Space,
  Progress
} from 'antd';
import { 
  ArrowLeftOutlined, 
  ArrowRightOutlined, 
  DollarOutlined, 
  LineChartOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

/**
 * 产品推荐组件
 * 展示基于资产配置方案的具体投资产品建议
 */
const ProductRecommendation = ({ 
  recommendations, 
  loading, 
  onNext, 
  onPrev,
  investmentAmount = 1000000 // 默认100万
}) => {
  const [activeTab, setActiveTab] = useState('cash');
  const [allocation, setAllocation] = useState({});
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">筛选投资产品...</div>
      </div>
    );
  }
  
  if (!recommendations || Object.keys(recommendations).length === 0) {
    return (
      <Alert
        message="无法生成产品推荐"
        description="暂时无法获取产品推荐，请稍后再试。"
        type="error"
        showIcon
      />
    );
  }
  
  // 转换资产类别名称为中文
  const assetClassNames = {
    cash: '现金及等价物',
    fixedIncome: '固定收益类',
    equity: '权益类资产',
    alternative: '另类投资'
  };
  
  // 产品表格列定义
  const productColumns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.type}</Text>
        </Space>
      )
    },
    {
      title: '预期收益率',
      dataIndex: 'expectedReturn',
      key: 'expectedReturn',
      render: (value) => (
        <Tag color={value < 3 ? 'green' : value < 6 ? 'blue' : value < 9 ? 'orange' : 'red'}>
          {value}%
        </Tag>
      ),
      sorter: (a, b) => a.expectedReturn - b.expectedReturn
    },
    {
      title: '风险等级',
      dataIndex: 'risk',
      key: 'risk',
      render: (risk) => {
        let color = 'green';
        if (risk === '中低') color = 'cyan';
        if (risk === '中') color = 'blue';
        if (risk === '中高') color = 'orange';
        if (risk === '高') color = 'red';
        return <Tag color={color}>{risk}</Tag>;
      }
    },
    {
      title: '流动性',
      dataIndex: 'liquidity',
      key: 'liquidity',
      render: (liquidity) => {
        let color = 'green';
        if (liquidity === '中高') color = 'cyan';
        if (liquidity === '中') color = 'blue';
        if (liquidity === '中低') color = 'orange';
        if (liquidity === '低') color = 'red';
        return <Tag color={color}>{liquidity}</Tag>;
      }
    },
    {
      title: '期限',
      dataIndex: 'term',
      key: 'term'
    },
    {
      title: '建议配置金额',
      dataIndex: 'recommendedAmount',
      key: 'recommendedAmount',
      render: (value) => (
        <Text>{Math.round(value).toLocaleString('zh-CN')} 元</Text>
      )
    },
    {
      title: '建议配置占比',
      dataIndex: 'recommendedPercentage',
      key: 'recommendedPercentage',
      render: (value, record) => (
        <div style={{ width: 120 }}>
          <Slider
            min={0}
            max={100}
            step={1}
            value={value}
            onChange={(newValue) => handleProductAllocationChange(record.id, newValue, activeTab)}
            tooltipVisible
            tooltipPlacement="bottom"
            tooltip={{
              formatter: (value) => `${value}%`
            }}
          />
        </div>
      )
    }
  ];
  
  // 处理产品配置比例变更
  const handleProductAllocationChange = (productId, value, assetClass) => {
    // 更新推荐产品配置
    const updatedProducts = recommendations[assetClass].map(product => {
      if (product.id === productId) {
        return {
          ...product,
          recommendedPercentage: value,
          recommendedAmount: (product.allocationAmount * value) / 100
        };
      }
      return product;
    });
    
    // 计算总配置比例
    const totalPercentage = updatedProducts.reduce((sum, product) => sum + product.recommendedPercentage, 0);
    
    // 如果总比例不等于100%，调整其他产品配置比例
    if (totalPercentage !== 100) {
      const remainingProducts = updatedProducts.filter(p => p.id !== productId);
      const remainingPercentage = 100 - value;
      
      if (remainingProducts.length > 0 && remainingPercentage > 0) {
        // 均匀分配剩余比例
        const originalRemainingTotal = remainingProducts.reduce((sum, p) => sum + p.recommendedPercentage, 0);
        const scaleFactor = originalRemainingTotal > 0 ? remainingPercentage / originalRemainingTotal : 1;
        
        remainingProducts.forEach(product => {
          const newPercentage = originalRemainingTotal > 0 
            ? Math.round(product.recommendedPercentage * scaleFactor) 
            : Math.round(remainingPercentage / remainingProducts.length);
          
          product.recommendedPercentage = newPercentage;
          product.recommendedAmount = (product.allocationAmount * newPercentage) / 100;
        });
      }
    }
    
    // 更新组件状态
    setAllocation({
      ...recommendations,
      [assetClass]: updatedProducts
    });
  };
  
  // 计算各资产类别的分配总额
  const calculateCategoryTotal = (assetClass) => {
    if (!recommendations[assetClass]) return 0;
    return recommendations[assetClass].reduce((sum, product) => sum + product.recommendedAmount, 0);
  };
  
  return (
    <div className="product-recommendation">
      <Title level={4}>投资产品推荐</Title>
      <Paragraph type="secondary">
        基于您的资产配置方案，我们为您筛选了以下投资产品，您可以根据自己的偏好调整各产品的配置比例
      </Paragraph>
      
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          tabPosition="top"
          type="card"
        >
          {Object.keys(recommendations).map(assetClass => (
            <TabPane 
              tab={
                <Space>
                  <span>{assetClassNames[assetClass] || assetClass}</span>
                  <Tag color="blue">
                    {recommendations[assetClass][0]?.allocationRatio || 0}%
                  </Tag>
                </Space>
              } 
              key={assetClass}
            >
              <div className="category-info">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div className="allocation-info">
                    <Text>配置金额：</Text>
                    <Text strong>
                      {Math.round(recommendations[assetClass][0]?.allocationAmount || 0).toLocaleString('zh-CN')} 元
                    </Text>
                    <Text type="secondary" style={{ marginLeft: 16 }}>
                      ({recommendations[assetClass][0]?.allocationRatio || 0}% 的总资产)
                    </Text>
                  </div>
                  
                  <Progress
                    percent={100}
                    status="active"
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    style={{ marginBottom: 16 }}
                  />
                </Space>
              </div>
              
              <Table
                dataSource={allocation[assetClass] || recommendations[assetClass]}
                columns={productColumns}
                pagination={false}
                rowKey="id"
                expandable={{
                  expandedRowRender: (record) => (
                    <div style={{ marginLeft: 32 }}>
                      <Text type="secondary">{record.description}</Text>
                    </div>
                  ),
                  expandRowByClick: true
                }}
              />
            </TabPane>
          ))}
        </Tabs>
      </Card>
      
      <div className="summary-section" style={{ marginTop: 24 }}>
        <Card title="投资配置概览">
          <Row gutter={[16, 16]}>
            {Object.keys(recommendations).map(assetClass => (
              <Col xs={24} sm={12} md={6} key={assetClass}>
                <Card size="small">
                  <Statistic
                    title={assetClassNames[assetClass] || assetClass}
                    value={calculateCategoryTotal(assetClass).toLocaleString('zh-CN')}
                    suffix="元"
                    valueStyle={{ fontSize: 16 }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Progress
                      percent={recommendations[assetClass][0]?.allocationRatio || 0}
                      size="small"
                      status="active"
                    />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
      
      <div className="action-buttons">
        <Button 
          type="default" 
          icon={<ArrowLeftOutlined />} 
          onClick={onPrev}>
          返回
        </Button>
        <Button 
          type="primary" 
          icon={<ArrowRightOutlined />} 
          onClick={() => onNext(allocation || recommendations)}>
          继续
        </Button>
      </div>
      
      <style jsx>{`
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
        
        .product-recommendation {
          padding: 0 0 20px;
        }
        
        .action-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
        }
        
        .category-info {
          margin-bottom: 16px;
        }
        
        .allocation-info {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

// 添加一个Statistic组件，用于产品概览
const Statistic = ({ title, value, suffix, valueStyle }) => {
  return (
    <div className="statistic">
      <div className="statistic-title">{title}</div>
      <div className="statistic-content">
        <span className="statistic-value" style={valueStyle}>{value}</span>
        {suffix && <span className="statistic-suffix">{suffix}</span>}
      </div>
      
      <style jsx>{`
        .statistic {
          margin-bottom: 8px;
        }
        
        .statistic-title {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          margin-bottom: 4px;
        }
        
        .statistic-content {
          color: rgba(0, 0, 0, 0.85);
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .statistic-suffix {
          font-size: 14px;
          margin-left: 4px;
          color: rgba(0, 0, 0, 0.65);
        }
      `}</style>
    </div>
  );
};

export default ProductRecommendation;

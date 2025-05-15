import React from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Descriptions, 
  Button, 
  Divider, 
  Spin, 
  Alert, 
  Table,
  Tag,
  Space
} from 'antd';
import { 
  ArrowLeftOutlined, 
  ArrowRightOutlined, 
  PieChartOutlined, 
  PercentageOutlined,
  DollarOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

// 资产类别颜色映射
const assetColorMap = {
  stocks: '#1890ff',
  bonds: '#52c41a',
  cash: '#faad14',
  realEstate: '#722ed1',
  crypto: '#eb2f96',
  commodities: '#fa8c16'
};

// 资产类别中文名映射
const assetNameMap = {
  stocks: '股票',
  bonds: '债券',
  cash: '现金',
  realEstate: '房地产',
  crypto: '加密货币',
  commodities: '大宗商品'
};

// 资产类别描述映射
const assetDescriptionMap = {
  stocks: '权益类资产，具有较高的长期回报潜力和较大的波动性',
  bonds: '债务类资产，提供相对稳定的收益和较低的风险',
  cash: '流动性资产，安全性高但收益率低',
  realEstate: '不动产投资，提供租金收入和资本增值',
  crypto: '数字资产，高风险高回报的新兴投资品类',
  commodities: '实物资产，可作为对冲通胀的工具'
};

/**
 * 资产配置建议组件
 * 展示根据用户风险偏好和财富目标生成的资产配置方案
 */
const AssetAllocation = ({ 
  allocation, 
  loading, 
  onNext, 
  onPrev,
  investmentAmount = 1000000 // 默认100万
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">生成资产配置方案...</div>
      </div>
    );
  }
  
  if (!allocation || !allocation.allocation) {
    return (
      <Alert
        message="无法生成资产配置方案"
        description="暂时无法获取资产配置建议，请稍后再试。"
        type="error"
        showIcon
      />
    );
  }
  
  // 从状态中获取数据
  const assetAllocation = allocation.allocation;
  
  // 计算预期收益和风险指标
  const expectedAnnualReturn = calculateExpectedReturn(assetAllocation);
  const volatility = calculateVolatility(assetAllocation);
  const sharpeRatio = (expectedAnnualReturn - 2.5) / volatility; // 假设无风险利率为2.5%
  
  // 确定投资组合类型
  const portfolioType = determinePortfolioType(assetAllocation);
  
  // 转换资产配置数据为可展示格式
  const formattedAssetAllocation = {};
  Object.keys(assetAllocation).forEach(key => {
    formattedAssetAllocation[key] = {
      name: assetNameMap[key] || key,
      ratio: assetAllocation[key],
      color: assetColorMap[key] || '#1890ff',
      description: assetDescriptionMap[key] || '资产类别'
    };
  });
  
  // 创建饼图数据
  const pieChartData = Object.keys(formattedAssetAllocation).map(key => ({
    type: formattedAssetAllocation[key].name,
    value: formattedAssetAllocation[key].ratio,
    color: formattedAssetAllocation[key].color
  }));
  
  // 资产类别详细信息
  const assetClassColumns = [
    {
      title: '资产类别',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <div className="color-square" style={{ backgroundColor: record.color }}></div>
          <span>{text}</span>
        </Space>
      )
    },
    {
      title: '配置比例',
      dataIndex: 'ratio',
      key: 'ratio',
      render: (ratio) => <Tag color="blue">{ratio}%</Tag>
    },
    {
      title: '配置金额 (元)',
      key: 'amount',
      render: (_, record) => (
        <Text>{(investmentAmount * record.ratio / 100).toLocaleString('zh-CN')}</Text>
      )
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    },
  ];
  
  // 转换资产配置数据为表格数据
  const assetClassData = Object.keys(formattedAssetAllocation).map(key => ({
    key,
    ...formattedAssetAllocation[key]
  }));
  
  return (
    <div className="asset-allocation">
      <Title level={4}>资产配置建议</Title>
      <Paragraph type="secondary">
        基于您的财富目标和风险承受能力，我们为您定制了以下资产配置方案
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Statistic 
                  title="预期年化收益" 
                  value={expectedAnnualReturn.toFixed(2)} 
                  suffix="%" 
                  prefix={<PercentageOutlined />} 
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic 
                  title="波动率" 
                  value={volatility.toFixed(2)} 
                  suffix="%" 
                  prefix={<PieChartOutlined />} 
                  valueStyle={{ color: '#faad14' }}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic 
                  title="夏普比率" 
                  value={sharpeRatio.toFixed(2)} 
                  prefix={<SafetyOutlined />} 
                  valueStyle={{ color: sharpeRatio >= 1 ? '#52c41a' : '#faad14' }}
                />
              </Col>
            </Row>
            
            <Divider />
            
            <Row>
              <Col span={24}>
                <Descriptions title="投资组合特征" column={{ xs: 1, sm: 2 }}>
                  <Descriptions.Item label="投资风格">{portfolioType}</Descriptions.Item>
                  <Descriptions.Item label="投资金额">{investmentAmount.toLocaleString('zh-CN')} 元</Descriptions.Item>
                  <Descriptions.Item label="风险水平">{volatility < 5 ? '低' : volatility < 10 ? '中' : '高'}</Descriptions.Item>
                  <Descriptions.Item label="收益特性">{expectedAnnualReturn < 4 ? '稳健收益' : expectedAnnualReturn < 7 ? '平衡收益' : '成长收益'}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="资产配置明细">
            <div className="pie-chart-container">
              {/* 这里应该放置饼图，但简化起见，我们使用一个CSS模拟的饼图 */}
              <div className="asset-pie-chart">
                {pieChartData.map((slice, index) => (
                  <div 
                    key={index} 
                    className="pie-slice" 
                    style={{
                      backgroundColor: slice.color,
                      transform: `rotate(${index > 0 ? pieChartData.slice(0, index).reduce((sum, s) => sum + s.value, 0) * 3.6 : 0}deg)`,
                      clip: `rect(0px, 150px, 150px, ${slice.value > 50 ? '0' : '75px'})`,
                      zIndex: pieChartData.length - index
                    }}
                  >
                  </div>
                ))}
                <div className="pie-center">{portfolioType}</div>
              </div>
            </div>
            
            <Table 
              dataSource={assetClassData} 
              columns={assetClassColumns} 
              pagination={false}
              className="asset-table"
            />
          </Card>
        </Col>
      </Row>
      
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
          onClick={onNext}>
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
        
        .asset-allocation {
          padding: 0 0 20px;
        }
        
        .action-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
        }
        
        .color-square {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }
        
        .pie-chart-container {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }
        
        .asset-pie-chart {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background-color: #f0f2f5;
        }
        
        .pie-slice {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          clip: rect(0px, 75px, 150px, 0px);
        }
        
        .pie-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          text-align: center;
          font-size: 12px;
        }
        
        .asset-table {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

// 计算预期收益
const calculateExpectedReturn = (allocation) => {
  // 各资产类别的预期收益率
  const expectedReturns = {
    stocks: 8.5,
    bonds: 4.0,
    cash: 2.0,
    realEstate: 6.5,
    crypto: 15.0,
    commodities: 5.5
  };
  
  // 计算加权平均收益率
  let weightedReturn = 0;
  let totalWeight = 0;
  
  Object.keys(allocation).forEach(key => {
    if (expectedReturns[key]) {
      weightedReturn += expectedReturns[key] * allocation[key];
      totalWeight += allocation[key];
    }
  });
  
  return totalWeight > 0 ? weightedReturn / totalWeight : 0;
};

// 计算波动率
const calculateVolatility = (allocation) => {
  // 各资产类别的波动率
  const volatilities = {
    stocks: 15.0,
    bonds: 5.0,
    cash: 1.0,
    realEstate: 12.0,
    crypto: 60.0,
    commodities: 20.0
  };
  
  // 简化计算，实际应考虑资产间相关性
  let weightedVolatility = 0;
  let totalWeight = 0;
  
  Object.keys(allocation).forEach(key => {
    if (volatilities[key]) {
      weightedVolatility += volatilities[key] * allocation[key];
      totalWeight += allocation[key];
    }
  });
  
  return totalWeight > 0 ? weightedVolatility / totalWeight : 0;
};

// 确定投资组合类型
const determinePortfolioType = (allocation) => {
  const stocksRatio = allocation.stocks || 0;
  const bondsRatio = allocation.bonds || 0;
  const cashRatio = allocation.cash || 0;
  
  if (stocksRatio >= 60) return '进取型';
  if (stocksRatio >= 40) return '成长型';
  if (stocksRatio >= 20) return '平衡型';
  if (bondsRatio >= 60) return '稳健型';
  return '保守型';
};

export default AssetAllocation;

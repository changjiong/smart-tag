import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  message,
  Breadcrumb,
  Divider,
  Row,
  Col,
  Space,
  Spin,
  Tag,
  Select,
  Statistic,
  Tabs
} from 'antd';
import { 
  HomeOutlined, 
  SearchOutlined, 
  PlusOutlined, 
  DeleteOutlined, 
  DownloadOutlined,
  ArrowRightOutlined,
  BulbOutlined,
  FlagOutlined 
} from '@ant-design/icons';
import { 
  analyzeNaturalLanguageQuery, 
  getRecommendedTags, 
  generateIntelligentGroup,
  getGroupInsights,
  getSimilarGroups
} from '../../../../services/aiGroupingService';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

const AIGroupingPage = () => {
  // State for natural language input
  const [nlQuery, setNlQuery] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  
  // State for condition builder
  const [conditions, setConditions] = useState([
    { id: 1, field: '消费金额', operator: '大于', value: '5000' },
    { id: 2, field: '最近访问', operator: '小于', value: '30', unit: '天' }
  ]);
  
  // State for group insights and statistics
  const [groupData, setGroupData] = useState({
    customerCount: 12458,
    averageOrderValue: 2890,
    churnRiskRate: 23.5,
    growthRate: 8.5,
    aovGrowthRate: 12.3,
    churnRateChange: 2.1
  });
  
  // State for insights and similar groups
  const [insights, setInsights] = useState([
    {
      type: 'profile',
      title: '用户画像特征',
      content: '该群体主要为25-35岁的年轻白领，消费能力强，对品质要求高，但近期访问频次明显下降。'
    },
    {
      type: 'action',
      title: '营销建议',
      content: '建议通过个性化推送高品质新品信息，并提供专属优惠券，提升用户活跃度。'
    }
  ]);
  
  const [similarGroups, setSimilarGroups] = useState([
    { id: 1, name: '高消费低频次用户', matchRate: 89 },
    { id: 2, name: '潜在流失用户', matchRate: 76 }
  ]);
  
  // State for group templates
  const [groupTemplates, setGroupTemplates] = useState([
    { 
      id: 1, 
      name: '高价值用户', 
      description: '最近90天消费金额大于5000元的用户'
    },
    {
      id: 2,
      name: '流失风险用户',
      description: '超过30天未访问且历史消费金额大于1000元的用户'
    }
  ]);
  
  // Reference for chart
  const chartRef = useRef(null);
  
  // Initialize chart when component mounts
  useEffect(() => {
    if (window.echarts && chartRef.current) {
      const chart = window.echarts.init(chartRef.current);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#e5e7eb',
          textStyle: {
            color: '#1f2937'
          }
        },
        grid: {
          top: 10,
          right: 10,
          bottom: 20,
          left: 50,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月'],
          axisLine: {
            lineStyle: {
              color: '#e5e7eb'
            }
          },
          axisLabel: {
            color: '#1f2937'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#e5e7eb'
            }
          },
          axisLabel: {
            color: '#1f2937'
          },
          splitLine: {
            lineStyle: {
              color: '#e5e7eb'
            }
          }
        },
        series: [{
          name: '用户数量',
          type: 'line',
          smooth: true,
          data: [3200, 4500, 5800, 7200, 8900, 12458],
          itemStyle: {
            color: 'rgba(87, 181, 231, 1)'
          },
          areaStyle: {
            color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(87, 181, 231, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(87, 181, 231, 0.1)'
            }])
          },
          showSymbol: false
        }]
      };
      chart.setOption(option);
      
      // Resize chart when window resizes
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, []);
  
  // Handle natural language input analysis
  const handleAnalyzeQuery = async () => {
    if (!nlQuery) return;
    
    setAnalyzing(true);
    try {
      // Mock API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add a new condition based on the query
      setConditions([
        ...conditions,
        { 
          id: Date.now(), 
          field: '新条件', 
          operator: '大于', 
          value: '0' 
        }
      ]);
      
      message.success('已分析并添加条件');
    } catch (error) {
      console.error('Error analyzing query:', error);
      message.error('分析查询失败，请重试');
    } finally {
      setAnalyzing(false);
    }
  };
  
  // Handle adding a new condition
  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      {
        id: Date.now(),
        field: '新字段',
        operator: '等于',
        value: '0'
      }
    ]);
  };
  
  // Handle removing a condition
  const handleRemoveCondition = (id) => {
    setConditions(conditions.filter(condition => condition.id !== id));
  };
  
  // Handle selecting a template
  const handleSelectTemplate = (templateId) => {
    const template = groupTemplates.find(t => t.id === templateId);
    if (template) {
      if (template.id === 1) {
        // High value customers
        setConditions([
          { id: Date.now(), field: '消费金额', operator: '大于', value: '5000' },
          { id: Date.now() + 1, field: '时间范围', operator: '最近', value: '90', unit: '天' }
        ]);
      } else if (template.id === 2) {
        // Churn risk customers
        setConditions([
          { id: Date.now(), field: '最近访问', operator: '大于', value: '30', unit: '天' },
          { id: Date.now() + 1, field: '历史消费金额', operator: '大于', value: '1000' }
        ]);
      }
      message.success(`已应用"${template.name}"模板`);
    }
  };
  
  // Create a new group
  const handleCreateGroup = () => {
    message.success('已创建新的客户群');
  };
  
  // Export current group
  const handleExportGroup = () => {
    message.success('正在导出客户群数据');
  };
  
  // View comparison with similar group
  const handleViewComparison = (groupId) => {
    message.info(`正在加载与"${similarGroups.find(g => g.id === groupId)?.name || '其他分群'}"的对比`);
  };
  
  return (
    <div className="ai-grouping-page">
      <div className="px-4">
        <Row gutter={24}>
          <Col span={10}>
            <Card className="mb-6">
              <div className="mb-4">
                <div className="font-medium mb-2">自然语言描述</div>
                <div className="relative">
                  <TextArea
                    rows={4}
                    placeholder="例如：找出最近3个月消费增长但流失风险高的高价值用户"
                    value={nlQuery}
                    onChange={e => setNlQuery(e.target.value)}
                    className="pr-20"
                  />
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    loading={analyzing}
                    onClick={handleAnalyzeQuery}
                    className="absolute right-2 bottom-2"
                  >
                    分析
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-medium">条件构建器</div>
                  <div className="space-x-2">
                    <Button size="small" onClick={handleAddCondition}>
                      <PlusOutlined /> 添加条件
                    </Button>
                    <Button size="small">
                      <i className="ri-group-line mr-1"></i> 分组
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {conditions.map(condition => (
                    <div 
                      key={condition.id} 
                      className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                    >
                      <span className="text-gray-600">{condition.field}</span>
                      <Select defaultValue={condition.operator} bordered={false} className="!w-24">
                        <Select.Option value="大于">大于</Select.Option>
                        <Select.Option value="小于">小于</Select.Option>
                        <Select.Option value="等于">等于</Select.Option>
                        <Select.Option value="不等于">不等于</Select.Option>
                        <Select.Option value="最近">最近</Select.Option>
                      </Select>
                      <Input 
                        value={condition.value} 
                        bordered={false} 
                        className="!w-24" 
                      />
                      {condition.unit && (
                        <span className="text-gray-600">{condition.unit}</span>
                      )}
                      <DeleteOutlined 
                        className="text-gray-400 cursor-pointer hover:text-gray-600" 
                        onClick={() => handleRemoveCondition(condition.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="font-medium mb-4">分群模板</div>
                <div className="space-y-3">
                  {groupTemplates.map(template => (
                    <div 
                      key={template.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                      </div>
                      <ArrowRightOutlined className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
          
          <Col span={14}>
            <Card className="mb-6">
              <Row gutter={16} className="mb-6">
                <Col span={8}>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-gray-500">用户数量</div>
                    <div className="text-2xl font-semibold mt-2">
                      {groupData.customerCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-500 mt-1">
                      <span>较上周增长 {groupData.growthRate}%</span>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-gray-500">平均客单价</div>
                    <div className="text-2xl font-semibold mt-2">
                      ¥ {groupData.averageOrderValue.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-500 mt-1">
                      <span>较上周增长 {groupData.aovGrowthRate}%</span>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-gray-500">流失风险率</div>
                    <div className="text-2xl font-semibold mt-2">
                      {groupData.churnRiskRate}%
                    </div>
                    <div className="text-xs text-red-500 mt-1">
                      <span>较上周增长 {groupData.churnRateChange}%</span>
                    </div>
                  </div>
                </Col>
              </Row>
              
              <div className="mb-6">
                <div className="font-medium mb-4">用户特征分布</div>
                <div ref={chartRef} style={{ height: '300px' }}></div>
              </div>
              
              <div className="mb-6">
                <div className="font-medium mb-4">智能洞察</div>
                <div className="space-y-3">
                  {insights.map((insight, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg ${
                        insight.type === 'profile' ? 'bg-blue-50' : 'bg-green-50'
                      }`}
                    >
                      <div className={`flex items-center text-sm ${
                        insight.type === 'profile' ? 'text-blue-700' : 'text-green-700'
                      }`}>
                        {insight.type === 'profile' ? (
                          <BulbOutlined className="mr-2" />
                        ) : (
                          <FlagOutlined className="mr-2" />
                        )}
                        {insight.title}
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        {insight.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="font-medium mb-4">相似分群</div>
                <div className="space-y-3">
                  {similarGroups.map(group => (
                    <div 
                      key={group.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded"
                    >
                      <div>
                        <div className="font-medium">{group.name}</div>
                        <div className="text-xs text-gray-500 mt-1">匹配度：{group.matchRate}%</div>
                      </div>
                      <Button 
                        type="link"
                        onClick={() => handleViewComparison(group.id)}
                      >
                        查看对比
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AIGroupingPage; 
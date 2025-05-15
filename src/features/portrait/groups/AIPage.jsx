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

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

/**
 * 客群AI助手页面
 * 使用AI辅助创建和优化客群
 */
const AIPage = () => {
  // 状态 - 自然语言输入
  const [nlQuery, setNlQuery] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  
  // 状态 - 条件构建器
  const [conditions, setConditions] = useState([
    { id: 1, field: '消费金额', operator: '大于', value: '5000' },
    { id: 2, field: '最近访问', operator: '小于', value: '30', unit: '天' }
  ]);
  
  // 状态 - 分群洞察和统计
  const [groupData, setGroupData] = useState({
    customerCount: 12458,
    averageOrderValue: 2890,
    churnRiskRate: 23.5,
    growthRate: 8.5,
    aovGrowthRate: 12.3,
    churnRateChange: 2.1
  });
  
  // 状态 - 洞察和相似分群
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
  
  // 状态 - 分群模板
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
  
  // 图表引用
  const chartRef = useRef(null);
  
  // 组件挂载时初始化图表
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
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(87, 181, 231, 0.2)'
              }, {
                offset: 1, color: 'rgba(87, 181, 231, 0)'
              }]
            }
          }
        }]
      };
      chart.setOption(option);
      
      // 添加窗口大小变化监听器
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, []);
  
  // 窗口大小变化时调整图表大小
  const handleResize = () => {
    if (window.echarts && chartRef.current) {
      const chart = window.echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        chart.resize();
      }
    }
  };
  
  // 处理自然语言输入分析
  const handleAnalyzeQuery = () => {
    if (!nlQuery.trim()) {
      message.error('请输入查询条件');
      return;
    }
    
    setAnalyzing(true);
    
    // 模拟API调用
    setTimeout(() => {
      setAnalyzing(false);
      
      // 模拟将自然语言转换为结构化查询条件
      setConditions([
        { id: 1, field: '消费金额', operator: '大于', value: '5000' },
        { id: 2, field: '最近访问', operator: '小于', value: '30', unit: '天' },
        { id: 3, field: '年龄', operator: '介于', value: '25-35' }
      ]);
      
      message.success('分析完成，已生成查询条件');
    }, 1500);
  };
  
  // 处理添加新条件
  const handleAddCondition = () => {
    // 生成下一个ID
    const nextId = Math.max(...conditions.map(c => c.id)) + 1;
    
    // 添加新条件
    setConditions([
      ...conditions,
      { id: nextId, field: '', operator: '', value: '' }
    ]);
  };
  
  // 处理删除条件
  const handleRemoveCondition = (id) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter(c => c.id !== id));
    }
  };
  
  // 处理选择模板
  const handleSelectTemplate = (templateId) => {
    const template = groupTemplates.find(t => t.id === templateId);
    
    if (!template) return;
    
    // 模拟基于模板加载条件
    if (template.id === 1) {
      setConditions([
        { id: 1, field: '消费金额', operator: '大于', value: '5000' },
        { id: 2, field: '时间范围', operator: '最近', value: '90', unit: '天' }
      ]);
    } else if (template.id === 2) {
      setConditions([
        { id: 1, field: '最后访问', operator: '大于', value: '30', unit: '天' },
        { id: 2, field: '消费金额', operator: '大于', value: '1000' },
        { id: 3, field: '消费频次', operator: '大于', value: '3' }
      ]);
    }
    
    message.success(`已加载"${template.name}"模板`);
  };
  
  // 创建新分群
  const handleCreateGroup = () => {
    message.success('分群创建成功');
  };
  
  // 导出当前分群
  const handleExportGroup = () => {
    message.success('分群导出成功');
  };
  
  // 查看与相似分群的对比
  const handleViewComparison = (groupId) => {
    message.info(`查看分群对比 ID: ${groupId}`);
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">       
        <Row gutter={16}>
          {/* 左侧面板：智能分群创建工具 */}
          <Col span={10}>
            <Card className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <Title level={4} className="!mb-0">智能分群助手</Title>
                <div>
                  <Select 
                    placeholder="选择常用模板"
                    style={{ width: 160 }}
                    onChange={handleSelectTemplate}
                  >
                    {groupTemplates.map(template => (
                      <Select.Option key={template.id} value={template.id}>
                        {template.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
              
              <Tabs defaultActiveKey="1">
                <TabPane tab="自然语言创建" key="1">
                  <div className="mb-4">
                    <Paragraph className="text-gray-500">
                      使用自然语言描述您想要的客群特征，AI助手将自动转换为精确的查询条件
                    </Paragraph>
                    
                    <div className="mt-4">
                      <TextArea 
                        value={nlQuery}
                        onChange={e => setNlQuery(e.target.value)}
                        placeholder="例如：最近30天内消费金额大于5000元的25-35岁用户"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        className="mb-3"
                      />
                      
                      <Button 
                        type="primary" 
                        icon={<SearchOutlined />}
                        onClick={handleAnalyzeQuery}
                        loading={analyzing}
                      >
                        分析
                      </Button>
                    </div>
                  </div>
                </TabPane>
                
                <TabPane tab="条件构建" key="2">
                  <div className="space-y-4">
                    {conditions.map((condition, index) => (
                      <div key={condition.id} className="flex items-center space-x-2">
                        <Select 
                          value={condition.field} 
                          placeholder="选择字段"
                          className="w-1/4"
                          options={[
                            { value: '消费金额', label: '消费金额' },
                            { value: '消费频次', label: '消费频次' },
                            { value: '最近访问', label: '最近访问' },
                            { value: '年龄', label: '年龄' },
                            { value: '性别', label: '性别' }
                          ]}
                        />
                        <Select 
                          value={condition.operator} 
                          placeholder="选择运算符"
                          className="w-1/4"
                          options={[
                            { value: '等于', label: '等于' },
                            { value: '大于', label: '大于' },
                            { value: '小于', label: '小于' },
                            { value: '介于', label: '介于' },
                            { value: '最近', label: '最近' }
                          ]}
                        />
                        <Input 
                          value={condition.value} 
                          placeholder="输入值"
                          className="w-1/4"
                        />
                        {condition.unit && (
                          <Select 
                            value={condition.unit} 
                            className="w-1/6"
                            options={[
                              { value: '天', label: '天' },
                              { value: '月', label: '月' },
                              { value: '年', label: '年' }
                            ]}
                          />
                        )}
                        <Button 
                          icon={<DeleteOutlined />} 
                          onClick={() => handleRemoveCondition(condition.id)}
                          danger
                          disabled={conditions.length <= 1}
                        />
                      </div>
                    ))}
                    
                    <div>
                      <Button icon={<PlusOutlined />} onClick={handleAddCondition}>
                        添加条件
                      </Button>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
              
              <Divider />
              
              <div className="flex justify-between">
                <Button
                  type="primary"
                  onClick={handleCreateGroup}
                >
                  创建分群
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={handleExportGroup}
                >
                  导出
                </Button>
              </div>
            </Card>
            
            <Card>
              <Title level={5} className="mb-4">常见客群模板</Title>
              
              <div className="space-y-3">
                {groupTemplates.map(template => (
                  <div 
                    key={template.id}
                    className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                  </div>
                ))}
                <div className="p-3 border border-dashed border-gray-200 rounded text-center hover:bg-gray-50 cursor-pointer">
                  <PlusOutlined className="mr-2" />
                  <span>创建新模板</span>
                </div>
              </div>
            </Card>
          </Col>
          
          {/* 右侧面板：分群分析结果 */}
          <Col span={14}>
            <Card>
              <Title level={4} className="mb-6">分群洞察</Title>
              
              <Row gutter={[16, 16]} className="mb-6">
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

export default AIPage;

import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, Space, Tag, Tabs, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CopyOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

/**
 * 提示词管理组件
 * 优化大模型的输入提示，提升输出质量
 */
const Prompts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [promptText, setPromptText] = useState('');
  const [testResult, setTestResult] = useState('');
  const [activeTab, setActiveTab] = useState('templates');

  useEffect(() => {
    console.log('Prompts组件已加载 - 当前路径:', window.location.pathname);
  }, []);

  const promptTemplates = [
    {
      id: 1,
      name: '客户问题解答',
      category: '客服',
      template: '请根据以下银行产品信息，回答客户的问题。保持回答专业、简洁明了，并确保信息准确。\n\n产品信息：{{productInfo}}\n\n客户问题：{{userQuestion}}',
      variables: ['productInfo', 'userQuestion'],
      lastUpdated: '2023-10-10',
      creator: '张三',
      usage: 358,
    },
    {
      id: 2,
      name: '风险评估报告',
      category: '风控',
      template: '对以下客户数据进行风险评估，生成一份结构化的评估报告。考虑以下因素：信用历史、当前负债、收入状况和交易行为。\n\n客户数据：{{customerData}}',
      variables: ['customerData'],
      lastUpdated: '2023-09-28',
      creator: '李四',
      usage: 127,
    },
    {
      id: 3,
      name: '营销文案生成',
      category: '营销',
      template: '为以下银行产品创建一段吸引人的营销文案。目标受众是{{targetAudience}}，产品特点包括{{productFeatures}}。文案应该突出产品的价值主张和客户利益。',
      variables: ['targetAudience', 'productFeatures'],
      lastUpdated: '2023-10-05',
      creator: '王五',
      usage: 245,
    },
    {
      id: 4,
      name: '投资建议模板',
      category: '财富管理',
      template: '根据客户的风险偏好{{riskProfile}}和投资目标{{investmentGoals}}，提供定制化的投资建议。考虑当前市场情况{{marketConditions}}和客户的财务状况{{financialStatus}}。',
      variables: ['riskProfile', 'investmentGoals', 'marketConditions', 'financialStatus'],
      lastUpdated: '2023-10-12',
      creator: '赵六',
      usage: 189,
    },
    {
      id: 5,
      name: '客户流失预警',
      category: '客户管理',
      template: '分析以下客户行为数据，判断客户是否有流失风险，并提出客户维系建议。\n\n客户数据：{{customerBehavior}}',
      variables: ['customerBehavior'],
      lastUpdated: '2023-09-20',
      creator: '孙七',
      usage: 92,
    },
  ];

  const columns = [
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '变量数量',
      dataIndex: 'variables',
      key: 'variableCount',
      render: (variables) => variables.length,
    },
    {
      title: '最近更新',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '使用次数',
      dataIndex: 'usage',
      key: 'usage',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => {
              setEditing(record);
              setPromptText(record.template);
              setIsModalVisible(true);
            }}
          >
            编辑
          </Button>
          <Button type="text" icon={<CopyOutlined />}>复制</Button>
          <Button type="text" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  const handleTest = () => {
    // 模拟测试结果
    setTestResult('根据产品信息分析，该客户适合我行的"财富稳健增长计划"，该产品风险等级为R2（中低风险），预期年化收益率为4.5%~5.2%。建议客户可以考虑配置30%的资金，与其他理财产品组合使用，以达到更好的资产配置效果。');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">

      
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'templates',
            label: '提示词模板库',
            children: (
              <>
                <div className="mb-4 flex justify-between">
                  <Input 
                    placeholder="搜索模板" 
                    prefix={<SearchOutlined />} 
                    style={{ width: 300 }}
                  />
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setEditing(null);
                      setPromptText('');
                      setTestResult('');
                      setIsModalVisible(true);
                    }}
                  >
                    创建模板
                  </Button>
                </div>
                
                <Table 
                  columns={columns} 
                  dataSource={promptTemplates}
                  rowKey="id"
                />
                
                <Modal
                  title={editing ? "编辑提示词模板" : "创建提示词模板"}
                  open={isModalVisible}
                  onCancel={() => setIsModalVisible(false)}
                  width={800}
                  footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                      取消
                    </Button>,
                    <Button key="test" type="default" onClick={handleTest}>
                      测试
                    </Button>,
                    <Button key="submit" type="primary">
                      保存
                    </Button>,
                  ]}
                >
                  <Form layout="vertical">
                    <Form.Item label="模板名称" required>
                      <Input placeholder="输入模板名称" defaultValue={editing?.name} />
                    </Form.Item>
                    
                    <Form.Item label="分类" required>
                      <Select
                        placeholder="选择模板分类"
                        defaultValue={editing?.category}
                        options={[
                          { value: '客服', label: '客服' },
                          { value: '营销', label: '营销' },
                          { value: '风控', label: '风控' },
                          { value: '财富管理', label: '财富管理' },
                          { value: '客户管理', label: '客户管理' },
                        ]}
                      />
                    </Form.Item>
                    
                    <Form.Item label="提示词模板" required>
                      <TextArea 
                        rows={8} 
                        placeholder="输入提示词模板，使用 {{变量名}} 标记变量" 
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                      />
                      <div className="mt-2 text-xs text-gray-500">
                        提示: 使用 {'{{变量名}}'} 格式添加变量，例如 {'{{productInfo}}'}, {'{{userQuestion}}'}
                      </div>
                    </Form.Item>
                    
                    <div className="border-t pt-4 mt-4">
                      <Title level={5}>测试结果</Title>
                      {testResult ? (
                        <Card className="bg-gray-50">
                          <Paragraph>{testResult}</Paragraph>
                        </Card>
                      ) : (
                        <Paragraph className="text-gray-500">
                          点击"测试"按钮查看模型输出结果
                        </Paragraph>
                      )}
                    </div>
                  </Form>
                </Modal>
              </>
            ),
          },
          {
            key: 'variables',
            label: '变量管理',
            children: (
              <Card title="提示词变量库">
                <p className="text-gray-600 mb-4">管理可在提示词模板中使用的变量及其说明</p>
                <Table
                  columns={[
                    {
                      title: '变量名',
                      dataIndex: 'name',
                      key: 'name',
                    },
                    {
                      title: '描述',
                      dataIndex: 'description',
                      key: 'description',
                    },
                    {
                      title: '示例值',
                      dataIndex: 'example',
                      key: 'example',
                    },
                    {
                      title: '操作',
                      key: 'action',
                      render: () => (
                        <Space>
                          <Button type="text" icon={<EditOutlined />}>编辑</Button>
                          <Button type="text" danger icon={<DeleteOutlined />}>删除</Button>
                        </Space>
                      ),
                    },
                  ]}
                  dataSource={[
                    {
                      key: '1',
                      name: 'productInfo',
                      description: '产品详细信息，包含产品名称、类型、风险等级、收益率等',
                      example: '理财产品"稳健成长"，期限1年，预期收益4.5%，风险等级R2',
                    },
                    {
                      key: '2',
                      name: 'userQuestion',
                      description: '用户提出的问题',
                      example: '这个产品适合我这种保守型投资者吗？',
                    },
                    {
                      key: '3',
                      name: 'customerData',
                      description: '客户基本数据，包含资产、负债、收入等信息',
                      example: '年收入30万，总资产200万，月均消费2万，无逾期记录',
                    },
                    {
                      key: '4',
                      name: 'targetAudience',
                      description: '目标客户群体',
                      example: '30-45岁的中高收入白领',
                    },
                    {
                      key: '5',
                      name: 'productFeatures',
                      description: '产品特点和优势',
                      example: '低门槛、灵活存取、收益稳定',
                    },
                  ]}
                />
                <div className="mt-4">
                  <Button type="primary" icon={<PlusOutlined />}>
                    添加变量
                  </Button>
                </div>
              </Card>
            ),
          },
          {
            key: 'guide',
            label: '提示词编写指南',
            children: (
              <Card>
                <Typography>
                  <Title level={4}>提示词编写最佳实践</Title>
                  <Paragraph>
                    良好的提示词设计能够显著提升大模型的输出质量。以下是编写有效提示词的建议：
                  </Paragraph>
                  
                  <Title level={5}>1. 明确角色与目标</Title>
                  <Paragraph>
                    明确指定模型应该扮演的角色和完成的任务目标。例如："作为一名金融顾问，分析以下客户数据并提供投资建议。"
                  </Paragraph>
                  
                  <Title level={5}>2. 提供详细上下文</Title>
                  <Paragraph>
                    包含足够的背景信息和相关数据，帮助模型理解任务环境。例如："考虑当前市场环境下利率上升的趋势，分析以下理财产品的优劣。"
                  </Paragraph>
                  
                  <Title level={5}>3. 明确输出格式</Title>
                  <Paragraph>
                    指定期望的输出格式、长度和结构。例如："请以项目符号形式列出三条投资建议，每条不超过50字。"
                  </Paragraph>
                  
                  <Title level={5}>4. 避免模糊表述</Title>
                  <Paragraph>
                    使用精确、具体的语言，避免歧义。例如，使用"计算近3个月的平均交易金额"而非"计算最近的平均交易"。
                  </Paragraph>
                  
                  <Title level={5}>5. 有效使用变量</Title>
                  <Paragraph>
                    使用变量来增强模板的通用性，但确保为每个变量提供清晰的说明。格式为 {'{{变量名}}'}。
                  </Paragraph>
                </Typography>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Prompts; 
import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, Space, Tag, Tabs, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CopyOutlined, SearchOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

/**
 * 提示词管理页面
 * 优化大模型的输入提示，提升输出质量
 */
const PromptsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [promptText, setPromptText] = useState('');
  const [testResult, setTestResult] = useState('');
  const [activeTab, setActiveTab] = useState('templates');

  useEffect(() => {
    console.log('PromptsPage组件已加载 - 当前路径:', window.location.pathname);
  }, []);

  // 模拟提示词模板数据
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
          />
          <Button 
            type="text" 
            icon={<CopyOutlined />} 
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
          />
        </Space>
      ),
    },
  ];

  const handleTest = () => {
    // 模拟测试提示词效果
    setTestResult('根据您提供的产品信息，我可以回答您的问题。「稳健成长」理财产品是一个R2低风险等级的产品，非常适合保守型投资者。它的预期收益率为4.5%，期限为1年，是一个相对稳定的投资选择。');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'templates',
            label: '提示词模板',
            children: (
              <div>
                <div className="mb-4 flex justify-end">
                  <Space>
                    <Input
                      placeholder="搜索模板"
                      prefix={<SearchOutlined />}
                      style={{ width: 200 }}
                    />
                    <Button 
                      type="primary" 
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setEditing(null);
                        setPromptText('');
                        setIsModalVisible(true);
                      }}
                    >
                      新建模板
                    </Button>
                  </Space>
                </div>
                <Table
                  columns={columns}
                  dataSource={promptTemplates}
                  rowKey="id"
                />
              </div>
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
                    明确指定模型应该扮演的角色和完成的任务目标。例如：“作为一名金融顾问，分析以下客户数据并提供投资建议。”
                  </Paragraph>
                  
                  <Title level={5}>2. 提供详细上下文</Title>
                  <Paragraph>
                    包含足够的背景信息和相关数据，帮助模型理解任务环境。例如：“考虑当前市场环境下利率上升的趋势，分析以下理财产品的优劣。”
                  </Paragraph>
                  
                  <Title level={5}>3. 明确输出格式</Title>
                  <Paragraph>
                    指定期望的输出格式、长度和结构。例如：“请以项目符号形式列出三条投资建议，每条不超过50字。”
                  </Paragraph>
                  
                  <Title level={5}>4. 避免模糊表述</Title>
                  <Paragraph>
                    使用精确、具体的语言，避免歧义。例如，使用“计算近3个月的平均交易金额”而非“计算最近的平均交易”。
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

      <Modal
        title={editing ? '编辑提示词模板' : '创建提示词模板'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="模板名称" required>
            <Input placeholder="输入提示词模板名称" defaultValue={editing?.name} />
          </Form.Item>
          <Form.Item label="分类" required>
            <Select
              placeholder="选择提示词分类"
              defaultValue={editing?.category}
              options={[
                { value: '客服', label: '客服' },
                { value: '风控', label: '风控' },
                { value: '营销', label: '营销' },
                { value: '财富管理', label: '财富管理' },
                { value: '客户管理', label: '客户管理' },
              ]}
            />
          </Form.Item>
          <Form.Item label="提示词内容" required>
            <TextArea 
              rows={10} 
              placeholder="输入提示词模板内容，变量使用 {{variable}} 格式"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
            />
          </Form.Item>
          
          <Tabs defaultActiveKey="test">
            <Tabs.TabPane tab="测试提示词" key="test">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Button type="primary" onClick={handleTest}>测试效果</Button>
                </div>
                {testResult && (
                  <Card title="测试结果" className="mt-4">
                    <div className="border p-4 rounded bg-gray-50">
                      {testResult}
                    </div>
                  </Card>
                )}
              </Space>
            </Tabs.TabPane>
            <Tabs.TabPane tab="变量管理" key="variables">
              <Card title="已检测变量">
                <Table
                  columns={[
                    {
                      title: '变量名称',
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
                  ]}
                  dataSource={[
                    {
                      key: '1',
                      name: 'productInfo',
                      description: '产品详细信息，包含产品名称、类型、风险等级、收益率等',
                      example: '理财产品“稳健成长”，期陑1年，预期收益4.5%，风险等级R2',
                    },
                    {
                      key: '2',
                      name: 'userQuestion',
                      description: '用户提出的问题',
                      example: '这个产品适合我这种保守型投资者吗？',
                    },
                  ]}
                  pagination={false}
                />
              </Card>
            </Tabs.TabPane>
          </Tabs>
          
          <div className="mt-6 flex justify-end">
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>取消</Button>
              <Button type="primary">保存模板</Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PromptsPage;

import React, { useState, useEffect } from 'react';
import { 
  Card, Table, Button, Modal, Form, 
  Input, Select, Space, Tag, Tabs, 
  Upload, Progress, Statistic, Divider,
  List, Typography, Badge, Popconfirm
} from 'antd';
import { 
  UploadOutlined, FileOutlined, DeleteOutlined, 
  SearchOutlined, FilterOutlined, PlusOutlined,
  LinkOutlined, FileTextOutlined, ReadOutlined,
  EyeOutlined, BarsOutlined, FileSearchOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

/**
 * 知识库管理组件
 * 存储业务知识、产品知识、营销知识、风控知识、合规知识等，支持大模型学习
 */
const Knowledge = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log('Knowledge组件已加载 - 当前路径:', window.location.pathname);
  }, []);

  // 模拟知识文档数据
  const knowledgeDocuments = [
    {
      id: 1,
      title: '理财产品说明书合集',
      category: '产品知识',
      format: 'PDF',
      size: '5.8MB',
      uploadTime: '2023-10-15',
      uploadUser: '张三',
      status: 'processed',
      usage: 127,
    },
    {
      id: 2,
      title: '风险管控制度文档',
      category: '风控知识',
      format: 'DOCX',
      size: '2.3MB',
      uploadTime: '2023-09-28',
      uploadUser: '李四',
      status: 'processed',
      usage: 85,
    },
    {
      id: 3,
      title: '营销话术指南',
      category: '营销知识',
      format: 'PDF',
      size: '3.1MB',
      uploadTime: '2023-10-12',
      uploadUser: '王五',
      status: 'processing',
      usage: 0,
    },
    {
      id: 4,
      title: '客户信贷政策',
      category: '合规知识',
      format: 'PDF',
      size: '4.2MB',
      uploadTime: '2023-10-10',
      uploadUser: '赵六',
      status: 'processed',
      usage: 56,
    },
    {
      id: 5,
      title: '个人业务操作手册',
      category: '业务知识',
      format: 'DOCX',
      size: '6.5MB',
      uploadTime: '2023-09-20',
      uploadUser: '孙七',
      status: 'failed',
      usage: 0,
    },
    {
      id: 6,
      title: '企业客户服务流程',
      category: '业务知识',
      format: 'PDF',
      size: '3.8MB',
      uploadTime: '2023-10-18',
      uploadUser: '周八',
      status: 'processed',
      usage: 32,
    },
  ];

  // 表格列定义
  const columns = [
    {
      title: '文档名称',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        let color;
        switch (category) {
          case '产品知识': color = 'blue'; break;
          case '风控知识': color = 'red'; break;
          case '营销知识': color = 'green'; break;
          case '合规知识': color = 'orange'; break;
          case '业务知识': color = 'purple'; break;
          default: color = 'default';
        }
        return <Tag color={color}>{category}</Tag>;
      },
    },
    {
      title: '格式',
      dataIndex: 'format',
      key: 'format',
      render: (format) => {
        const color = format === 'PDF' ? '#ff4d4f' : '#1890ff';
        return (
          <Tag color={color} style={{ width: '50px', textAlign: 'center' }}>
            {format}
          </Tag>
        );
      },
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    },
    {
      title: '上传人',
      dataIndex: 'uploadUser',
      key: 'uploadUser',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color, text;
        switch (status) {
          case 'processed':
            color = 'success';
            text = '已处理';
            break;
          case 'processing':
            color = 'processing';
            text = '处理中';
            break;
          case 'failed':
            color = 'error';
            text = '处理失败';
            break;
          default:
            color = 'default';
            text = '未知';
        }
        return <Badge status={color} text={text} />;
      },
    },
    {
      title: '引用次数',
      dataIndex: 'usage',
      key: 'usage',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined />}>查看</Button>
          <Button type="text" icon={<FileSearchOutlined />}>索引</Button>
          <Popconfirm
            title="确定要删除这份文档吗?"
            okText="是"
            cancelText="否"
          >
            <Button type="text" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 模拟上传进度
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">

      
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'documents',
            label: '知识文档管理',
            children: (
              <>
                <div className="mb-4 flex justify-between">
                  <Space>
                    <Input 
                      placeholder="搜索文档" 
                      prefix={<SearchOutlined />} 
                      style={{ width: 300 }}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Select
                      placeholder="文档分类"
                      style={{ width: 160 }}
                      allowClear
                      options={[
                        { value: '产品知识', label: '产品知识' },
                        { value: '风控知识', label: '风控知识' },
                        { value: '营销知识', label: '营销知识' },
                        { value: '合规知识', label: '合规知识' },
                        { value: '业务知识', label: '业务知识' },
                      ]}
                    />
                    <Select
                      placeholder="状态"
                      style={{ width: 120 }}
                      allowClear
                      options={[
                        { value: 'processed', label: '已处理' },
                        { value: 'processing', label: '处理中' },
                        { value: 'failed', label: '处理失败' },
                      ]}
                    />
                  </Space>
                  <Button 
                    type="primary" 
                    icon={<UploadOutlined />}
                    onClick={() => setUploadModalVisible(true)}
                  >
                    上传文档
                  </Button>
                </div>
                
                <Table 
                  columns={columns} 
                  dataSource={knowledgeDocuments}
                  rowKey="id"
                />
                
                <Modal
                  title="上传知识文档"
                  open={uploadModalVisible}
                  onCancel={() => setUploadModalVisible(false)}
                  footer={uploadProgress === 100 ? [
                    <Button key="close" onClick={() => setUploadModalVisible(false)}>
                      关闭
                    </Button>,
                    <Button key="view" type="primary">
                      查看文档
                    </Button>
                  ] : [
                    <Button key="cancel" onClick={() => setUploadModalVisible(false)}>
                      取消
                    </Button>,
                    <Button 
                      key="upload" 
                      type="primary" 
                      onClick={simulateUpload}
                      disabled={uploadProgress > 0 && uploadProgress < 100}
                    >
                      开始上传
                    </Button>
                  ]}
                >
                  <Form layout="vertical">
                    <Form.Item label="文档分类" required>
                      <Select
                        placeholder="选择文档分类"
                        options={[
                          { value: '产品知识', label: '产品知识' },
                          { value: '风控知识', label: '风控知识' },
                          { value: '营销知识', label: '营销知识' },
                          { value: '合规知识', label: '合规知识' },
                          { value: '业务知识', label: '业务知识' },
                        ]}
                      />
                    </Form.Item>
                    
                    <Form.Item label="知识领域标签">
                      <Select
                        mode="tags"
                        placeholder="添加知识标签"
                        options={[
                          { value: '理财产品', label: '理财产品' },
                          { value: '信用卡', label: '信用卡' },
                          { value: '个人贷款', label: '个人贷款' },
                          { value: '企业金融', label: '企业金融' },
                          { value: '风险评估', label: '风险评估' },
                        ]}
                      />
                    </Form.Item>
                    
                    <Form.Item label="上传文件" required>
                      <Upload
                        accept=".pdf,.doc,.docx,.txt,.md"
                        maxCount={1}
                        fileList={[]}
                      >
                        <Button icon={<UploadOutlined />}>选择文件</Button>
                      </Upload>
                      <div className="text-xs text-gray-500 mt-1">
                        支持 PDF, Word, TXT, Markdown 格式，单个文件不超过20MB
                      </div>
                    </Form.Item>
                    
                    {uploadProgress > 0 && (
                      <div className="mt-4">
                        <Progress percent={uploadProgress} status="active" />
                        <div className="text-xs text-gray-500 mt-1">
                          {uploadProgress < 100 ? '上传中，请稍候...' : '文档上传完成，正在处理索引...'}
                        </div>
                      </div>
                    )}
                  </Form>
                </Modal>
              </>
            ),
          },
          {
            key: 'statistics',
            label: '知识使用统计',
            children: (
              <Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card title="总文档数">
                    <Statistic value={42} suffix="份" />
                  </Card>
                  <Card title="总引用次数">
                    <Statistic value={1254} suffix="次" />
                  </Card>
                  <Card title="知识库大小">
                    <Statistic value={156.8} suffix="MB" />
                  </Card>
                </div>
                
                <Divider orientation="left">文档分类统计</Divider>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <Card>
                    <Statistic title="产品知识" value={15} suffix="份" valueStyle={{ color: '#1890ff' }} />
                  </Card>
                  <Card>
                    <Statistic title="风控知识" value={8} suffix="份" valueStyle={{ color: '#ff4d4f' }} />
                  </Card>
                  <Card>
                    <Statistic title="营销知识" value={10} suffix="份" valueStyle={{ color: '#52c41a' }} />
                  </Card>
                  <Card>
                    <Statistic title="合规知识" value={5} suffix="份" valueStyle={{ color: '#faad14' }} />
                  </Card>
                  <Card>
                    <Statistic title="业务知识" value={4} suffix="份" valueStyle={{ color: '#722ed1' }} />
                  </Card>
                </div>
                
                <Divider orientation="left">引用排行榜</Divider>
                <List
                  size="small"
                  bordered
                  dataSource={knowledgeDocuments.filter(doc => doc.status === 'processed').sort((a, b) => b.usage - a.usage).slice(0, 5)}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="flex justify-between w-full">
                        <Space>
                          <FileOutlined /> {item.title}
                        </Space>
                        <Space>
                          <Tag color="blue">{item.category}</Tag>
                          <Text type="secondary">引用 {item.usage} 次</Text>
                        </Space>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            ),
          },
          {
            key: 'settings',
            label: '知识库配置',
            children: (
              <Card>
                <Form layout="vertical">
                  <Title level={5}>基础配置</Title>
                  <Form.Item label="知识索引更新频率">
                    <Select
                      defaultValue="daily"
                      options={[
                        { value: 'realtime', label: '实时更新' },
                        { value: 'hourly', label: '每小时' },
                        { value: 'daily', label: '每天' },
                        { value: 'weekly', label: '每周' },
                        { value: 'manual', label: '手动更新' },
                      ]}
                    />
                  </Form.Item>
                  
                  <Form.Item label="最大文档大小">
                    <Input addonAfter="MB" defaultValue="20" type="number" />
                  </Form.Item>
                  
                  <Form.Item label="知识库存储限额">
                    <Input addonAfter="GB" defaultValue="10" type="number" />
                  </Form.Item>
                  
                  <Divider />
                  
                  <Title level={5}>高级配置</Title>
                  <Form.Item label="向量嵌入模型">
                    <Select
                      defaultValue="default"
                      options={[
                        { value: 'default', label: '默认嵌入模型' },
                        { value: 'openai', label: 'OpenAI Embeddings' },
                        { value: 'bge', label: 'BGE-Large' },
                        { value: 'sentence-transformer', label: 'Sentence Transformer' },
                      ]}
                    />
                  </Form.Item>
                  
                  <Form.Item label="检索方式">
                    <Select
                      defaultValue="hybrid"
                      options={[
                        { value: 'hybrid', label: '混合检索（向量+关键词）' },
                        { value: 'vector', label: '纯向量检索' },
                        { value: 'keyword', label: '关键词检索' },
                      ]}
                    />
                  </Form.Item>
                  
                  <Form.Item label="检索相似度阈值">
                    <Input addonAfter="%" defaultValue="75" type="number" />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button type="primary">保存配置</Button>
                  </Form.Item>
                </Form>
              </Card>
            ),
          },
          {
            key: 'sources',
            label: '外部知识源',
            children: (
              <Card>
                <div className="mb-4 flex justify-end">
                  <Button type="primary" icon={<PlusOutlined />}>添加知识源</Button>
                </div>
                
                <Table
                  columns={[
                    {
                      title: '知识源名称',
                      dataIndex: 'name',
                      key: 'name',
                      render: (text) => <a>{text}</a>,
                    },
                    {
                      title: '类型',
                      dataIndex: 'type',
                      key: 'type',
                      render: (type) => {
                        const iconMap = {
                          'url': <LinkOutlined />,
                          'database': <BarsOutlined />,
                          'api': <FileTextOutlined />,
                          'library': <ReadOutlined />,
                        };
                        return (
                          <Space>
                            {iconMap[type]} {type === 'url' ? '网页' : type === 'database' ? '数据库' : type === 'api' ? 'API' : '文档库'}
                          </Space>
                        );
                      },
                    },
                    {
                      title: '状态',
                      dataIndex: 'status',
                      key: 'status',
                      render: (status) => (
                        <Badge status={status === 'active' ? 'success' : 'error'} text={status === 'active' ? '已连接' : '未连接'} />
                      ),
                    },
                    {
                      title: '同步频率',
                      dataIndex: 'syncFrequency',
                      key: 'syncFrequency',
                    },
                    {
                      title: '最近同步',
                      dataIndex: 'lastSync',
                      key: 'lastSync',
                    },
                    {
                      title: '操作',
                      key: 'action',
                      render: () => (
                        <Space size="middle">
                          <Button type="text">配置</Button>
                          <Button type="text">同步</Button>
                          <Button type="text" danger>移除</Button>
                        </Space>
                      ),
                    },
                  ]}
                  dataSource={[
                    {
                      key: '1',
                      name: '产品文档库',
                      type: 'library',
                      status: 'active',
                      syncFrequency: '每天',
                      lastSync: '2023-10-18 15:30',
                    },
                    {
                      key: '2',
                      name: '官网产品页面',
                      type: 'url',
                      status: 'active',
                      syncFrequency: '每周',
                      lastSync: '2023-10-15 09:15',
                    },
                    {
                      key: '3',
                      name: '客户服务数据库',
                      type: 'database',
                      status: 'inactive',
                      syncFrequency: '手动',
                      lastSync: '2023-09-30 13:45',
                    },
                    {
                      key: '4',
                      name: '监管政策 API',
                      type: 'api',
                      status: 'active',
                      syncFrequency: '每天',
                      lastSync: '2023-10-18 00:10',
                    },
                  ]}
                />
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Knowledge; 
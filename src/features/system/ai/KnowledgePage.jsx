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

const { Title, Paragraph, Text } = Typography;

/**
 * 知识库管理页面
 * 存储业务知识、产品知识、营销知识、风控知识、合规知识等，支持大模型学习
 */
const KnowledgePage = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log('KnowledgePage组件已加载 - 当前路径:', window.location.pathname);
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
      title: '个人贷款业务指南',
      category: '业务知识',
      format: 'PDF',
      size: '3.1MB',
      uploadTime: '2023-10-01',
      uploadUser: '王五',
      status: 'processed',
      usage: 201,
    },
    {
      id: 4,
      title: '信用卡营销策略',
      category: '营销知识',
      format: 'PPTX',
      size: '8.5MB',
      uploadTime: '2023-09-15',
      uploadUser: '张三',
      status: 'processed',
      usage: 156,
    },
    {
      id: 5,
      title: '合规培训材料',
      category: '合规知识',
      format: 'PDF',
      size: '4.7MB',
      uploadTime: '2023-10-10',
      uploadUser: '李四',
      status: 'processing',
      usage: 0,
    },
  ];

  // 表格列定义
  const columns = [
    {
      title: '文档名称',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: text => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '格式',
      dataIndex: 'format',
      key: 'format',
    },
    {
      title: '大小',
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
      render: status => (
        <Tag color={status === 'processed' ? 'green' : 'processing'}>
          {status === 'processed' ? '已处理' : '处理中'}
        </Tag>
      ),
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
          <Button type="text" icon={<EyeOutlined />} size="small">查看</Button>
          <Button type="text" icon={<DeleteOutlined />} size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];

  // 模拟上传进度
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadModalVisible(false);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Card
        title={
          <Space size="large">
            <span>知识库管理</span>
            <Badge count={knowledgeDocuments.length} overflowCount={999} style={{ backgroundColor: '#108ee9' }} />
          </Space>
        }
        extra={
          <Space>
            <Input 
              placeholder="搜索文档" 
              prefix={<SearchOutlined />} 
              style={{ width: 200 }}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => setUploadModalVisible(true)}
            >
              上传文档
            </Button>
          </Space>
        }
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'documents',
              label: '知识文档',
              children: (
                <Table 
                  columns={columns} 
                  dataSource={knowledgeDocuments.filter(doc => 
                    doc.title.toLowerCase().includes(searchText.toLowerCase()) ||
                    doc.category.toLowerCase().includes(searchText.toLowerCase())
                  )} 
                  rowKey="id"
                />
              ),
            },
            {
              key: 'categories',
              label: '知识分类',
              children: (
                <Card>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {['产品知识', '风控知识', '业务知识', '营销知识', '合规知识'].map(category => (
                      <Card key={category} hoverable className="text-center">
                        <Statistic 
                          title={category}
                          value={knowledgeDocuments.filter(doc => doc.category === category).length}
                          suffix="份文档"
                        />
                        <div className="mt-4">
                          <Button type="link">查看详情</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              ),
            },
            {
              key: 'settings',
              label: '知识库设置',
              children: (
                <Card>
                  <Form layout="vertical">
                    <Form.Item label="文档处理模式">
                      <Select 
                        defaultValue="auto" 
                        options={[
                          { value: 'auto', label: '自动处理' },
                          { value: 'manual', label: '人工审核' },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item label="知识同步频率">
                      <Select 
                        defaultValue="daily" 
                        options={[
                          { value: 'realtime', label: '实时同步' },
                          { value: 'hourly', label: '每小时同步' },
                          { value: 'daily', label: '每日同步' },
                          { value: 'weekly', label: '每周同步' },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item label="知识优先级">
                      <Select 
                        defaultValue="medium" 
                        options={[
                          { value: 'high', label: '高优先级' },
                          { value: 'medium', label: '中等优先级' },
                          { value: 'low', label: '低优先级' },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary">保存设置</Button>
                    </Form.Item>
                  </Form>
                </Card>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title="上传文档"
        visible={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setUploadModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={simulateUpload}>
            开始上传
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="文档分类" required>
            <Select
              placeholder="选择文档分类"
              options={[
                { value: 'product', label: '产品知识' },
                { value: 'risk', label: '风控知识' },
                { value: 'business', label: '业务知识' },
                { value: 'marketing', label: '营销知识' },
                { value: 'compliance', label: '合规知识' },
              ]}
            />
          </Form.Item>
          <Form.Item label="文档描述">
            <Input.TextArea rows={4} placeholder="请输入文档的简要描述" />
          </Form.Item>
          <Form.Item label="上传文件" required>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="text"
              maxCount={5}
              multiple
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
          {uploadProgress > 0 && (
            <Form.Item>
              <Progress percent={uploadProgress} status="active" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default KnowledgePage;

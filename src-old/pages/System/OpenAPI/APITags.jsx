import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Input,
  Select,
  Form,
  Tag,
  Space,
  Tabs,
  Badge,
  message,
  Divider,
  Switch,
  Flex
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  ApiOutlined,
  SettingOutlined,
  CodeOutlined,
  SyncOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;

/**
 * 标签快递（API）组件
 * 用于管理标签API服务和接口调用
 */
const APITags = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [apiList, setApiList] = useState([]);
  // 不需要表单实例，因为这是一个展示组件

  // 模拟加载API列表
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 模拟API列表数据
        const mockApiList = [
          {
            id: 1,
            name: '客户标签查询',
            path: '/api/v1/tags/customer',
            method: 'GET',
            description: '根据客户ID查询客户的所有标签',
            status: 'active',
            version: '1.0',
            createdAt: '2023-01-15',
            updatedAt: '2023-03-20',
            callCount: 12580,
            avgResponseTime: 45,
            category: 'query'
          },
          {
            id: 2,
            name: '标签详情查询',
            path: '/api/v1/tags/detail',
            method: 'GET',
            description: '查询标签的详细信息，包括定义、规则和分布',
            status: 'active',
            version: '1.0',
            createdAt: '2023-01-15',
            updatedAt: '2023-02-28',
            callCount: 8765,
            avgResponseTime: 38,
            category: 'query'
          },
          {
            id: 3,
            name: '客群标签统计',
            path: '/api/v1/tags/group-stats',
            method: 'POST',
            description: '统计指定客群的标签分布情况',
            status: 'active',
            version: '1.1',
            createdAt: '2023-02-10',
            updatedAt: '2023-04-05',
            callCount: 5432,
            avgResponseTime: 120,
            category: 'statistics'
          },
          {
            id: 4,
            name: '标签值更新',
            path: '/api/v1/tags/update',
            method: 'PUT',
            description: '更新客户的标签值（需要高级权限）',
            status: 'limited',
            version: '1.0',
            createdAt: '2023-03-01',
            updatedAt: '2023-03-01',
            callCount: 1234,
            avgResponseTime: 65,
            category: 'update'
          },
          {
            id: 5,
            name: '标签批量查询',
            path: '/api/v1/tags/batch-query',
            method: 'POST',
            description: '批量查询多个客户的标签信息',
            status: 'active',
            version: '1.0',
            createdAt: '2023-03-15',
            updatedAt: '2023-03-15',
            callCount: 3456,
            avgResponseTime: 150,
            category: 'query'
          }
        ];

        setApiList(mockApiList);
      } catch (error) {
        console.error('Failed to fetch API list:', error);
        message.error('加载API列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 渲染API状态标签
  const renderStatusTag = (status) => {
    switch (status) {
      case 'active':
        return <Tag color="success" icon={<CheckCircleOutlined />}>正常</Tag>;
      case 'limited':
        return <Tag color="warning">受限</Tag>;
      case 'deprecated':
        return <Tag color="error">已废弃</Tag>;
      case 'beta':
        return <Tag color="processing" icon={<SyncOutlined spin />}>测试中</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  };

  // API列表表格列定义
  const apiColumns = [
    {
      title: 'API名称',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      render: (text, record) => (
        <Space>
          <span className="font-medium">{text}</span>
          {record.version && <Tag color="blue">v{record.version}</Tag>}
        </Space>
      )
    },
    {
      title: '请求路径',
      dataIndex: 'path',
      key: 'path',
      width: 220,
      render: (text, record) => (
        <Space>
          <Tag color={record.method === 'GET' ? 'green' : record.method === 'POST' ? 'geekblue' : record.method === 'PUT' ? 'orange' : 'volcano'}>
            {record.method}
          </Tag>
          <code>{text}</code>
        </Space>
      )
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      ellipsis: { showTitle: true }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: renderStatusTag
    },
    {
      title: '调用次数',
      dataIndex: 'callCount',
      key: 'callCount',
      width: 120,
      sorter: (a, b) => a.callCount - b.callCount,
      render: (text) => text.toLocaleString()
    },
    {
      title: '平均响应时间',
      dataIndex: 'avgResponseTime',
      key: 'avgResponseTime',
      width: 140,
      sorter: (a, b) => a.avgResponseTime - b.avgResponseTime,
      render: (text) => `${text} ms`
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: () => (
        <Space size="small">
          <Button type="link" size="small">文档</Button>
          <Button type="link" size="small">测试</Button>
          <Button type="link" size="small">监控</Button>
        </Space>
      )
    }
  ];

  // 模拟API密钥数据
  const apiKeys = [
    {
      id: 1,
      name: '营销系统集成',
      key: 'mkt_api_xxxxx',
      created: '2023-02-15',
      expires: '2024-02-15',
      status: 'active',
      permissions: ['read', 'statistics'],
      lastUsed: '2023-04-10 15:30:22'
    },
    {
      id: 2,
      name: '风控系统集成',
      key: 'risk_api_xxxxx',
      created: '2023-03-01',
      expires: '2024-03-01',
      status: 'active',
      permissions: ['read', 'statistics', 'update'],
      lastUsed: '2023-04-12 09:45:18'
    },
    {
      id: 3,
      name: '移动应用集成',
      key: 'mobile_api_xxxxx',
      created: '2023-01-10',
      expires: '2024-01-10',
      status: 'active',
      permissions: ['read'],
      lastUsed: '2023-04-12 14:22:36'
    }
  ];

  // API密钥表格列定义
  const apiKeyColumns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: 'API密钥',
      dataIndex: 'key',
      key: 'key',
      width: 180,
      render: () => (
        <Space>
          <code>{'*'.repeat(10)}</code>
          <Button type="link" size="small" onClick={() => message.success('密钥已复制到剪贴板')}>
            复制
          </Button>
        </Space>
      )
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      key: 'permissions',
      width: 200,
      render: (permissions) => (
        <Space>
          {permissions.map(perm => {
            let color = 'default';
            if (perm === 'read') color = 'green';
            if (perm === 'statistics') color = 'blue';
            if (perm === 'update') color = 'orange';
            return <Tag color={color} key={perm}>{perm}</Tag>;
          })}
        </Space>
      )
    },
    {
      title: '创建日期',
      dataIndex: 'created',
      key: 'created',
      width: 120
    },
    {
      title: '过期日期',
      dataIndex: 'expires',
      key: 'expires',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        status === 'active' ?
          <Badge status="success" text="活跃" /> :
          <Badge status="error" text="已禁用" />
      )
    },
    {
      title: '最近使用',
      dataIndex: 'lastUsed',
      key: 'lastUsed',
      width: 160
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: () => (
        <Space size="small">
          <Button type="link" size="small">重置</Button>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" danger size="small">撤销</Button>
        </Space>
      )
    }
  ];

  // 渲染API列表
  const renderApiList = () => (
    <Card
      title="标签API服务列表"
      className="mb-6"
      extra={
        <Space>
          <Input
            placeholder="搜索API"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">全部类型</Option>
            <Option value="query">查询类</Option>
            <Option value="statistics">统计类</Option>
            <Option value="update">更新类</Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />}>
            新增API
          </Button>
        </Space>
      }
    >
      <Table
        columns={apiColumns}
        dataSource={apiList}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1200 }}
      />
    </Card>
  );

  // 渲染API密钥管理
  const renderApiKeys = () => (
    <Card
      title="API密钥管理"
      className="mb-6"
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          创建密钥
        </Button>
      }
    >
      <Table
        columns={apiKeyColumns}
        dataSource={apiKeys}
        rowKey="id"
        pagination={false}
        scroll={{ x: 1200 }}
      />
    </Card>
  );

  // 渲染API配置
  const renderApiConfig = () => (
    <Card title="API服务配置">
      <Form layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="API请求限流" tooltip="每分钟最大请求数">
            <Flex>
              <Input style={{ width: 'calc(100% - 100px)' }} defaultValue="1000" />
              <Button type="primary">应用</Button>
            </Flex>
          </Form.Item>

          <Form.Item label="默认缓存时间" tooltip="API结果缓存时间(秒)">
            <Flex>
              <Input style={{ width: 'calc(100% - 100px)' }} defaultValue="300" />
              <Button type="primary">应用</Button>
            </Flex>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="启用API监控">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item label="启用访问日志">
            <Switch defaultChecked />
          </Form.Item>
        </div>

        <Divider />

        <Form.Item label="API基础路径">
          <Input disabled defaultValue="https://api.example.com/v1" />
        </Form.Item>

        <Form.Item label="API文档地址">
          <Input disabled defaultValue="https://api.example.com/docs" />
          <Button type="link" className="p-0 mt-1">
            查看API文档
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  return (
    <div className="p-4">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
      >
        <TabPane
          tab={<span><ApiOutlined />API服务</span>}
          key="1"
        >
          {renderApiList()}
        </TabPane>

        <TabPane
          tab={<span><CodeOutlined />API密钥</span>}
          key="2"
        >
          {renderApiKeys()}
        </TabPane>

        <TabPane
          tab={<span><SettingOutlined />服务配置</span>}
          key="3"
        >
          {renderApiConfig()}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default APITags;

import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Select, 
  Button, 
  Table, 
  Tag, 
  Switch, 
  Divider, 
  Tabs, 
  message, 
  Space,
  Tooltip
} from 'antd';
import { 
  CloudUploadOutlined, 
  SettingOutlined, 
  FileTextOutlined, 
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;

/**
 * 数据输出组件
 * 用于配置和管理系统数据向外部系统的推送
 */
const DataOutput = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');
  
  // 模拟数据推送记录
  const [pushLogs, setPushLogs] = useState([
    {
      id: '1',
      taskName: '客群数据推送',
      targetSystem: '营销系统',
      dataType: '客群数据',
      pushTime: '2023-03-20 14:30:22',
      status: 'success',
      records: 12560,
      message: '推送成功'
    },
    {
      id: '2',
      taskName: '标签数据同步',
      targetSystem: '风控系统',
      dataType: '客户标签',
      pushTime: '2023-03-19 09:15:37',
      status: 'success',
      records: 8750,
      message: '推送成功'
    },
    {
      id: '3',
      taskName: '行为数据更新',
      targetSystem: 'CRM系统',
      dataType: '客户行为',
      pushTime: '2023-03-18 18:45:12',
      status: 'failed',
      records: 0,
      message: '连接超时'
    },
    {
      id: '4',
      taskName: '实时标签推送',
      targetSystem: '实时决策引擎',
      dataType: '客户标签',
      pushTime: '2023-03-18 10:22:45',
      status: 'warning',
      records: 23410,
      message: '部分数据推送失败'
    },
    {
      id: '5',
      taskName: '价值评分同步',
      targetSystem: '客户管理平台',
      dataType: '价值评分',
      pushTime: '2023-03-17 16:08:30',
      status: 'success',
      records: 5280,
      message: '推送成功'
    }
  ]);

  // 状态标签渲染
  const renderStatusTag = (status) => {
    switch (status) {
      case 'success':
        return <Tag icon={<CheckCircleOutlined />} color="success">成功</Tag>;
      case 'failed':
        return <Tag icon={<CloseCircleOutlined />} color="error">失败</Tag>;
      case 'warning':
        return <Tag icon={<WarningOutlined />} color="warning">部分成功</Tag>;
      case 'processing':
        return <Tag icon={<SyncOutlined spin />} color="processing">进行中</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  };

  // 推送日志表格列定义
  const pushLogColumns = [
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    {
      title: '目标系统',
      dataIndex: 'targetSystem',
      key: 'targetSystem',
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: '推送时间',
      dataIndex: 'pushTime',
      key: 'pushTime',
      sorter: (a, b) => new Date(a.pushTime) - new Date(b.pushTime),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatusTag(status),
      filters: [
        { text: '成功', value: 'success' },
        { text: '失败', value: 'failed' },
        { text: '部分成功', value: 'warning' },
        { text: '进行中', value: 'processing' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '记录数',
      dataIndex: 'records',
      key: 'records',
      sorter: (a, b) => a.records - b.records,
    },
    {
      title: '消息',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small">详情</Button>
          {record.status === 'failed' && (
            <Button type="link" size="small">重试</Button>
          )}
        </Space>
      ),
    },
  ];

  // 系统集成配置表格列定义
  const systemConfigColumns = [
    {
      title: '系统名称',
      dataIndex: 'systemName',
      key: 'systemName',
    },
    {
      title: '接口地址',
      dataIndex: 'apiUrl',
      key: 'apiUrl',
      ellipsis: true,
    },
    {
      title: '认证方式',
      dataIndex: 'authType',
      key: 'authType',
    },
    {
      title: '数据格式',
      dataIndex: 'dataFormat',
      key: 'dataFormat',
    },
    {
      title: '启用状态',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled) => <Switch checked={enabled} size="small" />,
    },
    {
      title: '最近连接',
      dataIndex: 'lastConnected',
      key: 'lastConnected',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="small">
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small">测试连接</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ];

  // 模拟系统配置数据
  const systemConfigs = [
    {
      key: '1',
      systemName: '营销系统',
      apiUrl: 'https://marketing-api.example.com/push',
      authType: 'OAuth 2.0',
      dataFormat: 'JSON',
      enabled: true,
      lastConnected: '2023-03-20 14:30:22',
    },
    {
      key: '2',
      systemName: '风控系统',
      apiUrl: 'https://risk-api.example.com/data',
      authType: '密钥认证',
      dataFormat: 'JSON',
      enabled: true,
      lastConnected: '2023-03-19 09:15:37',
    },
    {
      key: '3',
      systemName: 'CRM系统',
      apiUrl: 'https://crm.example.com/api/v2/customers',
      authType: 'Basic Auth',
      dataFormat: 'XML',
      enabled: false,
      lastConnected: '2023-03-18 18:45:12',
    },
    {
      key: '4',
      systemName: '实时决策引擎',
      apiUrl: 'https://decision-engine.example.com/stream',
      authType: 'JWT',
      dataFormat: 'JSON',
      enabled: true,
      lastConnected: '2023-03-18 10:22:45',
    },
    {
      key: '5',
      systemName: '客户管理平台',
      apiUrl: 'https://custmgr.example.com/data-input',
      authType: 'API Key',
      dataFormat: 'JSON',
      enabled: true,
      lastConnected: '2023-03-17 16:08:30',
    },
  ];

  // 模拟表单提交
  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
    message.success('数据推送任务已创建，请在日志中查看进度');
    
    // 添加新的推送记录
    const newLog = {
      id: Date.now().toString(),
      taskName: values.taskName,
      targetSystem: values.targetSystem,
      dataType: values.dataType,
      pushTime: new Date().toLocaleString(),
      status: 'processing',
      records: 0,
      message: '正在处理...'
    };
    
    setPushLogs([newLog, ...pushLogs]);
    
    // 模拟异步推送完成
    setTimeout(() => {
      setPushLogs(prevLogs => {
        const updatedLogs = [...prevLogs];
        const index = updatedLogs.findIndex(log => log.id === newLog.id);
        if (index !== -1) {
          updatedLogs[index] = {
            ...updatedLogs[index],
            status: 'success',
            records: Math.floor(Math.random() * 10000) + 1000,
            message: '推送成功'
          };
        }
        return updatedLogs;
      });
      message.success('数据推送任务已完成');
    }, 3000);
    
    form.resetFields();
  };

  // 渲染推送配置表单
  const renderConfigForm = () => (
    <Card title="创建数据推送任务" className="mb-6" extra={
      <Tooltip title="配置系统数据向外部系统的推送任务">
        <InfoCircleOutlined />
      </Tooltip>
    }>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          pushType: 'manual',
          dataFormat: 'json'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="任务名称"
            name="taskName"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input placeholder="请输入推送任务名称" />
          </Form.Item>

          <Form.Item
            label="目标系统"
            name="targetSystem"
            rules={[{ required: true, message: '请选择目标系统' }]}
          >
            <Select placeholder="请选择目标系统">
              <Option value="营销系统">营销系统</Option>
              <Option value="风控系统">风控系统</Option>
              <Option value="CRM系统">CRM系统</Option>
              <Option value="实时决策引擎">实时决策引擎</Option>
              <Option value="客户管理平台">客户管理平台</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="数据类型"
            name="dataType"
            rules={[{ required: true, message: '请选择数据类型' }]}
          >
            <Select placeholder="请选择数据类型">
              <Option value="客群数据">客群数据</Option>
              <Option value="客户标签">客户标签</Option>
              <Option value="客户行为">客户行为</Option>
              <Option value="价值评分">价值评分</Option>
              <Option value="分析结果">分析结果</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="数据范围"
            name="dataScope"
            rules={[{ required: true, message: '请选择数据范围' }]}
          >
            <Select placeholder="请选择数据范围">
              <Option value="all">全量数据</Option>
              <Option value="incremental">增量数据</Option>
              <Option value="custom">自定义条件</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="推送方式"
            name="pushType"
          >
            <Select>
              <Option value="manual">手动推送</Option>
              <Option value="scheduled">定时推送</Option>
              <Option value="triggered">触发式推送</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="数据格式"
            name="dataFormat"
          >
            <Select>
              <Option value="json">JSON</Option>
              <Option value="xml">XML</Option>
              <Option value="csv">CSV</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<CloudUploadOutlined />}
            className="mr-2"
          >
            创建推送任务
          </Button>
          <Button htmlType="reset">重置</Button>
        </Form.Item>
      </Form>
    </Card>
  );

  return (
    <div className="data-output-container">
      <div className="bg-white rounded shadow mb-6 p-4">
        <h1 className="text-xl font-medium mb-2">数据输出</h1>
        <p className="text-gray-500">
          配置和管理系统数据向外部系统的推送，支持多系统集成和数据同步
        </p>
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        type="card"
        className="mb-6"
      >
        <TabPane 
          tab={<span><CloudUploadOutlined />数据推送</span>} 
          key="1"
        >
          {renderConfigForm()}
          
          <Card 
            title="推送日志" 
            className="mb-6"
            extra={
              <Button type="link" icon={<SyncOutlined />}>刷新</Button>
            }
          >
            <Table 
              columns={pushLogColumns} 
              dataSource={pushLogs} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><SettingOutlined />系统集成</span>} 
          key="2"
        >
          <Card 
            title="系统配置" 
            className="mb-6"
            extra={
              <Button type="primary" size="small">添加系统</Button>
            }
          >
            <Table 
              columns={systemConfigColumns} 
              dataSource={systemConfigs} 
              rowKey="key"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><FileTextOutlined />使用文档</span>} 
          key="3"
        >
          <Card title="数据输出功能使用指南">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">功能概述</h3>
              <p className="text-gray-600">
                数据输出功能用于将系统中的数据推送到外部系统，支持多种数据类型和推送方式，
                可以灵活配置推送目标、数据格式和推送频率，满足不同业务场景的数据共享需求。
              </p>
            </div>
            
            <Divider />
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">使用步骤</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>在"系统集成"标签页中添加目标系统配置，包括接口地址、认证方式等。</li>
                <li>在"数据推送"标签页中创建推送任务，选择目标系统和数据类型。</li>
                <li>配置推送参数，如数据范围、推送方式和数据格式。</li>
                <li>提交任务，系统将根据配置执行数据推送。</li>
                <li>在推送日志中查看任务执行状态和结果。</li>
              </ol>
            </div>
            
            <Divider />
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">常见问题</h3>
              <dl className="space-y-3">
                <dt className="font-medium">Q: 如何处理推送失败的情况？</dt>
                <dd className="text-gray-600 ml-4">A: 推送失败的任务可以在日志中通过"重试"按钮重新执行，或者查看详情了解失败原因后修改配置重新创建任务。</dd>
                
                <dt className="font-medium">Q: 支持哪些数据格式？</dt>
                <dd className="text-gray-600 ml-4">A: 目前支持JSON、XML和CSV三种常见数据格式，可以根据目标系统的需求进行选择。</dd>
                
                <dt className="font-medium">Q: 如何配置定时推送？</dt>
                <dd className="text-gray-600 ml-4">A: 在创建任务时选择"定时推送"，然后在弹出的配置页面中设置推送频率和时间点。</dd>
              </dl>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DataOutput; 
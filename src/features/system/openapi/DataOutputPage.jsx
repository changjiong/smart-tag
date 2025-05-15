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
 * 数据输出页面
 * 管理和配置对外开放的数据导出API
 */
const DataOutputPage = () => {
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

  // 模拟系统配置
  const [systemConfigs, setSystemConfigs] = useState([
    {
      key: '1',
      name: '营销系统',
      apiUrl: 'https://marketing-api.example.com/data/import',
      authType: 'API Key',
      dataFormat: 'JSON',
      enabled: true,
      lastSync: '2023-03-20 14:30:22'
    },
    {
      key: '2',
      name: '风控系统',
      apiUrl: 'https://risk-api.example.com/data/sync',
      authType: 'OAuth 2.0',
      dataFormat: 'JSON',
      enabled: true,
      lastSync: '2023-03-19 09:15:37'
    },
    {
      key: '3',
      name: 'CRM系统',
      apiUrl: 'https://crm-api.example.com/import',
      authType: 'Basic Auth',
      dataFormat: 'XML',
      enabled: false,
      lastSync: '2023-03-18 18:45:12'
    },
    {
      key: '4',
      name: '实时决策引擎',
      apiUrl: 'https://decision-engine.example.com/data',
      authType: 'API Key',
      dataFormat: 'JSON',
      enabled: true,
      lastSync: '2023-03-18 10:22:45'
    },
    {
      key: '5',
      name: '客户管理平台',
      apiUrl: 'https://customer-mgmt.example.com/api/data',
      authType: 'Bearer Token',
      dataFormat: 'CSV',
      enabled: true,
      lastSync: '2023-03-17 16:08:30'
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

  // 系统配置表格列定义
  const systemConfigColumns = [
    {
      title: '系统名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'API地址',
      dataIndex: 'apiUrl',
      key: 'apiUrl',
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      )
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
      title: '最后同步',
      dataIndex: 'lastSync',
      key: 'lastSync',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="small">
          <Button type="link" size="small">编辑</Button>
          <Button type="link" size="small" danger>删除</Button>
          <Button type="link" size="small">测试连接</Button>
        </Space>
      ),
    },
  ];

  // 模拟表单提交
  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
    
    // 模拟任务创建逻辑
    const newTask = {
      id: `${pushLogs.length + 1}`,
      taskName: values.taskName,
      targetSystem: values.targetSystem,
      dataType: values.dataType,
      pushTime: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\//g, '-'),
      status: 'processing',
      records: 0,
      message: '推送中'
    };
    
    // 添加新任务到列表
    setPushLogs([newTask, ...pushLogs]);
    
    // 模拟任务执行过程
    setTimeout(() => {
      // 更新任务状态
      setPushLogs(prevLogs => {
        const updatedLogs = [...prevLogs];
        const taskIndex = updatedLogs.findIndex(log => log.id === newTask.id);
        
        if (taskIndex !== -1) {
          updatedLogs[taskIndex] = {
            ...updatedLogs[taskIndex],
            status: 'success',
            records: Math.floor(Math.random() * 15000) + 5000,
            message: '推送成功'
          };
        }
        
        return updatedLogs;
      });
      
      message.success('数据推送任务已完成');
    }, 3000);
    
    message.info('数据推送任务已创建，正在执行中...');
    form.resetFields();
  };

  // 渲染推送配置表单
  const renderConfigForm = () => {
    return (
      <Card 
        title="创建数据推送任务" 
        className="mb-6"
      >
        <Form
          form={form}
          name="dataPushForm"
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            dataFormat: 'JSON',
            pushType: 'immediate'
          }}
        >
          <Form.Item
            label="任务名称"
            name="taskName"
            rules={[
              {
                required: true,
                message: '请输入任务名称',
              },
            ]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>
          <Form.Item
            label="目标系统"
            name="targetSystem"
            rules={[
              {
                required: true,
                message: '请选择目标系统',
              },
            ]}
          >
            <Select>
              {systemConfigs.map((system) => (
                <Option key={system.key} value={system.name}>
                  {system.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="数据类型"
            name="dataType"
            rules={[
              {
                required: true,
                message: '请选择数据类型',
              },
            ]}
          >
            <Select>
              <Option value="客群数据">客群数据</Option>
              <Option value="客户标签">客户标签</Option>
              <Option value="客户行为">客户行为</Option>
              <Option value="价值评分">价值评分</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="数据格式"
            name="dataFormat"
            rules={[
              {
                required: true,
                message: '请选择数据格式',
              },
            ]}
          >
            <Select>
              <Option value="JSON">JSON</Option>
              <Option value="XML">XML</Option>
              <Option value="CSV">CSV</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="推送类型"
            name="pushType"
            rules={[
              {
                required: true,
                message: '请选择推送类型',
              },
            ]}
          >
            <Select>
              <Option value="immediate">立即推送</Option>
              <Option value="schedule">定时推送</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              创建任务
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  };

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <TabPane key="1" tab="推送日志">
          <Table
            columns={pushLogColumns}
            dataSource={pushLogs}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        <TabPane key="2" tab="系统配置">
          <Table
            columns={systemConfigColumns}
            dataSource={systemConfigs}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        <TabPane key="3" tab="推送配置">
          {renderConfigForm()}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DataOutputPage;

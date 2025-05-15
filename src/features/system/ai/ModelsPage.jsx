import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Tabs, Switch, Slider, Space, Table, Tag, Tooltip, Statistic } from 'antd';

/**
 * AI模型管理页面
 * 管理大模型服务接入，支持语义配置，支持智能化功能
 */
const ModelsPage = () => {
  const [activeTab, setActiveTab] = useState('local');
  const [modelSettings, setModelSettings] = useState({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.95,
    enabled: true,
  });

  useEffect(() => {
    console.log('ModelsPage组件已加载 - 当前路径:', window.location.pathname);
  }, []);

  // 模型列表数据
  const modelList = [
    { 
      id: 1, 
      name: 'GPT-3.5 Turbo', 
      provider: 'OpenAI', 
      type: 'text', 
      status: 'active',
      lastUsed: '2023-10-15',
      performanceScore: 85,
    },
    { 
      id: 2, 
      name: 'ERNIE Bot', 
      provider: '百度', 
      type: 'text', 
      status: 'active',
      lastUsed: '2023-10-12',
      performanceScore: 82,
    },
    { 
      id: 3, 
      name: 'Claude 2', 
      provider: 'Anthropic', 
      type: 'text', 
      status: 'inactive',
      lastUsed: '2023-09-30',
      performanceScore: 88,
    },
    { 
      id: 4, 
      name: 'Stable Diffusion', 
      provider: 'Stability AI', 
      type: 'image', 
      status: 'active',
      lastUsed: '2023-10-05',
      performanceScore: 90,
    },
    { 
      id: 5, 
      name: 'Llama 2', 
      provider: 'Meta', 
      type: 'text', 
      status: 'inactive',
      lastUsed: '2023-09-20',
      performanceScore: 78,
    },
  ];

  // 表格列定义
  const columns = [
    {
      title: '模型名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '提供商',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'text' ? 'blue' : 'purple'}>
          {type === 'text' ? '文本生成' : '图像生成'}
        </Tag>
      ),
    },
    {
      title: '上次使用',
      dataIndex: 'lastUsed',
      key: 'lastUsed',
    },
    {
      title: '性能评分',
      dataIndex: 'performanceScore',
      key: 'performanceScore',
      render: (score) => (
        <Tooltip title={`基于历史请求的综合评分：${score}/100`}>
          <span style={{ color: score > 85 ? '#52c41a' : score > 75 ? '#faad14' : '#f5222d' }}>
            {score}/100
          </span>
        </Tooltip>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '已启用' : '未启用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" size="small">配置</Button>
          <Switch size="small" defaultChecked={record.status === 'active'} />
        </Space>
      ),
    },
  ];

  const handleSettingChange = (key, value) => {
    setModelSettings({
      ...modelSettings,
      [key]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'local',
            label: '已接入模型',
            children: (
              <div>
                <div className="mb-4 flex justify-end">
                  <Button type="primary">添加新模型</Button>
                </div>
                <Table 
                  columns={columns} 
                  dataSource={modelList} 
                  rowKey="id"
                />
              </div>
            ),
          },
          {
            key: 'parameters',
            label: '全局参数配置',
            children: (
              <>
                <Card title="全局模型参数" className="mb-6">
                  <Form layout="vertical">
                    <Form.Item label="默认模型">
                      <Select 
                        defaultValue="gpt3.5" 
                        options={[
                          { value: 'gpt3.5', label: 'GPT-3.5 Turbo' },
                          { value: 'ernie', label: 'ERNIE Bot' },
                          { value: 'claude', label: 'Claude 2' },
                          { value: 'llama', label: 'Llama 2' },
                        ]}
                      />
                    </Form.Item>
                    
                    <Form.Item label="Temperature (创造性程度)">
                      <Slider 
                        min={0} 
                        max={1} 
                        step={0.1} 
                        value={modelSettings.temperature}
                        onChange={(value) => handleSettingChange('temperature', value)}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>精确 (0)</span>
                        <span>中等 (0.5)</span>
                        <span>创造 (1)</span>
                      </div>
                    </Form.Item>
                    
                    <Form.Item label="Max Tokens (最大生成长度)">
                      <Slider 
                        min={256} 
                        max={4096} 
                        step={256} 
                        value={modelSettings.maxTokens}
                        onChange={(value) => handleSettingChange('maxTokens', value)}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        当前设置: {modelSettings.maxTokens} tokens
                      </div>
                    </Form.Item>
                    
                    <Form.Item label="Top P (采样多样性)">
                      <Slider 
                        min={0.1} 
                        max={1} 
                        step={0.05} 
                        value={modelSettings.topP}
                        onChange={(value) => handleSettingChange('topP', value)}
                      />
                    </Form.Item>
                    
                    <Form.Item label="全局启用状态">
                      <Switch 
                        checked={modelSettings.enabled}
                        onChange={(value) => handleSettingChange('enabled', value)}
                      />
                    </Form.Item>
                    
                    <Form.Item>
                      <Button type="primary">保存配置</Button>
                    </Form.Item>
                  </Form>
                </Card>
              </>
            ),
          },
          {
            key: 'usage',
            label: '使用统计',
            children: (
              <Card title="模型使用统计">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <Statistic title="今日请求数" value={1254} />
                  </Card>
                  <Card>
                    <Statistic title="平均响应时间" value={1.25} suffix="秒" />
                  </Card>
                  <Card>
                    <Statistic title="本月总费用" value={120.50} prefix="¥" precision={2} />
                  </Card>
                  <Card>
                    <Statistic title="成功率" value={99.2} suffix="%" />
                  </Card>
                </div>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ModelsPage;

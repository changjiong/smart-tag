import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Tabs, Switch, Slider, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

/**
 * 模型服务配置组件
 * 管理大模型服务接入，支持语义配置，支持智能化功能
 */
const Models = () => {
  const [activeTab, setActiveTab] = useState('local');
  const [modelSettings, setModelSettings] = useState({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.95,
    enabled: true,
  });

  useEffect(() => {
    console.log('Models组件已加载 - 当前路径:', window.location.pathname);
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '已启用' : '未启用'}
        </Tag>
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
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">

      
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
                    
                    <Form.Item>
                      <Button type="primary">保存配置</Button>
                    </Form.Item>
                  </Form>
                </Card>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Models; 
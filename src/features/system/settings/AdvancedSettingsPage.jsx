import React, { useState } from 'react';
import {
  Card,
  Typography,
  Form,
  Switch,
  InputNumber,
  Select,
  Button,
  Tabs,
  Divider,
  Space,
  message,
  Row,
  Col,
  Upload,
  Modal,
  Radio
} from 'antd';
import {
  SettingOutlined,
  CloudUploadOutlined,
  GlobalOutlined,
  SecurityScanOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

/**
 * 高级系统设置页面
 * 提供系统的高级设置项，包括性能设置、数据存储设置、安全设置等
 */
const AdvancedSettingsPage = () => {
  // 性能设置表单
  const [performanceForm] = Form.useForm();
  // 数据设置表单
  const [dataForm] = Form.useForm();
  // 安全设置表单
  const [securityForm] = Form.useForm();
  // 国际化设置表单
  const [i18nForm] = Form.useForm();
  
  // 导入/导出模态框可见性
  const [importExportModalVisible, setImportExportModalVisible] = useState(false);
  // 导入/导出模式
  const [importExportMode, setImportExportMode] = useState('export');
  
  // 上传文件列表
  const [fileList, setFileList] = useState([]);
  
  // 默认系统设置
  const defaultSettings = {
    performance: {
      cacheEnabled: true,
      cacheSize: 200,
      concurrentTasks: 5,
      taskTimeout: 300,
      enablePreloading: true
    },
    data: {
      storageMode: 'hybrid',
      compressionLevel: 'medium',
      dataRetentionDays: 180,
      autoBackup: true,
      backupFrequency: 'daily'
    },
    security: {
      sessionTimeout: 30,
      loginAttempts: 5,
      passwordComplexity: 'high',
      twoFactorAuth: true,
      ipRestriction: false
    },
    i18n: {
      defaultLanguage: 'zh-CN',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24hour',
      timezone: 'Asia/Shanghai',
      autoDetect: true
    }
  };
  
  // 初始化表单数据
  useState(() => {
    performanceForm.setFieldsValue(defaultSettings.performance);
    dataForm.setFieldsValue(defaultSettings.data);
    securityForm.setFieldsValue(defaultSettings.security);
    i18nForm.setFieldsValue(defaultSettings.i18n);
  }, []);
  
  // 处理性能设置更新
  const handlePerformanceSettingsUpdate = (values) => {
    console.log('Performance settings update:', values);
    message.success('性能设置已更新');
  };
  
  // 处理数据设置更新
  const handleDataSettingsUpdate = (values) => {
    console.log('Data settings update:', values);
    message.success('数据设置已更新');
  };
  
  // 处理安全设置更新
  const handleSecuritySettingsUpdate = (values) => {
    console.log('Security settings update:', values);
    message.success('安全设置已更新');
  };
  
  // 处理国际化设置更新
  const handleI18nSettingsUpdate = (values) => {
    console.log('I18n settings update:', values);
    message.success('国际化设置已更新');
  };
  
  // 打开导入/导出模态框
  const showImportExportModal = (mode) => {
    setImportExportMode(mode);
    setImportExportModalVisible(true);
  };
  
  // 关闭导入/导出模态框
  const handleImportExportModalCancel = () => {
    setImportExportModalVisible(false);
    setFileList([]);
  };
  
  // 处理导入
  const handleImport = () => {
    if (fileList.length === 0) {
      message.error('请先上传配置文件');
      return;
    }
    
    // 模拟导入处理
    setTimeout(() => {
      message.success('配置导入成功');
      handleImportExportModalCancel();
    }, 1000);
  };
  
  // 处理导出
  const handleExport = () => {
    // 模拟导出处理
    setTimeout(() => {
      message.success('配置已导出，请查看下载文件');
      handleImportExportModalCancel();
    }, 1000);
  };
  
  // 上传前检查
  const beforeUpload = (file) => {
    const isJSON = file.type === 'application/json';
    if (!isJSON) {
      message.error('只能上传JSON格式的配置文件！');
    }
    return isJSON;
  };
  
  // 处理上传变化
  const handleUploadChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); // 只保留最后一个文件
    setFileList(fileList);
  };
  
  // 重置所有设置
  const resetAllSettings = () => {
    Modal.confirm({
      title: '重置所有设置',
      content: '确定要将所有设置恢复为默认值吗？这将无法撤销。',
      onOk() {
        performanceForm.setFieldsValue(defaultSettings.performance);
        dataForm.setFieldsValue(defaultSettings.data);
        securityForm.setFieldsValue(defaultSettings.security);
        i18nForm.setFieldsValue(defaultSettings.i18n);
        message.success('所有设置已重置为默认值');
      }
    });
  };
  
  return (
    <div className="advanced-settings-page" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>高级系统设置</Title>
        <Space>
          <Button icon={<CloudUploadOutlined />} onClick={() => showImportExportModal('import')}>
            导入配置
          </Button>
          <Button icon={<CloudUploadOutlined />} onClick={() => showImportExportModal('export')}>
            导出配置
          </Button>
          <Button danger onClick={resetAllSettings}>重置所有设置</Button>
        </Space>
      </div>
      
      <Paragraph type="secondary">
        高级系统设置用于管理平台的性能、数据、安全等核心配置。除非您了解这些配置的作用，否则建议保持默认设置。
      </Paragraph>
      
      <Divider />
      
      <Tabs defaultActiveKey="performance">
        <TabPane 
          tab={<span><ThunderboltOutlined />性能设置</span>} 
          key="performance"
        >
          <Card>
            <Form
              form={performanceForm}
              layout="vertical"
              onFinish={handlePerformanceSettingsUpdate}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="cacheEnabled"
                    label="启用缓存"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                
                <Col span={12}>
                  <Form.Item
                    name="cacheSize"
                    label="缓存大小 (MB)"
                    rules={[{ required: true, message: '请输入缓存大小' }]}
                  >
                    <InputNumber min={50} max={1000} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="concurrentTasks"
                    label="并发任务数"
                    rules={[{ required: true, message: '请输入并发任务数' }]}
                  >
                    <InputNumber min={1} max={20} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                
                <Col span={12}>
                  <Form.Item
                    name="taskTimeout"
                    label="任务超时时间 (秒)"
                    rules={[{ required: true, message: '请输入任务超时时间' }]}
                  >
                    <InputNumber min={60} max={3600} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="enablePreloading"
                label="启用预加载"
                valuePropName="checked"
                extra="开启后将预加载常用数据，提高响应速度，但会增加内存占用"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存性能设置
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><DatabaseOutlined />数据设置</span>} 
          key="data"
        >
          <Card>
            <Form
              form={dataForm}
              layout="vertical"
              onFinish={handleDataSettingsUpdate}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="storageMode"
                    label="数据存储模式"
                    rules={[{ required: true, message: '请选择数据存储模式' }]}
                  >
                    <Select>
                      <Option value="local">本地存储</Option>
                      <Option value="cloud">云端存储</Option>
                      <Option value="hybrid">混合存储</Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col span={12}>
                  <Form.Item
                    name="compressionLevel"
                    label="数据压缩级别"
                    rules={[{ required: true, message: '请选择数据压缩级别' }]}
                  >
                    <Select>
                      <Option value="none">不压缩</Option>
                      <Option value="low">低压缩</Option>
                      <Option value="medium">中压缩</Option>
                      <Option value="high">高压缩</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="dataRetentionDays"
                label="数据保留天数"
                rules={[{ required: true, message: '请输入数据保留天数' }]}
                extra="超过保留天数的历史数据将被自动归档或删除"
              >
                <InputNumber min={30} max={3650} style={{ width: '100%' }} />
              </Form.Item>
              
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="autoBackup"
                    label="自动备份"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                
                <Col span={12}>
                  <Form.Item
                    name="backupFrequency"
                    label="备份频率"
                    rules={[{ required: true, message: '请选择备份频率' }]}
                  >
                    <Select>
                      <Option value="hourly">每小时</Option>
                      <Option value="daily">每天</Option>
                      <Option value="weekly">每周</Option>
                      <Option value="monthly">每月</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存数据设置
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><SecurityScanOutlined />安全设置</span>} 
          key="security"
        >
          <Card>
            <Form
              form={securityForm}
              layout="vertical"
              onFinish={handleSecuritySettingsUpdate}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="sessionTimeout"
                    label="会话超时时间 (分钟)"
                    rules={[{ required: true, message: '请输入会话超时时间' }]}
                    extra="用户多久不操作后自动登出"
                  >
                    <InputNumber min={5} max={1440} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                
                <Col span={12}>
                  <Form.Item
                    name="loginAttempts"
                    label="登录尝试次数限制"
                    rules={[{ required: true, message: '请输入登录尝试次数限制' }]}
                    extra="超过限制将锁定账户"
                  >
                    <InputNumber min={3} max={10} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="passwordComplexity"
                label="密码复杂度要求"
                rules={[{ required: true, message: '请选择密码复杂度要求' }]}
              >
                <Select>
                  <Option value="low">低（仅限制长度）</Option>
                  <Option value="medium">中（要求包含字母和数字）</Option>
                  <Option value="high">高（要求包含大小写字母、数字和特殊字符）</Option>
                </Select>
              </Form.Item>
              
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="twoFactorAuth"
                    label="强制双因素认证"
                    valuePropName="checked"
                    extra="开启后所有用户必须启用双因素认证"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                
                <Col span={12}>
                  <Form.Item
                    name="ipRestriction"
                    label="启用IP限制"
                    valuePropName="checked"
                    extra="开启后只有允许的IP地址可以访问系统"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存安全设置
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={<span><GlobalOutlined />国际化设置</span>} 
          key="i18n"
        >
          <Card>
            <Form
              form={i18nForm}
              layout="vertical"
              onFinish={handleI18nSettingsUpdate}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="defaultLanguage"
                    label="默认语言"
                    rules={[{ required: true, message: '请选择默认语言' }]}
                  >
                    <Select>
                      <Option value="zh-CN">简体中文</Option>
                      <Option value="en-US">English (US)</Option>
                      <Option value="ja-JP">日本語</Option>
                      <Option value="ko-KR">한국어</Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col span={12}>
                  <Form.Item
                    name="autoDetect"
                    label="自动检测用户语言"
                    valuePropName="checked"
                    extra="根据用户浏览器设置自动选择语言"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="dateFormat"
                    label="日期格式"
                    rules={[{ required: true, message: '请选择日期格式' }]}
                  >
                    <Select>
                      <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                      <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                      <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                      <Option value="YYYY年MM月DD日">YYYY年MM月DD日</Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col span={12}>
                  <Form.Item
                    name="timeFormat"
                    label="时间格式"
                    rules={[{ required: true, message: '请选择时间格式' }]}
                  >
                    <Select>
                      <Option value="12hour">12小时制</Option>
                      <Option value="24hour">24小时制</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="timezone"
                label="默认时区"
                rules={[{ required: true, message: '请选择默认时区' }]}
              >
                <Select showSearch style={{ width: '100%' }}>
                  <Option value="Asia/Shanghai">Asia/Shanghai (GMT+8)</Option>
                  <Option value="America/New_York">America/New_York (GMT-5/GMT-4)</Option>
                  <Option value="Europe/London">Europe/London (GMT+0/GMT+1)</Option>
                  <Option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</Option>
                  <Option value="Australia/Sydney">Australia/Sydney (GMT+10/GMT+11)</Option>
                </Select>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存国际化设置
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
      
      {/* 导入/导出配置模态框 */}
      <Modal
        title={importExportMode === 'import' ? '导入配置' : '导出配置'}
        visible={importExportModalVisible}
        onCancel={handleImportExportModalCancel}
        footer={
          importExportMode === 'import' ? [
            <Button key="cancel" onClick={handleImportExportModalCancel}>
              取消
            </Button>,
            <Button key="import" type="primary" onClick={handleImport}>
              导入
            </Button>,
          ] : [
            <Button key="cancel" onClick={handleImportExportModalCancel}>
              取消
            </Button>,
            <Button key="export" type="primary" onClick={handleExport}>
              导出
            </Button>,
          ]
        }
      >
        {importExportMode === 'import' ? (
          <div>
            <Paragraph>
              请上传包含系统配置的JSON文件。导入后将覆盖当前配置，请确保文件格式正确。
            </Paragraph>
            <Upload
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
              fileList={fileList}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>选择配置文件</Button>
            </Upload>
          </div>
        ) : (
          <div>
            <Paragraph>
              导出当前系统的所有配置为JSON文件。您可以将此文件用于备份或迁移到其他环境。
            </Paragraph>
            <Radio.Group defaultValue="all">
              <Radio value="all">导出所有配置</Radio>
              <Radio value="performance">仅导出性能设置</Radio>
              <Radio value="data">仅导出数据设置</Radio>
              <Radio value="security">仅导出安全设置</Radio>
              <Radio value="i18n">仅导出国际化设置</Radio>
            </Radio.Group>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdvancedSettingsPage;

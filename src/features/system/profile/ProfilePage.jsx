import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Avatar, 
  Typography, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  message, 
  Upload, 
  Divider,
  List
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  KeyOutlined, 
  UploadOutlined,
  HistoryOutlined, 
  SafetyOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

/**
 * 个人中心页面组件
 * 管理用户个人资料、安全设置、登录历史等
 */
const ProfilePage = () => {
  // 模拟用户数据
  const [userData, setUserData] = useState({
    id: '100001',
    name: '张三',
    avatar: '',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    department: '数据部',
    position: '数据分析师',
    lastLogin: '2025-05-16 00:10:32',
    ipAddress: '192.168.1.100',
    location: '北京'
  });

  // 基本信息表单
  const [basicForm] = Form.useForm();
  // 密码修改表单
  const [passwordForm] = Form.useForm();
  
  // 模拟登录历史记录
  const [loginHistory, setLoginHistory] = useState([
    { id: 1, time: '2025-05-16 00:10:32', ip: '192.168.1.100', location: '北京', device: 'Chrome on Windows' },
    { id: 2, time: '2025-05-15 09:23:15', ip: '192.168.1.100', location: '北京', device: 'Chrome on Windows' },
    { id: 3, time: '2025-05-14 14:42:08', ip: '192.168.1.100', location: '北京', device: 'Safari on macOS' },
    { id: 4, time: '2025-05-13 18:05:51', ip: '192.168.1.100', location: '北京', device: 'Firefox on Windows' },
    { id: 5, time: '2025-05-12 10:30:22', ip: '192.168.1.100', location: '北京', device: 'Chrome on Windows' },
  ]);

  // 初始化表单数据
  useEffect(() => {
    basicForm.setFieldsValue({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      department: userData.department,
      position: userData.position,
    });
  }, [userData, basicForm]);

  // 处理基本信息更新
  const handleBasicInfoUpdate = (values) => {
    setUserData({ ...userData, ...values });
    message.success('个人信息更新成功');
  };

  // 处理密码更新
  const handlePasswordUpdate = (values) => {
    console.log('Password update:', values);
    message.success('密码修改成功');
    passwordForm.resetFields();
  };

  // 头像上传前验证
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只支持上传JPG/PNG格式的图片！');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2MB！');
    }
    return isJpgOrPng && isLt2M;
  };

  // 处理头像更新
  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // 假设服务器返回了图片URL
      const imageUrl = info.file.response.url;
      setUserData({ ...userData, avatar: imageUrl });
      message.success('头像更新成功');
    }
  };

  return (
    <div className="profile-page" style={{ padding: 24 }}>
      <Title level={2}>个人中心</Title>
      <Divider />
      
      <Row gutter={24}>
        {/* 左侧个人信息卡片 */}
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/upload/avatar"
                beforeUpload={beforeUpload}
                onChange={handleAvatarChange}
              >
                {userData.avatar ? (
                  <Avatar size={100} src={userData.avatar} />
                ) : (
                  <Avatar size={100} icon={<UserOutlined />} />
                )}
              </Upload>
              <Title level={4} style={{ marginTop: 16 }}>{userData.name}</Title>
              <Text type="secondary">{userData.position} | {userData.department}</Text>
            </div>
            
            <Divider />
            
            <div>
              <p>
                <MailOutlined style={{ marginRight: 8 }} />
                <Text strong>邮箱：</Text> {userData.email}
              </p>
              <p>
                <PhoneOutlined style={{ marginRight: 8 }} />
                <Text strong>手机：</Text> {userData.phone}
              </p>
              <p>
                <HistoryOutlined style={{ marginRight: 8 }} />
                <Text strong>上次登录：</Text> {userData.lastLogin}
              </p>
              <p>
                <SafetyOutlined style={{ marginRight: 8 }} />
                <Text strong>登录IP：</Text> {userData.ipAddress} ({userData.location})
              </p>
            </div>
          </Card>
        </Col>
        
        {/* 右侧设置选项卡 */}
        <Col span={16}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab={<span><UserOutlined />基本信息</span>} key="1">
                <Form
                  form={basicForm}
                  layout="vertical"
                  onFinish={handleBasicInfoUpdate}
                >
                  <Form.Item
                    name="name"
                    label="姓名"
                    rules={[{ required: true, message: '请输入姓名' }]}
                  >
                    <Input placeholder="请输入姓名" />
                  </Form.Item>
                  
                  <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                      { required: true, message: '请输入邮箱' },
                      { type: 'email', message: '邮箱格式不正确' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
                  </Form.Item>
                  
                  <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[
                      { required: true, message: '请输入手机号' },
                      { pattern: /^1\d{10}$/, message: '手机号格式不正确' }
                    ]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" />
                  </Form.Item>
                  
                  <Form.Item
                    name="department"
                    label="部门"
                  >
                    <Input placeholder="请输入所属部门" />
                  </Form.Item>
                  
                  <Form.Item
                    name="position"
                    label="职位"
                  >
                    <Input placeholder="请输入职位" />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      保存修改
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              
              <TabPane tab={<span><KeyOutlined />修改密码</span>} key="2">
                <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={handlePasswordUpdate}
                >
                  <Form.Item
                    name="currentPassword"
                    label="当前密码"
                    rules={[{ required: true, message: '请输入当前密码' }]}
                  >
                    <Input.Password placeholder="请输入当前密码" />
                  </Form.Item>
                  
                  <Form.Item
                    name="newPassword"
                    label="新密码"
                    rules={[
                      { required: true, message: '请输入新密码' },
                      { min: 8, message: '密码长度不能小于8个字符' }
                    ]}
                  >
                    <Input.Password placeholder="请输入新密码" />
                  </Form.Item>
                  
                  <Form.Item
                    name="confirmPassword"
                    label="确认新密码"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: '请确认新密码' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两次输入的密码不一致'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="请确认新密码" />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      修改密码
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              
              <TabPane tab={<span><HistoryOutlined />登录历史</span>} key="3">
                <List
                  itemLayout="horizontal"
                  dataSource={loginHistory}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.time}
                        description={`${item.device} | IP: ${item.ip} | 地点: ${item.location}`}
                      />
                    </List.Item>
                  )}
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 5,
                  }}
                />
              </TabPane>
              
              <TabPane tab={<span><SettingOutlined />账户设置</span>} key="4">
                <Form layout="vertical">
                  <Form.Item label="双因素认证">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text>开启双因素认证，提高账户安全性</Text>
                        <br />
                        <Text type="secondary">登录时需要输入手机或邮箱验证码</Text>
                      </div>
                      <Button type="primary">开启</Button>
                    </div>
                  </Form.Item>
                  
                  <Divider />
                  
                  <Form.Item label="登录设备管理">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text>管理已登录的设备</Text>
                        <br />
                        <Text type="secondary">查看并移除授权的设备</Text>
                      </div>
                      <Button>查看设备</Button>
                    </div>
                  </Form.Item>
                  
                  <Divider />
                  
                  <Form.Item label="系统通知">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text>接收系统通知</Text>
                        <br />
                        <Text type="secondary">包括新功能发布、维护公告等</Text>
                      </div>
                      <Button>管理通知</Button>
                    </div>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;

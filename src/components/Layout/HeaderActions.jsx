import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Avatar, 
  Badge, 
  Dropdown, 
  Menu, 
  Space, 
  Button, 
  Divider, 
  List, 
  Typography, 
  Popover,
  Input
} from 'antd';
import {
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;
const { Search } = Input;

/**
 * 顶部导航栏操作组件
 * 包含通知中心、个人中心和帮助等快捷入口
 */
const HeaderActions = () => {
  const navigate = useNavigate();
  
  // 模拟通知数据
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: '系统更新通知',
      content: '系统将于2025年5月20日凌晨2:00-4:00进行例行维护。',
      time: '10分钟前',
      read: false
    },
    {
      id: 2,
      title: '标签审批提醒',
      content: '您有一个「客户价值评分」标签待审批。',
      time: '1小时前',
      read: false
    },
    {
      id: 3,
      title: '安全预警',
      content: '系统检测到异地IP登录，请确认是否是您本人操作。',
      time: '3小时前',
      read: true
    }
  ]);
  
  // 未读通知数量
  const unreadCount = notifications.filter(item => !item.read).length;
  
  // 标记通知为已读
  const markAsRead = (id) => {
    setNotifications(notifications.map(item => 
      item.id === id ? { ...item, read: true } : item
    ));
  };
  
  // 通知中心内容
  const notificationsContent = (
    <div style={{ width: 300 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Title level={5} style={{ margin: 0 }}>通知中心</Title>
        <Button type="link" size="small" onClick={() => navigate('/system/notifications')}>
          查看全部
        </Button>
      </div>
      <Divider style={{ margin: '8px 0' }} />
      
      <List
        dataSource={notifications}
        renderItem={item => (
          <List.Item 
            key={item.id}
            style={{ background: item.read ? 'transparent' : '#f0f5ff', cursor: 'pointer' }}
            onClick={() => {
              markAsRead(item.id);
              // 跳转到通知详情或执行其他操作
            }}
          >
            <List.Item.Meta
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {!item.read && <Badge status="processing" style={{ marginRight: 8 }} />}
                  <Text strong>{item.title}</Text>
                </div>
              }
              description={
                <div>
                  <p style={{ margin: '4px 0' }}>{item.content}</p>
                  <Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text>
                </div>
              }
            />
          </List.Item>
        )}
        locale={{ emptyText: '暂无通知' }}
        style={{ maxHeight: 300, overflow: 'auto' }}
      />
      
      <Divider style={{ margin: '8px 0' }} />
      <div style={{ textAlign: 'center' }}>
        <Button type="text" onClick={() => {
          setNotifications(notifications.map(item => ({ ...item, read: true })));
        }}>
          全部标为已读
        </Button>
      </div>
    </div>
  );
  
  // 个人菜单
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/system/profile')}>
        个人中心
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate('/system/settings')}>
        系统设置
      </Menu.Item>
      <Menu.Item key="advancedSettings" icon={<SettingOutlined />} onClick={() => navigate('/system/settings/advanced')}>
        高级设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => navigate('/login')}>
        退出登录
      </Menu.Item>
    </Menu>
  );
  
  // 帮助内容
  const helpContent = (
    <div style={{ width: 250 }}>
      <Title level={5}>需要帮助？</Title>
      <Divider style={{ margin: '8px 0' }} />
      <List>
        <List.Item>
          <a href="#">使用指南</a>
        </List.Item>
        <List.Item>
          <a href="#">功能介绍</a>
        </List.Item>
        <List.Item>
          <a href="#">常见问题</a>
        </List.Item>
        <List.Item>
          <a href="#">联系支持</a>
        </List.Item>
      </List>
    </div>
  );
  
  // 处理搜索提交
  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <Space size={16}>
      {/* 搜索框 */}
      <Search
        placeholder="搜索标签、客群、应用..."
        allowClear
        onSearch={handleSearch}
        style={{ width: 250 }}
        className="global-search"
      />
      
      <Popover 
        content={helpContent} 
        title={null} 
        trigger="click" 
        placement="bottomRight"
      >
        <Button type="text" icon={<QuestionCircleOutlined />} />
      </Popover>
      
      <Popover 
        content={notificationsContent} 
        title={null} 
        trigger="click" 
        placement="bottomRight"
      >
        <Badge count={unreadCount} size="small">
          <Button type="text" icon={<BellOutlined />} />
        </Badge>
      </Popover>
      
      <Dropdown overlay={userMenu} placement="bottomRight">
        <span style={{ cursor: 'pointer' }}>
          <Avatar icon={<UserOutlined />} />
          <span style={{ marginLeft: 8 }}>张三</span>
        </span>
      </Dropdown>
    </Space>
  );
};

export default HeaderActions;

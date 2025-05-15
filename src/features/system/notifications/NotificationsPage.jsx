import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Tabs, 
  List, 
  Badge, 
  Tag, 
  Button, 
  Space, 
  Tooltip, 
  Dropdown, 
  Menu, 
  Empty,
  Divider,
  Modal,
  message
} from 'antd';
import { 
  BellOutlined, 
  MailOutlined, 
  AlertOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined, 
  DeleteOutlined, 
  SettingOutlined,
  FilterOutlined,
  EyeOutlined, 
  CheckOutlined,
  MoreOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

/**
 * 通知中心页面组件
 * 管理系统通知、消息提醒等
 */
const NotificationsPage = () => {
  // 通知数据
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: '系统更新通知',
      content: '系统将于2025年5月20日凌晨2:00-4:00进行例行维护，请提前做好相关工作安排。',
      time: '2025-05-15 10:30:00',
      type: 'system',
      status: 'unread',
      priority: 'high'
    },
    {
      id: 2,
      title: '标签审批提醒',
      content: '您有一个「客户价值评分」标签待审批，请及时处理。',
      time: '2025-05-15 09:15:00',
      type: 'task',
      status: 'unread',
      priority: 'medium'
    },
    {
      id: 3,
      title: '数据集更新完成',
      content: '您关注的「零售客户行为」数据集已更新完成，更新了过去7天的数据。',
      time: '2025-05-14 18:22:00',
      type: 'data',
      status: 'read',
      priority: 'low'
    },
    {
      id: 4,
      title: '安全预警',
      content: '系统检测到异地IP登录，请确认是否是您本人操作，如非本人操作，请及时修改密码。',
      time: '2025-05-14 15:10:00',
      type: 'security',
      status: 'read',
      priority: 'high'
    },
    {
      id: 5,
      title: '任务完成通知',
      content: '您创建的「高净值客户识别」分析任务已完成，可查看分析结果。',
      time: '2025-05-13 14:05:00',
      type: 'task',
      status: 'read',
      priority: 'medium'
    },
  ]);
  
  // 系统公告
  const [announcements, setAnnouncements] = useState([
    {
      id: 101,
      title: '平台3.5版本发布公告',
      content: '平台3.5版本已发布，新增客户画像高级分析功能，优化了标签管理流程，提升了系统整体性能。详情请查看升级说明文档。',
      time: '2025-05-10 09:00:00',
      status: 'unread'
    },
    {
      id: 102,
      title: '数据安全合规培训通知',
      content: '为提升全员数据安全意识，公司将于2025年5月25日举办数据安全合规培训，请各部门安排人员参加。',
      time: '2025-05-08 11:30:00',
      status: 'read'
    },
    {
      id: 103,
      title: '新增数据源接入说明',
      content: '系统已接入「移动端用户行为」数据源，可用于客户行为分析和精准营销场景，详情请查看数据目录。',
      time: '2025-05-05 15:45:00',
      status: 'read'
    }
  ]);
  
  // 标签审批提醒
  const [approvalReminders, setApprovalReminders] = useState([
    {
      id: 201,
      title: '标签审批提醒',
      content: '您有一个「客户价值评分」标签待审批',
      time: '2025-05-15 09:15:00',
      status: 'pending',
      applicant: '李四',
      department: '营销部'
    },
    {
      id: 202,
      title: '标签审批提醒',
      content: '您有一个「流失风险预警」标签待审批',
      time: '2025-05-14 10:20:00',
      status: 'pending',
      applicant: '王五',
      department: '客户服务部'
    }
  ]);

  // 选项卡计数
  const unreadSystemCount = notifications.filter(item => item.type === 'system' && item.status === 'unread').length;
  const unreadTaskCount = notifications.filter(item => item.type === 'task' && item.status === 'unread').length;
  const unreadDataCount = notifications.filter(item => item.type === 'data' && item.status === 'unread').length;
  const unreadSecurityCount = notifications.filter(item => item.type === 'security' && item.status === 'unread').length;
  const unreadAnnouncementCount = announcements.filter(item => item.status === 'unread').length;
  const pendingApprovalCount = approvalReminders.filter(item => item.status === 'pending').length;
  
  // 标记通知为已读
  const markAsRead = (id) => {
    setNotifications(notifications.map(item => 
      item.id === id ? { ...item, status: 'read' } : item
    ));
    message.success('已标记为已读');
  };
  
  // 删除通知
  const deleteNotification = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条通知吗？删除后将无法恢复。',
      onOk() {
        setNotifications(notifications.filter(item => item.id !== id));
        message.success('删除成功');
      }
    });
  };
  
  // 全部标记为已读
  const markAllAsRead = (type) => {
    setNotifications(notifications.map(item => 
      type ? (item.type === type ? { ...item, status: 'read' } : item) : { ...item, status: 'read' }
    ));
    message.success('全部标记为已读');
  };
  
  // 标记公告为已读
  const markAnnouncementAsRead = (id) => {
    setAnnouncements(announcements.map(item => 
      item.id === id ? { ...item, status: 'read' } : item
    ));
    message.success('已标记为已读');
  };
  
  // 查看详情
  const viewDetail = (item) => {
    Modal.info({
      title: item.title,
      content: (
        <div>
          <p>{item.content}</p>
          <Divider />
          <p style={{ textAlign: 'right', color: '#999' }}>{item.time}</p>
        </div>
      ),
      onOk() {
        if (item.status === 'unread') {
          markAsRead(item.id);
        }
      }
    });
  };
  
  // 处理审批
  const handleApproval = (id, action) => {
    setApprovalReminders(approvalReminders.map(item => 
      item.id === id ? { ...item, status: action === 'approve' ? 'approved' : 'rejected' } : item
    ));
    message.success(`已${action === 'approve' ? '批准' : '拒绝'}该申请`);
  };
  
  // 渲染通知标签
  const renderTypeTag = (type) => {
    switch (type) {
      case 'system':
        return <Tag color="blue">系统</Tag>;
      case 'task':
        return <Tag color="green">任务</Tag>;
      case 'data':
        return <Tag color="purple">数据</Tag>;
      case 'security':
        return <Tag color="red">安全</Tag>;
      default:
        return null;
    }
  };
  
  // 渲染优先级标签
  const renderPriorityTag = (priority) => {
    switch (priority) {
      case 'high':
        return <Tag color="red">高</Tag>;
      case 'medium':
        return <Tag color="orange">中</Tag>;
      case 'low':
        return <Tag color="green">低</Tag>;
      default:
        return null;
    }
  };
  
  // 操作菜单
  const getActionMenu = (item) => (
    <Menu>
      <Menu.Item key="1" icon={<EyeOutlined />} onClick={() => viewDetail(item)}>
        查看详情
      </Menu.Item>
      {item.status === 'unread' && (
        <Menu.Item key="2" icon={<CheckOutlined />} onClick={() => markAsRead(item.id)}>
          标记为已读
        </Menu.Item>
      )}
      <Menu.Item key="3" icon={<DeleteOutlined />} onClick={() => deleteNotification(item.id)}>
        删除
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="notifications-page" style={{ padding: 24 }}>
      <Title level={2}>通知中心</Title>
      <Divider />
      
      <Tabs defaultActiveKey="all">
        <TabPane 
          tab={
            <span>
              <BellOutlined />
              全部通知
              {notifications.filter(item => item.status === 'unread').length > 0 && 
                <Badge 
                  count={notifications.filter(item => item.status === 'unread').length} 
                  style={{ marginLeft: 8 }} 
                />
              }
            </span>
          } 
          key="all"
        >
          <Card 
            title="我的通知" 
            extra={
              <Space>
                <Button 
                  icon={<FilterOutlined />}
                  onClick={() => {}}
                >
                  筛选
                </Button>
                <Button 
                  type="primary" 
                  icon={<CheckCircleOutlined />} 
                  onClick={() => markAllAsRead()}
                >
                  全部标为已读
                </Button>
              </Space>
            }
          >
            {notifications.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Dropdown overlay={getActionMenu(item)} placement="bottomRight">
                        <Button type="text" icon={<MoreOutlined />} />
                      </Dropdown>
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {item.status === 'unread' && (
                            <Badge status="processing" style={{ marginRight: 8 }} />
                          )}
                          <span onClick={() => viewDetail(item)} style={{ cursor: 'pointer' }}>
                            {item.title}
                          </span>
                          <Space style={{ marginLeft: 12 }}>
                            {renderTypeTag(item.type)}
                            {renderPriorityTag(item.priority)}
                          </Space>
                        </div>
                      }
                      description={
                        <div>
                          <Paragraph ellipsis={{ rows: 2 }}>{item.content}</Paragraph>
                          <Text type="secondary">{item.time}</Text>
                        </div>
                      }
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
            ) : (
              <Empty description="暂无通知" />
            )}
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <MailOutlined />
              系统公告
              {unreadAnnouncementCount > 0 && 
                <Badge count={unreadAnnouncementCount} style={{ marginLeft: 8 }} />
              }
            </span>
          } 
          key="announcements"
        >
          <Card title="系统公告">
            {announcements.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={announcements}
                renderItem={item => (
                  <List.Item
                    actions={[
                      item.status === 'unread' ? (
                        <Button 
                          type="link" 
                          onClick={() => markAnnouncementAsRead(item.id)}
                        >
                          标为已读
                        </Button>
                      ) : null,
                      <Button 
                        type="link" 
                        onClick={() => {
                          Modal.info({
                            title: item.title,
                            content: (
                              <div>
                                <p>{item.content}</p>
                                <p style={{ textAlign: 'right', color: '#999' }}>{item.time}</p>
                              </div>
                            ),
                            onOk() {
                              if (item.status === 'unread') {
                                markAnnouncementAsRead(item.id);
                              }
                            }
                          });
                        }}
                      >
                        查看详情
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <div>
                          {item.status === 'unread' && (
                            <Badge status="processing" style={{ marginRight: 8 }} />
                          )}
                          {item.title}
                        </div>
                      }
                      description={
                        <div>
                          <Paragraph ellipsis={{ rows: 2 }}>{item.content}</Paragraph>
                          <Text type="secondary">{item.time}</Text>
                        </div>
                      }
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
            ) : (
              <Empty description="暂无系统公告" />
            )}
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <AlertOutlined />
              待审批
              {pendingApprovalCount > 0 && 
                <Badge count={pendingApprovalCount} style={{ marginLeft: 8 }} />
              }
            </span>
          } 
          key="approvals"
        >
          <Card title="待审批事项">
            {approvalReminders.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={approvalReminders.filter(item => item.status === 'pending')}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button 
                        type="primary" 
                        onClick={() => handleApproval(item.id, 'approve')}
                      >
                        批准
                      </Button>,
                      <Button 
                        danger
                        onClick={() => handleApproval(item.id, 'reject')}
                      >
                        拒绝
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={item.title}
                      description={
                        <div>
                          <p>{item.content}</p>
                          <p>申请人：{item.applicant} ({item.department})</p>
                          <Text type="secondary">{item.time}</Text>
                        </div>
                      }
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
            ) : (
              <Empty description="暂无待审批事项" />
            )}
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <SettingOutlined />
              通知设置
            </span>
          } 
          key="settings"
        >
          <Card title="通知设置">
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: '系统通知', description: '系统更新、维护公告等系统相关的通知', enabled: true },
                { title: '任务通知', description: '任务分配、任务进度、任务完成等任务相关的通知', enabled: true },
                { title: '数据通知', description: '数据更新、数据质量问题等数据相关的通知', enabled: true },
                { title: '安全通知', description: '账户安全、异常登录等安全相关的通知', enabled: true },
                { title: '电子邮件通知', description: '接收邮件形式的重要通知', enabled: false },
                { title: '短信通知', description: '接收短信形式的重要通知', enabled: false },
              ]}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Switch checked={item.enabled} onChange={(checked) => {
                      message.success(`${item.title}已${checked ? '开启' : '关闭'}`);
                    }} />
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

// 开关组件
const Switch = ({ checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);
  
  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };
  
  return (
    <Button 
      type={isChecked ? 'primary' : 'default'}
      onClick={handleChange}
    >
      {isChecked ? '已开启' : '已关闭'}
    </Button>
  );
};

export default NotificationsPage;

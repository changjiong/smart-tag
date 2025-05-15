/**
 * Mock user data for development and testing
 */

export const users = [
  {
    id: 1,
    username: 'admin',
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
    department: '数据中心',
    lastLogin: '2023-12-01T09:32:45',
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    permissions: ['all']
  },
  {
    id: 2,
    username: 'lisi',
    name: '李四',
    email: 'lisi@example.com',
    role: 'manager',
    department: '营销部门',
    lastLogin: '2023-11-29T14:22:18',
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    permissions: ['tags:view', 'tags:edit', 'portraits:view', 'groups:view', 'groups:edit', 'marketing:view', 'marketing:edit']
  },
  {
    id: 3,
    username: 'wangwu',
    name: '王五',
    email: 'wangwu@example.com',
    role: 'analyst',
    department: '数据中心',
    lastLogin: '2023-11-30T11:15:32',
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    permissions: ['tags:view', 'portraits:view', 'groups:view', 'marketing:view']
  },
  {
    id: 4,
    username: 'zhaoliu',
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: 'marketing',
    department: '营销部门',
    lastLogin: '2023-11-28T16:42:11',
    status: 'inactive',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    permissions: ['portraits:view', 'groups:view', 'marketing:view', 'marketing:edit']
  },
  {
    id: 5,
    username: 'sunqi',
    name: '孙七',
    email: 'sunqi@example.com',
    role: 'viewer',
    department: '风控部门',
    lastLogin: '2023-11-27T09:11:23',
    status: 'active',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    permissions: ['tags:view', 'portraits:view', 'groups:view']
  }
];

// User role definitions
export const roles = [
  {
    id: 1,
    name: 'admin',
    displayName: '系统管理员',
    description: '拥有所有权限',
    permissions: ['all']
  },
  {
    id: 2,
    name: 'manager',
    displayName: '部门经理',
    description: '数据和营销管理权限',
    permissions: ['tags:view', 'tags:edit', 'portraits:view', 'groups:view', 'groups:edit', 'marketing:view', 'marketing:edit']
  },
  {
    id: 3,
    name: 'analyst',
    displayName: '数据分析师',
    description: '数据查看与分析权限',
    permissions: ['tags:view', 'portraits:view', 'groups:view', 'marketing:view']
  },
  {
    id: 4,
    name: 'marketing',
    displayName: '营销人员',
    description: '营销活动管理权限',
    permissions: ['portraits:view', 'groups:view', 'marketing:view', 'marketing:edit']
  },
  {
    id: 5,
    name: 'viewer',
    displayName: '普通查看者',
    description: '基础查看权限',
    permissions: ['tags:view', 'portraits:view', 'groups:view']
  }
];

// Activity logs for users
export const userActivities = [
  { id: 1, userId: 1, activity: '创建了新标签"高价值潜在客户"', timestamp: '2023-12-01T09:45:12' },
  { id: 2, userId: 1, activity: '更新了系统权限配置', timestamp: '2023-11-30T14:12:33' },
  { id: 3, userId: 2, activity: '创建了新客群"年轻投资者"', timestamp: '2023-11-29T16:30:21' },
  { id: 4, userId: 2, activity: '启动了营销活动"理财产品推广"', timestamp: '2023-11-28T10:15:45' },
  { id: 5, userId: 3, activity: '查看了客户画像分析', timestamp: '2023-11-30T11:22:18' },
  { id: 6, userId: 3, activity: '下载了标签分布报告', timestamp: '2023-11-29T09:41:32' },
  { id: 7, userId: 4, activity: '创建了新的营销模板', timestamp: '2023-11-28T16:50:27' },
  { id: 8, userId: 5, activity: '查看了高净值客户分群', timestamp: '2023-11-27T09:30:15' }
];

export default { users, roles, userActivities };


Read file: frontend/src/pages/System/SystemRouter.jsx

Read file: frontend/src/pages/Tags/TagsRouter.jsx

Read file: frontend/src/pages/Portrait/PortraitRouter.jsx
# SmartTag项目菜单与路由结构梳理

## 整体架构

SmartTag项目采用React Router进行路由管理，使用了嵌套路由结构。主要由以下几个部分组成：

1. **菜单数据**: 定义在`menuData.js`中
2. **路由配置**: 定义在`App.jsx`中
3. **布局组件**: `MainLayout.jsx`负责整体布局
4. **导航组件**: `Header.jsx`和`Sidebar.jsx`负责菜单显示

## 菜单结构与对应路由

### 1. 首页（Dashboard）

**路径**: `/dashboard`
- **工作台** - `/dashboard/workspace`
  - 业务任务看板 - `/dashboard/workspace/tasks`
  - 数据洞察快报 - `/dashboard/workspace/insights`
  - 系统使用指南 - `/dashboard/workspace/guide`
  - 价值成果展示 - `/dashboard/workspace/achievements`
- **个性化推荐** - `/dashboard/recommend`
  - 推荐功能 - `/dashboard/recommend/features`
  - 常用工具 - `/dashboard/recommend/tools`
  - 学习资源 - `/dashboard/recommend/learning`
- **全局智能助手** - `/dashboard/assistant`
  - 对话式分析 - `/dashboard/assistant/conversation`
  - 业务问题解答 - `/dashboard/assistant/qa`
  - 智能解读 - `/dashboard/assistant/analysis`
  - 操作引导 - `/dashboard/assistant/guide`

### 2. 标签中心（Tags）

**路径**: `/tags`
- **标签管理** - `/tags/management`
  - 标签超市 - `/tags/management/market`
  - 标签分类管理 - `/tags/management/categories`
  - 标签信息管理 - `/tags/management/info`
  - 标签元数据管理 - `/tags/management/metadata`
  - 标签体系批量卸载 - `/tags/management/uninstall`
  - 标签信息批量更新 - `/tags/management/batch-update`
- **标签创建** - `/tags/creation`
  - 标签需求 - `/tags/creation/requirements`
  - 标签注册 - `/tags/creation/registration`
  - 标签工厂 - `/tags/creation/factory`
  - 智能生成 - `/tags/creation/ai` (新功能)
- **标签质量** - `/tags/quality`
  - 标签质量看板 - `/tags/quality/dashboard`
  - 标签健康 - `/tags/quality/health` (新功能)
  - 异常预警 - `/tags/quality/alerts`
  - 预警配置 - `/tags/quality/alert-config`
  - 规则预警 - `/tags/quality/rule-alerts`
  - 任务与历史 - `/tags/quality/history`
- **标签价值** - `/tags/value` (新功能)
  - 标签使用分析 - `/tags/value/usage` (新功能)
  - 价值追踪 - `/tags/value/tracking` (新功能)
  - 业务映射 - `/tags/value/business-mapping` (新功能)

### 3. 客群画像（Portrait）

**路径**: `/portrait`
- **客群管理** - `/portrait/groups`
  - 客群创建 - `/portrait/groups/create`
  - 智能分群 - `/portrait/groups/ai` (新功能)
  - 相似客群发现 - `/portrait/groups/similar` (新功能)
  - 客群洞察库 - `/portrait/groups/insights`
- **画像分析** - `/portrait/analysis`
  - 单客户视图 - `/portrait/analysis/customer`
  - 行为序列分析 - `/portrait/analysis/behavior` (新功能)
  - 群体洞察 - `/portrait/analysis/group-insights`
  - 群体画像 - `/portrait/analysis/group-portrait`
  - 漏斗分析 - `/portrait/analysis/funnel`
  - 客群对比 - `/portrait/analysis/comparison`
  - YRFM分析 - `/portrait/analysis/yrfm`
- **画像应用** - `/portrait/applications`
  - 触达计划 - `/portrait/applications/contact-plans`
  - 话术模板 - `/portrait/applications/scripts`
  - 触达记录 - `/portrait/applications/contact-records`

### 4. 业务应用中心（Applications）

**路径**: `/applications` (新功能)
- **零售营销应用** - `/applications/retail-marketing` (新功能)
- **客户经营应用** - `/applications/customer-management` (新功能)
- **财富管理应用** - `/applications/wealth-management` (新功能)
- **风险管控应用** - `/applications/risk-management` (新功能)
- **对公业务应用** - `/applications/corporate` (新功能)
- **应用分类管理** - `/applications/management` (新功能)

### 5. 场景模板（Templates）

**路径**: `/templates` (新功能)
- **模板库** - `/templates/library` (新功能)
- **模板应用** - `/templates/applications` (新功能)
- **模板管理** - `/templates/management` (新功能)

### 6. 开放能力（Open API）

**路径**: `/open-api`
- **API服务** - `/open-api/services` (新功能)
- **数据服务** - `/open-api/data` (新功能)
- **服务监控** - `/open-api/monitoring` (新功能)

### 7. 系统管理（System）

**路径**: `/system`
- **用户权限** - `/system/users`
  - 机构管理 - `/system/users/organizations`
  - 用户管理 - `/system/users/accounts`
  - 角色管理 - `/system/users/roles`
  - 流程管理 - `/system/users/workflows`
- **系统配置** - `/system/settings`
  - 调度任务 - `/system/settings/schedules`
  - 参数设置 - `/system/settings/parameters`
  - 公告管理 - `/system/settings/announcements`
- **大模型配置** - `/system/ai` (新功能)
  - 模型服务 - `/system/ai/models` (新功能)
  - 知识库 - `/system/ai/knowledge` (新功能)
  - 提示词管理 - `/system/ai/prompts` (新功能)
- **运行监控** - `/system/monitoring`
  - 流量监控 - `/system/monitoring/traffic`
  - 日志监控 - `/system/monitoring/logs`
  - 平台监控 - `/system/monitoring/platform`
  - 服务监控 - `/system/monitoring/services`

## 路由组件结构

项目使用了几个关键的路由组件来组织不同功能区域的内容：

1. **MainLayout** - 主布局组件，包含Header、Sidebar和内容区域
2. **TagsRouter** - 标签中心的路由容器组件
3. **PortraitRouter** - 客群画像的路由容器组件
4. **SystemRouter** - 系统管理的路由容器组件

这些路由组件使用了React Router的`Outlet`组件来渲染子路由内容，实现了嵌套路由结构。

## 导航与交互

菜单交互通过`MenuContext`实现状态管理，主要功能包括：

1. 跟踪当前活动菜单和子菜单
2. 处理菜单切换和导航
3. 管理菜单展开/折叠状态

`Header`和`Sidebar`组件都使用这个Context来保持导航状态的同步。

## 总结

SmartTag项目有一个结构清晰的多级菜单系统，通过嵌套路由来组织功能。系统分为7个主要功能模块，每个模块下又有多个子功能，形成了一个完整的应用体系。该菜单系统支持响应式设计，可以在桌面和移动设备上提供良好的用户体验。

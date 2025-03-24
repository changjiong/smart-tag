import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 导入布局组件
import MainLayout from './components/Layout/MainLayout';

// 导入错误页面组件
import NotFoundPage from './components/ErrorPages/NotFoundPage';

// 导入仪表盘页面组件
import Dashboard from './pages/Dashboard/Dashboard';
import DataOverview from './pages/Dashboard/DataOverview';
import TodoList from './pages/Dashboard/TodoList';
import AIAssistant from './pages/Dashboard/AIAssistant';

// 导入标签中心路由组件
import TagsRouter from './pages/Tags/TagsRouter';

// 导入标签系统页面组件
import Library from './pages/Tags/TagSystem/Library';
import LibraryVersions from './pages/Tags/TagSystem/LibraryVersions';
import Market from './pages/Tags/TagSystem/Market';
import MarketApply from './pages/Tags/TagSystem/MarketApply';
import MarketDetail from './pages/Tags/TagSystem/MarketDetail';

// 导入标签监控页面组件
import Quality from './pages/Tags/TagMonitoring/Quality';
import QualityRules from './pages/Tags/TagMonitoring/QualityRules';
import Alerts from './pages/Tags/TagMonitoring/Alerts';
import AlertRules from './pages/Tags/TagMonitoring/AlertRules';
import Health from './pages/Tags/TagMonitoring/Health';
import HealthDiagnostics from './pages/Tags/TagMonitoring/HealthDiagnostics';

// 导入标签需求管理页面组件
import RequirementsIndex from './pages/Tags/TagManagement/Requirements/index';
import RequirementsSubmit from './pages/Tags/TagManagement/Requirements/Submit';
import RequirementsReview from './pages/Tags/TagManagement/Requirements/Review';
import RequirementsTrack from './pages/Tags/TagManagement/Requirements/Track';

// 导入客群分析页面组件
import PortraitRouter from './pages/Portrait/PortraitRouter';
import GroupsPage from './pages/Portrait/GroupsPage';
import AnalysisPage from './pages/Portrait/AnalysisPage';

// 导入系统管理页面组件
import SystemRouter from './pages/System/SystemRouter';
import UserPage from './pages/System/UserPage';
import SettingsPage from './pages/System/SettingsPage';

// 导入业务应用中心组件
import ApplicationsRouter from './pages/Applications/ApplicationsRouter';
import * as AppPages from './pages/Applications/ApplicationPages';

// 导入场景模板组件
import TemplatesRouter from './pages/Templates/TemplatesRouter';
import * as TemplatePages from './pages/Templates/TemplatePages';

// 导入开放能力组件
import OpenAPIRouter from './pages/OpenAPI/OpenAPIRouter';
import * as OpenAPIPages from './pages/OpenAPI/OpenAPIPages';

// 导入AI实验室页面组件
import AILaboratory from './pages/AILaboratory/AILaboratory';
import ModelManager from './pages/AILaboratory/ModelManager';
import KnowledgeBase from './pages/AILaboratory/KnowledgeBase';

// 导入个人资料页面组件
import Profile from './pages/Profile/Profile';

// 导入登录页面组件
import Login from './pages/Login/Login';

/**
 * 应用程序主组件
 * 设置应用的路由结构
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* 登录路由 */}
        <Route path="/login" element={<Login />} />
        
        {/* 主应用布局 */}
        <Route path="/" element={<MainLayout />}>
          {/* 默认重定向到仪表盘 */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* 仪表盘路由 */}
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="overview" element={<DataOverview />} />
            <Route path="personal/todos" element={<TodoList />} />
            <Route path="assistant/qa" element={<AIAssistant />} />
            <Route path="workspace/*" element={<div>工作台</div>} />
            <Route path="recommend/*" element={<div>个性化推荐</div>} />
            <Route path="assistant/*" element={<div>全局智能助手</div>} />
          </Route>
          
          {/* 标签中心路由 */}
          <Route path="tags" element={<TagsRouter />}>
            <Route index element={<Navigate to="/tags/market" replace />} />
            
            {/* 标签管理 */}
            <Route path="management" element={<div>标签管理</div>}>
              <Route index element={<Navigate to="/tags/management/market" replace />} />
              <Route path="market" element={<div>标签超市</div>} />
              <Route path="categories" element={<div>标签分类管理</div>} />
              <Route path="info" element={<div>标签信息管理</div>} />
              <Route path="metadata" element={<div>标签元数据管理</div>} />
              <Route path="uninstall" element={<div>标签体系批量卸载</div>} />
              <Route path="batch-update" element={<div>标签信息批量更新</div>} />
            </Route>
            
            {/* 标签创建 */}
            <Route path="creation" element={<div>标签创建</div>}>
              <Route index element={<Navigate to="/tags/creation/requirements" replace />} />
              <Route path="requirements" element={<div>标签需求</div>} />
              <Route path="registration" element={<div>标签注册</div>} />
              <Route path="factory" element={<div>标签工厂</div>} />
              <Route path="ai" element={<div>智能生成</div>} />
            </Route>
            
            {/* 标签质量 */}
            <Route path="quality" element={<div>标签质量</div>}>
              <Route index element={<Navigate to="/tags/quality/dashboard" replace />} />
              <Route path="dashboard" element={<div>标签质量看板</div>} />
              <Route path="health" element={<div>标签健康</div>} />
              <Route path="alerts" element={<div>异常预警</div>} />
              <Route path="alert-config" element={<div>预警配置</div>} />
              <Route path="rule-alerts" element={<div>规则预警</div>} />
              <Route path="history" element={<div>任务与历史</div>} />
            </Route>
            
            {/* 标签价值 */}
            <Route path="value" element={<div>标签价值</div>}>
              <Route index element={<Navigate to="/tags/value/usage" replace />} />
              <Route path="usage" element={<div>标签使用分析</div>} />
              <Route path="tracking" element={<div>价值追踪</div>} />
              <Route path="business-mapping" element={<div>业务映射</div>} />
            </Route>
            
            {/* 旧的路由结构，保留向后兼容性 */}
            <Route path="market" element={<Market />} />
            <Route path="market/apply" element={<MarketApply />} />
            <Route path="market/detail" element={<MarketDetail />} />
            <Route path="library" element={<Library />} />
            <Route path="library/versions" element={<LibraryVersions />} />
            
            <Route path="monitor">
              <Route index element={<Navigate to="/tags/quality/dashboard" replace />} />
              <Route path="quality" element={<Quality />} />
              <Route path="quality/rules" element={<QualityRules />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="alerts/rules" element={<AlertRules />} />
              <Route path="health" element={<Health />} />
              <Route path="health/diagnostics" element={<HealthDiagnostics />} />
            </Route>
            
            {/* 原先的management路由重定向到新结构 */}
            <Route path="management/*" element={<Navigate to="/tags/management" replace />} />
          </Route>
          
          {/* 个人资料路由 */}
          <Route path="profile" element={<Profile />} />
          
          {/* 客群画像路由 */}
          <Route path="portrait" element={<PortraitRouter />}>
            <Route index element={<Navigate to="/portrait/groups" replace />} />
            <Route path="groups" element={<GroupsPage />}>
              <Route index element={<div>客群创建列表</div>} />
              <Route path="create" element={<div>创建新客群</div>} />
              <Route path="ai" element={<div>智能分群</div>} />
              <Route path="similar" element={<div>相似客群发现</div>} />
              <Route path="insights" element={<div>客群洞察库</div>} />
            </Route>
            <Route path="analysis" element={<AnalysisPage />}>
              <Route index element={<div>画像分析首页</div>} />
              <Route path="customer" element={<div>单客户视图</div>} />
              <Route path="behavior" element={<div>行为序列分析</div>} />
              <Route path="group-insights" element={<div>群体洞察</div>} />
              <Route path="group-portrait" element={<div>群体画像</div>} />
              <Route path="funnel" element={<div>漏斗分析</div>} />
              <Route path="comparison" element={<div>客群对比</div>} />
              <Route path="yrfm" element={<div>YRFM分析</div>} />
            </Route>
            <Route path="applications/*" element={<div>画像应用</div>} />
          </Route>
          
          {/* AI实验室路由 */}
          <Route path="ai-laboratory" element={<AILaboratory />}>
            <Route index element={<Navigate to="/ai-laboratory/models" replace />} />
            <Route path="models" element={<ModelManager />} />
            <Route path="knowledge" element={<KnowledgeBase />} />
            <Route path="interactions" element={<AIAssistant />} />
          </Route>
          
          {/* 业务应用中心路由 */}
          <Route path="applications" element={<ApplicationsRouter />}>
            <Route index element={<Navigate to="/applications/retail-marketing" replace />} />
            
            {/* 零售营销应用 */}
            <Route path="retail-marketing" element={<AppPages.RetailMarketingPage />}>
              <Route index element={<Navigate to="/applications/retail-marketing/precision" replace />} />
              <Route path="precision" element={<AppPages.PrecisionMarketing />} />
              <Route path="acquisition" element={<AppPages.CustomerAcquisition />} />
              <Route path="cross-selling" element={<AppPages.CrossSelling />} />
              <Route path="digital" element={<AppPages.DigitalMarketing />} />
            </Route>
            
            {/* 客户经营应用 */}
            <Route path="customer-management" element={<AppPages.CustomerManagementPage />}>
              <Route index element={<Navigate to="/applications/customer-management/churn" replace />} />
              <Route path="churn" element={<AppPages.ChurnPrevention />} />
              <Route path="value" element={<AppPages.ValueEnhancement />} />
              <Route path="lifecycle" element={<AppPages.LifecycleManagement />} />
              <Route path="loyalty" element={<AppPages.LoyaltyProgram />} />
            </Route>
            
            {/* 财富管理应用 */}
            <Route path="wealth-management" element={<AppPages.WealthManagementPage />} />
            
            {/* 风险管控应用 */}
            <Route path="risk-management" element={<AppPages.RiskManagementPage />} />
            
            {/* 对公业务应用 */}
            <Route path="corporate" element={<AppPages.CorporatePage />} />
            
            {/* 应用分类管理 */}
            <Route path="management" element={<AppPages.ApplicationManagementPage />} />
          </Route>
          
          {/* 场景模板路由 */}
          <Route path="templates" element={<TemplatesRouter />}>
            <Route index element={<Navigate to="/templates/library" replace />} />
            
            {/* 模板库 */}
            <Route path="library" element={<TemplatePages.TemplateLibraryPage />}>
              <Route index element={<Navigate to="/templates/library/retail" replace />} />
              <Route path="retail" element={<TemplatePages.RetailTemplate />} />
              <Route path="corporate" element={<TemplatePages.CorporateTemplate />} />
              <Route path="risk" element={<TemplatePages.RiskTemplate />} />
              <Route path="customer" element={<TemplatePages.CustomerTemplate />} />
            </Route>
            
            {/* 模板应用 */}
            <Route path="applications" element={<TemplatePages.TemplateApplicationsPage />}>
              <Route index element={<Navigate to="/templates/applications/mapping" replace />} />
              <Route path="mapping" element={<TemplatePages.TemplateMapping />} />
              <Route path="configuration" element={<TemplatePages.TemplateConfiguration />} />
              <Route path="monitoring" element={<TemplatePages.TemplateMonitoring />} />
            </Route>
            
            {/* 模板管理 */}
            <Route path="management" element={<TemplatePages.TemplateManagementPage />}>
              <Route index element={<Navigate to="/templates/management/create" replace />} />
              <Route path="create" element={<TemplatePages.TemplateCreation />} />
              <Route path="parameters" element={<TemplatePages.TemplateParameters />} />
              <Route path="versions" element={<TemplatePages.TemplateVersions />} />
              <Route path="evaluation" element={<TemplatePages.TemplateEvaluation />} />
            </Route>
          </Route>
          
          {/* 开放能力路由 */}
          <Route path="open-api" element={<OpenAPIRouter />}>
            <Route index element={<Navigate to="/open-api/services" replace />} />
            
            {/* API服务 */}
            <Route path="services" element={<OpenAPIPages.APIServicesPage />}>
              <Route index element={<Navigate to="/open-api/services/tags" replace />} />
              <Route path="tags" element={<OpenAPIPages.TagsAPI />} />
              <Route path="portraits" element={<OpenAPIPages.PortraitsAPI />} />
              <Route path="groups" element={<OpenAPIPages.GroupsAPI />} />
            </Route>
            
            {/* 数据服务 */}
            <Route path="data" element={<OpenAPIPages.DataServicesPage />}>
              <Route index element={<Navigate to="/open-api/data/catalog" replace />} />
              <Route path="catalog" element={<OpenAPIPages.DataCatalog />} />
              <Route path="subscription" element={<OpenAPIPages.DataSubscription />} />
              <Route path="push" element={<OpenAPIPages.DataPush />} />
            </Route>
            
            {/* 服务监控 */}
            <Route path="monitoring" element={<OpenAPIPages.MonitoringPage />}>
              <Route index element={<Navigate to="/open-api/monitoring/statistics" replace />} />
              <Route path="statistics" element={<OpenAPIPages.APIStatistics />} />
              <Route path="performance" element={<OpenAPIPages.PerformanceMonitoring />} />
              <Route path="alerts" element={<OpenAPIPages.AlertManagement />} />
            </Route>
          </Route>
          
          {/* 系统管理路由 */}
          <Route path="system" element={<SystemRouter />}>
            <Route index element={<Navigate to="/system/users" replace />} />
            <Route path="users" element={<UserPage />}>
              <Route index element={<div>用户管理首页</div>} />
              <Route path="organizations" element={<div>机构管理</div>} />
              <Route path="accounts" element={<div>用户管理</div>} />
              <Route path="roles" element={<div>角色管理</div>} />
              <Route path="workflows" element={<div>流程管理</div>} />
            </Route>
            <Route path="settings" element={<SettingsPage />}>
              <Route index element={<div>系统设置首页</div>} />
              <Route path="schedules" element={<div>调度任务</div>} />
              <Route path="parameters" element={<div>参数设置</div>} />
              <Route path="announcements" element={<div>公告管理</div>} />
            </Route>
            <Route path="ai/*" element={<div>大模型配置</div>} />
            <Route path="monitoring/*" element={<div>运行监控</div>} />
          </Route>
        </Route>
        
        {/* 404页面 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

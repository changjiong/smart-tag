import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 导入布局组件
import MainLayout from './components/Layout/MainLayout';

// 导入错误页面组件
import NotFound from './pages/Error/NotFound';

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
import PortraitAnalysis from './pages/PortraitAnalysis/PortraitAnalysis';
import CustomerPortrait from './pages/PortraitAnalysis/CustomerPortrait';
import GroupCharacteristics from './pages/PortraitAnalysis/GroupCharacteristics';
import PortraitComparison from './pages/PortraitAnalysis/PortraitComparison';
import TagDistribution from './pages/PortraitAnalysis/TagDistribution';

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
          </Route>
          
          {/* 标签中心路由 */}
          <Route path="tags" element={<TagsRouter />}>
            <Route index element={<Navigate to="/tags/market" replace />} />
            
            {/* 标签系统/标签体系 */}
            <Route path="market" element={<Market />} />
            <Route path="market/apply" element={<MarketApply />} />
            <Route path="market/detail" element={<MarketDetail />} />
            <Route path="library" element={<Library />} />
            <Route path="library/versions" element={<LibraryVersions />} />
            
            {/* 标签管理 */}
            <Route path="management">
              {/* 默认重定向到需求页面 */}
              <Route index element={<Navigate to="/tags/management/requirements" replace />} />
              
              {/* 标签需求 */}
              <Route path="requirements" element={<RequirementsIndex />}>
                <Route index element={<Navigate to="/tags/management/requirements/submit" replace />} />
                <Route path="submit" element={<RequirementsSubmit />} />
                <Route path="review" element={<RequirementsReview />} />
                <Route path="track" element={<RequirementsTrack />} />
              </Route>
              
              {/* 标签生成 */}
              <Route path="generation">
                <Route index element={<div>标签生成首页</div>} />
                <Route path="rules" element={<div>规则配置</div>} />
                <Route path="ai" element={<div>智能生成</div>} />
                <Route path="sql" element={<div>SQL编辑</div>} />
                <Route path="import" element={<div>批量导入</div>} />
              </Route>
              
              {/* 标签注册 */}
              <Route path="registration">
                <Route index element={<div>标签注册首页</div>} />
                <Route path="apply" element={<div>注册申请</div>} />
                <Route path="workflow" element={<div>注册流程</div>} />
                <Route path="review" element={<div>流程审批</div>} />
              </Route>
              
              {/* 标签维护 */}
              <Route path="maintenance">
                <Route index element={<div>标签维护首页</div>} />
                <Route path="info" element={<div>标签信息</div>} />
                <Route path="categories" element={<div>分类管理</div>} />
                <Route path="metadata" element={<div>元数据管理</div>} />
                <Route path="batch" element={<div>批量更新</div>} />
                <Route path="uninstall" element={<div>标签卸载</div>} />
              </Route>
            </Route>
            
            {/* 标签监控 */}
            <Route path="monitor">
              {/* 默认重定向到质量监控页面 */}
              <Route index element={<Navigate to="/tags/monitor/quality" replace />} />
              
              {/* 质量监控 */}
              <Route path="quality" element={<Quality />} />
              <Route path="quality/rules" element={<QualityRules />} />
              
              {/* 异常预警 */}
              <Route path="alerts" element={<Alerts />} />
              <Route path="alerts/rules" element={<AlertRules />} />
              
              {/* 标签健康 */}
              <Route path="health" element={<Health />} />
              <Route path="health/diagnostics" element={<HealthDiagnostics />} />
            </Route>
          </Route>
          
          {/* 个人资料路由 */}
          <Route path="profile" element={<Profile />} />
          
          {/* 客群分析路由 */}
          <Route path="portrait" element={<PortraitAnalysis />}>
            <Route index element={<Navigate to="/portrait/customer" replace />} />
            <Route path="customer" element={<CustomerPortrait />} />
            <Route path="group" element={<GroupCharacteristics />} />
            <Route path="comparison" element={<PortraitComparison />} />
            <Route path="distribution" element={<TagDistribution />} />
          </Route>
          
          {/* AI实验室路由 */}
          <Route path="ai-laboratory" element={<AILaboratory />}>
            <Route index element={<Navigate to="/ai-laboratory/models" replace />} />
            <Route path="models" element={<ModelManager />} />
            <Route path="knowledge" element={<KnowledgeBase />} />
            <Route path="interactions" element={<AIAssistant />} />
          </Route>
        </Route>
        
        {/* 404页面 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

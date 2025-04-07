/**
 * 组件映射文件
 * 集中管理所有路由组件的导入
 */

// 导入所有需要的组件
import MainLayout from '../components/Layout/MainLayout';
import Login from '../pages/Login/Login';
import NotFoundPage from '../components/ErrorPages/NotFoundPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import DataOverview from '../pages/Dashboard/DataOverview';
import TodoList from '../pages/Dashboard/TodoList';
import AIAssistant from '../pages/Dashboard/AIAssistant';

// 导入路由组件
import TagsRouter from '../pages/Tags/TagsRouter';
import PortraitRouter from '../pages/Portrait/PortraitRouter';
import SystemRouter from '../pages/System/SystemRouter';
import ApplicationsRouter from '../pages/Applications/ApplicationsRouter';
import TemplatesRouter from '../pages/Templates/TemplatesRouter';

// 导入其他组件
import Profile from '../pages/Profile/Profile';
import Tasks from '../pages/Dashboard/Workspace/Tasks';
import Insights from '../pages/Dashboard/Workspace/Insights';
import GuideWorkspace from '../pages/Dashboard/Workspace/Guide';
import Achievements from '../pages/Dashboard/Workspace/Achievements';

// 组件映射对象
export const componentMap = {
  // 布局组件
  mainLayout: MainLayout,
  
  // 认证相关
  login: Login,
  notFound: NotFoundPage,
  
  // 仪表盘
  dashboard: Dashboard,
  dataOverview: DataOverview,
  todoList: TodoList,
  aiAssistant: AIAssistant,
  
  // 路由组件
  tagsRouter: TagsRouter,
  portraitRouter: PortraitRouter,
  systemRouter: SystemRouter,
  applicationsRouter: ApplicationsRouter,
  templatesRouter: TemplatesRouter,
  
  // 工作台组件
  tasks: Tasks,
  insights: Insights,
  guideWorkspace: GuideWorkspace,
  achievements: Achievements,
  
  // 其他组件
  profile: Profile
};

// 辅助函数：根据组件名获取组件
export const getComponent = (componentName) => {
  const component = componentMap[componentName];
  if (!component) {
    console.warn(`Component "${componentName}" not found in componentMap`);
    return () => <div>Component not found: {componentName}</div>;
  }
  return component;
};

export default componentMap; 
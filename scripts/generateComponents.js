import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 基础组件模板
const componentTemplate = (componentName, title) => `import React from 'react';
import PageTemplate from '@/components/Common/PageTemplate';

/**
 * ${title}页面
 */
const ${componentName} = () => {
  return (
    <PageTemplate title="${title}">
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">页面开发中...</p>
      </div>
    </PageTemplate>
  );
};

export default ${componentName};
`;

// 路由组件模板
const routerTemplate = (componentName, title) => `import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * ${title}路由组件
 */
const ${componentName} = () => {
  return <Outlet />;
};

export default ${componentName};
`;

// 要生成的组件列表
const components = [
  // 仪表盘组件
  { path: 'Dashboard/Cockpit/Results', name: 'Results', title: '价值成果展示' },
  { path: 'Dashboard/Cockpit/Tasks', name: 'Tasks', title: '任务管理中心' },
  { path: 'Dashboard/Cockpit/Navigation', name: 'Navigation', title: '快速导航' },
  { path: 'Dashboard/Assistant/Conversation', name: 'Conversation', title: '对话分析' },
  { path: 'Dashboard/Assistant/QA', name: 'QA', title: '业务问题解答' },
  { path: 'Dashboard/Assistant/Analysis', name: 'Analysis', title: '智能解读' },
  { path: 'Dashboard/Assistant/Guide', name: 'Guide', title: '操作引导' },

  // 标签中心组件
  { path: 'Tags/Management/Market', name: 'Market', title: '标签超市' },
  { path: 'Tags/Management/Categories', name: 'Categories', title: '标签分类管理' },
  { path: 'Tags/Management/Info', name: 'Info', title: '标签信息管理' },
  { path: 'Tags/Management/Metadata', name: 'Metadata', title: '标签元数据管理' },
  { path: 'Tags/Management/Uninstall', name: 'Uninstall', title: '标签体系批量卸载' },
  { path: 'Tags/Management/BatchUpdate', name: 'BatchUpdate', title: '标签信息批量更新' },
  { path: 'Tags/Creation/Requirements', name: 'Requirements', title: '标签需求' },
  { path: 'Tags/Creation/Registration', name: 'Registration', title: '标签注册' },
  { path: 'Tags/Creation/Factory', name: 'Factory', title: '标签工厂' },
  { path: 'Tags/Creation/AI', name: 'AI', title: '智能标签生成' },
  { path: 'Tags/Quality/Dashboard', name: 'Dashboard', title: '标签质量看板' },
  { path: 'Tags/Quality/Alerts', name: 'Alerts', title: '异常预警' },
  { path: 'Tags/Quality/AlertConfig', name: 'AlertConfig', title: '预警配置' },
  { path: 'Tags/Quality/RuleAlerts', name: 'RuleAlerts', title: '规则预警' },
  { path: 'Tags/Quality/History', name: 'History', title: '任务与历史' },
  { path: 'Tags/Value/Insights', name: 'Insights', title: '标签价值洞察' },

  // 客群画像组件
  { path: 'Portrait/Groups/Create', name: 'Create', title: '客群创建' },
  { path: 'Portrait/Groups/AI', name: 'AI', title: '智能分群' },
  { path: 'Portrait/Analysis/Customer', name: 'Customer', title: '单客户视图' },
  { path: 'Portrait/Analysis/GroupInsights', name: 'GroupInsights', title: '群体洞察' },
  { path: 'Portrait/Analysis/GroupPortrait', name: 'GroupPortrait', title: '群体画像' },
  { path: 'Portrait/Analysis/Funnel', name: 'Funnel', title: '漏斗分析' },
  { path: 'Portrait/Analysis/Comparison', name: 'Comparison', title: '客群对比' },
  { path: 'Portrait/Analysis/YRFM', name: 'YRFM', title: 'YRFM分析' },

  // 业务场景组件
  { path: 'Applications/Business/PrecisionMarketing', name: 'PrecisionMarketing', title: '精准营销引擎' },
  { path: 'Applications/Business/RetentionAssistant', name: 'RetentionAssistant', title: '客户挽留助手' },
  { path: 'Applications/Business/WealthAdvisor', name: 'WealthAdvisor', title: '财富增值顾问' },
  { path: 'Applications/Business/RiskMonitor', name: 'RiskMonitor', title: '风险预警监控' },
  { path: 'Applications/Business/CorporatePortrait', name: 'CorporatePortrait', title: '企业客户画像' },

  // 系统管理组件
  { path: 'System/Users/Organizations', name: 'Organizations', title: '机构管理' },
  { path: 'System/Users/Accounts', name: 'Accounts', title: '用户管理' },
  { path: 'System/Users/Roles', name: 'Roles', title: '角色管理' },
  { path: 'System/Users/Workflows', name: 'Workflows', title: '流程管理' },
  { path: 'System/Settings/Schedules', name: 'Schedules', title: '调度任务' },
  { path: 'System/Settings/Parameters', name: 'Parameters', title: '参数设置' },
  { path: 'System/Settings/Announcements', name: 'Announcements', title: '公告管理' },
  { path: 'System/AI/Models', name: 'Models', title: '模型服务' },
  { path: 'System/AI/Prompts', name: 'Prompts', title: '提示词管理' },
  { path: 'System/AI/Knowledge', name: 'Knowledge', title: '知识库' },
  { path: 'System/Monitoring/Traffic', name: 'Traffic', title: '流量监控' },
  { path: 'System/Monitoring/Logs', name: 'Logs', title: '日志监控' },
  { path: 'System/Monitoring/Platform', name: 'Platform', title: '平台监控' },
  { path: 'System/OpenAPI/Services/Tags', name: 'Tags', title: '标签快递（API）' },
  { path: 'System/OpenAPI/DataOutput', name: 'DataOutput', title: '数据输出' }
];

// 路由组件列表
const routers = [
  { path: 'Tags/TagsRouter', name: 'TagsRouter', title: '标签中心' },
  { path: 'Portrait/PortraitRouter', name: 'PortraitRouter', title: '客群画像' },
  { path: 'System/SystemRouter', name: 'SystemRouter', title: '系统管理' },
  { path: 'Applications/ApplicationsRouter', name: 'ApplicationsRouter', title: '业务场景' },
  { path: 'Applications/Templates/TemplatesRouter', name: 'TemplatesRouter', title: '场景模板' }
];

// 创建目录
const createDirectory = (dirPath) => {
  const fullPath = path.join(path.dirname(__dirname), 'src/pages', dirPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
};

// 创建组件文件
const createComponentFile = (filePath, content) => {
  const fullPath = path.join(path.dirname(__dirname), 'src/pages', `${filePath}.jsx`);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
    console.log(`Created: ${fullPath}`);
  } else {
    console.log(`Skipped: ${fullPath} (already exists)`);
  }
};

// 生成组件
console.log('Generating components...');

// 生成路由组件
routers.forEach(({ path, name, title }) => {
  createDirectory(path.split('/').slice(0, -1).join('/'));
  createComponentFile(path, routerTemplate(name, title));
});

// 生成页面组件
components.forEach(({ path, name, title }) => {
  createDirectory(path.split('/').slice(0, -1).join('/'));
  createComponentFile(path, componentTemplate(name, title));
});

console.log('Component generation completed!'); 
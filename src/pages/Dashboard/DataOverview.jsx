import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 首页数据概览组件
 * 展示系统中关键数据指标和业务概况
 */
const DataOverview = () => {
  // 标签和客群概览数据
  const tagStats = {
    totalTags: 5837,
    activeTags: 4218,
    recentCreated: 127,
    coverage: 87,
  };

  const customerStats = {
    totalGroups: 894,
    activeGroups: 456,
    recentAnalysisCount: 72,
    applicationCount: 58,
  };

  // 最近更新的项目
  const recentUpdates = [
    {
      id: 1,
      title: '信用卡客群标签',
      type: '标签更新',
      date: '2023-10-28',
      status: '已完成',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 2,
      title: '零售客户流失预警模板',
      type: '模板创建',
      date: '2023-10-27',
      status: '审核中',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 3,
      title: '高端客户价值提升应用',
      type: '应用上线',
      date: '2023-10-25',
      status: '已上线',
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 4,
      title: '企业客户关系图谱',
      type: '功能优化',
      date: '2023-10-23',
      status: '开发中',
      statusColor: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <div className="data-overview animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">数据概览</h1>
        <p className="text-gray-600">欢迎回来，以下是平台最新数据概况</p>
      </div>

      {/* 统计卡片区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 标签统计 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">标签体系概览</h2>
            <Link to="/tags" className="text-sm text-blue-600 hover:text-blue-800">
              查看详情
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 mb-1">标签总数</p>
              <p className="text-2xl font-bold text-blue-900">{tagStats.totalTags}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800 mb-1">活跃标签</p>
              <p className="text-2xl font-bold text-green-900">{tagStats.activeTags}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-indigo-800 mb-1">近期新增</p>
              <p className="text-2xl font-bold text-indigo-900">{tagStats.recentCreated}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-800 mb-1">覆盖率</p>
              <p className="text-2xl font-bold text-purple-900">{tagStats.coverage}%</p>
            </div>
          </div>
        </div>

        {/* 客群统计 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">客群分析概览</h2>
            <Link to="/portrait" className="text-sm text-blue-600 hover:text-blue-800">
              查看详情
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-teal-800 mb-1">客群总数</p>
              <p className="text-2xl font-bold text-teal-900">{customerStats.totalGroups}</p>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg">
              <p className="text-sm text-cyan-800 mb-1">活跃客群</p>
              <p className="text-2xl font-bold text-cyan-900">{customerStats.activeGroups}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-800 mb-1">近期分析</p>
              <p className="text-2xl font-bold text-amber-900">{customerStats.recentAnalysisCount}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-sm text-emerald-800 mb-1">应用引用</p>
              <p className="text-2xl font-bold text-emerald-900">{customerStats.applicationCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 最近更新和快捷入口 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 最近更新 */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">最近更新</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              查看全部
            </button>
          </div>
          
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    项目
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    类型
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日期
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentUpdates.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.type}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 快捷入口 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">快捷入口</h2>
          
          <div className="space-y-3">
            <Link 
              to="/tags/management/requirements/submit" 
              className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">创建标签需求</h3>
                <p className="text-xs text-gray-500">提交新的标签创建申请</p>
              </div>
            </Link>
            
            <Link 
              to="/portrait/customer" 
              className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">客户画像分析</h3>
                <p className="text-xs text-gray-500">查看单客户详细画像</p>
              </div>
            </Link>
            
            <Link 
              to="/tags/market" 
              className="flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">标签超市</h3>
                <p className="text-xs text-gray-500">浏览和选择可用标签</p>
              </div>
            </Link>
            
            <Link 
              to="/dashboard/assistant/qa" 
              className="flex items-center p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">智能助手</h3>
                <p className="text-xs text-gray-500">AI辅助分析和问答</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataOverview;
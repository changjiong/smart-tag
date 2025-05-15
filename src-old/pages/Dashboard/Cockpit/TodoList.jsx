import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

/**
 * 待办事项列表组件
 * 支持任务管理、分类、优先级排序和状态跟踪
 */
const TodoList = () => {
  // 任务优先级选项
  const priorities = [
    { value: 'high', label: '高', color: 'bg-red-100 text-red-800' },
    { value: 'medium', label: '中', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'low', label: '低', color: 'bg-green-100 text-green-800' },
  ];

  // 任务类型选项
  const taskTypes = [
    { value: 'all', label: '全部' },
    { value: 'tag', label: '标签管理' },
    { value: 'group', label: '客群分析' },
    { value: 'application', label: '业务应用' },
    { value: 'system', label: '系统任务' },
  ];

  // 过滤状态
  const [selectedType, setSelectedType] = useState('all');
  const [showCompleted, setShowCompleted] = useState(false);
  
  // 示例任务列表
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: '信用卡消费客群标签审核',
      description: '审核新提交的信用卡消费行为标签，确认数据质量和逻辑准确性',
      dueDate: '2023-10-30',
      priority: 'high',
      type: 'tag',
      completed: false,
      assignedTo: '张明',
    },
    {
      id: 2,
      title: '零售客户流失预警模型更新',
      description: '根据新增数据更新零售客户流失预警模型，提高预测准确率',
      dueDate: '2023-11-05',
      priority: 'medium',
      type: 'application',
      completed: false,
      assignedTo: '李华',
    },
    {
      id: 3,
      title: '客群画像分析报告生成',
      description: '为高管会议准备重点客群画像分析报告，包含增长趋势和行为特征',
      dueDate: '2023-10-29',
      priority: 'high',
      type: 'group',
      completed: false,
      assignedTo: '王强',
    },
    {
      id: 4,
      title: '系统性能优化',
      description: '优化客群查询和标签计算性能，缩短响应时间',
      dueDate: '2023-11-10',
      priority: 'low',
      type: 'system',
      completed: false,
      assignedTo: '刘伟',
    },
    {
      id: 5,
      title: '新员工标签系统培训',
      description: '为新入职数据分析师提供标签系统使用培训',
      dueDate: '2023-10-27',
      priority: 'medium',
      type: 'system',
      completed: true,
      assignedTo: '张明',
    },
  ]);

  // 任务完成状态切换
  const toggleTaskCompletion = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 过滤任务
  const filteredTasks = tasks.filter(task => {
    if (!showCompleted && task.completed) return false;
    if (selectedType !== 'all' && task.type !== selectedType) return false;
    return true;
  });

  // 获取优先级样式
  const getPriorityStyle = (priority) => {
    return priorities.find(p => p.value === priority)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="todo-list-container animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">待办任务</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            添加任务
          </button>
        </div>
        <p className="text-gray-600">管理您的标签、客群和应用任务，跟踪进度和优先级</p>
      </div>

      {/* 过滤器区域 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label htmlFor="taskType" className="block text-sm font-medium text-gray-700 mb-1">
              任务类型
            </label>
            <select
              id="taskType"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {taskTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center ml-4">
            <input
              id="showCompleted"
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showCompleted" className="ml-2 block text-sm text-gray-700">
              显示已完成任务
            </label>
          </div>
          
          <div className="ml-auto text-sm text-gray-600">
            共 {tasks.length} 个任务，{tasks.filter(task => !task.completed).length} 个待完成
          </div>
        </div>
      </div>

      {/* 任务列表 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className={clsx(
                "p-6 hover:bg-gray-50 transition-colors",
                task.completed && "bg-gray-50"
              )}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className={clsx(
                    "ml-3 flex-1",
                    task.completed && "text-gray-500"
                  )}>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className={clsx(
                        "text-base font-semibold",
                        task.completed && "line-through text-gray-400"
                      )}>
                        {task.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={clsx(
                          "px-2 py-1 text-xs rounded-full",
                          getPriorityStyle(task.priority)
                        )}>
                          {priorities.find(p => p.value === task.priority)?.label || '未知'}
                        </span>
                        <span className="text-xs text-gray-500">
                          截止: {task.dueDate}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-gray-500">
                          负责人: {task.assignedTo}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {taskTypes.find(t => t.value === task.type)?.label || '其他'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          编辑
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          删除
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">没有找到任务</h3>
              <p className="mt-1 text-sm text-gray-500">
                尝试调整过滤条件或创建新任务。
              </p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  添加任务
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
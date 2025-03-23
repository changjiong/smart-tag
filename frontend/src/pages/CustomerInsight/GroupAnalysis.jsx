import React, { useState } from 'react';
import clsx from 'clsx';

/**
 * 客群画像分析组件
 * 展示客群的统计信息、人口特征、行为特征和价值分布
 */
const GroupAnalysis = () => {
  // 示例客群数据
  const [selectedGroup, setSelectedGroup] = useState({
    id: 1,
    name: '银行APP高活跃青年客群',
    description: '30岁以下在过去3个月内银行APP登录次数大于20次的客户',
    createdAt: '2023-10-15',
    creator: '数据分析部 - 李华',
    lastUpdated: '2023-10-25',
    customerCount: 28547,
    percentOfTotal: '12.8%',
    tags: [
      { id: 1, name: '年龄30岁以下', category: '人口特征' },
      { id: 2, name: '银行APP高活跃', category: '渠道偏好' },
      { id: 3, name: '近3月活跃', category: '活跃度' }
    ]
  });

  // 人口特征数据
  const demographicData = [
    { name: '性别分布', data: [
      { label: '男性', value: 52, color: 'bg-blue-500' },
      { label: '女性', value: 48, color: 'bg-pink-500' }
    ]},
    { name: '年龄分布', data: [
      { label: '18-22岁', value: 35, color: 'bg-purple-500' },
      { label: '23-26岁', value: 42, color: 'bg-indigo-500' },
      { label: '27-30岁', value: 23, color: 'bg-violet-500' }
    ]},
    { name: '学历分布', data: [
      { label: '高中及以下', value: 15, color: 'bg-yellow-500' },
      { label: '大专', value: 25, color: 'bg-orange-500' },
      { label: '本科', value: 48, color: 'bg-red-500' },
      { label: '硕士及以上', value: 12, color: 'bg-pink-600' }
    ]},
    { name: '职业分布', data: [
      { label: '学生', value: 22, color: 'bg-emerald-500' },
      { label: '上班族', value: 45, color: 'bg-sky-500' },
      { label: '自由职业', value: 18, color: 'bg-cyan-500' },
      { label: '创业者', value: 10, color: 'bg-indigo-500' },
      { label: '其他', value: 5, color: 'bg-slate-500' }
    ]}
  ];

  // 行为特征数据
  const behaviorData = [
    { name: '产品持有情况', data: [
      { label: '借记卡', value: 98, color: 'bg-blue-500' },
      { label: '信用卡', value: 65, color: 'bg-purple-500' },
      { label: '理财产品', value: 42, color: 'bg-amber-500' },
      { label: '定期存款', value: 28, color: 'bg-emerald-500' },
      { label: '基金', value: 35, color: 'bg-pink-500' },
      { label: '保险', value: 22, color: 'bg-indigo-500' }
    ]},
    { name: '渠道使用偏好', data: [
      { label: '手机银行', value: 100, color: 'bg-blue-500' },
      { label: '微信银行', value: 78, color: 'bg-green-500' },
      { label: '网上银行', value: 45, color: 'bg-orange-500' },
      { label: '线下网点', value: 25, color: 'bg-red-500' },
      { label: '电话银行', value: 18, color: 'bg-purple-500' }
    ]},
    { name: '登录时段分布', data: [
      { label: '早上(6-9点)', value: 15, color: 'bg-amber-500' },
      { label: '上午(9-12点)', value: 22, color: 'bg-orange-500' },
      { label: '中午(12-14点)', value: 18, color: 'bg-red-500' },
      { label: '下午(14-18点)', value: 20, color: 'bg-pink-500' },
      { label: '晚上(18-22点)', value: 38, color: 'bg-purple-500' },
      { label: '深夜(22-6点)', value: 7, color: 'bg-indigo-500' }
    ]}
  ];

  // 客群价值分析
  const valueAnalysis = {
    averageAUM: '48,356.72',
    averageMonthlyIncome: '12,458.35',
    averageCreditLimit: '35,000.00',
    averageMonthlySpending: '6,827.45',
    profitContribution: '高',
    growthPotential: '非常高',
    loyaltyIndex: '中高',
    churnRisk: '低',
    crossSellOpportunity: '高'
  };

  // AI洞察
  const aiInsights = [
    {
      id: 1,
      title: '消费行为特征',
      content: '该客群在餐饮、娱乐和网购领域消费活跃，平均每月在电商平台消费占总支出的38%，比普通客群高出12个百分点。周末消费显著高于工作日，夜间消费占比高。',
      tags: ['消费行为', '电商偏好', '夜间经济']
    },
    {
      id: 2,
      title: '投资偏好分析',
      content: '该客群对中低风险理财产品有明显偏好，平均持有2.3个投资产品，其中基金占比最高。相比同龄群体，该群体投资意识较强，但风险承受能力较为保守。',
      tags: ['投资行为', '风险偏好', '资产配置']
    },
    {
      id: 3,
      title: '潜在营销机会',
      content: '基于消费模式和收入水平分析，该客群对信用卡权益类产品和数字化金融服务接受度高，特别是与生活方式相关的联名信用卡和积分兑换服务有较大营销潜力。',
      tags: ['营销机会', '产品偏好', '数字服务']
    }
  ];

  // 渲染水平条形图
  const renderBarChart = (data) => {
    return data.map((item, index) => (
      <div key={item.label} className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-700">{item.label}</span>
          <span className="text-sm font-medium text-gray-900">{item.value}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`${item.color} h-2.5 rounded-full`}
            style={{ width: `${item.value}%` }}
          ></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="customer-group-analysis animate-fade-in">
      {/* 客群基本信息 */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{selectedGroup.name}</h1>
            <p className="text-gray-600 mt-1 mb-4">{selectedGroup.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedGroup.tags.map(tag => (
                <span key={tag.id} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm text-gray-500 mb-1">
              创建于 {selectedGroup.createdAt} 由 {selectedGroup.creator}
            </div>
            <div className="text-sm text-gray-500 mb-3">
              最后更新: {selectedGroup.lastUpdated}
            </div>
            <div className="flex space-x-4">
              <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                导出报告
              </button>
              <button className="text-sm px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                创建营销活动
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 客群统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">客群规模</h3>
          <div className="text-3xl font-bold text-blue-600">{selectedGroup.customerCount.toLocaleString()}</div>
          <div className="mt-1 text-sm text-gray-600">占总客户 {selectedGroup.percentOfTotal}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">平均资产(元)</h3>
          <div className="text-3xl font-bold text-green-600">{valueAnalysis.averageAUM}</div>
          <div className="mt-1 text-sm text-gray-600">较全行均值高12.5%</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">产品持有(个)</h3>
          <div className="text-3xl font-bold text-purple-600">3.2</div>
          <div className="mt-1 text-sm text-gray-600">较上月增加0.3个</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">月均交易(笔)</h3>
          <div className="text-3xl font-bold text-orange-600">14.8</div>
          <div className="mt-1 text-sm text-gray-600">较同年龄段高32%</div>
        </div>
      </div>

      {/* 特征分析内容 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* 人口特征分析 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">人口特征分析</h2>
            <p className="mt-1 text-sm text-gray-500">客群的人口统计学特征分布</p>
          </div>
          <div className="p-6">
            {demographicData.map((section, index) => (
              <div key={section.name} className={index < demographicData.length - 1 ? 'mb-8' : ''}>
                <h3 className="text-sm font-medium text-gray-900 mb-4">{section.name}</h3>
                {renderBarChart(section.data)}
              </div>
            ))}
          </div>
        </div>

        {/* 行为特征分析 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">行为特征分析</h2>
            <p className="mt-1 text-sm text-gray-500">客群的产品使用和渠道行为特征</p>
          </div>
          <div className="p-6">
            {behaviorData.map((section, index) => (
              <div key={section.name} className={index < behaviorData.length - 1 ? 'mb-8' : ''}>
                <h3 className="text-sm font-medium text-gray-900 mb-4">{section.name}</h3>
                {renderBarChart(section.data)}
              </div>
            ))}
          </div>
        </div>

        {/* 价值分析 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">价值分析</h2>
            <p className="mt-1 text-sm text-gray-500">客群的财务价值和业务潜力</p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">财务指标</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">平均资产</span>
                  <span className="font-medium">{valueAnalysis.averageAUM}元</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">月均收入</span>
                  <span className="font-medium">{valueAnalysis.averageMonthlyIncome}元</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">信用额度</span>
                  <span className="font-medium">{valueAnalysis.averageCreditLimit}元</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">月均消费</span>
                  <span className="font-medium">{valueAnalysis.averageMonthlySpending}元</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">业务评估</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">利润贡献</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{valueAnalysis.profitContribution}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">成长潜力</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">{valueAnalysis.growthPotential}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">忠诚度</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{valueAnalysis.loyaltyIndex}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">流失风险</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{valueAnalysis.churnRisk}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">交叉销售</span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">{valueAnalysis.crossSellOpportunity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI智能洞察 */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <h2 className="text-lg font-medium text-gray-900">AI智能洞察</h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">基于大模型分析的客群深度洞察</p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {aiInsights.map(insight => (
              <div key={insight.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="text-md font-medium text-gray-900 mb-2">{insight.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{insight.content}</p>
                <div className="flex flex-wrap gap-2">
                  {insight.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button className="flex items-center text-sm text-purple-600 hover:text-purple-800">
              <span>查看更多AI洞察</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 营销建议 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
            </svg>
            <h2 className="text-lg font-medium text-gray-900">智能营销建议</h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">针对该客群的个性化营销策略建议</p>
        </div>
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <svg className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <div>
                <h3 className="text-md font-medium text-blue-800 mb-1">主要营销机会</h3>
                <p className="text-sm text-blue-700">
                  该客群对数字化金融服务接受度高，对联名信用卡和移动支付有较强需求，建议通过APP推送个性化信用卡权益和数字金融服务产品。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">生活方式联名信用卡推广</h4>
                <p className="text-sm text-gray-600">针对该客群的消费特点，推广餐饮、娱乐场景的联名信用卡产品，突出夜间和周末的消费权益。</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">数字化投资产品包装</h4>
                <p className="text-sm text-gray-600">提供低风险、灵活、数字化的投资产品组合，通过APP进行个性化展示，强调资金灵活性和便捷操作。</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">场景化服务推送</h4>
                <p className="text-sm text-gray-600">根据客群的活跃时段和行为模式，在晚间和周末推送个性化的场景服务，如娱乐消费返现、餐饮优惠等。</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">社交化会员活动</h4>
                <p className="text-sm text-gray-600">设计适合年轻群体的社交化会员活动，如线上积分挑战、社交媒体互动任务，提高客户粘性和活跃度。</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              创建针对性营销活动
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupAnalysis; 
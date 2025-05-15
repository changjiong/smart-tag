import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { aiRecommendations } from '../../mockData/marketing';
import { tagDistributionData } from '../../mockData/tags';
import { customerGroups } from '../../mockData/groups';

/**
 * 智能助手页面组件
 * 提供AI驱动的数据分析、问答和洞察功能
 */
const AIAssistantPage = () => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState([]);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [question, setQuestion] = useState('');
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('智能问答');
  const [pageDescription, setPageDescription] = useState('基于AI的智能问答系统，为您提供专业的标签分析和使用建议');
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      message: '您好，我是数智标签系统的AI助手。我可以帮助您分析客户数据、提供营销建议以及解答有关系统功能的问题。请问有什么可以帮您的？'
    }
  ]);

  // 根据当前路由设置页面标题和描述
  useEffect(() => {
    if (location.pathname.includes('/conversation')) {
      setPageTitle('对话分析');
      setPageDescription('通过自然语言对话方式进行深度数据分析和洞察');
    } else if (location.pathname.includes('/qa')) {
      setPageTitle('业务问题解答');
      setPageDescription('快速解答业务相关问题，提供准确的信息和建议');
    } else if (location.pathname.includes('/analysis')) {
      setPageTitle('智能解读');
      setPageDescription('AI自动解读数据趋势和业务现象，提供专业解释');
    } else if (location.pathname.includes('/guide')) {
      setPageTitle('操作引导');
      setPageDescription('提供智能化的系统操作指导和使用帮助');
    } else {
      setPageTitle('智能问答');
      setPageDescription('基于AI的智能问答系统，为您提供专业的标签分析和使用建议');
    }
  }, [location]);

  // 模拟洞察和推荐
  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setInsights([
        {
          id: 1,
          title: '客群机会识别',
          description: '识别到一个高价值潜在客户群体',
          type: 'customer_group',
          confidence: 0.92,
          content: '我们分析了您的高净值客户数据，发现其中有一个潜在的细分群体具有较高的财富增长率。这个群体主要由35-45岁的企业主组成，他们在过去6个月内的资产增长率高于平均水平25%。建议针对这个群体开展专项理财咨询服务。',
          actionText: '创建新客群',
          actionLink: '/portrait/groups/create',
          data: {
            groupName: '高增长企业主',
            count: 238,
            avgAssets: '¥3,250,000',
            growthRate: '25%'
          }
        },
        {
          id: 2,
          title: '标签优化建议',
          description: '发现部分标签数据质量问题',
          type: 'tag_quality',
          confidence: 0.87,
          content: '系统检测到"投资偏好"标签分类中数据完整率低于85%，影响了客户画像的准确性。主要问题是近3个月内新增的约500名客户缺少该分类标签。建议通过交易数据分析和问卷调查补充这部分数据。',
          actionText: '查看标签详情',
          actionLink: '/tags/management',
          data: {
            tagCategory: '投资偏好',
            completionRate: '82%',
            affectedCustomers: 512,
            impact: '中等'
          }
        },
        {
          id: 3,
          title: '营销活动优化',
          description: '当前活动流失客户召回机会',
          type: 'marketing_campaign',
          confidence: 0.89,
          content: '近期的"财富管理季"活动数据分析显示，有一批曾经活跃但近6个月无交易的客户对投资类产品表现出较高兴趣（打开率高于平均值35%）。建议针对这批客户设计专属的"回归礼遇"活动，提供专属投资咨询和优惠权益。',
          actionText: '创建营销活动',
          actionLink: '/applications/marketing',
          data: {
            campaignName: '客户召回计划',
            interestedClients: 156,
            conversionPotential: '中高',
            estimatedValue: '¥4,680,000'
          }
        },
        {
          id: 4,
          title: '模型升级建议',
          description: '客户流失预测模型可提升',
          type: 'model_optimization',
          confidence: 0.81,
          content: '当前的客户流失预测模型准确率为82%，通过引入"服务体验"和"产品匹配度"两个新特征，准确率可提升至89%。这将帮助您提前3-4周识别出有流失风险的客户，为主动挽留提供更充足的时间窗口。',
          actionText: '查看模型详情',
          actionLink: '/system/ai/models',
          data: {
            modelName: '客户流失预测V2.1',
            currentAccuracy: '82%',
            potentialAccuracy: '89%',
            newFeatures: ['服务体验评分', '产品匹配度']
          }
        }
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // 处理发送问题
  const handleSendQuestion = () => {
    if (!question.trim()) return;

    // 添加用户问题到对话
    setConversation(prev => [
      ...prev,
      { role: 'user', message: question }
    ]);

    // 模拟AI回答的延迟
    setTimeout(() => {
      let answer = '';
      
      // 简单的关键词匹配来生成回答
      if (question.includes('标签') || question.includes('分类')) {
        answer = `标签系统当前有${tagDistributionData.reduce((sum, item) => sum + item.value, 0)}个标签，其中使用最多的是"${tagDistributionData[0].type}"类标签，占比${tagDistributionData[0].percentage}%。您可以在标签管理中心查看更详细的分类和使用情况。`;
      } else if (question.includes('客群') || question.includes('群体')) {
        const groupCount = customerGroups.length;
        answer = `系统中已定义${groupCount}个客群，最大的客群是"${customerGroups[0].name}"，包含${customerGroups[0].count.toLocaleString()}名客户。您可以在客群画像中心查看更多详情。`;
      } else if (question.includes('营销') || question.includes('活动')) {
        answer = `最近的营销分析显示，针对"${aiRecommendations[0].targetGroup}"客群的活动效果最好，推荐产品包括${aiRecommendations[0].topProducts.join('、')}。您可以在营销中心查看完整的活动数据和建议。`;
      } else if (question.includes('如何') || question.includes('怎么')) {
        answer = `关于"${question}"，您可以访问系统帮助中心获取详细的操作指南。此外，我也可以在聊天中为您提供逐步的操作指导，您需要具体的哪个功能的使用方法？`;
      } else {
        answer = `您的问题很有价值。基于我的分析，这涉及到数据的深度洞察。建议您访问相关业务模块获取更详细的分析报告，或者可以重新描述您的问题，让我能更准确地提供帮助。`;
      }

      // 添加AI回答到对话
      setConversation(prev => [
        ...prev,
        { role: 'assistant', message: answer }
      ]);
    }, 1000);

    // 清空输入框
    setQuestion('');
  };

  // 处理洞察卡片点击
  const handleInsightClick = (insight) => {
    setSelectedInsight(insight);
  };

  return (
    <div className="ai-assistant-container p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="text-gray-600">{pageDescription}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 对话区域 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">智能对话</h2>
            </div>
            
            <div className="p-6 h-96 overflow-y-auto">
              {conversation.map((item, index) => (
                <div key={index} className={`mb-4 ${item.role === 'user' ? 'text-right' : ''}`}>
                  <div 
                    className={`inline-block p-3 rounded-lg ${
                      item.role === 'user' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.message}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
                  placeholder="输入您的问题..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  发送
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                提示: 您可以询问关于标签使用、客群分析、营销建议等问题
              </div>
            </div>
          </div>
        </div>

        {/* 智能洞察区域 */}
        <div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">智能洞察</h2>
            </div>
            
            <div className="p-4">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <div className="space-y-3">
                  {insights.map((insight) => (
                    <div 
                      key={insight.id}
                      onClick={() => handleInsightClick(insight)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedInsight?.id === insight.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900">{insight.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          insight.confidence > 0.9
                            ? 'bg-green-100 text-green-800'
                            : insight.confidence > 0.8
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          置信度: {(insight.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{insight.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 选中的洞察详情 */}
      {selectedInsight && (
        <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">{selectedInsight.title} - 详细分析</h2>
              <span className={`text-xs px-2 py-1 rounded ${
                selectedInsight.type === 'customer_group'
                  ? 'bg-purple-100 text-purple-800'
                  : selectedInsight.type === 'tag_quality'
                    ? 'bg-yellow-100 text-yellow-800'
                    : selectedInsight.type === 'marketing_campaign'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
              }`}>
                {
                  selectedInsight.type === 'customer_group'
                    ? '客群分析'
                    : selectedInsight.type === 'tag_quality'
                      ? '标签质量'
                      : selectedInsight.type === 'marketing_campaign'
                        ? '营销建议'
                        : '模型优化'
                }
              </span>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-700">{selectedInsight.content}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(selectedInsight.data).map(([key, value], index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <p className="text-xs text-gray-500">{
                    key === 'groupName' ? '客群名称' :
                    key === 'count' ? '客户数量' :
                    key === 'avgAssets' ? '平均资产' :
                    key === 'growthRate' ? '增长率' :
                    key === 'tagCategory' ? '标签类别' :
                    key === 'completionRate' ? '完成率' :
                    key === 'affectedCustomers' ? '影响客户数' :
                    key === 'impact' ? '影响程度' :
                    key === 'campaignName' ? '活动名称' :
                    key === 'interestedClients' ? '意向客户数' :
                    key === 'conversionPotential' ? '转化潜力' :
                    key === 'estimatedValue' ? '预估价值' :
                    key === 'modelName' ? '模型名称' :
                    key === 'currentAccuracy' ? '当前准确率' :
                    key === 'potentialAccuracy' ? '潜在准确率' :
                    key === 'newFeatures' ? '新特征' :
                    key
                  }</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Link 
                to={selectedInsight.actionLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {selectedInsight.actionText}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 相关推荐 */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">相关推荐</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiRecommendations.slice(0, 3).map((recommendation, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <h3 className="font-medium text-gray-900">{recommendation.targetGroup}</h3>
                <div className="mt-3 space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">推荐产品</span>
                    <p className="text-sm">{recommendation.topProducts.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">最佳渠道</span>
                    <p className="text-sm">{recommendation.bestChannels.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">沟通建议</span>
                    <p className="text-sm">{recommendation.messagingTips}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-1">潜在ROI:</span>
                    <span className="text-sm font-medium text-green-600">{recommendation.potentialROI}x</span>
                  </div>
                  <Link to="/applications/marketing" className="text-blue-600 hover:text-blue-800 text-sm">
                    应用推荐
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;

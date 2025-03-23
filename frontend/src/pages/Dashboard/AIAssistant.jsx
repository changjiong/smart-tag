import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { aiRecommendations } from '../../mockData/marketing';
import { tagDistributionData } from '../../mockData/tags';
import { customerGroups } from '../../mockData/groups';

/**
 * AIAssistant component for the dashboard that provides AI-powered recommendations 
 * and assistance based on user data and system usage patterns
 */
function AIAssistant() {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState([]);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([
    {
      role: 'assistant',
      message: '您好，我是数智标签系统的AI助手。我可以帮助您分析客户数据、提供营销建议以及解答有关系统功能的问题。请问有什么可以帮您的？'
    }
  ]);

  // Mock insights and recommendations
  useEffect(() => {
    // Simulate loading data
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
          actionLink: '/groups/create',
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
          type: 'marketing',
          confidence: 0.89,
          content: '基于对"年终理财产品推广"活动的分析，AI发现有327名目标客户在收到推广信息后访问了产品页面，但未最终购买。这部分客户对产品有兴趣但可能存在疑虑。建议针对这部分客户开展针对性跟进，解答其可能的疑问。',
          actionText: '查看营销活动',
          actionLink: '/marketing/campaigns',
          data: {
            campaignName: '年终理财产品推广',
            interestedClients: 327,
            conversionPotential: '高',
            estimatedValue: '¥9,810,000'
          }
        },
        {
          id: 4,
          title: 'AI模型性能提升',
          description: '客户流失预测模型可更新',
          type: 'ai_model',
          confidence: 0.94,
          content: '客户流失预测模型可以通过整合最近3个月的新数据进行更新，预计可将预测准确率从当前的83%提升到87%。新数据显示客户活跃度和产品持有多样性是流失预测的重要新指标。',
          actionText: '更新AI模型',
          actionLink: '/ai/models',
          data: {
            modelName: '客户流失预测',
            currentAccuracy: '83%',
            potentialAccuracy: '87%',
            newFeatures: ['客户活跃度', '产品持有多样性']
          }
        }
      ]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle sending a question to AI assistant
  const handleSendQuestion = () => {
    if (question.trim() === '') return;
    
    // Add user's question to conversation
    setConversation([
      ...conversation,
      {
        role: 'user',
        message: question
      }
    ]);
    
    // Clear input field
    setQuestion('');
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      let responseMessage = '';
      
      // Simple pattern matching to simulate AI responses
      const lowerQuestion = question.toLowerCase();
      
      if (lowerQuestion.includes('标签') && lowerQuestion.includes('创建')) {
        responseMessage = '创建标签时，您需要定义标签名称、数据来源、更新周期和计算逻辑。您可以在"标签管理"模块中完成创建。具体步骤：1. 进入标签管理 2. 点击"新建标签" 3. 填写标签信息 4. 定义计算规则 5. 提交审批。需要帮您导航到标签创建页面吗？';
      } else if (lowerQuestion.includes('客群') && (lowerQuestion.includes('如何') || lowerQuestion.includes('怎么'))) {
        responseMessage = '创建客群时，您可以使用预置的标签条件组合，也可以自定义筛选条件。系统支持多层条件嵌套和逻辑运算。建议先明确客群目标和特征，再进行条件设置。需要我为您展示一个客群创建的示例吗？';
      } else if (lowerQuestion.includes('营销') && lowerQuestion.includes('效果')) {
        responseMessage = '根据系统数据，当前最有效的营销活动是"信用卡消费返现"，响应率达26%，ROI为2.8。最有效的营销渠道是专属客户经理(响应率45.2%)和微信(响应率15.2%)。建议结合这些渠道针对高价值客户开展精准营销活动。';
      } else if (lowerQuestion.includes('ai') || lowerQuestion.includes('人工智能')) {
        responseMessage = '本系统集成了多个AI能力，包括客户分群推荐、标签自动生成、营销效果预测和客户流失预警等。您可以在AI实验室中查看和管理这些模型，也可以通过知识库扩展AI的行业知识。是否需要我为您展示某个具体AI功能的详情？';
      } else {
        responseMessage = '感谢您的提问。基于您的问题，我建议您可以查看系统的相关模块获取更详细的信息。您也可以尝试更具体地描述您的需求，我会尽力提供准确的帮助。';
      }
      
      // Add AI response to conversation
      setConversation(prev => [
        ...prev,
        {
          role: 'assistant',
          message: responseMessage
        }
      ]);
    }, 1000);
  };

  // Handle insight card click
  const handleInsightClick = (insight) => {
    setSelectedInsight(insight);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">智能问答</h1>
          <p className="mt-1 text-sm text-gray-500">基于AI的智能问答系统，为您提供专业的标签分析和使用建议</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Chat Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow flex flex-col h-[600px]">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">智能助手</h2>
                  <p className="text-sm text-gray-500">我可以回答问题并提供相关建议</p>
                </div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {conversation.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-4 ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="输入您的问题..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSendQuestion();
                  }}
                />
                <button
                  onClick={handleSendQuestion}
                  disabled={question.trim() === ''}
                  className={`px-4 py-2 rounded-lg ${
                    question.trim() === '' 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  发送
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                提示：您可以询问有关标签创建、客群分析、营销策略等问题
              </p>
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow flex flex-col h-[600px]">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">AI洞察</h2>
              <p className="text-sm text-gray-500">系统基于您的数据生成的洞察</p>
            </div>
            
            {/* Insights List */}
            <div className="flex-1 p-4 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div
                      key={insight.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedInsight?.id === insight.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                      onClick={() => handleInsightClick(insight)}
                    >
                      <div className="flex items-start">
                        <div 
                          className={`p-2 rounded-md mr-3 flex-shrink-0 ${
                            insight.type === 'customer_group' ? 'bg-green-100 text-green-600' :
                            insight.type === 'tag_quality' ? 'bg-blue-100 text-blue-600' :
                            insight.type === 'marketing' ? 'bg-amber-100 text-amber-600' :
                            'bg-purple-100 text-purple-600'
                          }`}
                        >
                          {insight.type === 'customer_group' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                          )}
                          {insight.type === 'tag_quality' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                            </svg>
                          )}
                          {insight.type === 'marketing' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                            </svg>
                          )}
                          {insight.type === 'ai_model' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{insight.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-xs text-gray-500">可信度:</span>
                            <div className="ml-2 bg-gray-200 rounded-full h-1.5 w-24">
                              <div 
                                className="bg-green-500 h-1.5 rounded-full" 
                                style={{ width: `${insight.confidence * 100}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs text-gray-500">{Math.round(insight.confidence * 100)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Insight Detail */}
      {selectedInsight && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div 
                className={`p-2 rounded-md mr-3 ${
                  selectedInsight.type === 'customer_group' ? 'bg-green-100 text-green-600' :
                  selectedInsight.type === 'tag_quality' ? 'bg-blue-100 text-blue-600' :
                  selectedInsight.type === 'marketing' ? 'bg-amber-100 text-amber-600' :
                  'bg-purple-100 text-purple-600'
                }`}
              >
                {selectedInsight.type === 'customer_group' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                )}
                {selectedInsight.type === 'tag_quality' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                )}
                {selectedInsight.type === 'marketing' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                  </svg>
                )}
                {selectedInsight.type === 'ai_model' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedInsight.title}</h2>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">可信度: {Math.round(selectedInsight.confidence * 100)}%</span>
              <button 
                onClick={() => setSelectedInsight(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-4 text-gray-700">{selectedInsight.content}</p>

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
      )}

      {/* Related Recommendations */}
      <div className="bg-white rounded-lg shadow">
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
                  <Link to="/marketing/campaigns" className="text-blue-600 hover:text-blue-800 text-sm">
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
}

export default AIAssistant;
// AI服务 - 与大语言模型集成
// 这是一个模拟实现，实际项目中应该连接到后端API

// 消息建议类型
const SuggestionType = {
  NAVIGATION: 'navigation',  // 导航到特定页面
  ACTION: 'action',          // 执行特定操作
  QUESTION: 'question'       // 提问问题
};

// 获取助手回复
export const getAssistantResponse = async (input, messageHistory, dashboardData) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // 转换为小写以便匹配
  const lowerInput = input.toLowerCase();
  
  // 简单的关键词匹配来模拟智能响应
  // 在实际项目中，这里会调用大模型API
  
  // 标签相关问题
  if (lowerInput.includes('标签') && lowerInput.includes('创建')) {
    return {
      text: '创建标签有三种方式：\n\n1. 手动注册：在"标签中心 > 标签创建 > 标签注册"页面填写标签信息。\n\n2. 标签工厂：在"标签中心 > 标签创建 > 标签工厂"使用可视化界面配置标签规则。\n\n3. 智能生成：在"标签中心 > 标签创建 > 智能标签生成"中输入业务需求，系统会自动生成标签方案。\n\n对于初次使用，我推荐您尝试智能生成功能，只需输入业务需求即可快速创建标签。',
      suggestions: [
        {
          type: SuggestionType.NAVIGATION,
          text: '前往标签注册',
          action: '/tags/creation/registration'
        },
        {
          type: SuggestionType.NAVIGATION,
          text: '使用智能生成标签',
          action: '/tags/creation/ai'
        },
        {
          type: SuggestionType.QUESTION,
          text: '如何提高标签质量？',
          action: '如何提高标签质量？'
        }
      ]
    };
  }
  
  // 客群相关问题
  if (lowerInput.includes('分群') && lowerInput.includes('使用')) {
    return {
      text: '智能分群功能可以根据您的业务目标自动划分客户群体。使用方法如下：\n\n1. 进入"客群画像 > 客群管理 > 智能分群"页面。\n\n2. 选择业务目标（如"高潜力客户"、"流失风险客户"等）。\n\n3. 设置数据范围和条件。\n\n4. 点击"生成分群"，系统会分析客户特征并自动创建最优客群。\n\n5. 查看分群结果和特征描述，必要时调整参数。\n\n6. 保存分群供后续业务使用。',
      suggestions: [
        {
          type: SuggestionType.NAVIGATION,
          text: '前往智能分群',
          action: '/portrait/groups/ai'
        },
        {
          type: SuggestionType.QUESTION,
          text: '如何利用分群进行营销？',
          action: '如何利用智能分群进行精准营销？'
        }
      ]
    };
  }
  
  // 营销相关问题
  if (lowerInput.includes('营销') && lowerInput.includes('转化率')) {
    // 判断是否是分析转化率下降
    if (lowerInput.includes('下降')) {
      return {
        text: '根据系统分析，近期营销转化率下降的主要原因有：\n\n1. 目标客群覆盖率下降：高价值客户标签更新不及时，导致营销触达精准度降低。\n\n2. 营销内容相关性不足：现有话术模板未根据客户最新需求更新。\n\n3. 触达时机选择问题：系统检测到高转化率的时间窗口已经变化。\n\n建议措施：\n\n1. 更新高价值客户标签规则，提高覆盖率。\n\n2. 使用"精准营销引擎"重新生成个性化话术。\n\n3. 调整触达时间，建议在工作日17:00-21:00之间。',
        suggestions: [
          {
            type: SuggestionType.NAVIGATION,
            text: '查看营销引擎详情',
            action: '/applications/business/marketing-engine'
          },
          {
            type: SuggestionType.NAVIGATION,
            text: '更新标签规则',
            action: '/tags/creation/factory'
          }
        ]
      };
    } else {
      return {
        text: '当前系统营销转化率为5.8%，较上期提升0.7%。主要表现良好的营销活动有：\n\n1. "新客6周运营"：转化率8.2%，较同期提升1.2%\n\n2. "信用卡促活"：转化率6.5%，较同期提升0.9%\n\n3. "理财产品交叉销售"：转化率5.1%，较同期提升0.4%\n\n建议继续关注"存款客户激活"活动，当前转化率偏低（3.2%），可考虑调整目标客群或营销话术。',
        suggestions: [
          {
            type: SuggestionType.NAVIGATION,
            text: '查看详细报告',
            action: '/applications/business/marketing-engine'
          },
          {
            type: SuggestionType.QUESTION,
            text: '如何改进低效活动？',
            action: '如何提高"存款客户激活"活动的转化率？'
          }
        ]
      };
    }
  }
  
  // 流失相关问题
  if (lowerInput.includes('流失') || (lowerInput.includes('客户') && lowerInput.includes('挽留'))) {
    return {
      text: '系统检测到近期有32位高价值客户存在流失风险。主要风险特征包括：\n\n1. 交易频次下降：近30天交易频次较平时下降超过50%\n\n2. 余额减少：账户余额较平均值下降超过30%\n\n3. 竞品活动参与：检测到部分客户参与了竞争对手的营销活动\n\n系统已生成挽留方案，包括：\n\n1. 专属优惠：根据客户历史偏好提供定制化权益\n\n2. 专人服务：为高净值客户分配客户经理跟进\n\n3. 产品推荐：基于流失原因匹配最合适的替代产品',
      suggestions: [
        {
          type: SuggestionType.NAVIGATION,
          text: '查看挽留计划',
          action: '/applications/business/retention-assistant'
        },
        {
          type: SuggestionType.NAVIGATION,
          text: '流失风险客群',
          action: '/portrait/groups/ai?template=churn_risk'
        }
      ],
      navigateTo: '/applications/business/retention-assistant'
    };
  }
  
  // 标签质量相关问题
  if (lowerInput.includes('标签') && lowerInput.includes('质量')) {
    return {
      text: '当前存在以下标签质量问题：\n\n1. 收入等级标签：覆盖率下降15%，可能是数据源变更导致\n\n2. 交易频次标签：数据更新延迟超过4小时，影响实时营销决策\n\n3. 风险评分标签：分布异常偏移，需检查更新规则\n\n建议措施：\n\n1. 更新收入标签的数据源配置\n\n2. 检查交易频次标签的调度任务设置\n\n3. 重新训练风险评分模型',
      suggestions: [
        {
          type: SuggestionType.NAVIGATION,
          text: '查看质量详情',
          action: '/tags/quality/dashboard'
        },
        {
          type: SuggestionType.NAVIGATION,
          text: '标签异常预警',
          action: '/tags/quality/alerts'
        }
      ]
    };
  }
  
  // 如果没有匹配到特定问题，返回一个通用回复
  return {
    text: '感谢您的问题。我可以帮您解答关于标签管理、客群画像、业务应用等方面的问题。例如，您可以咨询如何创建标签、如何使用智能分群、如何提升营销转化率等。您也可以直接点击下方的建议或告诉我您想了解的具体功能。',
    suggestions: [
      {
        type: SuggestionType.QUESTION,
        text: '系统有哪些功能？',
        action: '标签画像中台有哪些主要功能模块？'
      },
      {
        type: SuggestionType.QUESTION,
        text: '如何开始使用？',
        action: '作为新用户，如何快速上手系统？'
      },
      {
        type: SuggestionType.NAVIGATION,
        text: '查看使用指南',
        action: '/dashboard/assistant/guide'
      }
    ]
  };
};

// 更高级的LLM集成方案
// 这个函数模拟了与大模型API的集成方式
// 在实际项目中，这里会调用对应的API
export const callLargeLanguageModel = async (prompt, context, modelConfig = {}) => {
  // 这里模拟了API调用
  console.log('Calling LLM API with prompt:', prompt);
  console.log('Context:', context);
  console.log('Model Config:', modelConfig);
  
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 返回一个模拟结果
  return {
    text: '这是大模型返回的回复内容。',
    confidence: 0.92,
    suggestions: [
      {
        type: SuggestionType.NAVIGATION,
        text: '示例建议1',
        action: '/example/path'
      },
      {
        type: SuggestionType.QUESTION,
        text: '示例建议2',
        action: '这是一个示例问题？'
      }
    ]
  };
}; 
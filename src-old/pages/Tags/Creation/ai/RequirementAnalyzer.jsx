import React, { useState, useEffect } from 'react';
import { Card, Alert, Spin, Typography, Tag, Space, Divider } from 'antd';
import { RobotOutlined, BulbOutlined, TagOutlined, TagsOutlined, ApartmentOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

// 标签建议类型
const SUGGESTION_TYPES = {
  BUSINESS_GOAL: 'business_goal',
  DATA_FIELDS: 'data_fields',
  TAG_TYPES: 'tag_types',
  DERIVED_TAGS: 'derived_tags'
};

// 色彩映射
const TYPE_COLORS = {
  [SUGGESTION_TYPES.BUSINESS_GOAL]: 'blue',
  [SUGGESTION_TYPES.DATA_FIELDS]: 'green',
  [SUGGESTION_TYPES.TAG_TYPES]: 'purple',
  [SUGGESTION_TYPES.DERIVED_TAGS]: 'orange'
};

const RequirementAnalyzer = ({ requirement }) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  
  // 模拟分析过程
  useEffect(() => {
    if (!requirement) return;
    
    const analyzeRequirement = async () => {
      setLoading(true);
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // 简单的关键词匹配模拟AI分析
      // 在实际项目中，这里应该调用后端的AI服务
      let goalType = '';
      let detectedFields = [];
      let suggestedTagTypes = [];
      let derivedTags = [];
      
      const lowerReq = requirement.toLowerCase();
      
      // 检测业务目标
      if (lowerReq.includes('营销') || lowerReq.includes('推荐')) {
        goalType = '营销推荐';
        detectedFields = ['客户ID', '产品偏好', '消费能力', '活跃度'];
        suggestedTagTypes = ['行为标签', '消费标签', '偏好标签'];
        derivedTags = ['营销响应概率', '产品推荐指数', '客户活跃度'];
      } else if (lowerReq.includes('风险') || lowerReq.includes('评分')) {
        goalType = '风险评估';
        detectedFields = ['信用历史', '违约记录', '还款行为', '负债率'];
        suggestedTagTypes = ['风险标签', '信用标签', '行为标签'];
        derivedTags = ['信用评分', '违约概率', '风险等级'];
      } else if (lowerReq.includes('流失') || lowerReq.includes('挽留')) {
        goalType = '客户挽留';
        detectedFields = ['交易频次', '余额变化', '活跃度下降', '竞品使用'];
        suggestedTagTypes = ['行为标签', '状态标签', '趋势标签'];
        derivedTags = ['流失风险评分', '流失原因类型', '挽留响应概率'];
      } else if (lowerReq.includes('高价值') || lowerReq.includes('价值')) {
        goalType = '价值评估';
        detectedFields = ['资产规模', '贡献利润', '产品持有', '客户忠诚度'];
        suggestedTagTypes = ['价值标签', '资产标签', '行为标签'];
        derivedTags = ['客户价值评分', '生命周期价值', '价值潜力指数'];
      } else {
        goalType = '通用分析';
        detectedFields = ['客户信息', '交易记录', '行为数据'];
        suggestedTagTypes = ['基础标签', '行为标签', '统计标签'];
        derivedTags = ['客户分群', '行为特征', '偏好指数'];
      }
      
      setAnalysis({
        goalType,
        detectedFields,
        suggestedTagTypes,
        derivedTags,
        insights: getRandomInsights(goalType)
      });
      
      setLoading(false);
    };
    
    analyzeRequirement();
  }, [requirement]);
  
  // 随机生成一些洞察建议
  const getRandomInsights = (goalType) => {
    const insightsByType = {
      '营销推荐': [
        '根据分析，建议关注用户的购买频次和偏好，这有助于提高营销精准度',
        '数据显示交易金额与活跃度高度相关，可考虑结合这两个维度构建标签',
        '用户的产品偏好呈现明显的季节性变化，建议纳入时间维度'
      ],
      '风险评估': [
        '历史违约记录是风险预测的重要指标，建议作为核心标签',
        '还款行为的异常模式对风险预警具有关键作用',
        '负债率变化趋势比绝对值更能反映风险状况'
      ],
      '客户挽留': [
        '交易频次下降是流失预警的最早信号，建议设置敏感阈值',
        '不同客群的流失原因存在显著差异，建议细分分析',
        '活跃度与余额变化的组合特征对预测流失更准确'
      ],
      '价值评估': [
        '除金融资产外，交易行为也是评估客户价值的重要维度',
        '高价值客户通常有特定的产品组合模式',
        '客户关系年限与价值稳定性高度相关'
      ],
      '通用分析': [
        '建议从多个维度构建标签体系，提高覆盖面',
        '考虑标签之间的关联性，避免信息冗余',
        '关注数据更新频率，确保标签时效性'
      ]
    };
    
    const insights = insightsByType[goalType] || insightsByType['通用分析'];
    return insights;
  };
  
  if (loading) {
    return (
      <div className="analyzer-loading">
        <Spin indicator={<RobotOutlined spin style={{ fontSize: 24 }} />} />
        <Text style={{ marginTop: 8 }}>AI正在分析您的业务需求...</Text>
      </div>
    );
  }
  
  if (!analysis) {
    return (
      <Alert 
        message="请输入业务需求以获取AI分析" 
        type="info" 
        showIcon 
      />
    );
  }
  
  return (
    <div className="requirement-analyzer">
      <Alert
        message="AI需求分析结果"
        description={
          <div className="analysis-content">
            <div className="analysis-item">
              <Text strong>检测到的业务目标：</Text>
              <Tag color="blue" icon={<ApartmentOutlined />}>{analysis.goalType}</Tag>
            </div>
            
            <div className="analysis-item">
              <Text strong>可能需要的数据字段：</Text>
              <div className="tags-container">
                {analysis.detectedFields.map((field, index) => (
                  <Tag key={index} color="green">{field}</Tag>
                ))}
              </div>
            </div>
            
            <div className="analysis-item">
              <Text strong>建议的标签类型：</Text>
              <div className="tags-container">
                {analysis.suggestedTagTypes.map((type, index) => (
                  <Tag key={index} color="purple" icon={<TagOutlined />}>{type}</Tag>
                ))}
              </div>
            </div>
            
            <div className="analysis-item">
              <Text strong>可能的衍生标签：</Text>
              <div className="tags-container">
                {analysis.derivedTags.map((tag, index) => (
                  <Tag key={index} color="orange" icon={<TagsOutlined />}>{tag}</Tag>
                ))}
              </div>
            </div>
            
            <Divider />
            
            <div className="analysis-insights">
              <Text strong><BulbOutlined /> AI洞察：</Text>
              <ul className="insights-list">
                {analysis.insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        }
        type="info"
        showIcon
        icon={<RobotOutlined />}
      />
      
      <style jsx>{`
        .requirement-analyzer {
          margin-bottom: 20px;
        }
        
        .analyzer-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 4px;
        }
        
        .analysis-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .analysis-item {
          margin-bottom: 8px;
        }
        
        .tags-container {
          margin-top: 4px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .insights-list {
          margin-top: 8px;
          padding-left: 20px;
        }
        
        .insights-list li {
          margin-bottom: 6px;
        }
      `}</style>
    </div>
  );
};

export default RequirementAnalyzer; 
import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Steps,
  Button,
  Typography,
  message,
  Breadcrumb,
  Divider,
  Row,
  Col,
  Space,
  Spin,
  Result
} from 'antd';
import {
  HomeOutlined,
  ShopOutlined,
  UserOutlined,
  RocketOutlined,
  AimOutlined,
  TeamOutlined,
  MessageOutlined,
  SendOutlined,
  LineChartOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { 
  GoalSelector, 
  GroupSelector, 
  ContentGenerator, 
  ChannelSelector, 
  StrategyResult 
} from './components/marketing';
import { 
  getMarketingGoals, 
  getTargetGroupRecommendations, 
  getContentRecommendations,
  getChannelRecommendations,
  generateMarketingStrategy
} from '../../../services/aiMarketingService';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

/**
 * 精准营销引擎页面组件 - 提供营销目标选择、客群推荐、内容生成和渠道优化功能
 */
const PrecisionMarketing = () => {
  // 步骤索引
  const [currentStep, setCurrentStep] = useState(0);
  
  // 状态数据
  const [marketingGoals, setMarketingGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [recommendedGroups, setRecommendedGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [recommendedContents, setRecommendedContents] = useState([]);
  const [selectedContents, setSelectedContents] = useState([]);
  const [recommendedChannels, setRecommendedChannels] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [budgetAmount, setBudgetAmount] = useState(500000);
  const [timingOption, setTimingOption] = useState('immediate');
  
  // 生成状态
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  
  // 加载状态
  const [loading, setLoading] = useState({
    goals: true,
    groups: false,
    contents: false,
    channels: false
  });
  
  // Ref for auto-scrolling
  const stepsRef = useRef(null);
  
  // 获取营销目标列表
  useEffect(() => {
    const fetchMarketingGoals = async () => {
      try {
        const goals = await getMarketingGoals();
        setMarketingGoals(goals);
      } catch (error) {
        console.error('Error fetching marketing goals:', error);
        message.error('加载营销目标失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, goals: false }));
      }
    };
    
    fetchMarketingGoals();
  }, []);
  
  // 获取推荐客群
  useEffect(() => {
    if (!selectedGoal) return;
    
    const fetchRecommendedGroups = async () => {
      setLoading(prev => ({ ...prev, groups: true }));
      try {
        const groups = await getTargetGroupRecommendations(selectedGoal.id);
        setRecommendedGroups(groups);
        // 设置默认选中的客群
        setSelectedGroups(groups.filter(group => group.selected).map(group => group.id));
      } catch (error) {
        console.error('Error fetching recommended groups:', error);
        message.error('加载推荐客群失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, groups: false }));
      }
    };
    
    fetchRecommendedGroups();
  }, [selectedGoal]);
  
  // 获取推荐内容
  useEffect(() => {
    if (!selectedGoal || selectedGroups.length === 0) return;
    
    const fetchRecommendedContents = async () => {
      setLoading(prev => ({ ...prev, contents: true }));
      try {
        const contents = await getContentRecommendations(selectedGoal.id, selectedGroups[0]);
        setRecommendedContents(contents);
        // 设置默认选中的内容
        setSelectedContents(contents.filter(content => content.selected).map(content => content.id));
      } catch (error) {
        console.error('Error fetching recommended contents:', error);
        message.error('加载推荐内容失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, contents: false }));
      }
    };
    
    fetchRecommendedContents();
  }, [selectedGoal, selectedGroups]);
  
  // 获取推荐渠道
  useEffect(() => {
    if (!selectedGoal || selectedGroups.length === 0) return;
    
    const fetchRecommendedChannels = async () => {
      setLoading(prev => ({ ...prev, channels: true }));
      try {
        const channels = await getChannelRecommendations(selectedGoal.id, selectedGroups[0]);
        setRecommendedChannels(channels);
        // 设置默认选中的渠道
        setSelectedChannels(channels.filter(channel => channel.selected).map(channel => channel.name));
      } catch (error) {
        console.error('Error fetching recommended channels:', error);
        message.error('加载推荐渠道失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, channels: false }));
      }
    };
    
    fetchRecommendedChannels();
  }, [selectedGoal, selectedGroups]);
  
  // 处理营销目标选择
  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setCurrentStep(1);
    scrollToCurrentStep();
  };
  
  // 处理客群选择变更
  const handleGroupChange = (groupIds) => {
    setSelectedGroups(groupIds);
  };
  
  // 处理内容选择变更
  const handleContentChange = (contentIds) => {
    setSelectedContents(contentIds);
  };
  
  // 处理渠道选择变更
  const handleChannelChange = (channelNames) => {
    setSelectedChannels(channelNames);
  };
  
  // 处理预算变更
  const handleBudgetChange = (value) => {
    setBudgetAmount(value);
  };
  
  // 处理时间选项变更
  const handleTimingChange = (value) => {
    setTimingOption(value);
  };
  
  // 生成营销策略
  const handleGenerateStrategy = async () => {
    if (selectedGroups.length === 0) {
      message.warning('请至少选择一个目标客群');
      return;
    }
    
    if (selectedContents.length === 0) {
      message.warning('请至少选择一个营销内容');
      return;
    }
    
    if (selectedChannels.length === 0) {
      message.warning('请至少选择一个营销渠道');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // 准备选中的客群对象
      const selectedGroupObjects = recommendedGroups.filter(group => 
        selectedGroups.includes(group.id)
      );
      
      // 准备选中的内容对象
      const selectedContentObjects = recommendedContents.filter(content => 
        selectedContents.includes(content.id)
      );
      
      // 准备选中的渠道对象
      const selectedChannelObjects = recommendedChannels.filter(channel => 
        selectedChannels.includes(channel.name)
      );
      
      const params = {
        goalId: selectedGoal.id,
        targetGroups: selectedGroupObjects,
        contents: selectedContentObjects,
        channels: selectedChannelObjects,
        budget: budgetAmount,
        timing: timingOption
      };
      
      const result = await generateMarketingStrategy(params);
      setGenerationResult(result);
      setCurrentStep(4); // 跳到结果页
      scrollToCurrentStep();
    } catch (error) {
      console.error('Error generating strategy:', error);
      message.error('生成营销策略失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // 重新开始
  const handleReset = () => {
    setSelectedGoal(null);
    setRecommendedGroups([]);
    setSelectedGroups([]);
    setRecommendedContents([]);
    setSelectedContents([]);
    setRecommendedChannels([]);
    setSelectedChannels([]);
    setBudgetAmount(500000);
    setTimingOption('immediate');
    setGenerationResult(null);
    setCurrentStep(0);
    scrollToCurrentStep();
  };
  
  // 自动滚动到当前步骤
  const scrollToCurrentStep = () => {
    setTimeout(() => {
      if (stepsRef.current) {
        stepsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  
  // 渲染步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // 选择营销目标
        return (
          <GoalSelector 
            goals={marketingGoals} 
            loading={loading.goals}
            onSelect={handleGoalSelect}
          />
        );
        
      case 1: // 选择目标客群
        return (
          <GroupSelector 
            groups={recommendedGroups}
            selectedGroups={selectedGroups}
            onChange={handleGroupChange}
            loading={loading.groups}
            onNext={() => {
              setCurrentStep(2);
              scrollToCurrentStep();
            }}
            onPrev={() => {
              setCurrentStep(0);
              scrollToCurrentStep();
            }}
          />
        );
        
      case 2: // 选择营销内容
        return (
          <ContentGenerator
            contents={recommendedContents}
            selectedContents={selectedContents}
            onChange={handleContentChange}
            loading={loading.contents}
            onNext={() => {
              setCurrentStep(3);
              scrollToCurrentStep();
            }}
            onPrev={() => {
              setCurrentStep(1);
              scrollToCurrentStep();
            }}
          />
        );
        
      case 3: // 选择营销渠道
        return (
          <ChannelSelector
            channels={recommendedChannels}
            selectedChannels={selectedChannels}
            onChange={handleChannelChange}
            budgetAmount={budgetAmount}
            onBudgetChange={handleBudgetChange}
            timingOption={timingOption}
            onTimingChange={handleTimingChange}
            loading={loading.channels}
            onPrev={() => {
              setCurrentStep(2);
              scrollToCurrentStep();
            }}
            onGenerate={handleGenerateStrategy}
            generating={isGenerating}
          />
        );
        
      case 4: // 显示结果
        return (
          <StrategyResult
            result={generationResult}
            onReset={handleReset}
            onSave={() => {
              message.success('营销策略已保存');
              // 这里可以添加保存逻辑
            }}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="precision-marketing-page">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item href="/dashboard">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/applications">业务应用</Breadcrumb.Item>
        <Breadcrumb.Item href="/applications/retail-marketing">零售营销</Breadcrumb.Item>
        <Breadcrumb.Item>精准营销引擎</Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="page-header">
        <Title level={2}>
          <RocketOutlined /> 精准营销引擎
        </Title>
        <Paragraph>
          通过AI技术为您提供智能营销策略，自动推荐客群、生成营销话术并优化渠道选择，提升营销效率和客户转化率。
        </Paragraph>
      </div>
      
      <div className="steps-container" ref={stepsRef}>
        <Steps current={currentStep}>
          <Step title="选择营销目标" icon={<AimOutlined />} />
          <Step title="选择目标客群" icon={<TeamOutlined />} />
          <Step title="定制营销内容" icon={<MessageOutlined />} />
          <Step title="优化投放渠道" icon={<SendOutlined />} />
          <Step title="查看策略方案" icon={<LineChartOutlined />} />
        </Steps>
      </div>
      
      <div className="step-content">
        {renderStepContent()}
      </div>
      
      <style jsx>{`
        .precision-marketing-page {
          padding: 24px;
        }
        
        .breadcrumb {
          margin-bottom: 16px;
        }
        
        .page-header {
          margin-bottom: 24px;
        }
        
        .steps-container {
          margin-bottom: 24px;
          padding: 24px;
          background: #fff;
          border-radius: 4px;
        }
        
        .step-content {
          background: #fff;
          padding: 24px;
          border-radius: 4px;
          min-height: 300px;
        }
      `}</style>
    </div>
  );
};

export default PrecisionMarketing; 
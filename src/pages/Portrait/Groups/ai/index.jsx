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
  UserOutlined,
  GroupOutlined,
  RobotOutlined,
  AimOutlined,
  TagsOutlined,
  DatabaseOutlined,
  FilterOutlined,
  LineChartOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import BusinessGoalSelector from './components/BusinessGoalSelector';
import TagSelector from './components/TagSelector';
import DataRangeSelector from './components/DataRangeSelector';
import GroupResult from './components/GroupResult';
import { 
  getBusinessGoals, 
  getRecommendedTags, 
  generateIntelligentGroup 
} from '../../../../services/aiGroupingService';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const AIGroupingPage = () => {
  // 步骤索引
  const [currentStep, setCurrentStep] = useState(0);
  
  // 状态数据
  const [businessGoals, setBusinessGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [recommendedTags, setRecommendedTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dataRange, setDataRange] = useState({ period: 'recent3Months', customRange: null });
  const [additionalFilters, setAdditionalFilters] = useState([]);
  
  // 生成状态
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  
  // 加载状态
  const [loading, setLoading] = useState({
    goals: true,
    tags: false
  });
  
  // Ref for auto-scrolling
  const stepsRef = useRef(null);
  
  // 获取业务目标列表
  useEffect(() => {
    const fetchBusinessGoals = async () => {
      try {
        const goals = await getBusinessGoals();
        setBusinessGoals(goals);
      } catch (error) {
        console.error('Error fetching business goals:', error);
        message.error('加载业务目标失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, goals: false }));
      }
    };
    
    fetchBusinessGoals();
  }, []);
  
  // 获取推荐标签
  useEffect(() => {
    if (!selectedGoal) return;
    
    const fetchRecommendedTags = async () => {
      setLoading(prev => ({ ...prev, tags: true }));
      try {
        const tags = await getRecommendedTags(selectedGoal.id);
        setRecommendedTags(tags);
        // 设置默认选中的标签
        setSelectedTags(tags.filter(tag => tag.selected).map(tag => tag.id));
      } catch (error) {
        console.error('Error fetching recommended tags:', error);
        message.error('加载推荐标签失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, tags: false }));
      }
    };
    
    fetchRecommendedTags();
  }, [selectedGoal]);
  
  // 处理业务目标选择
  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setCurrentStep(1);
    scrollToCurrentStep();
  };
  
  // 处理标签选择变更
  const handleTagChange = (tagIds) => {
    setSelectedTags(tagIds);
  };
  
  // 处理数据范围变更
  const handleDataRangeChange = (range) => {
    setDataRange(range);
  };
  
  // 处理额外筛选条件变更
  const handleFiltersChange = (filters) => {
    setAdditionalFilters(filters);
  };
  
  // 生成客群
  const handleGenerateGroup = async () => {
    if (selectedTags.length === 0) {
      message.warning('请至少选择一个标签');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const params = {
        businessGoalId: selectedGoal.id,
        selectedTags,
        dataRange,
        additionalFilters
      };
      
      const result = await generateIntelligentGroup(params);
      setGenerationResult(result);
      setCurrentStep(3); // 跳到结果页
      scrollToCurrentStep();
    } catch (error) {
      console.error('Error generating group:', error);
      message.error('生成客群失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // 重新开始
  const handleReset = () => {
    setSelectedGoal(null);
    setRecommendedTags([]);
    setSelectedTags([]);
    setDataRange({ period: 'recent3Months', customRange: null });
    setAdditionalFilters([]);
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
      case 0: // 选择业务目标
        return (
          <BusinessGoalSelector 
            goals={businessGoals} 
            loading={loading.goals}
            onSelect={handleGoalSelect}
          />
        );
        
      case 1: // 选择标签
        return (
          <TagSelector 
            tags={recommendedTags}
            selectedTags={selectedTags}
            onChange={handleTagChange}
            loading={loading.tags}
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
        
      case 2: // 选择数据范围和过滤条件
        return (
          <DataRangeSelector
            dataRange={dataRange}
            onDataRangeChange={handleDataRangeChange}
            filters={additionalFilters}
            onFiltersChange={handleFiltersChange}
            onPrev={() => {
              setCurrentStep(1);
              scrollToCurrentStep();
            }}
            onGenerate={handleGenerateGroup}
            generating={isGenerating}
          />
        );
        
      case 3: // 显示结果
        return (
          <GroupResult
            result={generationResult}
            onReset={handleReset}
            onSave={() => {
              message.success('客群已保存');
              // 这里可以添加保存逻辑
            }}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="ai-grouping-page">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item href="/dashboard">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/portrait">客群画像</Breadcrumb.Item>
        <Breadcrumb.Item href="/portrait/groups">客群管理</Breadcrumb.Item>
        <Breadcrumb.Item>智能分群</Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="page-header">
        <Title level={2}>
          <RobotOutlined /> 智能分群
        </Title>
        <Paragraph>
          基于AI技术智能创建客群，快速识别目标客户，提升业务决策效率和精准度。
        </Paragraph>
      </div>
      
      <div className="steps-container" ref={stepsRef}>
        <Steps current={currentStep}>
          <Step title="选择业务目标" icon={<AimOutlined />} />
          <Step title="选择标签" icon={<TagsOutlined />} />
          <Step title="设置条件" icon={<FilterOutlined />} />
          <Step title="查看结果" icon={<LineChartOutlined />} />
        </Steps>
      </div>
      
      <div className="step-content">
        {renderStepContent()}
      </div>
      
      <style jsx>{`
        .ai-grouping-page {
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

export default AIGroupingPage; 
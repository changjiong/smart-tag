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
  SafetyOutlined,
  WarningOutlined,
  TeamOutlined,
  ToolOutlined,
  SendOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import { 
  RiskMetricsSelector, 
  RiskGroupSelector, 
  InterventionSelector, 
  ChannelConfigurator, 
  RetentionPlanResult 
} from './components/retention';
import { 
  getChurnRiskMetrics, 
  getChurnRiskGroups, 
  getInterventionRecommendations,
  getChannelRecommendations,
  generateRetentionPlan
} from '../../../services/aiRetentionService';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

/**
 * 客户挽留助手页面组件
 * 用于识别流失风险客户，并生成挽留策略方案
 */
const RetentionAssistant = () => {
  // 步骤索引
  const [currentStep, setCurrentStep] = useState(0);
  
  // 状态数据
  const [riskMetrics, setRiskMetrics] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [riskGroups, setRiskGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [interventions, setInterventions] = useState([]);
  const [selectedInterventions, setSelectedInterventions] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [timingOption, setTimingOption] = useState('immediate');
  
  // 生成状态
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);
  
  // 加载状态
  const [loading, setLoading] = useState({
    metrics: true,
    groups: false,
    interventions: false,
    channels: false
  });
  
  // Ref for auto-scrolling
  const stepsRef = useRef(null);
  
  // 获取流失风险指标
  useEffect(() => {
    const fetchRiskMetrics = async () => {
      try {
        const metrics = await getChurnRiskMetrics();
        setRiskMetrics(metrics);
        // 默认选择前三个指标
        setSelectedMetrics(metrics.slice(0, 3).map(metric => metric.id));
      } catch (error) {
        console.error('Error fetching risk metrics:', error);
        message.error('加载风险指标失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, metrics: false }));
      }
    };
    
    fetchRiskMetrics();
  }, []);
  
  // 获取流失风险客群
  useEffect(() => {
    if (selectedMetrics.length === 0 || currentStep < 1) return;
    
    const fetchRiskGroups = async () => {
      setLoading(prev => ({ ...prev, groups: true }));
      try {
        const groups = await getChurnRiskGroups(selectedMetrics);
        setRiskGroups(groups);
        // 清除之前的选择
        setSelectedGroup(null);
      } catch (error) {
        console.error('Error fetching risk groups:', error);
        message.error('识别流失风险客群失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, groups: false }));
      }
    };
    
    fetchRiskGroups();
  }, [selectedMetrics, currentStep]);
  
  // 获取干预措施建议
  useEffect(() => {
    if (!selectedGroup || currentStep < 2) return;
    
    const fetchInterventions = async () => {
      setLoading(prev => ({ ...prev, interventions: true }));
      try {
        const interventions = await getInterventionRecommendations(selectedGroup.id);
        setInterventions(interventions);
        // 默认选择推荐的干预措施
        setSelectedInterventions(
          interventions
            .filter(item => item.selected)
            .map(item => item.id)
        );
      } catch (error) {
        console.error('Error fetching interventions:', error);
        message.error('加载干预措施建议失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, interventions: false }));
      }
    };
    
    fetchInterventions();
  }, [selectedGroup, currentStep]);
  
  // 获取渠道建议
  useEffect(() => {
    if (!selectedGroup || selectedInterventions.length === 0 || currentStep < 3) return;
    
    const fetchChannels = async () => {
      setLoading(prev => ({ ...prev, channels: true }));
      try {
        const channels = await getChannelRecommendations(selectedGroup.id, selectedInterventions);
        setChannels(channels);
        // 默认选择推荐的渠道
        setSelectedChannels(
          channels
            .filter(channel => channel.selected)
            .map(channel => channel.name)
        );
      } catch (error) {
        console.error('Error fetching channels:', error);
        message.error('加载渠道建议失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, channels: false }));
      }
    };
    
    fetchChannels();
  }, [selectedGroup, selectedInterventions, currentStep]);
  
  // 处理风险指标选择变更
  const handleMetricsChange = (metricIds) => {
    if (metricIds.length === 0) {
      message.warning('请至少选择一个风险指标');
      return;
    }
    setSelectedMetrics(metricIds);
  };
  
  // 处理风险客群选择
  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };
  
  // 处理干预措施选择变更
  const handleInterventionChange = (interventionIds) => {
    setSelectedInterventions(interventionIds);
  };
  
  // 处理渠道选择变更
  const handleChannelChange = (channelNames) => {
    setSelectedChannels(channelNames);
  };
  
  // 处理时间选项变更
  const handleTimingChange = (value) => {
    setTimingOption(value);
  };
  
  // 生成挽留方案
  const handleGeneratePlan = async () => {
    if (!selectedGroup) {
      message.warning('请选择一个流失风险客群');
      return;
    }
    
    if (selectedInterventions.length === 0) {
      message.warning('请至少选择一种干预措施');
      return;
    }
    
    if (selectedChannels.length === 0) {
      message.warning('请至少选择一个渠道');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const params = {
        groupId: selectedGroup.id,
        interventionIds: selectedInterventions,
        channelNames: selectedChannels,
        timing: timingOption
      };
      
      const plan = await generateRetentionPlan(params);
      setGenerationResult(plan);
      setCurrentStep(4); // 跳到结果页
      scrollToCurrentStep();
    } catch (error) {
      console.error('Error generating retention plan:', error);
      message.error('生成挽留方案失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // 重新开始
  const handleReset = () => {
    setSelectedMetrics(riskMetrics.slice(0, 3).map(metric => metric.id));
    setRiskGroups([]);
    setSelectedGroup(null);
    setInterventions([]);
    setSelectedInterventions([]);
    setChannels([]);
    setSelectedChannels([]);
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
  
  // 进入下一步
  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
    scrollToCurrentStep();
  };
  
  // 返回上一步
  const goToPrevStep = () => {
    setCurrentStep(prev => prev - 1);
    scrollToCurrentStep();
  };
  
  // 渲染步骤内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // 选择风险指标
        return (
          <RiskMetricsSelector 
            metrics={riskMetrics} 
            selectedMetrics={selectedMetrics}
            onChange={handleMetricsChange}
            loading={loading.metrics}
          />
        );
        
      case 1: // 选择流失风险客群
        return (
          <RiskGroupSelector 
            groups={riskGroups}
            selectedGroup={selectedGroup}
            onSelect={handleGroupSelect}
            loading={loading.groups}
            onNext={() => goToNextStep()}
            onPrev={() => goToPrevStep()}
          />
        );
        
      case 2: // 选择干预措施
        return (
          <InterventionSelector
            interventions={interventions}
            selectedInterventions={selectedInterventions}
            onChange={handleInterventionChange}
            loading={loading.interventions}
            onNext={() => goToNextStep()}
            onPrev={() => goToPrevStep()}
          />
        );
        
      case 3: // 配置渠道
        return (
          <ChannelConfigurator
            channels={channels}
            selectedChannels={selectedChannels}
            onChange={handleChannelChange}
            timingOption={timingOption}
            onTimingChange={handleTimingChange}
            loading={loading.channels}
            onPrev={() => goToPrevStep()}
            onGenerate={handleGeneratePlan}
            generating={isGenerating}
          />
        );
        
      case 4: // 显示结果
        return (
          <RetentionPlanResult
            plan={generationResult}
            onReset={handleReset}
            onSave={() => {
              message.success('挽留方案已保存');
              // 这里可以添加保存逻辑
            }}
          />
        );
        
      default:
        return null;
    }
  };
  
  // 判断当前步骤是否可进入下一步
  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 0:
        return selectedMetrics.length > 0;
      case 1:
        return selectedGroup !== null;
      case 2:
        return selectedInterventions.length > 0;
      case 3:
        return selectedChannels.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="retention-assistant-page">

      <div className="steps-container" ref={stepsRef}>
        <Steps current={currentStep}>
          <Step title="选择风险指标" icon={<WarningOutlined />} />
          <Step title="选择风险客群" icon={<TeamOutlined />} />
          <Step title="选择干预措施" icon={<ToolOutlined />} />
          <Step title="配置渠道与时间" icon={<SendOutlined />} />
          <Step title="查看挽留方案" icon={<LineChartOutlined />} />
        </Steps>
      </div>
      
      <div className="step-content">
        {renderStepContent()}
        
        {currentStep === 0 && (
          <div className="step-actions">
            <Button 
              type="primary" 
              onClick={() => goToNextStep()}
              disabled={!canProceedToNextStep()}
            >
              下一步：选择风险客群
            </Button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .retention-assistant-page {
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
        
        .step-actions {
          margin-top: 24px;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};

export default RetentionAssistant; 
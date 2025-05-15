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
  Result,
  InputNumber
} from 'antd';
import {
  HomeOutlined,
  BankOutlined,
  UserOutlined,
  SafetyOutlined,
  PieChartOutlined,
  ShoppingOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
  ArrowLeftOutlined,
  CloudUploadOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { 
  GoalAssessment, 
  RiskAnalysis, 
  AssetAllocation, 
  ProductRecommendation, 
  PerformanceReview 
} from './components/advisor';
import { 
  getWealthGoals,
  getRiskAssessmentQuestions,
  generateAssetAllocation,
  getProductRecommendations,
  generatePerformanceProjection,
  generateWealthPlan
} from '../../../services/aiWealthAdvisorService.js';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

/**
 * 财富增值顾问页面组件 - 提供财富目标评估、风险分析、资产配置和产品推荐功能
 */
const WealthAdvisorPage = () => {
  // 步骤索引
  const [currentStep, setCurrentStep] = useState(0);
  
  // 状态数据
  const [wealthGoals, setWealthGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [riskQuestions, setRiskQuestions] = useState([]);
  const [riskProfile, setRiskProfile] = useState(null);
  const [assetAllocation, setAssetAllocation] = useState(null);
  const [productRecommendations, setProductRecommendations] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState(1000000); // 默认100万
  const [performanceProjection, setPerformanceProjection] = useState(null);
  const [wealthPlan, setWealthPlan] = useState(null);
  
  // 加载状态
  const [loading, setLoading] = useState({
    goals: true,
    questions: false,
    allocation: false,
    products: false,
    performance: false,
    plan: false
  });
  
  // Ref for auto-scrolling
  const stepsRef = useRef(null);
  
  // 获取财富目标列表
  useEffect(() => {
    const fetchWealthGoals = async () => {
      try {
        const goals = await getWealthGoals();
        setWealthGoals(goals);
      } catch (error) {
        console.error('Error fetching wealth goals:', error);
        message.error('加载财富目标失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, goals: false }));
      }
    };
    
    fetchWealthGoals();
  }, []);
  
  // 获取风险评估问卷
  useEffect(() => {
    if (currentStep !== 1) return;
    
    const fetchRiskQuestions = async () => {
      setLoading(prev => ({ ...prev, questions: true }));
      try {
        const questions = await getRiskAssessmentQuestions();
        setRiskQuestions(questions);
      } catch (error) {
        console.error('Error fetching risk assessment questions:', error);
        message.error('加载风险评估问卷失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, questions: false }));
      }
    };
    
    fetchRiskQuestions();
  }, [currentStep]);
  
  // 根据目标和风险等级生成资产配置
  useEffect(() => {
    if (!selectedGoal || !riskProfile || currentStep !== 2) return;
    
    const fetchAssetAllocation = async () => {
      setLoading(prev => ({ ...prev, allocation: true }));
      try {
        const allocation = await generateAssetAllocation(selectedGoal.id, riskProfile.level);
        setAssetAllocation(allocation);
      } catch (error) {
        console.error('Error generating asset allocation:', error);
        message.error('生成资产配置失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, allocation: false }));
      }
    };
    
    fetchAssetAllocation();
  }, [selectedGoal, riskProfile, currentStep]);
  
  // 根据资产配置生成产品推荐
  useEffect(() => {
    if (!assetAllocation || currentStep !== 3) return;
    
    const fetchProductRecommendations = async () => {
      setLoading(prev => ({ ...prev, products: true }));
      try {
        const recommendations = await getProductRecommendations(assetAllocation.allocation, investmentAmount);
        setProductRecommendations(recommendations);
      } catch (error) {
        console.error('Error fetching product recommendations:', error);
        message.error('获取产品推荐失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, products: false }));
      }
    };
    
    fetchProductRecommendations();
  }, [assetAllocation, investmentAmount, currentStep]);
  
  // 生成绩效预测
  useEffect(() => {
    if (!assetAllocation || currentStep !== 4) return;
    
    const fetchPerformanceProjection = async () => {
      setLoading(prev => ({ ...prev, performance: true }));
      try {
        const projection = await generatePerformanceProjection(assetAllocation.allocation, investmentAmount, 10);
        setPerformanceProjection(projection);
        
        // 生成完整财富管理方案
        setLoading(prev => ({ ...prev, plan: true }));
        const plan = await generateWealthPlan({
          goalId: selectedGoal.id,
          riskLevel: riskProfile.level,
          investmentAmount,
          assetAllocation: assetAllocation.allocation,
          productRecommendations,
          projectionYears: 10,
          performanceProjection: projection
        });
        setWealthPlan(plan);
      } catch (error) {
        console.error('Error generating performance projection:', error);
        message.error('生成绩效预测失败，请重试');
      } finally {
        setLoading(prev => ({ ...prev, performance: false, plan: false }));
      }
    };
    
    fetchPerformanceProjection();
  }, [assetAllocation, investmentAmount, currentStep, selectedGoal, riskProfile, productRecommendations]);
  
  // 处理财富目标选择
  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setCurrentStep(1);
    scrollToCurrentStep();
  };
  
  // 处理风险评估完成
  const handleRiskComplete = (result) => {
    setRiskProfile(result);
    setCurrentStep(2);
    scrollToCurrentStep();
  };
  
  // 处理资产配置完成
  const handleAllocationNext = () => {
    setCurrentStep(3);
    scrollToCurrentStep();
  };
  
  // 处理产品推荐完成
  const handleProductNext = (recommendations) => {
    // 可以更新用户调整后的产品配置
    if (recommendations && Object.keys(recommendations).length > 0) {
      setProductRecommendations(recommendations);
    }
    setCurrentStep(4);
    scrollToCurrentStep();
  };
  
  // 处理投资金额变更
  const handleAmountChange = (value) => {
    setInvestmentAmount(value);
  };
  
  // 处理方案保存
  const handleSavePlan = () => {
    message.success('财富管理方案已保存');
    // 实际实现中可能需要调用API将方案保存到数据库
  };
  
  // 导出数据到数据输出功能
  const handleExportToDataOutput = () => {
    message.success('财富管理方案已发送至数据输出模块');
    // 这里可以添加导航逻辑
    window.location.href = '/system/open-api/data-output';
  };
  
  // 完成整个流程
  const handleComplete = () => {
    message.success('财富规划已完成');
    // 可以跳转到其他页面或展示结果摘要等
  };
  
  // 返回上一步
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToCurrentStep();
    }
  };
  
  // 重新开始
  const handleReset = () => {
    setSelectedGoal(null);
    setRiskProfile(null);
    setAssetAllocation(null);
    setProductRecommendations(null);
    setPerformanceProjection(null);
    setWealthPlan(null);
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
      case 0: // 选择财富目标
        return (
          <GoalAssessment 
            goals={wealthGoals} 
            loading={loading.goals}
            onSelect={handleGoalSelect}
          />
        );
        
      case 1: // 风险偏好分析
        return (
          <RiskAnalysis 
            questions={riskQuestions}
            loading={loading.questions}
            onComplete={handleRiskComplete}
            onPrev={handlePrevStep}
          />
        );
        
      case 2: // 资产配置建议
        return (
          <AssetAllocation
            allocation={assetAllocation}
            loading={loading.allocation}
            investmentAmount={investmentAmount}
            onNext={handleAllocationNext}
            onPrev={handlePrevStep}
          />
        );
        
      case 3: // 产品推荐
        return (
          <ProductRecommendation
            recommendations={productRecommendations}
            loading={loading.products}
            investmentAmount={investmentAmount}
            onNext={handleProductNext}
            onPrev={handlePrevStep}
          />
        );
        
      case 4: // 绩效回顾
        return (
          <PerformanceReview
            projection={performanceProjection}
            investmentPlan={wealthPlan}
            loading={loading.performance || loading.plan}
            onComplete={handleComplete}
            onPrev={handlePrevStep}
            onSave={handleSavePlan}
          >
            <div className="action-buttons">
              <Button 
                type="default" 
                icon={<ArrowLeftOutlined />} 
                onClick={handlePrevStep}>
                上一步
              </Button>
              <Space>
                <Button 
                  type="primary" 
                  icon={<CloudUploadOutlined />}
                  onClick={handleExportToDataOutput}>
                  导出到数据输出
                </Button>
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />} 
                  onClick={handleComplete}>
                  完成规划
                </Button>
              </Space>
            </div>
          </PerformanceReview>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="wealth-advisor-page">

      <div className="page-header">
        {currentStep >= 2 && (
          <div className="investment-amount">
            <Space align="center">
              <Text strong>投资金额：</Text>
              <InputNumber
                min={100000}
                max={10000000}
                step={100000}
                style={{ width: 200 }}
                formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\¥\s?|(,*)/g, '')}
                value={investmentAmount}
                onChange={handleAmountChange}
              />
            </Space>
          </div>
        )}
      </div>
      
      <div className="steps-container" ref={stepsRef}>
        <Steps current={currentStep}>
          <Step title="选择财富目标" icon={<SafetyOutlined />} />
          <Step title="风险偏好分析" icon={<UserOutlined />} />
          <Step title="资产配置建议" icon={<PieChartOutlined />} />
          <Step title="产品推荐" icon={<ShoppingOutlined />} />
          <Step title="绩效预测与分析" icon={<LineChartOutlined />} />
        </Steps>
      </div>
      
      <div className="step-content">
        {renderStepContent()}
      </div>
      
      <style jsx>{`
        .wealth-advisor-page {
          padding: 24px;
        }
        
        .breadcrumb {
          margin-bottom: 16px;
        }
        
        .page-header {
          margin-bottom: 24px;
          position: relative;
        }
        
        .investment-amount {
          position: absolute;
          right: 0;
          top: 0;
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
        
        .action-buttons {
          margin-top: 24px;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default WealthAdvisorPage;

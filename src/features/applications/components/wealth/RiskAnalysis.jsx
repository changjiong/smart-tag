import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Form, 
  Radio, 
  Button, 
  Progress, 
  Spin, 
  Alert, 
  Space,
  Divider,
  Row,
  Col,
  Result
} from 'antd';
import { SafetyOutlined, ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

/**
 * 风险偏好分析组件
 * 通过问卷评估客户的风险承受能力
 */
const RiskAnalysis = ({ 
  questions, 
  loading, 
  onComplete, 
  onPrev,
  initialAnswers = {} 
}) => {
  const [form] = Form.useForm();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [riskResult, setRiskResult] = useState(null);
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">加载风险评估问卷...</div>
      </div>
    );
  }
  
  if (!questions || questions.length === 0) {
    return (
      <Alert
        message="无法加载风险评估问卷"
        description="暂时无法获取风险评估问题，请稍后再试。"
        type="error"
        showIcon
      />
    );
  }
  
  // 处理选项变更
  const handleOptionChange = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
  };
  
  // 处理下一题
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRiskScore();
    }
  };
  
  // 处理上一题
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onPrev();
    }
  };
  
  // 计算风险评分
  const calculateRiskScore = () => {
    const totalScore = questions.reduce((sum, question) => {
      const answer = answers[question.id];
      if (!answer) return sum;
      
      const selectedOption = question.options.find(opt => opt.value === answer);
      return sum + (selectedOption ? selectedOption.score : 0);
    }, 0);
    
    // 根据总分确定风险等级
    if (totalScore <= 8) {
      setRiskResult({
        level: 1,
        name: '保守型',
        color: '#52c41a',
        description: '您的风险承受能力较低，适合配置以保本保息为主的低风险投资产品。',
        suggestion: '建议以固定收益类产品为主，股票等高风险资产配置比例不超过20%。'
      });
    } else if (totalScore <= 13) {
      setRiskResult({
        level: 2,
        name: '稳健型',
        color: '#85d13b',
        description: '您能够承受少量的投资风险，适合配置稳健型的投资组合。',
        suggestion: '建议固定收益类产品占比60-80%，股票等高风险资产配置比例不超过40%。'
      });
    } else if (totalScore <= 18) {
      setRiskResult({
        level: 3,
        name: '平衡型',
        color: '#faad14',
        description: '您能够承受中等程度的投资风险，适合配置均衡的投资组合。',
        suggestion: '建议固定收益类产品与股票类资产大致均衡配置，另类投资可少量参与。'
      });
    } else if (totalScore <= 22) {
      setRiskResult({
        level: 4,
        name: '成长型',
        color: '#fa8c16',
        description: '您能够承受较高的投资风险，适合配置以追求资本增值为主的投资组合。',
        suggestion: '建议股票类资产配置比例在60%左右，固定收益类产品作为战略配置，另类投资可适量参与。'
      });
    } else {
      setRiskResult({
        level: 5,
        name: '进取型',
        color: '#f5222d',
        description: '您能够承受高风险，适合配置以追求较高回报为目标的投资组合。',
        suggestion: '建议股票类资产配置比例在80%左右，全球化资产配置，可积极参与另类投资机会。'
      });
    }
  };
  
  // 重新评估
  const handleReassess = () => {
    setRiskResult(null);
    setCurrentQuestion(0);
  };
  
  // 完成评估
  const handleComplete = () => {
    if (riskResult) {
      onComplete(riskResult);
    }
  };
  
  // 如果已有结果，显示结果页
  if (riskResult) {
    return (
      <div className="risk-result">
        <Result
          icon={<SafetyOutlined style={{ color: riskResult.color }} />}
          title={`您的风险偏好类型：${riskResult.name}`}
          subTitle={`风险等级：${riskResult.level}/5`}
        />
        
        <Row justify="center" style={{ marginBottom: 24 }}>
          <Col span={16}>
            <Card>
              <div style={{ marginBottom: 16 }}>
                <Text strong>风险承受能力：</Text>
                <Progress 
                  percent={riskResult.level * 20} 
                  strokeColor={riskResult.color}
                  format={() => `${riskResult.level}/5`}
                />
              </div>
              
              <Paragraph>{riskResult.description}</Paragraph>
              
              <Divider />
              
              <Title level={5}>投资建议</Title>
              <Paragraph>{riskResult.suggestion}</Paragraph>
            </Card>
          </Col>
        </Row>
        
        <div className="action-buttons">
          <Button 
            type="default" 
            icon={<ArrowLeftOutlined />} 
            onClick={handleReassess}>
            重新评估
          </Button>
          <Button 
            type="primary" 
            icon={<ArrowRightOutlined />} 
            onClick={handleComplete}>
            继续
          </Button>
        </div>
      </div>
    );
  }
  
  // 当前问题
  const question = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);
  
  return (
    <div className="risk-analysis">
      <Title level={4}>风险偏好评估</Title>
      <Paragraph type="secondary">
        请回答以下问题，帮助我们了解您的风险承受能力和投资偏好
      </Paragraph>
      
      <Progress 
        percent={progress} 
        status="active" 
        style={{ marginBottom: 24 }} 
      />
      
      <Card>
        <Form form={form} layout="vertical">
          <Form.Item label={<Text strong>{`${currentQuestion + 1}. ${question.question}`}</Text>}>
            <Radio.Group
              value={answers[question.id]}
              onChange={(e) => handleOptionChange(question.id, e.target.value)}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {question.options.map((option) => (
                  <Radio key={option.value} value={option.value}>
                    {option.text}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Card>
      
      <div className="action-buttons">
        <Button 
          type="default" 
          icon={<ArrowLeftOutlined />} 
          onClick={handlePrev}>
          {currentQuestion === 0 ? '返回' : '上一题'}
        </Button>
        <Button 
          type="primary" 
          icon={<ArrowRightOutlined />} 
          onClick={handleNext}
          disabled={!answers[question.id]}>
          {currentQuestion < questions.length - 1 ? '下一题' : '完成评估'}
        </Button>
      </div>
      
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 0;
        }
        
        .loading-text {
          margin-top: 16px;
        }
        
        .risk-analysis {
          padding: 0 0 20px;
        }
        
        .action-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
        }
        
        .risk-result {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default RiskAnalysis;

import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Spin, Avatar, Tooltip, Drawer, Card, Tag, Typography } from 'antd';
import { 
  RobotOutlined, 
  CloseOutlined, 
  SendOutlined, 
  SoundOutlined,
  AudioOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  UsergroupAddOutlined,
  TagsOutlined,
  ApartmentOutlined,
  BarChartOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// 导入AI服务
import { getAssistantResponse } from '../../services/aiService';

const { TextArea } = Input;
const { Paragraph, Text } = Typography;

// 消息类型
const MessageType = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system'
};

// 消息建议类型
const SuggestionType = {
  NAVIGATION: 'navigation',  // 导航到特定页面
  ACTION: 'action',          // 执行特定操作
  QUESTION: 'question'       // 提问问题
};

const AIAssistant = ({ dashboardData }) => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([{
    type: MessageType.ASSISTANT,
    content: '您好，我是您的智能助手。您可以咨询标签、客群、业务应用等相关问题，或者点击下方建议快速开始。',
    timestamp: new Date()
  }]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([
    {
      type: SuggestionType.QUESTION,
      text: '如何创建标签？',
      action: '如何创建标签？'
    },
    {
      type: SuggestionType.QUESTION,
      text: '智能分群怎么使用？',
      action: '智能分群怎么使用？'
    },
    {
      type: SuggestionType.NAVIGATION,
      text: '查看营销转化率',
      action: '/applications/business/marketing-engine'
    },
    {
      type: SuggestionType.NAVIGATION,
      text: '分析流失风险',
      action: '/applications/business/retention-assistant'
    }
  ]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // 根据仪表盘数据动态生成建议
  useEffect(() => {
    if (dashboardData) {
      const newSuggestions = [];
      
      // 添加基于仪表盘指标的建议
      if (dashboardData.conversionRate && dashboardData.conversionTrend < 0) {
        newSuggestions.push({
          type: SuggestionType.QUESTION,
          text: '为什么转化率下降了？',
          action: `分析为什么营销转化率下降了${Math.abs(dashboardData.conversionTrend).toFixed(2)}%？`
        });
      }
      
      if (dashboardData.churnRate && dashboardData.churnTrend > 0) {
        newSuggestions.push({
          type: SuggestionType.NAVIGATION,
          text: '查看流失客户分析',
          action: '/applications/business/retention-assistant'
        });
      }
      
      if (dashboardData.tagAlerts && dashboardData.tagAlerts.length > 0) {
        newSuggestions.push({
          type: SuggestionType.QUESTION,
          text: '有哪些标签质量问题？',
          action: '分析当前标签质量问题及解决方案'
        });
      }
      
      // 如果有新建议，更新建议列表
      if (newSuggestions.length > 0) {
        setSuggestions(prevSuggestions => {
          // 保留原有建议，但确保总数不超过5个
          const combinedSuggestions = [...newSuggestions, ...prevSuggestions];
          return combinedSuggestions.slice(0, 5);
        });
      }
    }
  }, [dashboardData]);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 打开抽屉时自动聚焦到输入框
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [visible]);

  // 处理消息发送
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      type: MessageType.USER,
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // 调用AI服务获取回复
      const response = await getAssistantResponse(input, messages, dashboardData);
      
      const assistantMessage = {
        type: MessageType.ASSISTANT,
        content: response.text,
        suggestions: response.suggestions,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // 更新建议按钮
      if (response.suggestions && response.suggestions.length > 0) {
        setSuggestions(response.suggestions);
      }
      
      // 如果需要导航，自动跳转
      if (response.navigateTo) {
        setTimeout(() => {
          navigate(response.navigateTo);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to get assistant response', error);
      
      setMessages(prev => [...prev, {
        type: MessageType.SYSTEM,
        content: '抱歉，我遇到了一些问题，请稍后再试。',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  // 处理建议点击
  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === SuggestionType.NAVIGATION) {
      // 导航到特定页面
      navigate(suggestion.action);
      setVisible(false);
    } else if (suggestion.type === SuggestionType.QUESTION || suggestion.type === SuggestionType.ACTION) {
      // 自动输入问题或执行操作
      setInput(suggestion.action);
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    }
  };

  // 处理语音识别（模拟）
  const handleVoiceInput = () => {
    setLoading(true);
    
    // 模拟语音识别过程
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: MessageType.SYSTEM,
        content: '正在识别语音...',
        timestamp: new Date()
      }]);
      
      // 模拟语音识别结果
      setTimeout(() => {
        const recognizedText = '我想了解最近的营销活动效果';
        setInput(recognizedText);
        setLoading(false);
        
        setMessages(prev => {
          // 移除"正在识别语音"的消息
          const newMessages = [...prev];
          newMessages.pop();
          return newMessages;
        });
      }, 2000);
    }, 1000);
  };

  // 渲染消息气泡
  const renderMessage = (message, index) => {
    const { type, content, timestamp } = message;
    
    switch (type) {
      case MessageType.USER:
        return (
          <div className="message-item user-message" key={index}>
            <div className="message-content">
              <Paragraph>{content}</Paragraph>
              <div className="message-timestamp">
                {timestamp.toLocaleTimeString()}
              </div>
            </div>
            <Avatar className="message-avatar">您</Avatar>
          </div>
        );
        
      case MessageType.ASSISTANT:
        return (
          <div className="message-item assistant-message" key={index}>
            <Avatar className="message-avatar" icon={<RobotOutlined />} />
            <div className="message-content">
              <Paragraph>{content}</Paragraph>
              
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="message-suggestions">
                  {message.suggestions.map((suggestion, i) => (
                    <Tag 
                      key={i}
                      color="blue"
                      className="message-suggestion-tag"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.text}
                    </Tag>
                  ))}
                </div>
              )}
              
              <div className="message-timestamp">
                {timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        );
        
      case MessageType.SYSTEM:
        return (
          <div className="message-item system-message" key={index}>
            <div className="system-content">
              <Text type="secondary">{content}</Text>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // 渲染浮动按钮与抽屉
  return (
    <>
      {/* 浮动按钮 */}
      {!visible && (
        <Tooltip title="智能助手" placement="left">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<RobotOutlined />}
            className="ai-assistant-floating-button"
            onClick={() => setVisible(true)}
          />
        </Tooltip>
      )}
      
      {/* 抽屉式聊天界面 */}
      <Drawer
        title={
          <div className="assistant-drawer-header">
            <div className="assistant-title">
              <RobotOutlined /> 智能助手
            </div>
            <div className="assistant-actions">
              <Tooltip title="设置">
                <Button type="text" icon={<SettingOutlined />} />
              </Tooltip>
              <Tooltip title="帮助">
                <Button type="text" icon={<QuestionCircleOutlined />} />
              </Tooltip>
              <Button type="text" icon={<CloseOutlined />} onClick={() => setVisible(false)} />
            </div>
          </div>
        }
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        width={400}
        className="ai-assistant-drawer"
        footer={
          <div className="assistant-footer">
            <div className="input-container">
              <TextArea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入您的问题..."
                autoSize={{ minRows: 1, maxRows: 3 }}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="input-actions">
                <Tooltip title="语音输入">
                  <Button type="text" icon={<AudioOutlined />} onClick={handleVoiceInput} />
                </Tooltip>
                <Button 
                  type="primary" 
                  icon={<SendOutlined />} 
                  onClick={handleSendMessage}
                  disabled={!input.trim() || loading}
                />
              </div>
            </div>
            <div className="suggestion-container">
              {suggestions.map((suggestion, index) => {
                let icon;
                switch (suggestion.type) {
                  case SuggestionType.NAVIGATION:
                    icon = <ApartmentOutlined />;
                    break;
                  case SuggestionType.ACTION:
                    icon = <BarChartOutlined />;
                    break;
                  case SuggestionType.QUESTION:
                    icon = <MessageOutlined />;
                    break;
                  default:
                    icon = <QuestionCircleOutlined />;
                }
                
                return (
                  <Button
                    key={index}
                    className="suggestion-button"
                    icon={icon}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.text}
                  </Button>
                );
              })}
            </div>
          </div>
        }
      >
        <div className="assistant-body">
          <div className="quick-actions">
            <Card title="常用功能" size="small">
              <div className="quick-action-buttons">
                <Button icon={<TagsOutlined />} onClick={() => navigate('/tags/creation/ai')}>
                  创建标签
                </Button>
                <Button icon={<UsergroupAddOutlined />} onClick={() => navigate('/portrait/groups/ai')}>
                  智能分群
                </Button>
                <Button icon={<BarChartOutlined />} onClick={() => navigate('/applications/business/marketing-engine')}>
                  精准营销
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="messages-container">
            {messages.map((message, index) => renderMessage(message, index))}
            {loading && (
              <div className="message-item assistant-message">
                <Avatar className="message-avatar" icon={<RobotOutlined />} />
                <div className="message-content loading-content">
                  <Spin size="small" />
                  <Text type="secondary" style={{ marginLeft: 10 }}>正在思考...</Text>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </Drawer>
      
      <style jsx>{`
        .ai-assistant-floating-button {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 1000;
          width: 60px;
          height: 60px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .ai-assistant-drawer .ant-drawer-body {
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        
        .assistant-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        
        .assistant-title {
          font-weight: 500;
          font-size: 16px;
        }
        
        .assistant-actions {
          display: flex;
          gap: 4px;
        }
        
        .assistant-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }
        
        .quick-actions {
          padding: 16px;
          background-color: #f5f5f5;
        }
        
        .quick-action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .message-item {
          display: flex;
          max-width: 85%;
        }
        
        .user-message {
          flex-direction: row-reverse;
          align-self: flex-end;
        }
        
        .assistant-message {
          align-self: flex-start;
        }
        
        .system-message {
          align-self: center;
        }
        
        .message-avatar {
          flex-shrink: 0;
          margin: 0 8px;
        }
        
        .message-content {
          padding: 12px;
          border-radius: 8px;
          background-color: #f0f2f5;
          position: relative;
        }
        
        .user-message .message-content {
          background-color: #e6f7ff;
        }
        
        .system-content {
          padding: 8px 12px;
          border-radius: 16px;
          background-color: #f0f0f0;
          text-align: center;
        }
        
        .message-timestamp {
          font-size: 11px;
          color: #999;
          margin-top: 4px;
          text-align: right;
        }
        
        .message-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        
        .message-suggestion-tag {
          cursor: pointer;
        }
        
        .assistant-footer {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          border-top: 1px solid #f0f0f0;
          background-color: #fff;
        }
        
        .input-container {
          display: flex;
          gap: 8px;
        }
        
        .input-container .ant-input {
          flex: 1;
        }
        
        .input-actions {
          display: flex;
          gap: 4px;
          align-items: flex-end;
        }
        
        .suggestion-container {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        
        .suggestion-button {
          font-size: 12px;
          height: 28px;
          padding: 0 8px;
        }
        
        .loading-content {
          display: flex;
          align-items: center;
          min-height: 40px;
        }
      `}</style>
    </>
  );
};

export default AIAssistant; 
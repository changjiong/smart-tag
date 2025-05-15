import React, { useState } from 'react';
import { 
  Typography, 
  Card, 
  Tabs, 
  Checkbox, 
  Button, 
  Space, 
  Tag, 
  Alert,
  Spin,
  Row,
  Col,
  Form,
  Input,
  Select,
  Divider,
  Rate,
  Tooltip,
  Badge
} from 'antd';
import { 
  MessageOutlined, 
  EditOutlined, 
  CheckCircleOutlined,
  FileTextOutlined,
  SendOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  InfoCircleOutlined,
  HighlightOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

/**
 * 营销内容生成器组件
 * 展示系统推荐的营销内容，支持用户编辑和选择
 */
const ContentGenerator = ({ 
  contents = [], 
  selectedContents = [], 
  onChange, 
  loading = false,
  onNext,
  onPrev 
}) => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [editingContent, setEditingContent] = useState(null);
  const [form] = Form.useForm();
  
  // 处理内容选择变更
  const handleContentSelectionChange = (contentId, checked) => {
    const newSelectedContents = checked
      ? [...selectedContents, contentId]
      : selectedContents.filter(id => id !== contentId);
    
    onChange(newSelectedContents);
  };
  
  // 开始编辑内容
  const handleEditContent = (content) => {
    setEditingContent(content);
    form.setFieldsValue({
      title: content.title,
      content: content.content,
      type: content.type
    });
  };
  
  // 保存编辑的内容
  const handleSaveEdit = () => {
    form.validateFields()
      .then(values => {
        // 这里应该调用后端API更新内容，但目前只是模拟
        console.log('Saving edited content:', values);
        setEditingContent(null);
        // 切换回推荐标签页
        setActiveTab('recommended');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  
  // 取消编辑
  const handleCancelEdit = () => {
    setEditingContent(null);
    form.resetFields();
  };
  
  // 渲染内容列表
  const renderContentList = () => {
    return (
      <Row gutter={[16, 16]}>
        {contents.map(content => (
          <Col xs={24} md={12} key={content.id}>
            <Card 
              title={
                <Space>
                  <Text strong>{content.title}</Text>
                  <Tag color="blue">{content.type}</Tag>
                </Space>
              }
              extra={
                <Checkbox 
                  checked={selectedContents.includes(content.id)}
                  onChange={(e) => handleContentSelectionChange(content.id, e.target.checked)}
                />
              }
              className={`content-card ${selectedContents.includes(content.id) ? 'content-card-selected' : ''}`}
            >
              <div className="content-tags">
                {content.tags.map((tag, index) => (
                  <Tag key={index} color="green">{tag}</Tag>
                ))}
                <Badge 
                  count={`${(content.effectiveness * 100).toFixed(0)}%`} 
                  style={{ backgroundColor: content.effectiveness >= 0.9 ? '#52c41a' : content.effectiveness >= 0.8 ? '#1890ff' : '#faad14' }}
                />
              </div>
              
              <div className="content-preview">
                <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: '展开' }}>
                  {content.content}
                </Paragraph>
              </div>
              
              <div className="content-actions">
                <Space>
                  <Tooltip title="编辑内容">
                    <Button 
                      type="text" 
                      icon={<EditOutlined />}
                      onClick={() => handleEditContent(content)}
                    >
                      编辑
                    </Button>
                  </Tooltip>
                  <Tooltip title="预览效果">
                    <Button 
                      type="text" 
                      icon={<FileTextOutlined />}
                      onClick={() => console.log('Preview content:', content)}
                    >
                      预览
                    </Button>
                  </Tooltip>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };
  
  // 渲染编辑表单
  const renderEditForm = () => {
    if (!editingContent) return null;
    
    return (
      <Card title="编辑营销内容" className="edit-form-card">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            title: editingContent.title,
            content: editingContent.content,
            type: editingContent.type
          }}
        >
          <Form.Item
            name="title"
            label="内容标题"
            rules={[{ required: true, message: '请输入内容标题' }]}
          >
            <Input placeholder="请输入内容标题" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="内容类型"
            rules={[{ required: true, message: '请选择内容类型' }]}
          >
            <Select placeholder="请选择内容类型">
              <Option value="短信">短信</Option>
              <Option value="微信">微信</Option>
              <Option value="手机银行">手机银行</Option>
              <Option value="APP推送">APP推送</Option>
              <Option value="电子邮件">电子邮件</Option>
              <Option value="电话">电话</Option>
              <Option value="社交媒体">社交媒体</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="content"
            label="内容正文"
            rules={[{ required: true, message: '请输入内容正文' }]}
          >
            <TextArea 
              placeholder="请输入内容正文" 
              autoSize={{ minRows: 6, maxRows: 12 }}
            />
          </Form.Item>
          
          <Form.Item label="参数说明">
            <Alert
              message="使用花括号{}包裹的是可替换参数，例如{customerName}会在发送时替换为客户的实际姓名"
              type="info"
              showIcon
            />
          </Form.Item>
          
          <Form.Item label="内容评估">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text>个性化程度：</Text>
                <Rate disabled defaultValue={4} />
              </div>
              <div>
                <Text>相关性：</Text>
                <Rate disabled defaultValue={5} />
              </div>
              <div>
                <Text>预期效果：</Text>
                <Rate disabled defaultValue={4} />
              </div>
            </Space>
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" onClick={handleSaveEdit}>
                保存
              </Button>
              <Button onClick={handleCancelEdit}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    );
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="loading-text">加载推荐内容...</div>
      </div>
    );
  }
  
  return (
    <div className="content-generator">
      <Title level={4}>定制营销内容</Title>
      <Paragraph type="secondary">
        系统已根据营销目标和选定客群推荐了以下内容，您可以选择或编辑这些内容
      </Paragraph>
      
      <Alert
        message="内容个性化提示"
        description="使用花括号{}包裹的参数（如{customerName}）会在发送时自动替换为客户的实际信息，提高个性化程度。"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="content-tabs"
      >
        <TabPane 
          tab={<span><CheckCircleOutlined />推荐内容</span>} 
          key="recommended"
          disabled={!!editingContent}
        >
          {renderContentList()}
        </TabPane>
        <TabPane 
          tab={<span><EditOutlined />编辑内容</span>} 
          key="edit"
          disabled={!editingContent}
        >
          {renderEditForm()}
        </TabPane>
        <TabPane 
          tab={<span><HighlightOutlined />自定义内容</span>} 
          key="custom"
          disabled={!!editingContent}
        >
          <Alert
            message="创建自定义内容"
            description="您可以在这里创建全新的营销内容，或者基于系统推荐内容进行深度定制。"
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
            action={
              <Button size="small" type="primary">
                创建新内容
              </Button>
            }
          />
        </TabPane>
      </Tabs>
      
      <Divider />
      
      <div className="content-summary">
        <Title level={5}>已选择内容摘要</Title>
        {selectedContents.length > 0 ? (
          <div className="selected-contents">
            {contents
              .filter(content => selectedContents.includes(content.id))
              .map(content => (
                <div key={content.id} className="selected-content-item">
                  <Space>
                    <Tag color="blue">{content.type}</Tag>
                    <Text>{content.title}</Text>
                    <Tag color="green">{(content.effectiveness * 100).toFixed(0)}%有效性</Tag>
                  </Space>
                </div>
              ))
            }
          </div>
        ) : (
          <Alert
            message="尚未选择任何内容"
            description="请至少选择一种营销内容以继续"
            type="warning"
            showIcon
          />
        )}
      </div>
      
      <div className="content-generator-actions">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onPrev}
          disabled={!!editingContent}
        >
          上一步
        </Button>
        <Button 
          type="primary" 
          icon={<ArrowRightOutlined />} 
          onClick={onNext}
          disabled={selectedContents.length === 0 || !!editingContent}
        >
          下一步
        </Button>
      </div>
      
      <style jsx>{`
        .content-generator {
          padding: 0 0 20px;
        }
        
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
        
        .content-tabs {
          margin-top: 16px;
        }
        
        .content-card {
          margin-bottom: 16px;
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .content-card-selected {
          border-color: #1890ff;
          box-shadow: 0 0 8px rgba(24, 144, 255, 0.2);
        }
        
        .content-tags {
          margin-bottom: 8px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px;
        }
        
        .content-preview {
          background-color: #fafafa;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 12px;
        }
        
        .content-actions {
          display: flex;
          justify-content: flex-end;
        }
        
        .edit-form-card {
          margin-bottom: 16px;
        }
        
        .content-summary {
          margin: 16px 0;
        }
        
        .selected-contents {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .selected-content-item {
          padding: 8px 12px;
          background-color: #f5f5f5;
          border-radius: 4px;
        }
        
        .content-generator-actions {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default ContentGenerator; 
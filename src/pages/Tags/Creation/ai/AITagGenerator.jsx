import React, { useState } from 'react';
import { 
  Card, 
  Input, 
  Button, 
  Steps, 
  Form, 
  Select, 
  Upload, 
  message, 
  Spin, 
  Divider,
  Typography,
  Space,
  Tag
} from 'antd';
import { 
  UploadOutlined, 
  SendOutlined, 
  RobotOutlined,
  FileExcelOutlined,
  DatabaseOutlined,
  TagsOutlined,
  FormOutlined
} from '@ant-design/icons';
import TagPreviewCard from './TagPreviewCard';
import RequirementAnalyzer from './RequirementAnalyzer';
import { generateTagsFromRequirements } from '../../../../services/aiTagService';

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { Option } = Select;

// 数据源类型
const DATA_SOURCE_TYPES = {
  DESCRIPTION: 'description',
  UPLOAD: 'upload',
  DATABASE: 'database'
};

// 简化的业务领域选项
const BUSINESS_DOMAINS = [
  { label: '零售金融', value: 'retail' },
  { label: '对公业务', value: 'corporate' },
  { label: '风险管理', value: 'risk' },
  { label: '客户服务', value: 'service' },
  { label: '运营管理', value: 'operations' }
];

const AITagGenerator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataSourceType, setDataSourceType] = useState(DATA_SOURCE_TYPES.DESCRIPTION);
  const [businessRequirement, setBusinessRequirement] = useState('');
  const [generatedTags, setGeneratedTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  
  // 处理需求提交
  const handleRequirementSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      // 准备输入参数
      const input = {
        businessRequirement: values.businessRequirement,
        businessDomain: values.businessDomain,
        dataSourceType,
        dataSource: dataSourceType === DATA_SOURCE_TYPES.UPLOAD ? values.file?.fileList : 
                   dataSourceType === DATA_SOURCE_TYPES.DATABASE ? values.databaseTable : null
      };
      
      // 调用AI生成服务
      const result = await generateTagsFromRequirements(input);
      
      // 更新生成的标签
      setGeneratedTags(result.tags);
      
      // 默认选择所有生成的标签
      setSelectedTags(result.tags.map(tag => tag.id));
      
      // 进入预览步骤
      setCurrentStep(1);
      message.success('标签生成成功，请检查预览效果');
    } catch (error) {
      message.error('生成标签失败: ' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };
  
  // 处理标签选择
  const handleTagSelectionChange = (tagId, checked) => {
    if (checked) {
      setSelectedTags(prev => [...prev, tagId]);
    } else {
      setSelectedTags(prev => prev.filter(id => id !== tagId));
    }
  };
  
  // 处理保存标签
  const handleSaveTags = async () => {
    setLoading(true);
    try {
      // 筛选已选择的标签
      const tagsToSave = generatedTags.filter(tag => selectedTags.includes(tag.id));
      
      // TODO: 这里应该调用API保存标签
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      message.success('标签保存成功，已添加到标签管理');
      
      // 进入完成步骤
      setCurrentStep(2);
    } catch (error) {
      message.error('保存标签失败: ' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };
  
  // 重新开始
  const handleReset = () => {
    setCurrentStep(0);
    setGeneratedTags([]);
    setSelectedTags([]);
    form.resetFields();
  };
  
  // 渲染需求输入步骤
  const renderRequirementStep = () => {
    return (
      <Card className="requirement-card">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            businessDomain: 'retail',
            businessRequirement: ''
          }}
        >
          <Form.Item
            name="businessDomain"
            label="业务领域"
            rules={[{ required: true, message: '请选择业务领域' }]}
          >
            <Select placeholder="选择标签应用的业务领域">
              {BUSINESS_DOMAINS.map(domain => (
                <Option key={domain.value} value={domain.value}>{domain.label}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Divider orientation="left">数据来源</Divider>
          
          <div className="data-source-selector">
            <Space>
              <Button 
                type={dataSourceType === DATA_SOURCE_TYPES.DESCRIPTION ? 'primary' : 'default'}
                icon={<FormOutlined />}
                onClick={() => setDataSourceType(DATA_SOURCE_TYPES.DESCRIPTION)}
              >
                业务描述
              </Button>
              <Button 
                type={dataSourceType === DATA_SOURCE_TYPES.UPLOAD ? 'primary' : 'default'}
                icon={<UploadOutlined />}
                onClick={() => setDataSourceType(DATA_SOURCE_TYPES.UPLOAD)}
              >
                上传文件
              </Button>
              <Button 
                type={dataSourceType === DATA_SOURCE_TYPES.DATABASE ? 'primary' : 'default'}
                icon={<DatabaseOutlined />}
                onClick={() => setDataSourceType(DATA_SOURCE_TYPES.DATABASE)}
              >
                选择数据表
              </Button>
            </Space>
          </div>
          
          {dataSourceType === DATA_SOURCE_TYPES.DESCRIPTION && (
            <Form.Item
              name="businessRequirement"
              label="业务需求描述"
              rules={[{ required: true, message: '请输入业务需求' }]}
            >
              <TextArea
                rows={6}
                placeholder="请详细描述您的业务需求，例如：'需要识别高价值客户，用于精准营销活动'"
                onChange={e => setBusinessRequirement(e.target.value)}
              />
            </Form.Item>
          )}
          
          {dataSourceType === DATA_SOURCE_TYPES.UPLOAD && (
            <Form.Item
              name="file"
              label="上传数据文件"
              rules={[{ required: true, message: '请上传数据文件' }]}
            >
              <Upload.Dragger 
                name="files" 
                action="/api/upload" // 实际项目中应替换为真实的上传接口
                accept=".csv,.xlsx,.xls"
                maxCount={1}
                beforeUpload={() => false} // 阻止自动上传，由表单统一处理
              >
                <p className="ant-upload-drag-icon">
                  <FileExcelOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                <p className="ant-upload-hint">支持 Excel 或 CSV 格式的数据文件</p>
              </Upload.Dragger>
            </Form.Item>
          )}
          
          {dataSourceType === DATA_SOURCE_TYPES.DATABASE && (
            <Form.Item
              name="databaseTable"
              label="选择数据表"
              rules={[{ required: true, message: '请选择数据表' }]}
            >
              <Select placeholder="选择数据表">
                <Option value="customer">客户信息表</Option>
                <Option value="transaction">交易记录表</Option>
                <Option value="product">产品信息表</Option>
                <Option value="account">账户信息表</Option>
              </Select>
            </Form.Item>
          )}
        </Form>
        
        {businessRequirement && (
          <>
            <Divider orientation="left">需求分析</Divider>
            <RequirementAnalyzer requirement={businessRequirement} />
          </>
        )}
        
        <div className="step-actions">
          <Button 
            type="primary" 
            icon={<RobotOutlined />} 
            onClick={handleRequirementSubmit}
            loading={loading}
          >
            智能生成标签
          </Button>
        </div>
      </Card>
    );
  };
  
  // 渲染预览步骤
  const renderPreviewStep = () => {
    return (
      <div className="preview-container">
        <Card title="AI生成的标签方案" className="preview-card">
          <Paragraph>
            根据您的业务需求，AI生成了以下标签方案，请选择需要保存的标签：
          </Paragraph>
          
          <div className="tag-selection-header">
            <Space>
              <Text>已选择 {selectedTags.length} 个标签</Text>
              <Button 
                type="link" 
                onClick={() => setSelectedTags(generatedTags.map(tag => tag.id))}
              >
                全选
              </Button>
              <Button 
                type="link" 
                onClick={() => setSelectedTags([])}
                disabled={selectedTags.length === 0}
              >
                取消全选
              </Button>
            </Space>
          </div>
          
          <div className="tags-grid">
            {generatedTags.map(tag => (
              <TagPreviewCard 
                key={tag.id}
                tag={tag}
                selected={selectedTags.includes(tag.id)}
                onSelectionChange={(checked) => handleTagSelectionChange(tag.id, checked)}
              />
            ))}
          </div>
          
          <div className="step-actions">
            <Space>
              <Button onClick={() => setCurrentStep(0)}>
                返回修改
              </Button>
              <Button 
                type="primary" 
                icon={<TagsOutlined />}
                onClick={handleSaveTags}
                loading={loading}
                disabled={selectedTags.length === 0}
              >
                保存所选标签
              </Button>
            </Space>
          </div>
        </Card>
      </div>
    );
  };
  
  // 渲染完成步骤
  const renderCompletionStep = () => {
    return (
      <Card className="completion-card">
        <div className="completion-content">
          <div className="completion-icon">✅</div>
          <Title level={3}>标签生成完成</Title>
          <Paragraph>
            您已成功创建了 {selectedTags.length} 个新标签，这些标签已经添加到标签管理中。
          </Paragraph>
          <div className="tags-summary">
            {generatedTags
              .filter(tag => selectedTags.includes(tag.id))
              .map(tag => (
                <Tag key={tag.id} color="blue">{tag.name}</Tag>
              ))
            }
          </div>
          <Paragraph>
            您可以在标签管理中查看和编辑这些标签，或者继续创建新的标签。
          </Paragraph>
          <div className="step-actions">
            <Space>
              <Button type="primary" onClick={handleReset}>
                继续创建
              </Button>
              <Button onClick={() => window.location.href = '/tags/management/info'}>
                前往标签管理
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    );
  };
  
  return (
    <div className="ai-tag-generator">
      <div className="page-header">
        <Title level={2}>
          <RobotOutlined /> 智能标签生成
        </Title>
        <Paragraph>
          通过AI技术，只需输入业务需求即可快速创建标签，提高标签创建效率和业务贴合度。
        </Paragraph>
      </div>
      
      <div className="step-progress">
        <Steps current={currentStep}>
          <Step title="输入需求" description="描述业务需要" />
          <Step title="预览标签" description="检查生成效果" />
          <Step title="完成" description="保存并使用" />
        </Steps>
      </div>
      
      <div className="step-content">
        {loading && currentStep === 0 && (
          <div className="loading-container">
            <Spin size="large" />
            <p>AI正在根据您的需求生成标签方案，请稍候...</p>
          </div>
        )}
        
        {!loading && (
          <>
            {currentStep === 0 && renderRequirementStep()}
            {currentStep === 1 && renderPreviewStep()}
            {currentStep === 2 && renderCompletionStep()}
          </>
        )}
      </div>
      
      <style jsx>{`
        .ai-tag-generator {
          padding: 20px;
        }
        
        .page-header {
          margin-bottom: 24px;
        }
        
        .step-progress {
          margin-bottom: 30px;
        }
        
        .requirement-card, 
        .preview-card, 
        .completion-card {
          margin-top: 20px;
        }
        
        .data-source-selector {
          margin-bottom: 20px;
        }
        
        .step-actions {
          margin-top: 24px;
          display: flex;
          justify-content: flex-end;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          text-align: center;
        }
        
        .loading-container p {
          margin-top: 16px;
        }
        
        .tags-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        
        .tag-selection-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        
        .completion-content {
          text-align: center;
          padding: 40px 0;
        }
        
        .completion-icon {
          font-size: 64px;
          margin-bottom: 24px;
        }
        
        .tags-summary {
          margin: 20px 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default AITagGenerator; 
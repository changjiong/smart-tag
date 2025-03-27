import React, { useState } from 'react';
import { 
  Typography, 
  Radio, 
  DatePicker, 
  Form, 
  Button, 
  Card, 
  Divider,
  Space,
  Select,
  Row,
  Col,
  Input,
  InputNumber,
  Checkbox,
  Collapse,
  Tooltip,
  Alert,
  Tag
} from 'antd';
import { 
  CalendarOutlined, 
  HistoryOutlined, 
  FilterOutlined,
  ArrowLeftOutlined,
  ThunderboltOutlined,
  PlusOutlined,
  DeleteOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Panel } = Collapse;

// 模拟过滤条件字段
const FILTER_FIELDS = [
  { value: 'age', label: '年龄', type: 'number' },
  { value: 'gender', label: '性别', type: 'enum', options: ['男', '女'] },
  { value: 'city', label: '城市', type: 'string' },
  { value: 'income', label: '收入', type: 'number' },
  { value: 'education', label: '学历', type: 'enum', options: ['高中及以下', '大专', '本科', '硕士', '博士'] },
  { value: 'profession', label: '职业', type: 'enum', options: ['公务员', '企业职员', '私营业主', '自由职业', '学生', '其他'] },
  { value: 'marital', label: '婚姻状况', type: 'enum', options: ['未婚', '已婚', '离异', '丧偶'] }
];

const DataRangeSelector = ({ 
  dataRange, 
  onDataRangeChange, 
  filters = [], 
  onFiltersChange,
  onPrev,
  onGenerate,
  generating = false
}) => {
  const [form] = Form.useForm();
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // 处理时间范围变更
  const handlePeriodChange = (e) => {
    const period = e.target.value;
    onDataRangeChange({ ...dataRange, period, customRange: null });
  };
  
  // 处理自定义日期范围变更
  const handleCustomRangeChange = (dates) => {
    onDataRangeChange({ ...dataRange, customRange: dates });
  };
  
  // 添加过滤条件
  const addFilter = () => {
    form.validateFields()
      .then(values => {
        const newFilter = {
          id: `filter_${Date.now()}`,
          field: values.field,
          operator: values.operator,
          value: values.filterValue
        };
        
        onFiltersChange([...filters, newFilter]);
        form.resetFields();
      })
      .catch(err => {
        console.log('Validation failed:', err);
      });
  };
  
  // 移除过滤条件
  const removeFilter = (filterId) => {
    onFiltersChange(filters.filter(f => f.id !== filterId));
  };
  
  // 根据字段类型获取操作符选项
  const getOperatorOptions = (fieldType) => {
    switch (fieldType) {
      case 'number':
        return [
          { value: 'eq', label: '等于' },
          { value: 'gt', label: '大于' },
          { value: 'lt', label: '小于' },
          { value: 'gte', label: '大于等于' },
          { value: 'lte', label: '小于等于' },
          { value: 'between', label: '区间' }
        ];
      case 'string':
        return [
          { value: 'eq', label: '等于' },
          { value: 'contains', label: '包含' },
          { value: 'startsWith', label: '开头是' },
          { value: 'endsWith', label: '结尾是' }
        ];
      case 'enum':
        return [
          { value: 'eq', label: '等于' },
          { value: 'in', label: '属于' }
        ];
      default:
        return [
          { value: 'eq', label: '等于' }
        ];
    }
  };
  
  // 渲染过滤条件值输入
  const renderFilterValueInput = () => {
    const fieldValue = form.getFieldValue('field');
    const operatorValue = form.getFieldValue('operator');
    if (!fieldValue) return null;
    
    const fieldInfo = FILTER_FIELDS.find(f => f.value === fieldValue);
    if (!fieldInfo) return null;
    
    const { type, options } = fieldInfo;
    
    switch (type) {
      case 'number':
        if (operatorValue === 'between') {
          return (
            <Input.Group compact>
              <Form.Item
                name={['filterValue', 'min']}
                noStyle
                rules={[{ required: true, message: '请输入最小值' }]}
              >
                <InputNumber placeholder="最小值" style={{ width: 100 }} />
              </Form.Item>
              <Input 
                style={{ width: 30, borderLeft: 0, borderRight: 0, pointerEvents: 'none', backgroundColor: '#fff' }}
                placeholder="~"
                disabled
              />
              <Form.Item
                name={['filterValue', 'max']}
                noStyle
                rules={[{ required: true, message: '请输入最大值' }]}
              >
                <InputNumber placeholder="最大值" style={{ width: 100 }} />
              </Form.Item>
            </Input.Group>
          );
        } else {
          return (
            <Form.Item
              name="filterValue"
              noStyle
              rules={[{ required: true, message: '请输入值' }]}
            >
              <InputNumber placeholder="请输入数值" style={{ width: 200 }} />
            </Form.Item>
          );
        }
        
      case 'enum':
        return (
          <Form.Item
            name="filterValue"
            noStyle
            rules={[{ required: true, message: '请选择值' }]}
          >
            {operatorValue === 'in' ? (
              <Select 
                placeholder="请选择"
                mode="multiple"
                style={{ width: 200 }}
              >
                {options?.map(opt => (
                  <Option key={opt} value={opt}>{opt}</Option>
                ))}
              </Select>
            ) : (
              <Select placeholder="请选择" style={{ width: 200 }}>
                {options?.map(opt => (
                  <Option key={opt} value={opt}>{opt}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
        );
        
      case 'string':
      default:
        return (
          <Form.Item
            name="filterValue"
            noStyle
            rules={[{ required: true, message: '请输入值' }]}
          >
            <Input placeholder="请输入" style={{ width: 200 }} />
          </Form.Item>
        );
    }
  };
  
  // 获取操作符显示名称
  const getOperatorLabel = (operator) => {
    const operatorMap = {
      eq: '等于',
      gt: '大于',
      lt: '小于',
      gte: '大于等于',
      lte: '小于等于',
      between: '区间',
      contains: '包含',
      startsWith: '开头是',
      endsWith: '结尾是',
      in: '属于'
    };
    return operatorMap[operator] || operator;
  };
  
  // 获取字段显示名称
  const getFieldLabel = (fieldValue) => {
    const field = FILTER_FIELDS.find(f => f.value === fieldValue);
    return field ? field.label : fieldValue;
  };
  
  // 当字段变化时重置操作符和值
  const handleFieldChange = () => {
    form.setFieldsValue({
      operator: undefined,
      filterValue: undefined
    });
  };
  
  // 当操作符变化时重置值
  const handleOperatorChange = () => {
    form.setFieldsValue({
      filterValue: undefined
    });
  };

  return (
    <div className="data-range-selector">
      <Title level={4}>设置数据范围和筛选条件</Title>
      <Paragraph type="secondary">
        设置需要分析的数据时间范围和客户筛选条件，以便生成更精准的客群
      </Paragraph>
      
      <Card title="数据时间范围" className="range-card">
        <Radio.Group 
          value={dataRange.period} 
          onChange={handlePeriodChange}
        >
          <Radio.Button value="recent7Days">最近7天</Radio.Button>
          <Radio.Button value="recent30Days">最近30天</Radio.Button>
          <Radio.Button value="recent3Months">最近3个月</Radio.Button>
          <Radio.Button value="recent6Months">最近6个月</Radio.Button>
          <Radio.Button value="recent1Year">最近1年</Radio.Button>
          <Radio.Button value="custom">自定义</Radio.Button>
        </Radio.Group>
        
        {dataRange.period === 'custom' && (
          <div className="custom-range">
            <RangePicker 
              value={dataRange.customRange}
              onChange={handleCustomRangeChange}
              locale={locale}
              style={{ marginTop: 16, width: 350 }}
            />
          </div>
        )}
      </Card>
      
      <Collapse
        expandIconPosition="end"
        onChange={(key) => setShowAdvanced(key.length > 0)}
        className="advanced-filters"
      >
        <Panel 
          header={
            <span>
              <FilterOutlined style={{ marginRight: 8 }} />
              高级筛选条件
              {filters.length > 0 && (
                <Tag color="blue" style={{ marginLeft: 8 }}>
                  {filters.length}个条件
                </Tag>
              )}
            </span>
          } 
          key="1"
        >
          {filters.length > 0 && (
            <div className="current-filters">
              <Title level={5}>当前筛选条件</Title>
              <Row gutter={[16, 16]}>
                {filters.map(filter => (
                  <Col span={24} key={filter.id}>
                    <Card size="small" className="filter-item">
                      <Space>
                        <Text strong>{getFieldLabel(filter.field)}</Text>
                        <Text>{getOperatorLabel(filter.operator)}</Text>
                        <Text>{
                          typeof filter.value === 'object' 
                            ? (filter.value.min + ' 至 ' + filter.value.max)
                            : (Array.isArray(filter.value) 
                              ? filter.value.join(', ') 
                              : filter.value.toString())
                        }</Text>
                        <Button 
                          type="text" 
                          danger 
                          icon={<DeleteOutlined />} 
                          onClick={() => removeFilter(filter.id)}
                          size="small"
                        />
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Divider />
            </div>
          )}
          
          <Form
            form={form}
            layout="inline"
            className="filter-form"
          >
            <Form.Item
              name="field"
              label="字段"
              rules={[{ required: true, message: '请选择字段' }]}
            >
              <Select 
                placeholder="选择字段" 
                style={{ width: 120 }}
                onChange={handleFieldChange}
              >
                {FILTER_FIELDS.map(field => (
                  <Option key={field.value} value={field.value}>{field.label}</Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="operator"
              label="条件"
              rules={[{ required: true, message: '请选择条件' }]}
            >
              <Select 
                placeholder="选择条件" 
                style={{ width: 120 }}
                onChange={handleOperatorChange}
                disabled={!form.getFieldValue('field')}
              >
                {form.getFieldValue('field') && 
                  getOperatorOptions(
                    FILTER_FIELDS.find(f => f.value === form.getFieldValue('field'))?.type
                  ).map(op => (
                    <Option key={op.value} value={op.value}>{op.label}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            
            <Form.Item
              name="filterValue"
              label="值"
              rules={[{ required: true, message: '请输入值' }]}
            >
              {renderFilterValueInput()}
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={addFilter}
                disabled={!form.getFieldValue('field') || !form.getFieldValue('operator')}
              >
                添加条件
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      
      <Alert
        message="提示"
        description="系统将根据所选时间范围和筛选条件，分析匹配的客户数据并智能生成客群。请根据业务需求合理设置条件，以获取最符合业务目标的客户群体。"
        type="info"
        showIcon
        style={{ marginTop: 16 }}
      />
      
      <div className="data-range-selector-actions">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onPrev}
        >
          上一步
        </Button>
        <Button 
          type="primary" 
          icon={<ThunderboltOutlined />} 
          onClick={onGenerate}
          loading={generating}
        >
          {generating ? '正在生成客群...' : '智能生成客群'}
        </Button>
      </div>
      
      <style jsx>{`
        .data-range-selector {
          padding: 0 0 20px;
        }
        
        .range-card {
          margin-bottom: 16px;
        }
        
        .custom-range {
          margin-top: 16px;
        }
        
        .advanced-filters {
          margin-bottom: 16px;
        }
        
        .filter-form {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        
        .current-filters {
          margin-bottom: 16px;
        }
        
        .filter-item {
          width: 100%;
          transition: all 0.3s;
        }
        
        .filter-item:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
        }
        
        .data-range-selector-actions {
          margin-top: 24px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default DataRangeSelector; 
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Input, 
  Tabs, 
  List, 
  Space, 
  Tag, 
  Typography, 
  Divider, 
  Empty, 
  Spin,
  Button,
  Pagination,
  Row,
  Col
} from 'antd';
import {
  TagOutlined,
  TeamOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

/**
 * 搜索结果页面
 * 展示标签、客群、应用等不同类型的搜索结果
 */
const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  // 搜索状态
  const [searchQuery, setSearchQuery] = useState(query);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // 搜索结果
  const [results, setResults] = useState({
    tags: [],
    groups: [],
    applications: [],
    documents: [],
  });
  
  // 分页
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  
  // 搜索过滤选项
  const [filters, setFilters] = useState({
    tagType: [],
    department: [],
    dateRange: null
  });
  
  // 模拟搜索数据
  const mockSearchData = {
    tags: [
      { 
        id: 1, 
        name: '高价值客户', 
        description: '近12个月贡献收入超过10万元的客户', 
        category: '客户价值', 
        owner: '数据中心',
        updateTime: '2025-05-01',
        type: '规则标签'
      },
      { 
        id: 2, 
        name: '流失风险客户', 
        description: '预测未来30天内有高概率流失的客户', 
        category: '风险预警', 
        owner: '客户服务部',
        updateTime: '2025-04-25',
        type: 'AI标签'
      },
      { 
        id: 3, 
        name: '理财产品偏好', 
        description: '客户对不同理财产品的偏好程度', 
        category: '客户偏好', 
        owner: '营销部',
        updateTime: '2025-04-15',
        type: '基础标签'
      }
    ],
    groups: [
      {
        id: 101,
        name: '高净值年轻客户',
        description: '35岁以下，资产超过100万的客户群体',
        creator: '营销部-李四',
        createTime: '2025-05-02',
        memberCount: 3420
      },
      {
        id: 102,
        name: '理财潜力客户',
        description: '当前资产中等但有较大理财需求和增长潜力的客户',
        creator: '理财中心-王五',
        createTime: '2025-04-28',
        memberCount: 8750
      }
    ],
    applications: [
      {
        id: 201,
        name: '精准营销活动',
        type: '营销场景',
        description: '基于客户标签数据的精准营销推荐引擎',
        owner: '营销部',
        updateTime: '2025-05-05'
      },
      {
        id: 202,
        name: '客户流失预警',
        type: '风险管理',
        description: '识别潜在流失客户并提供干预建议',
        owner: '客户服务部',
        updateTime: '2025-04-20'
      }
    ],
    documents: [
      {
        id: 301,
        title: '客户标签体系使用指南',
        type: '技术文档',
        updateTime: '2025-04-10',
        department: '数据中心'
      },
      {
        id: 302,
        title: '客群画像分析最佳实践',
        type: '业务指南',
        updateTime: '2025-03-25',
        department: '业务创新中心'
      }
    ]
  };
  
  // 执行搜索
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);
  
  // 模拟搜索API调用
  const performSearch = (query) => {
    setLoading(true);
    
    // 模拟API延迟
    setTimeout(() => {
      // 简单的过滤逻辑，实际项目中应使用后端搜索
      const filterResults = (items) => {
        return items.filter(item => 
          item.name?.toLowerCase().includes(query.toLowerCase()) || 
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.title?.toLowerCase().includes(query.toLowerCase())
        );
      };
      
      const tagResults = filterResults(mockSearchData.tags);
      const groupResults = filterResults(mockSearchData.groups);
      const appResults = filterResults(mockSearchData.applications);
      const docResults = filterResults(mockSearchData.documents);
      
      setResults({
        tags: tagResults,
        groups: groupResults,
        applications: appResults,
        documents: docResults
      });
      
      // 计算总数
      const total = tagResults.length + groupResults.length + 
                   appResults.length + docResults.length;
      
      setPagination({
        ...pagination,
        total
      });
      
      setLoading(false);
    }, 500);
  };
  
  // 处理搜索提交
  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      setSearchQuery(value);
      performSearch(value);
    }
  };
  
  // 处理标签页切换
  const handleTabChange = (key) => {
    setActiveTab(key);
    setPagination({
      ...pagination,
      current: 1
    });
  };
  
  // 渲染标签搜索结果
  const renderTagResults = () => {
    const data = activeTab === 'all' ? results.tags : results.tags;
    
    if (data.length === 0) {
      return <Empty description="暂无匹配的标签" />;
    }
    
    return (
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <Space>
                <Tag color="blue">{item.category}</Tag>
                <Tag color="green">{item.type}</Tag>
              </Space>,
              <Text type="secondary">所有者: {item.owner}</Text>,
              <Text type="secondary">更新时间: {item.updateTime}</Text>
            ]}
          >
            <List.Item.Meta
              title={<a href={`/tags/management/info?id=${item.id}`}>{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    );
  };
  
  // 渲染客群搜索结果
  const renderGroupResults = () => {
    const data = activeTab === 'all' ? results.groups : results.groups;
    
    if (data.length === 0) {
      return <Empty description="暂无匹配的客群" />;
    }
    
    return (
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <Text type="secondary">创建者: {item.creator}</Text>,
              <Text type="secondary">创建时间: {item.createTime}</Text>,
              <Text type="secondary">成员数: {item.memberCount.toLocaleString()}</Text>
            ]}
          >
            <List.Item.Meta
              title={<a href={`/portrait/groups?id=${item.id}`}>{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    );
  };
  
  // 渲染应用搜索结果
  const renderApplicationResults = () => {
    const data = activeTab === 'all' ? results.applications : results.applications;
    
    if (data.length === 0) {
      return <Empty description="暂无匹配的应用" />;
    }
    
    return (
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <Tag color="purple">{item.type}</Tag>,
              <Text type="secondary">所有者: {item.owner}</Text>,
              <Text type="secondary">更新时间: {item.updateTime}</Text>
            ]}
          >
            <List.Item.Meta
              title={<a href={`/applications/home?id=${item.id}`}>{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    );
  };
  
  // 渲染文档搜索结果
  const renderDocumentResults = () => {
    const data = activeTab === 'all' ? results.documents : results.documents;
    
    if (data.length === 0) {
      return <Empty description="暂无匹配的文档" />;
    }
    
    return (
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <Tag color="orange">{item.type}</Tag>,
              <Text type="secondary">部门: {item.department}</Text>,
              <Text type="secondary">更新时间: {item.updateTime}</Text>
            ]}
          >
            <List.Item.Meta
              title={<a href={`/documents?id=${item.id}`}>{item.title}</a>}
            />
          </List.Item>
        )}
      />
    );
  };
  
  // 计算所有结果数量
  const getTotalResults = () => {
    const { tags, groups, applications, documents } = results;
    return tags.length + groups.length + applications.length + documents.length;
  };
  
  // 渲染当前标签页内容
  const renderTabContent = () => {
    switch (activeTab) {
      case 'tags':
        return renderTagResults();
      case 'groups':
        return renderGroupResults();
      case 'applications':
        return renderApplicationResults();
      case 'documents':
        return renderDocumentResults();
      case 'all':
        return (
          <>
            {results.tags.length > 0 && (
              <div className="result-section">
                <Title level={4}>
                  <TagOutlined /> 标签
                  <Text type="secondary" style={{ fontSize: 14, marginLeft: 8 }}>
                    ({results.tags.length}个结果)
                  </Text>
                </Title>
                {renderTagResults()}
                {results.tags.length > 3 && (
                  <div style={{ textAlign: 'right', margin: '8px 0 16px' }}>
                    <Button type="link" onClick={() => setActiveTab('tags')}>
                      查看全部标签结果
                    </Button>
                  </div>
                )}
                <Divider />
              </div>
            )}
            
            {results.groups.length > 0 && (
              <div className="result-section">
                <Title level={4}>
                  <TeamOutlined /> 客群
                  <Text type="secondary" style={{ fontSize: 14, marginLeft: 8 }}>
                    ({results.groups.length}个结果)
                  </Text>
                </Title>
                {renderGroupResults()}
                {results.groups.length > 3 && (
                  <div style={{ textAlign: 'right', margin: '8px 0 16px' }}>
                    <Button type="link" onClick={() => setActiveTab('groups')}>
                      查看全部客群结果
                    </Button>
                  </div>
                )}
                <Divider />
              </div>
            )}
            
            {results.applications.length > 0 && (
              <div className="result-section">
                <Title level={4}>
                  <AppstoreOutlined /> 应用
                  <Text type="secondary" style={{ fontSize: 14, marginLeft: 8 }}>
                    ({results.applications.length}个结果)
                  </Text>
                </Title>
                {renderApplicationResults()}
                {results.applications.length > 3 && (
                  <div style={{ textAlign: 'right', margin: '8px 0 16px' }}>
                    <Button type="link" onClick={() => setActiveTab('applications')}>
                      查看全部应用结果
                    </Button>
                  </div>
                )}
                <Divider />
              </div>
            )}
            
            {results.documents.length > 0 && (
              <div className="result-section">
                <Title level={4}>
                  <FileTextOutlined /> 文档
                  <Text type="secondary" style={{ fontSize: 14, marginLeft: 8 }}>
                    ({results.documents.length}个结果)
                  </Text>
                </Title>
                {renderDocumentResults()}
                {results.documents.length > 3 && (
                  <div style={{ textAlign: 'right', margin: '8px 0 16px' }}>
                    <Button type="link" onClick={() => setActiveTab('documents')}>
                      查看全部文档结果
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {getTotalResults() === 0 && (
              <Empty 
                description={
                  <span>
                    未找到与 <Text strong>"{query}"</Text> 相关的内容
                  </span>
                }
              />
            )}
          </>
        );
      default:
        return <Empty description="请选择一个类别" />;
    }
  };
  
  return (
    <div className="search-results-page" style={{ padding: 24 }}>
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Card>
            <Search
              placeholder="搜索标签、客群、应用..."
              allowClear
              enterButton="搜索"
              size="large"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
              style={{ maxWidth: 600 }}
            />
            
            {query && (
              <div style={{ marginTop: 16 }}>
                <Text>
                  搜索结果: <Text strong>"{query}"</Text> 
                  {getTotalResults() > 0 && (
                    <Text type="secondary"> ({getTotalResults()} 个结果)</Text>
                  )}
                </Text>
              </div>
            )}
          </Card>
        </Col>
        
        <Col span={24}>
          <Card>
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              <TabPane 
                tab={
                  <span>
                    全部结果
                    {getTotalResults() > 0 && ` (${getTotalResults()})`}
                  </span>
                } 
                key="all" 
              />
              <TabPane 
                tab={
                  <span>
                    <TagOutlined /> 标签
                    {results.tags.length > 0 && ` (${results.tags.length})`}
                  </span>
                } 
                key="tags" 
              />
              <TabPane 
                tab={
                  <span>
                    <TeamOutlined /> 客群
                    {results.groups.length > 0 && ` (${results.groups.length})`}
                  </span>
                } 
                key="groups" 
              />
              <TabPane 
                tab={
                  <span>
                    <AppstoreOutlined /> 应用
                    {results.applications.length > 0 && ` (${results.applications.length})`}
                  </span>
                } 
                key="applications" 
              />
              <TabPane 
                tab={
                  <span>
                    <FileTextOutlined /> 文档
                    {results.documents.length > 0 && ` (${results.documents.length})`}
                  </span>
                } 
                key="documents" 
              />
            </Tabs>
            
            <div style={{ marginTop: 16 }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <Spin size="large" />
                  <div style={{ marginTop: 16 }}>
                    <Text type="secondary">正在搜索中...</Text>
                  </div>
                </div>
              ) : (
                renderTabContent()
              )}
            </div>
            
            {(activeTab !== 'all' && getTotalResults() > 10) && (
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Pagination
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  total={activeTab === 'tags' ? results.tags.length : 
                         activeTab === 'groups' ? results.groups.length :
                         activeTab === 'applications' ? results.applications.length :
                         results.documents.length}
                  onChange={(page) => setPagination({...pagination, current: page})}
                  showSizeChanger={false}
                />
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SearchResultsPage;

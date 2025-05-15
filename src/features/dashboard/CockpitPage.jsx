import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Button, Spin, Select } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  QuestionCircleOutlined, 
  RightOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// 模拟数据获取服务
import { fetchDashboardData } from '../../services/dashboardService';

const { Option } = Select;

/**
 * 业务驾驶舱页面
 * 提供关键业务指标和导航入口
 */
const CockpitPage = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [timeRange, setTimeRange] = useState('month');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 获取仪表盘数据
        const data = await fetchDashboardData(timeRange);
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [timeRange]);

  // 指标卡点击跳转
  const handleMetricClick = (destination) => {
    navigate(destination);
  };

  // 默认视图
  const renderDefaultMetrics = () => (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            className="metric-card" 
            onClick={() => handleMetricClick('/applications/marketing')}
          >
            <Statistic
              title="营销转化率"
              value={dashboardData.conversionRate}
              precision={2}
              valueStyle={{ color: dashboardData.conversionTrend > 0 ? '#3f8600' : '#cf1322' }}
              prefix={dashboardData.conversionTrend > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="%"
            />
            <div className="metric-change">
              较上期{Math.abs(dashboardData.conversionTrend).toFixed(2)}%
            </div>
            <Button type="link" className="detail-link">
              查看详情 <RightOutlined />
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            className="metric-card"
            onClick={() => handleMetricClick('/applications/retention')}
          >
            <Statistic
              title="客户流失率"
              value={dashboardData.churnRate}
              precision={2}
              valueStyle={{ color: dashboardData.churnTrend < 0 ? '#3f8600' : '#cf1322' }}
              prefix={dashboardData.churnTrend < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
              suffix="%"
            />
            <div className="metric-change">
              较上期{Math.abs(dashboardData.churnTrend).toFixed(2)}%
            </div>
            <Button type="link" className="detail-link">
              查看详情 <RightOutlined />
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            className="metric-card"
            onClick={() => handleMetricClick('/tags/management/market')}
          >
            <Statistic
              title="标签总数"
              value={dashboardData.totalTags}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="metric-change">
              本月新增 {dashboardData.newTags} 个
            </div>
            <Button type="link" className="detail-link">
              查看详情 <RightOutlined />
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            className="metric-card"
            onClick={() => handleMetricClick('/portrait/groups/create')}
          >
            <Statistic
              title="客群总数"
              value={dashboardData.totalGroups}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="metric-change">
              本月新增 {dashboardData.newGroups} 个
            </div>
            <Button type="link" className="detail-link">
              查看详情 <RightOutlined />
            </Button>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4" title="待办任务">
        <Row gutter={[16, 16]}>
          {dashboardData.tasks.map((task, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <div 
                className="task-item"
                onClick={() => handleMetricClick(task.link)}
              >
                <div className="task-title">{task.title}</div>
                <div className="task-desc">{task.description}</div>
                <div className="task-meta">
                  <span className="task-priority">{task.priority}</span>
                  <span className="task-due-date">截止: {task.dueDate}</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      <Card className="mt-4" title="价值亮点">
        <Row gutter={[16, 16]}>
          {dashboardData.insights.map((insight, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card 
                className="inner-value-card"
                onClick={() => handleMetricClick(insight.link)}
              >
                <div className="value-title">{insight.title}</div>
                <div className="value-metric">{insight.value}</div>
                <div className="value-desc">{insight.description}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Card className="mt-4" title="常用功能">
        <Row gutter={[16, 16]}>
          {dashboardData.quickLinks.map((link, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card 
                className="inner-nav-card"
                onClick={() => handleMetricClick(link.path)}
              >
                <div className="nav-icon">{link.icon}</div>
                <div className="nav-title">{link.title}</div>
                <div className="nav-desc">{link.description}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <div className="mt-2">正在加载驾驶舱数据...</div>
      </div>
    );
  }

  return (
    <div className="business-cockpit-container">
      <div className="cockpit-header">
        <h1>业务驾驶舱</h1>
        <div className="header-actions">
          <Select 
            defaultValue="month" 
            style={{ width: 120 }} 
            onChange={setTimeRange}
          >
            <Option value="day">今日</Option>
            <Option value="week">本周</Option>
            <Option value="month">本月</Option>
            <Option value="quarter">本季度</Option>
            <Option value="year">本年度</Option>
          </Select>
          <Button 
            type="text" 
            icon={<QuestionCircleOutlined />}
            onClick={() => navigate('/dashboard/assistant?topic=dashboard')}
          >
            使用帮助
          </Button>
        </div>
      </div>

      {/* 确保 dashboardData 存在后再渲染 */}
      {dashboardData && renderDefaultMetrics()}

      <style jsx>{`
        .business-cockpit-container {
          padding: 24px;
        }
        
        .cockpit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .header-actions {
          display: flex;
          gap: 12px;
        }
        
        .metric-card {
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .metric-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }
        
        .metric-change {
          margin-top: 8px;
          font-size: 12px;
          color: #8c8c8c;
        }
        
        .detail-link {
          margin-top: 12px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        
        .mt-4 {
          margin-top: 24px;
        }
        
        .mt-2 {
          margin-top: 12px;
        }
        
        .task-item {
          padding: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
        }
        
        .task-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        
        .task-title {
          font-weight: 500;
          font-size: 16px;
        }
        
        .task-desc {
          font-size: 14px;
          color: #595959;
          margin: 8px 0;
        }
        
        .task-meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
        
        .task-priority {
          padding: 2px 8px;
          border-radius: 4px;
          background-color: #ffd591;
          color: #873800;
        }
        
        .task-due-date {
          color: #8c8c8c;
        }
        
        .value-title {
          font-weight: 500;
          margin-bottom: 8px;
        }
        
        .value-metric {
          font-size: 24px;
          font-weight: 600;
          color: #1890ff;
          margin-bottom: 8px;
        }
        
        .value-desc {
          font-size: 14px;
          color: #595959;
        }
        
        .inner-value-card,
        .inner-nav-card {
          height: 100%;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .inner-value-card:hover,
        .inner-nav-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }
        
        .nav-icon {
          font-size: 24px;
          margin-bottom: 12px;
          color: #1890ff;
        }
        
        .nav-title {
          font-weight: 500;
          margin-bottom: 8px;
        }
        
        .nav-desc {
          font-size: 14px;
          color: #595959;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
        }
      `}</style>
    </div>
  );
};

export default CockpitPage;

import React from 'react';
import { Card, Empty } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

/**
 * 规模分布卡片组件
 * 展示企业客户的规模分布情况
 */
const ScaleDistributionCard = ({ data = [] }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <Card title="规模分布" className="h-full">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}家企业`, '数量']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Empty description="暂无数据" />
      )}
    </Card>
  );
};

export default ScaleDistributionCard;

import React from 'react';
import { Card, Empty } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * 地区分布卡片组件
 * 展示企业客户的地区分布情况
 */
const RegionDistributionCard = ({ data = [] }) => {
  return (
    <Card title="地区分布" className="h-full">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" />
            <Tooltip formatter={(value) => [`${value}家企业`, '数量']} />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" name="企业数量" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Empty description="暂无数据" />
      )}
    </Card>
  );
};

export default RegionDistributionCard;

import React from 'react';
import { Empty } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * 企业客户增长趋势组件
 * 展示企业客户数量随时间的变化趋势
 */
const CompanyGrowthTrend = ({ data = [] }) => {
  return (
    <>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}家企业`, '数量']} />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} name="企业数量" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Empty description="暂无数据" />
      )}
    </>
  );
};

export default CompanyGrowthTrend;

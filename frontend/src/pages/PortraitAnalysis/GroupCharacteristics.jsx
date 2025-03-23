// src/pages/PortraitAnalysis/GroupCharacteristics.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function GroupCharacteristics() {
  const data = {
    labels: ['18-25岁', '26-35岁', '36-45岁', '46岁以上'],
    datasets: [
      {
        label: '年龄分布',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">群体特征分析</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Pie data={data} />
      </div>
    </div>
  );
}
// src/pages/PortraitAnalysis/TagDistribution.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TagDistribution() {
  const data = {
    labels: ['电子产品', '服装', '家居', '食品', '美妆'],
    datasets: [
      {
        label: '标签分布',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '标签分布分析',
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">标签分布分析</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
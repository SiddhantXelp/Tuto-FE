"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'Dataset 1',
      data: [15, 35, 45, 70, 55, 40, 16],
      fill: true,
      backgroundColor: 'rgb(60, 60, 60)', 
      borderColor: 'rgba(169, 169, 169, 1)',
      tension: 0.4,
    },
    {
      label: 'Dataset 2',
      data: [10, 40, 60, 50, 40, 30, 20],
      fill: true,
      backgroundColor: 'rgba(105, 105, 105, 0.7)', 
      borderColor: 'rgba(105, 105, 105, 1)',
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: '',
      align: 'start',
      color: '#000',
      font: {
        size: 18,
      },
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

const PerformanceChart: React.FC = () => {
  return (
    <div className='w-full h-full'>
      <Line data={data} options={options} />
    </div>
  );
};  

export default PerformanceChart;

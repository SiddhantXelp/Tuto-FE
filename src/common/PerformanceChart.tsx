"use client";
import React from 'react';
import Chart from 'react-apexcharts';

const options = {
  chart: {
    type: 'area',
    height: '100%',
    width: '100%',
    toolbar: {
      show: false,
    },
  },
  colors: ['#707070', '#d0d7dc'], 
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0,
      opacityFrom: 2,
      opacityTo: 0.6,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2, 
  },
  markers: {
    size: 0, 
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['', '', '', '', '', '', ''],
    labels: {
      show: false, 
    },
    axisBorder: {
      show: false, 
    },
    axisTicks: {
      show: false, 
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false, 
    },
    axisTicks: {
      show: false, 
    },
  },
  grid: {
    show: false, 
  },
  tooltip: {
    enabled: false, 
  },
  legend: {
    show: false, 
  },
};

const series = [
  {
    name: '', 
    data: [10, 35, 45, 70, 55, 40, 16],
  },
  {
    name: '', 
    data: [20, 40, 60, 50, 40, 30, 30],
  },
];

const PerformanceChart = () => (
  <Chart options={options} series={series} type="area" height={180}  />
);

export default PerformanceChart;

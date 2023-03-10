import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ time }) => {
  const chartColors = {
    red: '#fd5c63',
    green: '#17a327'
  }
  const studentTime = (time / 60).toFixed(2);
  const maxHours = 2;
  let chartColor = chartColors.green;

  if (studentTime > maxHours) {
    chartColor = chartColors.red;
  }

  const initialData = {
    labels: '% of Total Time',
    datasets: [
      {
        label: 'Total Homework Hours',
        data: [studentTime],
        backgroundColor: chartColor,
        stack: 'Stack 0',
      },
      {
        label: 'Max Recommended Hours',
        data: [maxHours],
        backgroundColor: '#ebecec',
        stack: 'Stack 0',
      },
    ],
  };
  ChartJS.defaults.datasets.bar.barThickness = 75;
  ChartJS.defaults.scale.display = false;
  const option = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 0,
        borderSkipped: false,
      },
    },
    interaction: {
      intersect: false,
    },
    responsive: false,
    plugins: {
      tooltip: { enabled: false },
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Total Homework Hours',
        color: 'rgb(53,162,235)',
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 0.25,
        },
      },
      x: {
        stacked: false,
        ticks: {
          stepSize: 0.25,
        },
      },
    },
  };

  return (
    <div className='bar-chart-container'>
      <Bar className='bar-chart-js' data={initialData} options={option} />
    </div>
  );
};

export default BarChart;

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
  console.log((time / 60).toFixed(2));
  const initialData = {
    labels: '% of Total Time',
    datasets: [
      {
        label: 'Total Homework Hours',
        data: [(time / 60).toFixed(2)],
        backgroundColor: '#fd5c63',
        // borderColor: 'rgb(187, 220, 209)',
        stack: 'Stack 0',
      },
      {
        label: 'Max Recommended Hours',
        data: [2],
        backgroundColor: '#ebecec',
        // borderColor: 'rgb(52,162,235)',
        stack: 'Stack 0',
      },
    ],
  };
  const [barChartData, setBarChartData] = useState(initialData);
  ChartJS.defaults.datasets.bar.barThickness = 75;
  ChartJS.defaults.scale.display = false;
  console.log(ChartJS.defaults);
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
      <Bar className='bar-chart-js' data={barChartData} options={option} />
    </div>
  );
};

export default BarChart;

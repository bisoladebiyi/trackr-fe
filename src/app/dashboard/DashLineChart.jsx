"use client";
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const DashLineChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Applications",
        data: [2, 4, 1, 3, 5, 0, 1],
        fill: false,
        borderColor: "#6FE6FC",
        tension: 0.3,
        pointBackgroundColor: "#171717",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(...data.datasets[0].data) + 1,
        ticks: {
            stepSize: 1,
        },
        beginAtZero: true
      },
    },
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow h-max w-1/2">
      <h2 className="text-center text-lg text-gray-700 font-semibold mb-4">Applications This Week</h2>
      <Line data={data} options={options} className="w-full h-full" />
    </div>
  );
};

export default DashLineChart;

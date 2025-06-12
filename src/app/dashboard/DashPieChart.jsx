"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashPieChart = () => {
  const data = {
    labels: ["Applied", "Interviewing", "Rejected", "Offer"],
    datasets: [
      {
        label: "Applications",
        data: [20, 5, 8, 2],
        backgroundColor: ["#6FE6FC", "#36A2EB", "#FF6384", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow w-1/2">
      <h2 className="text-center text-lg text-gray-700 font-semibold mb-4">
        Application Status Breakdown
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default DashPieChart;

"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashPieChart = ({ statusCounts }) => {
  const labels = ["Applied", "Interviewing", "Rejected", "Offer"];
  const data = {
    labels,
    datasets: [
      {
        label: "Applications",
        data: labels.map((label) => statusCounts[label] || 0),
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
    <div className="bg-white p-8 rounded-xl shadow w-full h-full md:w-1/2">
      <h2 className="text-center text-lg text-gray-700 font-semibold mb-4">
        Application Status Breakdown
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default DashPieChart;

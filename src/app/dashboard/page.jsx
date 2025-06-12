import Layout from "@/components/Layout/Layout";
import React from "react";
import DashPieChart from "./DashPieChart";
import DashLineChart from "./DashLineChart";

const Dashboard = () => {
  return (
    <Layout pageName={"Dashboard"}>
      <div className="grid grid-cols-4 gap-x-4">
        {/* TOTAL APPLICATIONS - Purple  */}
        <div className="border-gray-200 border rounded-md p-5 shadow-xl shadow-pink-50">
          <p className="text-gray-600 text-base mb-2">📋 TOTAL APPLICATIONS</p>
          <h2 className="text-gray-900 text-3xl font-semibold">0</h2>
        </div>
        {/* INTERVIEWS SCHEDULED - Yellow  */}
        <div className="border-gray-200 border rounded-md p-5 shadow-xl shadow-amber-50">
          <p className="text-gray-600 text-base mb-2">
            🧑‍💼 INTERVIEWS SCHEDULED
          </p>
          <h2 className="text-gray-900 text-3xl font-semibold">0</h2>
        </div>
        {/* OFFERS - Green */}
        <div className="border-gray-200 border rounded-md p-5 shadow-xl shadow-green-50">
          <p className="text-gray-600 text-base mb-2">✅ OFFERS</p>
          <h2 className="text-gray-900 text-3xl font-semibold">0</h2>
        </div>
        {/* REJECTIONS - Red  */}
        <div className="border-gray-200 border rounded-md p-5 shadow-xl shadow-red-50">
          <p className="text-gray-600 text-base mb-2">❌ REJECTIONS</p>
          <h2 className="text-gray-900 text-3xl font-semibold">0</h2>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-4 mt-10">
        <div className="col-span-3 flex gap-x-8">
          <DashPieChart />
          <DashLineChart />
        </div>
        <div className="p-8 px-6 rounded-xl shadow bg-blue-50">
          <p className="text-base text-gray-700 font-semibold mb-4">
            Recent Applications
          </p>
          <ul className="flex flex-col gap-y-3">
            <li className="border-b border-gray-200 py-2 text-sm text-gray-700">
              Amazon - You applied{" "}
              <span className="font-semibold">1 hour ago</span>
            </li>
            <li className="border-b border-gray-200 py-2 text-sm text-gray-700">
              Amazon - You applied{" "}
              <span className="font-semibold">1 hour ago</span>
            </li>
            <li className="border-b border-gray-200 py-2 text-sm text-gray-700">
              Amazon - You applied{" "}
              <span className="font-semibold">1 hour ago</span>
            </li>
            <li className="border-b border-gray-200 py-2 text-sm text-gray-700">
              Amazon - You applied{" "}
              <span className="font-semibold">1 hour ago</span>
            </li>
            <li className="border-b border-gray-200 py-2 text-sm text-gray-700">
              Amazon - You applied{" "}
              <span className="font-semibold">1 hour ago</span>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

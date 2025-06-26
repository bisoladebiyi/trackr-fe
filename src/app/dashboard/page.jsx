"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useEffect } from "react";
import DashPieChart from "./DashPieChart";
import DashLineChart from "./DashLineChart";
import { PiInfoBold } from "react-icons/pi";
import { useGetDashDataQuery } from "@/redux/features/applications/applicationsApiSlice";
import { useSelector } from "react-redux";
import { timeAgo } from "@/utils/helpers";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: dashStats } = useGetDashDataQuery(user?.id);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace(ROUTES.LOGIN);
    }
  }, []);

  if (dashStats) {
    return (
      <Layout pageName={"Dashboard"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* TOTAL APPLICATIONS - Purple  */}
          <div className="border-gray-200 border rounded-md p-5 shadow-xl shadow-pink-50">
            <p className="text-gray-600 text-sm sm:text-base mb-2">
              📋 TOTAL APPLICATIONS
            </p>
            <h2 className="text-gray-900 text-2xl sm:text-3xl font-semibold">
              {dashStats.totalApplications}
            </h2>
          </div>
          {/* INTERVIEWS SCHEDULED - Yellow  */}
          <div className="border-gray-200 border rounded-md p-5 shadow-xl shadow-amber-50">
            <p className="text-gray-600 text-sm sm:text-base mb-2">
              🧑‍💼 INTERVIEWS SCHEDULED
            </p>
            <h2 className="text-gray-900 text-2xl sm:text-3xl font-semibold">
              {dashStats.statusCounts.Interviewing || 0}
            </h2>
          </div>
          {/* OFFERS - Green */}
          <div className="border-gray-200 border rounded-md p-5 shadow-xl shadow-green-50">
            <p className="text-gray-600 text-sm sm:text-base mb-2">✅ OFFERS</p>
            <h2 className="text-gray-900 text-2xl sm:text-3xl font-semibold">
              {dashStats.statusCounts.Offer || 0}
            </h2>
          </div>
          {/* REJECTIONS - Red  */}
          <div className="border-gray-200 border rounded-md p-5 shadow-xl shadow-red-50">
            <p className="text-gray-600 text-sm sm:text-base mb-2">
              ❌ REJECTIONS
            </p>
            <h2 className="text-gray-900 text-2xl sm:text-3xl font-semibold">
              {dashStats.statusCounts.Rejected || 0}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-x-4 mt-10">
          <div className="w-full xl:col-span-3 flex flex-col md:flex-row gap-8 justify-center items-center">
            <DashPieChart statusCounts={dashStats.statusCounts} />
            <div className="w-full h-full flex flex-col gap-4">
              <DashLineChart
                weeklyAppliedStats={dashStats.weeklyAppliedStats}
              />
              <div className="text-center bg-white px-8 py-6 rounded-xl shadow h-max w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Dashboard Insights
                </h2>
                <p className="text-gray-600 mb-4 text-sm">
                  We’re building powerful analytics to help you track your job
                  search progress.
                </p>
                <div className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                  <PiInfoBold className="text-yellow-800 font-semibold text-sm" />
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 px-6 rounded-xl shadow xl:h-full bg-blue-50 my-8 xl:mt-0">
            <p className="text-base text-gray-700 font-semibold mb-4">
              Recent Applications
            </p>
            <ul className="flex flex-col gap-y-3">
              {dashStats.recentApplications.map((application) => (
                <li
                  key={application.id}
                  className="border-b border-gray-200 py-2 text-sm text-gray-700"
                >
                  {application.job_name} at {application.company_name} - You
                  applied{" "}
                  <span className="font-semibold">
                    {timeAgo(application.created_at)}
                  </span>
                </li>
              ))}
              {!dashStats.recentApplications[0] && (
                <p className="py-2 text-sm text-gray-700 text-center">
                  No applications in the past 3 days...
                </p>
              )}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
};

export default Dashboard;

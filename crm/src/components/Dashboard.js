import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import API from "../api";
import DashboardStats from "./DashboardStats";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardTable from "./Dashboardtable";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({
    totalManagers: 0,
    totalStaff: 0,
    totalCustomers: 0,
    totalDepartments: 0,
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await API.get("/customers/");
        setCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    const fetchUser = async () => {
      try {
        const res = await API.get("/admin/");
        setAdminName(res?.data?.name || "Admin");
      } catch (err) {
        console.error("Failed to fetch admin:", err);
      }
    };
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard-stats/");
        setStats({
          totalManagers: res?.data?.total_managers || 0,
          totalStaff: res?.data?.total_staffs || 0,
          totalCustomers: res?.data?.total_customers || 0,
          totalDepartments: res?.data?.total_departments || 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchCustomers();
    fetchUser();
    fetchStats();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"
          }`}>
        {/* Header */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="bg-white rounded-2xl shadow-md px-4 sm:px-6 py-4 flex items-center justify-between">
            <button
              className="md:hidden p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>

            <Header title="Dashboard" adminName={adminName} />
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          <DashboardStats adminName={adminName} stats={stats} />

          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Customers
            </h2>
            <DashboardTable customers={customers} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

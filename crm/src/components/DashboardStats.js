import React from "react";
import { UserGroupIcon, UsersIcon, BuildingLibraryIcon } from "@heroicons/react/24/solid";
import { MdManageAccounts } from "react-icons/md";

const DashboardStats = ({ adminName, stats }) => {
  const statItems = [
    { label: "Total Managers", value: stats.totalManagers, icon: <UserGroupIcon className="h-6 w-6 text-blue-500" /> },
    { label: "Total Staff", value: stats.totalStaff, icon: <MdManageAccounts className="h-6 w-6 text-green-500" /> },
    { label: "Total Customers", value: stats.totalCustomers, icon: <UsersIcon className="h-6 w-6 text-purple-500" /> },
    { label: "Total Departments", value: stats.totalDepartments, icon: <BuildingLibraryIcon className="h-6 w-6 text-yellow-500" /> },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Welcome, {adminName || "Admin"}!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <StatCard key={index} label={item.label} value={item.value} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4 min-w-[150px]">
    <div className="flex-shrink-0">{icon}</div>
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-gray-500">{label}</span>
      <span className="text-xl sm:text-2xl font-semibold mt-1">{value}</span>
    </div>
  </div>
);

export default DashboardStats;

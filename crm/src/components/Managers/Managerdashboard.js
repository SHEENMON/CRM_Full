import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import ManagerTable from "./Managertable";
import TableWrapper from "../TableWrapper";
import { Bars3Icon, BriefcaseIcon } from "@heroicons/react/24/solid";
import Subheader from "../Subheader";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const Managerdashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [managersData, setManagersData] = useState([]);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [filters, setFilters] = useState({ search: "", fromDate: "", toDate: "" });
  const navigate = useNavigate();

  // Fetch managers from API
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await API.get("managers/");
        setManagersData(res.data);
        setFilteredManagers(res.data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };
    fetchManagers();
  }, []);

  // Filtering logic
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    let filtered = [...managersData];

    if (newFilters.search) {
      const query = newFilters.search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.full_name?.toLowerCase().includes(query) ||
          m.email?.toLowerCase().includes(query) ||
          m.id?.toString().toLowerCase().includes(query)
      );
    }

    if (newFilters.fromDate) {
      filtered = filtered.filter(
        (m) => new Date(m.added_on) >= new Date(newFilters.fromDate)
      );
    }

    if (newFilters.toDate) {
      filtered = filtered.filter(
        (m) => new Date(m.added_on) <= new Date(newFilters.toDate)
      );
    }

    setFilteredManagers(filtered);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        className="fixed md:relative z-20 w-64 md:w-64 transition-transform transform md:translate-x-0"
      />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"
          }`}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 pt-6">
          <div className="bg-white rounded-2xl shadow-md px-4 sm:px-6 py-4 flex items-center justify-between">
            {/* Mobile Sidebar Toggle */}
            <button
              className="md:hidden p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>

            <Header title="Manager" />
          </div>
        </div>

        {/* Subheader */}
        <div className="px-4 sm:px-6 mt-4">
          <Subheader
            actions={[
              {
                text: "Add Manager",
                icon: BriefcaseIcon,
                onClick: () => navigate("/add-manager-form"),
              },
            ]}
          />
        </div>

        {/* Content */}
        <main className="flex-1 px-4 sm:px-6 py-6">
          <TableWrapper
            title="Managers"
            filters={filters}
            onFilterChange={handleFilterChange}
          >
            <ManagerTable
              managers={filteredManagers}
              setManagers={setFilteredManagers}
            />
          </TableWrapper>
        </main>
      </div>
    </div>
  );
};

export default Managerdashboard;

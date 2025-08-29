import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import DepartmentTable from "./DepartmentTable"; // ✅ responsive table
import TableWrapper from "../TableWrapper";
import { Bars3Icon, BuildingOfficeIcon } from "@heroicons/react/24/solid";
import Subheader from "../Subheader";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const DepartmentsDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filters, setFilters] = useState({ search: "", fromDate: "", toDate: "" });
  const navigate = useNavigate();

  // Fetch departments from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await API.get("/departments/");
        setDepartmentsData(res.data);
        setFilteredDepartments(res.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // Filtering logic
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    let filtered = [...departmentsData];

    if (newFilters.search) {
      const query = newFilters.search.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.name?.toLowerCase().includes(query) ||
          d.id?.toString().toLowerCase().includes(query)
      );
    }

    if (newFilters.fromDate) {
      filtered = filtered.filter(
        (d) => new Date(d.added_on) >= new Date(newFilters.fromDate)
      );
    }

    if (newFilters.toDate) {
      filtered = filtered.filter(
        (d) => new Date(d.added_on) <= new Date(newFilters.toDate)
      );
    }

    setFilteredDepartments(filtered);
  };

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
                text: "Add Department",
                icon: BuildingOfficeIcon,
                onClick: () => navigate("/add-department-form"),
              },
            ]}
          />
        </div>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          <TableWrapper
            title="Departments"
            filters={filters}
            onFilterChange={handleFilterChange}
          >
            <div className="overflow-x-auto">
              <DepartmentTable
                departments={filteredDepartments}
                setDepartments={setFilteredDepartments}
              />
            </div>
          </TableWrapper>
        </main>
      </div>
    </div>
  );
};

export default DepartmentsDashboard;

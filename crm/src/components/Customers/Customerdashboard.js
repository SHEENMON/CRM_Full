import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import CustomerTable from "./CustomerTable";
import TableWrapper from "../TableWrapper";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/solid";
import Subheader from "../Subheader";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const Customerdashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customersData, setCustomersData] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filters, setFilters] = useState({ search: "", fromDate: "", toDate: "" });
  const navigate = useNavigate();

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await API.get("/customers/");
        setCustomersData(res.data);
        setFilteredCustomers(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Filtering
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    let filtered = [...customersData];

    if (newFilters.search) {
      const query = newFilters.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.full_name?.toLowerCase().includes(query) ||
          c.email?.toLowerCase().includes(query) ||
          c.id?.toString().toLowerCase().includes(query)
      );
    }

    if (newFilters.fromDate) {
      filtered = filtered.filter(
        (c) => new Date(c.added_on) >= new Date(newFilters.fromDate)
      );
    }

    if (newFilters.toDate) {
      filtered = filtered.filter(
        (c) => new Date(c.added_on) <= new Date(newFilters.toDate)
      );
    }

    setFilteredCustomers(filtered);
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

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 min-h-screen min-w-0 ${
          sidebarOpen ? "ml-64" : "ml-0"
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
                text: "Add Customer",
                icon: UserIcon,
                onClick: () => navigate("/add-customer-form"),
              },
            ]}
          />
        </div>

        {/* Table Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto min-w-0">
          <TableWrapper
            title="Customers"
            filters={filters}
            onFilterChange={handleFilterChange}
          >
            {/* Table with horizontal scroll on mobile */}
            <div className="overflow-x-auto w-full">
              <CustomerTable
                customers={filteredCustomers}
                setCustomers={setFilteredCustomers}
              />
            </div>
          </TableWrapper>
        </main>
      </div>
    </div>
  );
};

export default Customerdashboard;

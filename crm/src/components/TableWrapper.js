import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const TableWrapper = ({ title, children, filters, onFilterChange }) => {
  const [tempFilters, setTempFilters] = useState(filters);

  // Handle apply button click
  const handleApply = () => {
    onFilterChange(tempFilters);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-xl font-semibold mb-2 md:mb-0">{title}</h2>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
          {/* Search Input */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) =>
                onFilterChange({ ...tempFilters, search: e.target.value })
              }
              placeholder="Search..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* From Date */}
          <input
            type="date"
            value={tempFilters.fromDate}
            onChange={(e) =>
              setTempFilters({ ...tempFilters, fromDate: e.target.value })
            }
            className="border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />

          {/* To Date */}
          <input
            type="date"
            value={tempFilters.toDate}
            onChange={(e) =>
              setTempFilters({ ...tempFilters, toDate: e.target.value })
            }
            className="border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div>{children}</div>
    </div>
  );
};

export default TableWrapper;

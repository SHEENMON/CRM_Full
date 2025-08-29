import React from "react";

const DashboardTable = ({ customers }) => {
  return (
    <div className="overflow-x-auto w-full bg-white shadow rounded-lg">
      <table className="min-w-full border-collapse table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left text-sm sm:text-base">ID</th>
            <th className="py-2 px-4 text-left text-sm sm:text-base">Name</th>
            <th className="py-2 px-4 text-left text-sm sm:text-base">Phone</th>
            <th className="py-2 px-4 text-left text-sm sm:text-base">Mail</th>
            <th className="py-2 px-4 text-left text-sm sm:text-base">Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-4 text-sm sm:text-base">{customer.id}</td>
                <td className="py-2 px-4 text-sm sm:text-base">{customer.full_name}</td>
                <td className="py-2 px-4 text-sm sm:text-base">{customer.phone_number}</td>
                <td className="py-2 px-4 text-sm sm:text-base">{customer.email}</td>
                <td className="py-2 px-4 text-sm sm:text-base">
                  <span
                    className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                      customer.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.is_active ? "Active" : "Blocked"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;

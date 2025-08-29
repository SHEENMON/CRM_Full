import React from "react";
import CustomerRow from "./CustomerRow";

const CustomerTable = ({ customers, setCustomers }) => {
  const handleDelete = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="overflow-x-auto w-full rounded-lg shadow-sm bg-white">
      <table className="min-w-full border-collapse table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Phone</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Gender</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Added On</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Mail</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Status</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500">
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;

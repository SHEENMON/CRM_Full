import React from "react";
import StaffRow from "./StaffRow";

const StaffTable = ({ staffs, setStaffs }) => {
  const handleDelete = (id) => {
    setStaffs(staffs.filter((s) => s.id !== id));
  };

  return (
    <div className=" w-full rounded-lg shadow-sm bg-white">
      <table className="min-w-full border-collapse table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Manager</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Skill</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Phone</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Joined On</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Status</th>
            <th className="py-2 px-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffs.length > 0 ? (
            staffs.map((staff) => (
              <StaffRow key={staff.id} staff={staff} onDelete={handleDelete} />
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-4 text-gray-500">
                No staff found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;

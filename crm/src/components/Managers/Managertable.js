import React from "react";
import ManagerRow from "./ManagerRow";
import ToggleActiveSwitch from "../ToggleActiveSwitch";

const ManagerTable = ({ managers, setManagers }) => {
  const handleDelete = (id) => {
    setManagers(managers.filter((c) => c.id !== id));
  };

  return (
    <div>
      <table className="min-w-full border-collapse hidden md:table">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Department</th>
            <th className="py-2 px-4">Team</th>
            <th className="py-2 px-4">Joined On</th>
            <th className="py-2 px-4">Mail</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.length > 0 ? (
            managers.map((manager) => (
              <ManagerRow
                key={manager.id}
                manager={manager}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-4 text-gray-500">
                No managers found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Card layout for small screens */}
      <div className="flex flex-col space-y-4 md:hidden">
        {managers.length > 0 ? (
          managers.map((manager) => (
            <div
              key={manager.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2"
            >
              <div>
                <span className="font-semibold">ID: </span>{manager.id}
              </div>
              <div>
                <span className="font-semibold">Name: </span>{manager.full_name}
              </div>
              <div>
                <span className="font-semibold">Phone: </span>{manager.phone_number}
              </div>
              <div>
                <span className="font-semibold">Department: </span>{manager.department}
              </div>
              <div>
                <span className="font-semibold">Team: </span>{manager.team_name}
              </div>
              <div>
                <span className="font-semibold">Joined On: </span>{manager.added_on}
              </div>
              <div>
                <span className="font-semibold">Mail: </span>{manager.email}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold">Status: </span>
                  <ToggleActiveSwitch id={manager.id} role="staff" isActive={manager.is_active} />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.location.href = `/edit-manager-form/${manager.id}`}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(manager.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No managers found</div>
        )}
      </div>
    </div>
  );
};

export default ManagerTable;

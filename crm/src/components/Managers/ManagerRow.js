import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import ToggleActiveSwitch from "../ToggleActiveSwitch";

const ManagerRow = ({ manager, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this manager?")) {
      try {
        await API.delete(`/managers/${manager.id}/`);
        alert("Manager deleted successfully!");
        if (onDelete) onDelete(manager.id);
      } catch (error) {
        console.error("Error deleting manager:", error.response || error);
        alert("Failed to delete manager.");
      }
    }
  };

  return (
    <>
      {/* Table row for larger screens */}
      <tr className="hidden md:table-row hover:bg-gray-50 transition">
        <td className="px-4 py-2 text-sm font-medium text-gray-700">{manager.id}</td>
        <td className="px-4 py-2 text-sm text-gray-600">{manager.full_name}</td>
        <td className="px-4 py-2 text-sm text-gray-600">{manager.phone_number}</td>
        <td className="px-4 py-2 text-sm text-gray-600">{manager.department_name}</td>
        <td className="px-4 py-2 text-sm text-gray-600">{manager.team_name}</td>
        <td className="px-4 py-2 text-sm text-gray-600">{manager.added_on}</td>
        <td className="px-4 py-2 text-sm text-gray-600">{manager.email}</td>
        <td className="px-4 py-2">
          <ToggleActiveSwitch id={manager.id} role="manager" isActive={manager.is_active} />
        </td>
        <td className="px-4 py-2 text-right flex gap-2 justify-end">
          <button
            onClick={() => navigate(`/edit-manager-form/${manager.id}`)}
            className="text-blue-500 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:underline text-sm"
          >
            Delete
          </button>
        </td>
      </tr>

      {/* Card layout for mobile */}
      <div className="md:hidden border rounded-lg p-4 mb-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium">{manager.full_name}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/edit-manager-form/${manager.id}`)}
              className="text-blue-500 hover:underline text-xs"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:underline text-xs"
            >
              Delete
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-600 mb-1">ID: {manager.id}</p>
        <p className="text-xs text-gray-600 mb-1">Phone: {manager.phone_number}</p>
        <p className="text-xs text-gray-600 mb-1">Department: {manager.department_name}</p>
        <p className="text-xs text-gray-600 mb-1">Team: {manager.team_name}</p>
        <p className="text-xs text-gray-600 mb-1">Added on: {manager.added_on}</p>
        <p className="text-xs text-gray-600 mb-1">Email: {manager.email}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold">Status:</span>
          <ToggleActiveSwitch id={manager.id} role="manager" isActive={manager.is_active} />
        </div>
      </div>
    </>
  );
};

export default ManagerRow;

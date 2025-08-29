import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import ToggleActiveSwitch from "../ToggleActiveSwitch";

const StaffRow = ({ staff, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await API.delete(`/staffs/${staff.id}/`);
        alert("Staff deleted successfully!");
        if (onDelete) onDelete(staff.id);
      } catch (error) {
        console.error("Error deleting staff:", error.response || error);
        alert("Failed to delete staff.");
      }
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-2 py-2 text-sm text-gray-700">{staff.id}</td>

      <td className="px-2 py-2 text-sm text-gray-600 flex items-center gap-2">
        {staff.photo_url ? (
          <img
            src={staff.photo_url}
            alt={staff.full_name}
            className="w-8 h-8 rounded-full object-cover border"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-xs text-white">
            {staff.full_name.charAt(0).toUpperCase()}
          </div>
        )}
        <span>{staff.full_name}</span>
      </td>

      <td className="px-2 py-2 text-sm text-gray-600">{staff.manager_name || "-"}</td>
      <td className="px-2 py-2 text-sm text-gray-600">{staff.skill || "-"}</td>
      <td className="px-2 py-2 text-sm text-gray-600 break-words">{staff.email}</td>
      <td className="px-2 py-2 text-sm text-gray-600">{staff.phone_number}</td>
      <td className="px-2 py-2 text-sm text-gray-600">{staff.added_on}</td>
      <td className="px-2 py-2 text-sm text-gray-600">
        <ToggleActiveSwitch id={staff.id} role="staff" isActive={staff.is_active} />
      </td>

      <td className="px-2 py-2 flex gap-2">
        <button
          onClick={() => navigate(`/edit-staff-form/${staff.id}`)}
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
  );
};

export default StaffRow;

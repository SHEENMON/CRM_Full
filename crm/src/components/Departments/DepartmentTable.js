import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const DepartmentTable = ({ departments, setDepartments }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;

    try {
      await API.delete(`/departments/${id}/`);
      setDepartments((prev) => prev.filter((dept) => dept.id !== id));
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("Failed to delete department!");
    }
  };

  if (departments.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 bg-white shadow rounded-lg">
        No departments found
      </div>
    );
  }

  return (
    <div>
      {/* Table for medium and larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse bg-white shadow rounded-lg">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Department Name</th>
              <th className="py-2 px-4">Added On</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{dept.id}</td>
                <td className="py-2 px-4">{dept.name}</td>
                <td className="py-2 px-4">{dept.added_on || "—"}</td>
                <td className="py-2 px-4 flex gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/edit-department-form/${dept.id}`)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile screens */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div><strong>ID:</strong> {dept.id}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/edit-department-form/${dept.id}`)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <div><strong>Name:</strong> {dept.name}</div>
            <div><strong>Added On:</strong> {dept.added_on || "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentTable;

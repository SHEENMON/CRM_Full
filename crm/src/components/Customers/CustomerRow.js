import React from "react";
import { IoMaleOutline, IoFemaleOutline, IoSparklesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const CustomerRow = ({ customer, onDelete }) => {
  const navigate = useNavigate();

  const renderGenderIcon = (gender) => {
    switch (gender) {
      case "MALE":
        return <IoMaleOutline className="w-4 h-4 text-blue-500" />;
      case "FEMALE":
        return <IoFemaleOutline className="w-4 h-4 text-pink-500" />;
      default:
        return <IoSparklesOutline className="w-4 h-4 text-purple-500" />;
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await API.delete(`/customers/${customer.id}/`);
        alert("Customer deleted successfully!");
        if (onDelete) onDelete(customer.id);
      } catch (error) {
        console.error("Error deleting customer:", error.response || error);
        alert("Failed to delete customer.");
      }
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-2 py-2 text-sm font-medium text-gray-700">{customer.id}</td>

      <td className="px-2 py-2 text-sm text-gray-600 flex items-center gap-2">
        {customer.photo_url ? (
          <img
            src={customer.photo_url}
            alt={customer.full_name}
            className="w-8 h-8 rounded-full object-cover border"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-xs text-white">
            {customer.full_name.charAt(0).toUpperCase()}
          </div>
        )}
        <span>{customer.full_name}</span>
      </td>

      <td className="px-2 py-2 text-sm text-gray-600">{customer.phone_number}</td>
      <td className="px-2 py-2 text-sm text-gray-600 flex items-center gap-1">
        {renderGenderIcon(customer.gender)} {customer.gender}
      </td>
      <td className="px-2 py-2 text-sm text-gray-600">{customer.added_on}</td>
      <td className="px-2 py-2 text-sm text-gray-600">{customer.email}</td>

      <td className="px-2 py-2">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            customer.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {customer.is_active ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="px-2 py-2 flex gap-2">
        <button
          onClick={() => navigate(`/edit-customer-form/${customer.id}`)}
          className="text-blue-500 hover:underline text-xs sm:text-sm"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:underline text-xs sm:text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CustomerRow;

import React, { useState, useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";

const EditDepartmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch department details
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await API.get(`/departments/${id}/`);
        setDepartmentName(res.data.name);
      } catch (error) {
        console.error("Error fetching department:", error);
        alert("Failed to load department details!");
      }
    };
    fetchDepartment();
  }, [id]);

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = { name: departmentName };

    try {
      await API.put(`/departments/${id}/`, formData);
      navigate("/departments");
    } catch (error) {
      console.error("Error updating department:", error.response || error);
      alert(error.response?.data ? JSON.stringify(error.response.data) : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-6 bg-white p-6 md:p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="md:col-span-2">
        <h1 className="text-2xl font-semibold mb-6">Edit Department</h1>
      </div>

      {/* Department Name */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-gray-700 font-medium">Department Name</label>
        <Input
          value={departmentName}
          label="Enter Department Name"
          onChange={(e) => setDepartmentName(e.target.value)}
          className="text-sm"
          required
        />
      </div>

      {/* Buttons */}
      <div className="md:col-span-2 flex flex-wrap justify-end gap-4 mt-4">
        <Button
          type="button"
          className="bg-gray-300 text-gray-800"
          onClick={() => navigate("/departments")}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-900" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default EditDepartmentForm;

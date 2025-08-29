import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const AddDepartmentForm = () => {
  const navigate = useNavigate();

  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = { name: departmentName };

    try {
      const response = await API.post("/departments/", formData);
      console.log("Department created:", response.data);

      setDepartmentName("");
      navigate("/departments");
    } catch (error) {
      console.error("Error submitting form:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
    >
      <div className="md:col-span-2">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          Add Department
        </h1>
      </div>

      {/* Department Name */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-gray-700 font-medium">Department Name</label>
        <Input
          value={departmentName}
          label="Enter Department Name"
          onChange={(e) => setDepartmentName(e.target.value)}
          className="text-sm sm:text-base"
          required
        />
      </div>

      {/* Buttons */}
      <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-4">
        <Button
          type="button"
          className="bg-blue-900 w-full sm:w-auto"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-900 w-full sm:w-auto"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default AddDepartmentForm;

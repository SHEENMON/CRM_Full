import React, { useState, useEffect } from "react";
import { Input, Button, Select, Option, Switch } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const AddManagerForm = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [teamname, setTeamname] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await API.get("/departments/");
        setDepartments(res.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullPhoneNumber = `${countryCode}${phone}`;
    const formData = {
      full_name: fullName,
      phone_number: fullPhoneNumber,
      email,
      team_name: teamname,
      department,
      is_active: isActive,
    };

    try {
      const response = await API.post("/managers/", formData);
      console.log("Manager created:", response.data);

      setFullName("");
      setPhone("");
      setCountryCode("+91");
      setEmail("");
      setTeamname("");
      setDepartment("");
      setIsActive(true);

      navigate("/managers");
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
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Add Manager</h1>
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-gray-700 font-medium">Full Name</label>
        <Input
          value={fullName}
          label="Full Name"
          onChange={(e) => setFullName(e.target.value)}
          className="text-sm sm:text-base"
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-gray-700 font-medium">Email</label>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-sm sm:text-base"
          required
        />
      </div>

      {/* Team Name */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Team Name</label>
        <Input
          value={teamname}
          label="Team Name"
          onChange={(e) => setTeamname(e.target.value)}
          className="text-sm sm:text-base"
          required
        />
      </div>

      {/* Department */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Department</label>
        <Select
          value={department}
          onChange={(value) => setDepartment(value)}
          className="text-sm sm:text-base"
          inputClassName="text-sm sm:text-base px-2 py-2"
          label="Select Department"
          required
        >
          {departments.map((dept) => (
            <Option key={dept.id} value={dept.id}>
              {dept.name}
            </Option>
          ))}
        </Select>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-gray-700 font-medium">Phone</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select
          label="Contry"
            value={countryCode}
            onChange={(value) => setCountryCode(value)}
          >
            <Option value="+91">+91</Option>
            <Option value="+1">+1</Option>
            <Option value="+44">+44</Option>
            <Option value="+61">+61</Option>
          </Select>
          <Input
            type="tel"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 text-sm sm:text-base"
            required
          />
        </div>
      </div>

      {/* Active Switch */}
      <div className="flex items-center gap-3 md:col-span-2 mt-2">
        <Switch
          id="active-switch"
          color="indigo"
          label="Active"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
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

export default AddManagerForm;

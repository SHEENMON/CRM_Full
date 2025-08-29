import React, { useState, useEffect } from "react";
import { Input, Button, Select, Option, Switch } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";

const EditManagerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // States
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [teamname, setTeamname] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch departments
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

  // Fetch existing manager details
  useEffect(() => {
    const fetchManager = async () => {
      try {
        const res = await API.get(`/managers/${id}/`);
        const manager = res.data;

        setFullName(manager.full_name || "");
        setEmail(manager.email || "");
        setTeamname(manager.team_name || "");
        setDepartment(manager.department || "");
        setIsActive(manager.is_active);

        // Split phone into country code and number
        if (manager.phone_number) {
          const possibleCodes = ["+91", "+1", "+44", "+61"];
          const code = possibleCodes.find((c) =>
            manager.phone_number.startsWith(c)
          );
          if (code) {
            setCountryCode(code);
            setPhone(manager.phone_number.replace(code, ""));
          } else {
            setPhone(manager.phone_number);
          }
        }
      } catch (error) {
        console.error("Error fetching manager details:", error);
        alert("Could not fetch manager details.");
        navigate("/managers");
      }
    };
    fetchManager();
  }, [id, navigate]);

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullPhoneNumber = `${countryCode}${phone}`;
    const formData = {
      full_name: fullName,
      phone_number: fullPhoneNumber,
      email: email,
      team_name: teamname,
      department: department,
      is_active: isActive,
    };

    try {
      await API.put(`/managers/${id}/`, formData);
      navigate("/managers");
    } catch (error) {
      console.error("Error updating manager:", error.response || error);
      alert(
        error.response?.data
          ? JSON.stringify(error.response.data)
          : "Something went wrong!"
      );
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
        <h1 className="text-2xl font-semibold mb-6">Edit Manager</h1>
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-gray-700 font-medium">Full Name</label>
        <Input
          value={fullName}
          label="Full Name"
          onChange={(e) => setFullName(e.target.value)}
          className="text-sm"
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-gray-700 font-medium">Email</label>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-sm"
          required
        />
      </div>

      {/* Team Name */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">Team Name</label>
        <Input
          value={teamname}
          label="Team Name"
          onChange={(e) => setTeamname(e.target.value)}
          className="text-sm"
        />
      </div>

      {/* Department */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">Department</label>
        <Select
          value={department}
          onChange={(value) => setDepartment(value)}
          className="text-sm"
          inputClassName="text-sm px-2 py-2"
          label="Select Department"
        >
          {departments.map((dept) => (
            <Option key={dept.id} value={dept.id}>
              {dept.name}
            </Option>
          ))}
        </Select>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-gray-700 font-medium">Phone</label>
        <div className="flex gap-2 flex-wrap">
          <Select
            label="Contry"
            value={countryCode}
            onChange={(value) => setCountryCode(value)}
            className="w-24"
          >
            <Option value="+91">+91</Option>
            <Option value="+1">+1</Option>
            <Option value="+44">+44</Option>
            <Option value="+61">+61</Option>
          </Select>
          <Input
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 text-sm min-w-[150px]"
            required
          />
        </div>
      </div>

      {/* Active Switch */}
      <div className="flex items-center gap-3 md:col-span-2">
        <Switch
          id="active-switch"
          color="indigo"
          label="Active"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
      </div>

      {/* Buttons */}
      <div className="md:col-span-2 flex flex-wrap justify-end gap-4 mt-4">
        <Button
          type="button"
          className="bg-blue-900"
          onClick={() => navigate("/managers")}
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

export default EditManagerForm;

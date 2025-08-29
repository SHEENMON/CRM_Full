import React, { useState, useEffect } from "react";
import { Input, Button, Select, Option, Switch } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";

const EditStaffForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [manager, setManager] = useState("");
  const [skill, setSkill] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [managers, setManagers] = useState([]);

  // Fetch staff and managers
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staffRes = await API.get(`/staffs/${id}/`);
        const staff = staffRes.data;
        setFullName(staff.full_name);
        setEmail(staff.email);
        setPhone(staff.phone_number);
        setManager(staff.manager);
        setSkill(staff.skill);
        setIsActive(staff.is_active);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    const fetchManagers = async () => {
      try {
        const res = await API.get("/managers/");
        setManagers(res.data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    fetchStaff();
    fetchManagers();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = {
      full_name: fullName,
      email: email,
      phone_number: phone,
      manager: manager,
      skill: skill,
      is_active: isActive,
    };
    try {
      await API.put(`/staffs/${id}/`, formData);
      alert("Staff updated successfully!");
      navigate("/staffs");
    } catch (error) {
      console.error("Error updating staff:", error);
      alert("Failed to update staff.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Staff</h2>
      <form
        onSubmit={handleUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-xl shadow-lg"
      >
        {/* Full Name */}
        <div className="col-span-1 md:col-span-2">
          <Input
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="col-span-1 md:col-span-2">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Phone */}
        <div className="col-span-1 md:col-span-2">
          <Input
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Manager */}
        <div className="col-span-1 md:col-span-1">
          <Select
            value={manager}
            onChange={(value) => setManager(value)}
            label="Select Manager"
          >
            {managers.map((m) => (
              <Option key={m.id} value={m.id}>
                {m.full_name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Skill */}
        <div className="col-span-1 md:col-span-1">
          <Input
            label="Skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
        </div>

        {/* Active Switch */}
        <div className="col-span-1 md:col-span-2 flex items-center gap-3">
          <span className="text-gray-700 font-medium">Active:</span>
          <Switch
            color="indigo"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </div>

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex flex-wrap justify-end gap-4 mt-4">
          <Button
            type="button"
            className="bg-blue-900 w-full md:w-auto"
            onClick={() => navigate("/staffs")}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-900 w-full md:w-auto">
            Update Staff
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditStaffForm;

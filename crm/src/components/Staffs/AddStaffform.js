import React, { useState, useEffect } from "react";
import { Input, Button, Select, Option } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const AddStaffForm = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [skill, setSkill] = useState("");
  const [manager, setManager] = useState("");
  const [managers, setManagers] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await API.get("/managers/");
        setManagers(res.data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };
    fetchManagers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullPhoneNumber = `${countryCode}${phone}`;
    const formData = {
      full_name: fullName,
      phone_number: fullPhoneNumber,
      email,
      skill,
      manager,
    };

    try {
      const response = await API.post("/staffs/", formData);
      console.log("Staff created:", response.data);

      setFullName("");
      setPhone("");
      setCountryCode("+91");
      setEmail("");
      setSkill("");
      setManager("");

      navigate("/staffs");
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
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Add Staff</h1>
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

      {/* Skill */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Skill</label>
        <Input
          value={skill}
          label="Skill"
          onChange={(e) => setSkill(e.target.value)}
          className="text-sm sm:text-base"
          required
        />
      </div>

      {/* Manager */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Manager</label>
        <Select
          value={manager}
          onChange={(value) => setManager(value)}
          className="text-sm sm:text-base"
          inputClassName="text-sm sm:text-base px-2 py-2"
          label="Select Manager"
          required
        >
          {managers.map((m) => (
            <Option key={m.id} value={m.id}>
              {m.full_name}
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
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 text-sm sm:text-base"
            required
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-3 mt-4">
        <Button
          type="button"
          className="bg-blue-900 w-full sm:w-auto"
          onClick={() => navigate("/staffs")}
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

export default AddStaffForm;

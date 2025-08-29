import React, { useState } from "react";
import { Input, Button, Select, Option, Switch } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const AddCustomerForm = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullPhoneNumber = `${countryCode}${phone}`;
    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("gender", gender);
    formData.append("date_of_birth", dob);
    formData.append("phone_number", fullPhoneNumber);
    formData.append("email", email);
    formData.append("is_active", isActive);
    if (photo) formData.append("photo", photo);

    try {
      const response = await API.post("/customers/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Customer created:", response.data);

      // Clear form
      setFullName("");
      setGender("");
      setDob("");
      setPhone("");
      setCountryCode("+91");
      setEmail("");
      setPhoto(null);
      setIsActive(true);

      navigate("/customers");
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
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Add Customer</h1>
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-gray-700 font-medium">Full Name</label>
        <Input
          value={fullName}
          label="Full Name"
          onChange={(e) => setFullName(e.target.value)}
          className="text-sm sm:text-base"
        />
      </div>

      {/* Upload Profile Picture */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-gray-700 font-medium">Upload Profile Picture</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="border rounded-md px-2 py-1 sm:px-3 sm:py-2"
        />
        {photo && (
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <img
              src={URL.createObjectURL(photo)}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border"
            />
            <p className="text-sm sm:text-base break-all">{photo.name}</p>
          </div>
        )}
      </div>

      {/* Gender */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Gender</label>
        <Select
        label="Gender"
          value={gender}
          onChange={(value) => setGender(value)}
          className="text-sm sm:text-base"
          inputClassName="text-sm sm:text-base px-2 py-2"
        >
          <Option value="MALE">Male</Option>
          <Option value="FEMALE">Female</Option>
          <Option value="OTHER">Other</Option>
        </Select>
      </div>

      {/* Date of Birth */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Date of Birth</label>
        <Input
        label="DOB"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="text-sm sm:text-base"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-gray-700 font-medium">Phone</label>
        <div className="flex gap-2 flex-col sm:flex-row">
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
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-gray-700 font-medium">Email</label>
        <Input
        label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-sm sm:text-base"
        />
      </div>

      {/* Active Switch */}
      <div className="flex items-center gap-3 md:col-span-2 mt-2">
        <Switch
          color="indigo"
          id="active-switch"
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

export default AddCustomerForm;

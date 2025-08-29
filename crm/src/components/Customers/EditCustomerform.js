import React, { useState, useEffect } from "react";
import { Input, Button, Select, Option, Switch } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";

const EditCustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [dataPhotoUrl, setDataPhotoUrl] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await API.get(`/customers/${id}/`);
        const data = response.data;
        setFullName(data.full_name);
        setGender(data.gender);
        setDob(data.date_of_birth);
        setEmail(data.email);
        setIsActive(data.is_active);

        if (data.phone_number.startsWith("+")) {
          const code = data.phone_number.slice(0, data.phone_number.length - 10);
          const number = data.phone_number.slice(-10);
          setCountryCode(code);
          setPhone(number);
        } else {
          setPhone(data.phone_number);
        }

        setDataPhotoUrl(data.photo_url);
      } catch (error) {
        console.error("Error fetching customer:", error.response || error);
        alert("Failed to fetch customer data");
        navigate("/dashboard");
      }
    };
    fetchCustomer();
  }, [id, navigate]);

  const handleFileChange = (e) => setPhoto(e.target.files[0]);

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
      await API.put(`/customers/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating customer:", error.response || error);
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
        <h1 className="text-2xl font-semibold mb-6">Edit Customer</h1>
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-gray-700 font-medium">Full Name</label>
        <Input  value={fullName} onChange={(e) => setFullName(e.target.value)} label="Full Name" className="text-sm" />
      </div>

      {/* Photo */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-gray-700 font-medium">Profile Picture</label>
        <div className="flex items-center gap-4 flex-wrap">
          {photo ? (
            <p className="text-sm">{photo.name}</p>
          ) : dataPhotoUrl ? (
            <img src={dataPhotoUrl} alt={fullName} className="w-16 h-16 rounded-full object-cover border" />
          ) : null}
          <input type="file" onChange={handleFileChange} className="border rounded-md px-2 py-1 mt-2" />
        </div>
      </div>

      {/* Gender */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Gender</label>
        <Select label="Gender" value={gender} onChange={(value) => setGender(value)} className="text-sm" inputClassName="text-sm px-2 py-2">
          <Option value="MALE">Male</Option>
          <Option value="FEMALE">Female</Option>
          <Option value="OTHER">Other</Option>
        </Select>
      </div>

      {/* Date of Birth */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">Date of Birth</label>
        <Input type="date" label="DOB" value={dob} onChange={(e) => setDob(e.target.value)} className="text-sm" />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-gray-700 font-medium">Phone</label>
        <div className="flex gap-2 flex-wrap">
          <Select value={countryCode} label="Contry" onChange={(value) => setCountryCode(value)}>
            <Option value="+91">+91</Option>
            <Option value="+1">+1</Option>
            <Option value="+44">+44</Option>
            <Option value="+61">+61</Option>
          </Select>
          <Input label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="flex-1 text-sm min-w-[120px]" />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="text-gray-700 font-medium">Email</label>
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-sm" />
      </div>

      {/* Active Switch */}
      <div className="flex items-center gap-3 md:col-span-2">
        <Switch id="active-switch" label="Active" color="indigo" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
      </div>

      {/* Buttons */}
      <div className="md:col-span-2 flex flex-wrap justify-end gap-4 mt-4">
        <Button type="button" className="bg-blue-900" onClick={() => navigate("/dashboard")}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-900" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default EditCustomerForm;

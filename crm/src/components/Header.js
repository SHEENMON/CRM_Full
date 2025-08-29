import React, { useState, useEffect } from "react";
import { Select, Option } from "@material-tailwind/react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Header = ({ title }) => {
  const [adminName, setAdminName] = useState("Admin");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/admin/");
        const data = res?.data || {};
        setAdminName(data.name || "dmin");
      } catch (err) {
        console.error("Failed to fetch admin:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 w-full gap-4 sm:gap-0 px-4 sm:px-6">
      {/* Title + Sidebar Icon */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Bars3Icon className="w-6 h-6 hidden md:block cursor-pointer" />
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold truncate">{title}</h1>
      </div>

      {/* Profile + dropdown */}
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow w-full sm:w-auto">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-xs text-white shrink-0">
            {adminName.charAt(0).toUpperCase()}
          </div>

          {/* Name */}
          <span className="font-medium truncate text-sm sm:text-base flex-1">
            {adminName}
          </span>

          {/* Dropdown */}
          <div className="w-24 sm:w-auto">
            <Select
              value={selectedOption}
              onChange={(value) => {
                setSelectedOption(value);
                if (value === "logout") handleLogout();
              }}
              label="Options"
              className="w-full"
            >
              <Option value="logout">Logout</Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

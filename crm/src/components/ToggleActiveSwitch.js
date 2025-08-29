import { Switch } from "@material-tailwind/react";
import { useState } from "react";
import API from "../api";

const ToggleActiveSwitch = ({ id, role, isActive }) => {
  const [active, setActive] = useState(isActive);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const response = await API.patch(`/toggle-status/${role}/${id}/`);
      setActive(response.data.is_active);
    } catch (error) {
      console.error("Failed to toggle:", error);
      alert("Failed to toggle status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch
      checked={active}
      color="indigo"
      onChange={handleToggle}
      label={active ? "Active" : "Deactive"}
      disabled={loading}
    />
  );
};

export default ToggleActiveSwitch;

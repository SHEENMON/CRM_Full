import { createBrowserRouter } from "react-router-dom";

import ProtectedLayout from "./components/ProtectedLayout";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Customerdashboard from "./components/Customers/Customerdashboard";
import AddCustomerForm from "./components/Customers/AddCutomerform";
import EditCustomerform from "./components/Customers/EditCustomerform";
import Managerdashboard from "./components/Managers/Managerdashboard";
import AddManagerForm from "./components/Managers/AddManagerform";
import EditManagerform from "./components/Managers/EditManagerform";
import Departmentdashboard from "./components/Departments/Departmentdashboard";
import AddDepartmentForm from "./components/Departments/AddDepartmentform";
import EditDepartmentForm from "./components/Departments/EditDepartmentForm";
import StaffManagementdashboard from "./components/Staffs/StaffManagementdashboard";
import AddStaffForm from "./components/Staffs/AddStaffform";
import EditStaffForm from "./components/Staffs/EditStaffForm";

const router = createBrowserRouter([
  // Public route
  { path: "/", element: <Login /> },

  // Protected layout
  {
    element: <ProtectedLayout />, // All child routes require login
    children: [
      { path: "dashboard/", element: <Dashboard /> },
      { path: "customers/", element: <Customerdashboard /> },
      { path: "add-customer-form/", element: <AddCustomerForm /> },
      { path: "edit-customer-form/:id", element: <EditCustomerform /> },
      { path: "managers/", element: <Managerdashboard /> },
      { path: "add-manager-form/", element: <AddManagerForm /> },
      { path: "edit-manager-form/:id", element: <EditManagerform /> },
      { path: "departments/", element: <Departmentdashboard /> },
      { path: "add-department-form/", element: <AddDepartmentForm /> },
      { path: "edit-department-form/:id", element: <EditDepartmentForm /> },
      { path: "staffs/", element: <StaffManagementdashboard /> },
      { path: "add-staff-form/", element: <AddStaffForm /> },
      { path: "edit-staff-form/:id", element: <EditStaffForm /> },
    ],
  },
]);

export default router;

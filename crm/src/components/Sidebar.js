import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";
import img from "../assets/image.png"

import {
  PresentationChartBarIcon,
  UserGroupIcon,
  UsersIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`fixed md:static top-0 left-0 h-full z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <Card className="h-[100vh] w-64 p-4 shadow-xl shadow-blue-gray-900/5 bg-blue-900">
        {/* Header with Image */}
        <div className="mb-6 flex flex-col items-center p-4">
          <img
            src={img} 
            alt="Logo"
            className="w-max h-max  mb-2 "
          />
          <Typography variant="h5" className="text-white">
            LOGO
          </Typography>
        </div>

        {/* Menu List */}
        <List>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5 text-white hover:text-black" />
            </ListItemPrefix>
            <Link to="/dashboard" className="text-white hover:text-black">Dashboard</Link>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <UserGroupIcon className="h-5 w-5 text-white hover:text-black" />
            </ListItemPrefix>
            <Link to="/managers" className="text-white hover:text-black">Managers</Link>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <MdManageAccounts className="h-5 w-5 text-white hover:text-black" />
            </ListItemPrefix>
            <Link to="/staffs"className="text-white hover:text-black">Staff Management</Link>
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full text-white hover:text-black"
              />
            </ListItemSuffix>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <UsersIcon className="h-5 w-5 text-white hover:text-black" />
            </ListItemPrefix>
            <Link to="/customers"className="text-white hover:text-black">Customers</Link>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <BuildingLibraryIcon className="h-5 w-5 text-white hover:text-black" />
            </ListItemPrefix>
            <Link to="/departments"className="text-white hover:text-black">Departments</Link>
          </ListItem>
        </List>
      </Card>
    </div>
  );
}

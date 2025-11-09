import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home,
  FileText,
  Bell,
  User,
  BarChart,
  Users,
  Settings,
  Brain,
} from "lucide-react";

// Role-based nav items
const navItems = {
  user: [
    { name: "Dashboard", path: "/dashboard/", icon: <Home size={18} /> },
    { name: "All Submited Complaints", path: "/dashboard/submitedcomplaints", icon: <FileText size={18} /> },
    {
      name: "Submit Complaint",
      path: "/dashboard/myComplaints",
      icon: <FileText size={18} />,
    },

    { name: "Gems", path: "/dashboard/gems", icon: <BarChart size={18} /> },
  ],
  admin: [
    { name: "Dashboard", path: "/", icon: <Home size={18} /> },
    { name: "Complaints", path: "/dashboard/allComplaints", icon: <FileText size={18} /> },
    { name: "Analytics", path: "/dashboard/analytics", icon: <BarChart size={18} /> },
    { name: "AI Analysis", path: "/ai-analysis", icon: <Brain size={18} /> },
  ],
  superAdmin: [
    { name: "Dashboard", path: "/", icon: <Home size={18} /> },
    {
      name: "All Complaints",
      path: "/dashboard/allComplaintsSuperAdmin",
      icon: <FileText size={18} />,
    },
    { name: "User Management", path: "/users", icon: <Users size={18} /> },
    {
      name: "Authority Management",
      path: "/dashboard/authManagement",
      icon: <Users size={18} />,
    },
    { name: "AI Analysis", path: "/ai-analysis", icon: <Brain size={18} /> },
    // {
    //   name: "System Analytics",
    //   path: "/system-analytics",
    //   icon: <BarChart size={18} />,
    // },
    // { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
  ],
};

const DashboardSidebar = ({ role }) => {
  const items = navItems[role] || [];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        // stiffness: 200,
        // damping: 2,
        duration: 0.1,
      }}
      className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg z-50"
    >
      <div className="flex items-center justify-center p-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Dashboard</h1>
      </div>

      <nav className="flex flex-col mt-4 space-y-2">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}


      </nav>

      <div className="bottom-0 absolute ">
        <Link to={'/'}>
          <button className="w-full flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition">Home</button></Link>
      </div>
    </motion.div>
  );
};

export default DashboardSidebar;

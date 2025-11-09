import React, { useContext, useState } from "react";
import DashboardSidebar from "../Components/DashboardSidebar";
import { Outlet } from "react-router";
import { AuthContext } from "../Provider/authProvider";

const DashbordLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const Userrole = user.role;
  console.log(user);
  return (
    <div className="min-h-screen bg-green-50  transition-colors duration-300">
      <DashboardSidebar
        role={Userrole}
        isOpen={isOpen}
        toggleSidebar={() => setIsOpen(false)}
      />
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md"
      >
        ☰
      </button>
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashbordLayout;
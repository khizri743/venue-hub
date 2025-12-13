"use client";
import React, { useEffect, useState } from "react";
import {
  getAdminDashboardData,
  deleteUser,
  deleteVenue,
} from "../action/getAdminData";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardHome from "./components/DashboardHome";
import UsersManager from "./components/UsersManager";
import VenuesManager from "./components/VenuesManager";
import BookingsManager from "./components/BookingsManager"; // <--- IMPORT THIS
import SettingsManager from "./components/SettingsManager"; // <--- IMPORT THIS

const AdminDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");

  useEffect(() => {
    const loadData = async () => {
      const result = await getAdminDashboardData();
      if (result.success) setData(result);
      setLoading(false);
    };
    loadData();
  }, []);

  // Handlers
  const handleDeleteUser = async (id: string) => {
    /* ... existing code ... */
  };
  const handleDeleteVenue = async (id: string) => {
    /* ... existing code ... */
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      <Sidebar
        isOpen={sidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6 md:p-8 overflow-y-auto">
          {/* VIEW SWITCHER LOGIC */}

          {activeView === "dashboard" && (
            <DashboardHome
              data={data}
              onDeleteUser={handleDeleteUser}
              onDeleteVenue={handleDeleteVenue}
            />
          )}

          {activeView === "users" && (
            <UsersManager data={data} onDeleteUser={handleDeleteUser} />
          )}

          {activeView === "venues" && (
            <VenuesManager data={data} onDeleteVenue={handleDeleteVenue} />
          )}

          {/* NEW VIEWS */}
          {activeView === "bookings" && <BookingsManager data={data} />}

          {activeView === "settings" && <SettingsManager />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

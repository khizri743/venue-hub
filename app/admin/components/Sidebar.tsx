"use client";
import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Settings,
  LogOut,
  Calendar,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar = ({ isOpen, activeView, setActiveView }: SidebarProps) => {
  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-slate-900 text-white transition-all duration-300 flex flex-col fixed h-full z-20`}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center justify-center border-b border-slate-800 cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        <span
          className={`text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent ${
            !isOpen && "hidden"
          }`}
        >
          VenueHub
        </span>
        {!isOpen && <span className="text-amber-500 font-bold">VH</span>}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-6 space-y-2 px-3">
        <NavItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          isActive={activeView === "dashboard"}
          isOpen={isOpen}
          onClick={() => setActiveView("dashboard")}
        />
        <NavItem
          icon={<Users size={20} />}
          label="Users & Vendors"
          isActive={activeView === "users"}
          isOpen={isOpen}
          onClick={() => setActiveView("users")}
        />
        <NavItem
          icon={<MapPin size={20} />}
          label="Venues"
          isActive={activeView === "venues"}
          isOpen={isOpen}
          onClick={() => setActiveView("venues")}
        />

        <div className="pt-4 pb-2">
          <p
            className={`text-xs font-bold text-slate-500 uppercase px-4 ${
              !isOpen && "hidden"
            }`}
          >
            Settings
          </p>
        </div>
        <NavItem
          icon={<Calendar size={20} />}
          label="Bookings"
          isActive={activeView === "bookings"} // Check condition
          isOpen={isOpen}
          onClick={() => setActiveView("bookings")} // Set View
        />
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-3 text-slate-400 hover:text-white transition p-2 rounded-lg hover:bg-slate-800"
        >
          <LogOut size={20} />
          {isOpen && <span>Exit Portal</span>}
        </Link>
      </div>
    </aside>
  );
};

// Helper Component for the Item
const NavItem = ({ icon, label, isActive, isOpen, onClick }: any) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`}
  >
    {icon}
    {isOpen && <span className="font-medium text-sm">{label}</span>}
  </div>
);

export default Sidebar;

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAdminDashboardData,
  deleteUser,
  deleteVenue,
} from "../action/getAdminData";
import Link from "next/link";

const AdminDashboard = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users"); // 'users' or 'venues'

  // Fetch Data on Load
  useEffect(() => {
    const loadData = async () => {
      const result = await getAdminDashboardData();
      if (result.success) {
        setData(result);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (
      confirm("Are you sure? This will delete the user and all their data.")
    ) {
      await deleteUser(id);
      window.location.reload(); // Simple reload to refresh data
    }
  };

  const handleDeleteVenue = async (id: string) => {
    if (confirm("Delete this venue?")) {
      await deleteVenue(id);
      window.location.reload();
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-black text-amber-500">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navbar */}
      <nav className="bg-black text-amber-500 p-4 px-8 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold tracking-tight">VenueHub Admin</h1>
        <div className="flex gap-4 text-sm font-bold">
          <Link href="/" className="hover:text-white transition">
            Go to Website
          </Link>
          <span className="text-gray-500">|</span>
          <span className="text-white">Super Admin</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        {/* 1. STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={data?.stats.totalUsers}
            color="bg-blue-500"
          />
          <StatCard
            title="Vendors"
            value={data?.stats.totalVendors}
            color="bg-amber-600"
          />
          <StatCard
            title="Customers"
            value={data?.stats.totalCustomers}
            color="bg-green-500"
          />
          <StatCard
            title="Total Venues"
            value={data?.stats.totalVenues}
            color="bg-purple-600"
          />
        </div>

        {/* 2. TABS */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-2 px-4 font-bold text-lg transition ${
              activeTab === "users"
                ? "text-amber-600 border-b-4 border-amber-600"
                : "text-gray-500 hover:text-black"
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab("venues")}
            className={`pb-2 px-4 font-bold text-lg transition ${
              activeTab === "venues"
                ? "text-amber-600 border-b-4 border-amber-600"
                : "text-gray-500 hover:text-black"
            }`}
          >
            All Venues
          </button>
        </div>

        {/* 3. CONTENT AREA */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* USERS TABLE */}
          {activeTab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 font-bold text-gray-600">Name</th>
                    <th className="p-4 font-bold text-gray-600">Email</th>
                    <th className="p-4 font-bold text-gray-600">Role</th>
                    <th className="p-4 font-bold text-gray-600">Joined</th>
                    <th className="p-4 font-bold text-gray-600 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users.map((user: any) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-medium">{user.name || "N/A"}</td>
                      <td className="p-4 text-gray-500">{user.email}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            user.role === "ADMIN"
                              ? "bg-red-100 text-red-600"
                              : user.role === "VENDOR"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        {user.role !== "ADMIN" && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-bold"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* VENUES TABLE */}
          {activeTab === "venues" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 font-bold text-gray-600">Venue Name</th>
                    <th className="p-4 font-bold text-gray-600">
                      Vendor Owner
                    </th>
                    <th className="p-4 font-bold text-gray-600">Price</th>
                    <th className="p-4 font-bold text-gray-600">Capacity</th>
                    <th className="p-4 font-bold text-gray-600 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.venues.map((venue: any) => (
                    <tr
                      key={venue.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-bold text-gray-800">
                        {venue.name}
                      </td>
                      <td className="p-4 text-amber-600">
                        {venue.vendor.name}
                      </td>
                      <td className="p-4 text-gray-600">
                        Rs. {venue.price.toLocaleString()}
                      </td>
                      <td className="p-4 text-gray-500">{venue.capacity}</td>
                      <td className="p-4 text-right flex justify-end gap-3">
                        <Link
                          href={`/venues/${venue.id}`}
                          className="text-blue-500 hover:underline text-sm"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDeleteVenue(venue.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-bold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ title, value, color }: any) => (
  <div className={`${color} text-white p-6 rounded-xl shadow-lg`}>
    <h3 className="text-white/80 font-bold uppercase text-xs mb-1">{title}</h3>
    <p className="text-4xl font-extrabold">{value}</p>
  </div>
);

export default AdminDashboard;

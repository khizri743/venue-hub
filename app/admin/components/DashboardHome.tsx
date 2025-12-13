"use client";
import React from "react";
import { MapPin, MoreVertical, XCircle, CheckCircle } from "lucide-react";

// Props interface
interface DashboardHomeProps {
  data: any;
  onDeleteUser: (id: string) => void;
  onDeleteVenue: (id: string) => void;
}

const DashboardHome = ({
  data,
  onDeleteUser,
  onDeleteVenue,
}: DashboardHomeProps) => {
  return (
    <div className="space-y-8">
      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Sales"
          value="Rs. 450k"
          trend="+12%"
          trendUp={true}
          color="green"
        />
        <StatsCard
          title="New Vendors"
          value={data?.stats.totalVendors || "0"}
          trend="+5"
          trendUp={true}
          color="indigo"
        />
        <StatsCard
          title="Active Venues"
          value={data?.stats.totalVenues || "0"}
          trend="+2"
          trendUp={true}
          color="amber"
        />
        <StatsCard
          title="Total Users"
          value={data?.stats.totalUsers || "0"}
          trend="+8%"
          trendUp={true}
          color="red"
        />
      </div>

      {/* TABLES ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Users */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-700">Recent Users</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-3 pl-2">User</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data?.users.slice(0, 5).map((user: any) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/80 transition group"
                  >
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                          {user.name?.substring(0, 2).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                          user.role === "VENDOR"
                            ? "bg-indigo-50 text-indigo-600"
                            : user.role === "ADMIN"
                            ? "bg-red-50 text-red-600"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-xs font-medium text-slate-600">
                          Active
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onDeleteUser(user.id)}
                          className="p-1 text-red-400 hover:bg-red-50 rounded"
                        >
                          <XCircle size={18} />
                        </button>
                        <button className="p-1 text-green-400 hover:bg-green-50 rounded">
                          <CheckCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Venues */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-700">Latest Venues</h3>
            <MoreVertical size={20} className="text-slate-400 cursor-pointer" />
          </div>
          <div className="space-y-6">
            {data?.venues.slice(0, 4).map((venue: any) => (
              <div key={venue.id} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden relative shrink-0">
                  <div className="absolute inset-0 bg-indigo-100 flex items-center justify-center text-indigo-400">
                    <MapPin size={20} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-700 truncate">
                    {venue.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    {venue.vendor?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-700">
                    Rs. {venue.price / 1000}k
                  </p>
                  <button
                    onClick={() => onDeleteVenue(venue.id)}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, trend, trendUp, color }: any) => {
  const colorClasses: any = {
    green: "bg-emerald-500",
    indigo: "bg-indigo-500",
    amber: "bg-amber-500",
    red: "bg-rose-500",
  };
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
            {value}
          </h3>
        </div>
        <div
          className={`px-2 py-1 rounded text-xs font-bold ${
            trendUp ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {trend}
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-1 ${
          colorClasses[color] || "bg-slate-300"
        }`}
      ></div>
    </div>
  );
};

export default DashboardHome;

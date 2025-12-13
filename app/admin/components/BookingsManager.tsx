"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  DollarSign,
  Search,
  Filter,
} from "lucide-react";
import { updateBookingStatus } from "../../action/getAdminData";

interface BookingsManagerProps {
  data: any;
}

const BookingsManager = ({ data }: BookingsManagerProps) => {
  const [filter, setFilter] = useState("ALL"); // ALL, PENDING, CONFIRMED

  const handleStatusChange = async (
    id: string,
    status: "CONFIRMED" | "CANCELLED"
  ) => {
    if (confirm(`Are you sure you want to mark this as ${status}?`)) {
      await updateBookingStatus(id, status);
      window.location.reload();
    }
  };

  const filteredBookings = data?.bookings.filter((b: any) => {
    if (filter === "ALL") return true;
    return b.status === filter;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2">
          <Calendar className="text-indigo-500" size={24} />
          Bookings Management
        </h3>

        <div className="flex gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Quick search..."
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
            />
          </div>
          <select
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-indigo-500 transition">
            + Add Booking
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-600 text-sm">Status</th>
              <th className="p-4 font-bold text-slate-600 text-sm">
                Venue / Event
              </th>
              <th className="p-4 font-bold text-slate-600 text-sm">Customer</th>
              <th className="p-4 font-bold text-slate-600 text-sm">
                Date & Guests
              </th>
              <th className="p-4 font-bold text-slate-600 text-sm">Price</th>
              <th className="p-4 font-bold text-slate-600 text-sm text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredBookings?.map((booking: any) => (
              <tr
                key={booking.id}
                className="hover:bg-slate-50/80 transition group"
              >
                {/* Status Indicator (Like the colored dots in your image) */}
                <td className="p-4">
                  <div
                    className={`flex items-center gap-2 font-bold text-xs px-2 py-1 rounded-md w-max ${
                      booking.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-500"
                          : booking.status === "CANCELLED"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    ></span>
                    {booking.status}
                  </div>
                </td>

                <td className="p-4">
                  <p className="font-bold text-slate-700">
                    {booking.venue.name}
                  </p>
                  <p className="text-xs text-slate-400">Wedding Package</p>
                </td>

                <td className="p-4">
                  <p className="font-medium text-slate-700">
                    {booking.user.name}
                  </p>
                  <p className="text-xs text-slate-400">{booking.user.email}</p>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2 text-slate-600 mb-1">
                    <Calendar size={14} />
                    {new Date(booking.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Clock size={14} />
                    {booking.guestCount} Guests
                  </div>
                </td>

                <td className="p-4 font-bold text-slate-700">
                  Rs. {booking.totalPrice.toLocaleString()}
                </td>

                {/* Action Buttons (Like "Edit | Duplicate" in your image) */}
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    {booking.status === "PENDING" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id, "CONFIRMED")
                          }
                          className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded text-green-600 hover:bg-green-50 hover:border-green-200 transition bg-white"
                        >
                          <CheckCircle size={14} /> Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(booking.id, "CANCELLED")
                          }
                          className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded text-red-600 hover:bg-red-50 hover:border-red-200 transition bg-white"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </>
                    )}
                    {booking.status !== "PENDING" && (
                      <button className="px-3 py-1.5 border border-slate-200 rounded text-slate-400 cursor-not-allowed bg-slate-50">
                        Archived
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filteredBookings?.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  No bookings found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsManager;

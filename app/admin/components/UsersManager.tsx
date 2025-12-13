"use client";
import React from "react";
import { Trash2, ShieldCheck } from "lucide-react";

interface UsersManagerProps {
  data: any;
  onDeleteUser: (id: string) => void;
}

const UsersManager = ({ data, onDeleteUser }: UsersManagerProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-xl font-bold text-slate-700 mb-6">User Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-600">User Details</th>
              <th className="p-4 font-bold text-slate-600">Role</th>
              <th className="p-4 font-bold text-slate-600">Joined</th>
              <th className="p-4 font-bold text-slate-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data?.users.map((user: any) => (
              <tr key={user.id} className="hover:bg-slate-50 transition">
                <td className="p-4">
                  <p className="font-bold text-slate-800">
                    {user.name || "Unknown"}
                  </p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
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
                <td className="p-4 text-sm text-slate-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  {user.role !== "ADMIN" && (
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-xs font-bold"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  )}
                  {user.role === "ADMIN" && (
                    <ShieldCheck size={20} className="text-green-500 ml-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManager;

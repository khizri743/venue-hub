"use client";
import React from "react";
import { Save } from "lucide-react";

const SettingsManager = () => {
  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <h3 className="text-xl font-bold text-slate-700 mb-6 pb-4 border-b border-slate-100">
          Global Configuration
        </h3>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="VenueHub"
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue="admin@venuehub.com"
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">
              Service Fee Percentage (%)
            </label>
            <input
              type="number"
              defaultValue="5"
              className="w-full md:w-1/3 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700"
            />
            <p className="text-xs text-slate-400 mt-1">
              This percentage will be deducted from vendor payouts.
            </p>
          </div>

          <div className="pt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-slate-700">
                Enable New User Registrations
              </span>
            </label>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-slate-800 transition flex items-center gap-2"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsManager;

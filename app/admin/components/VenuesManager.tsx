"use client";
import React from "react";
import { Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface VenuesManagerProps {
  data: any;
  onDeleteVenue: (id: string) => void;
}

const VenuesManager = ({ data, onDeleteVenue }: VenuesManagerProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-xl font-bold text-slate-700 mb-6">All Venues</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.venues.map((venue: any) => (
          <div
            key={venue.id}
            className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition bg-white"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-lg text-slate-800">
                  {venue.name}
                </h4>
                <p className="text-xs text-slate-500">
                  by {venue.vendor?.name}
                </p>
              </div>
              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">
                Rs. {venue.price}
              </span>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
              <Link
                href={`/venues/${venue.id}`}
                className="flex-1 text-center py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 flex items-center justify-center gap-2"
              >
                <ExternalLink size={14} /> View
              </Link>
              <button
                onClick={() => onDeleteVenue(venue.id)}
                className="flex-1 text-center py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 flex items-center justify-center gap-2"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenuesManager;

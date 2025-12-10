"use client"
import React, { useState } from 'react';
import { addVenue } from '../action/addVenue';

interface AddVenueProps {
  onClose: () => void;
  userEmail: string; // We need this to link the venue to the vendor
}

const AddVenueModal = ({ onClose, userEmail }: AddVenueProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    capacity: '',
    price: '',
    coverImage: '',
    category: 'Weddings'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Call Server Action
    const result = await addVenue(formData, userEmail);
    
    setLoading(false);
    if (result.success) {
        alert("Venue Added Successfully!");
        onClose();
    } else {
        alert(result.error);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-6 text-white flex justify-between items-center sticky top-0 z-10">
            <h2 className="text-2xl font-bold">Add New Venue</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white text-3xl font-bold">&times;</button>
        </div>

        <div className="p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Venue Name</label>
                    <input name="name" required type="text" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g. Grand Palace Hall" />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                    <textarea name="description" required rows={3} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Describe the amenities and vibe..."></textarea>
                </div>

                {/* City & Address */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                    <input name="city" required type="text" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g. Karachi" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
                    <input name="address" required type="text" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Street area..." />
                </div>

                {/* Capacity & Price */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Capacity</label>
                    <input name="capacity" required type="number" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Max guests" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (Rs)</label>
                    <input name="price" required type="number" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Starting price" />
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cover Image URL</label>
                    <input name="coverImage" required type="url" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="https://images.unsplash.com/..." />
                    <p className="text-xs text-gray-400 mt-1">Paste a link from Unsplash or your image host.</p>
                </div>

                {/* Category Dropdown */}
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                    <select name="category" onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                        <option>Weddings</option>
                        <option>Birthdays</option>
                        <option>Corporate</option>
                        <option>Concerts</option>
                        <option>Engagement</option>
                        <option>Baby Shower</option>
                    </select>
                </div>

                {/* Submit */}
                <div className="md:col-span-2 mt-4">
                    <button disabled={loading} className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg disabled:opacity-50">
                        {loading ? "Creating Venue..." : "+ Create Venue"}
                    </button>
                </div>

            </form>
        </div>
      </div>
    </div>
  )
}

export default AddVenueModal
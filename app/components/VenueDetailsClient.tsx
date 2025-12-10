"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import BookingModal from './BookingModal'

const VenueDetailsClient = ({ venue }: { venue: any }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    eventType: 'Wedding',
    guests: '',
  });

  // 1. NEW STATE: To track validation errors per field
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear error for this field as soon as user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleBookClick = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    // 2. VALIDATION LOGIC
    // Check Empty Fields
    if (!formData.name) {
        newErrors.name = "Name is required";
        isValid = false;
    }
    if (!formData.phone) {
        newErrors.phone = "Phone is required";
        isValid = false;
    }
    if (!formData.date) {
        newErrors.date = "Date is required";
        isValid = false;
    }
    if (!formData.guests) {
        newErrors.guests = "Guest count is required";
        isValid = false;
    }

    // Check Capacity Limit
    const guestCount = parseInt(formData.guests);
    if (formData.guests && guestCount > venue.capacity) {
        newErrors.guests = `Max capacity is ${venue.capacity}`;
        isValid = false;
    }
    if (formData.guests && guestCount <= 0) {
        newErrors.guests = "Invalid number";
        isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
        setIsBookingOpen(true);
    }
  };

  // Helper class to conditionally style inputs based on error state
  const getInputClass = (fieldName: string) => {
    const baseClass = "w-full p-3 rounded-lg border outline-none text-sm transition-all";
    if (errors[fieldName]) {
        return `${baseClass} border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50`;
    }
    return `${baseClass} border-gray-300 focus:ring-2 focus:ring-amber-500`;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
        
        {/* ... (Hero Image Section Remains Same) ... */}
        <div className="relative h-[50vh] w-full">
            <Image src={venue.coverImage} alt={venue.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
                <div className="max-w-7xl mx-auto">
                    <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">
                        Featured Venue
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{venue.name}</h1>
                    <p className="text-white/90 text-xl flex items-center gap-2">
                        <span className="text-amber-400">📍</span> {venue.city}, {venue.address}
                    </p>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Content (Description/Amenities) Remains Same... */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About this Venue</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        {venue.description || "Experience luxury and elegance at its finest..."}
                    </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
                    <ul className="grid grid-cols-2 gap-4 text-gray-600">
                        {["Wifi", "Parking", "Catering", "Air Conditioning", "Stage", "Sound System"].map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span className="text-green-500">✓</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* --- RIGHT SIDEBAR (Updated with Error Handling) --- */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100 sticky top-24">
                    
                    <div className="mb-6 border-b border-gray-100 pb-4">
                        <span className="text-gray-500 text-sm">Starting from</span>
                        <div className="flex items-end gap-2">
                            <h3 className="text-3xl font-bold text-amber-600">Rs. {venue.price.toLocaleString()}</h3>
                            <span className="text-gray-400 mb-1">/ Event</span>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Rating</span>
                            <span className="font-bold text-black">★ {venue.averageRating} (Verified)</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Max Capacity</span>
                            <span className="font-bold text-amber-600">{venue.capacity} Guests</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mb-6">
                        {/* Name Input */}
                        <div>
                            <input 
                                name="name" type="text" placeholder="Full Name" 
                                className={getInputClass('name')}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                        </div>

                        {/* Phone Input */}
                        <div>
                            <input 
                                name="phone" type="tel" placeholder="Phone Number" 
                                className={getInputClass('phone')}
                                onChange={handleChange}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {/* Date Input */}
                            <div>
                                <input 
                                    name="date" type="date" 
                                    className={`${getInputClass('date')} text-gray-500`}
                                    onChange={handleChange}
                                />
                                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                            </div>
                            
                            {/* Guests Input */}
                            <div>
                                <input 
                                    name="guests"
                                    type="number" 
                                    placeholder="Guests"
                                    // Removed max attribute here so user CAN type a wrong number 
                                    // (allowing our validation logic to run and show the error message)
                                    className={getInputClass('guests')}
                                    onChange={handleChange}
                                />
                                {errors.guests && <p className="text-red-500 text-xs mt-1 leading-tight">{errors.guests}</p>}
                            </div>
                        </div>

                        <select 
                            name="eventType"
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 outline-none text-sm text-gray-600 bg-white"
                            onChange={handleChange}
                            value={formData.eventType}
                        >
                            <option>Wedding</option>
                            <option>Birthday</option>
                            <option>Corporate</option>
                            <option>Concert</option>
                        </select>
                    </div>

                    <button 
                        onClick={handleBookClick}
                        className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg flex items-center justify-center gap-2"
                    >
                        Book Now <span>→</span>
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-3">You won't be charged yet</p>
                </div>
            </div>
        </div>

        {isBookingOpen && (
            <BookingModal 
                venueName={venue.name} 
                price={venue.price} 
                userData={formData} 
                onClose={() => setIsBookingOpen(false)} 
            />
        )}

    </div>
  )
}

export default VenueDetailsClient
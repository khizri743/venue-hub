"use client"
import React, { useState } from 'react'

interface BookingModalProps {
  venueName: string;
  price: number;
  userData: any; // Receive the data from parent
  onClose: () => void;
}

const BookingModal = ({ venueName, price, userData, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1); // 1 = Confirm, 2 = Success

  const handleConfirm = () => {
    // Here call Server Action to save to DB
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-6 text-white flex justify-between items-center">
            <h2 className="text-xl font-bold">
                {step === 1 ? "Confirm Booking" : "Success"}
            </h2>
            <button onClick={onClose} className="text-white/80 hover:text-white text-2xl font-bold">&times;</button>
        </div>

        <div className="p-8">
            {step === 1 ? (
                // --- CONFIRMATION SCREEN ---
                <div className="space-y-6">
                    
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                        <h3 className="text-amber-800 font-bold mb-2">Venue</h3>
                        <p className="text-gray-700 font-medium text-lg">{venueName}</p>
                    </div>

                    {/* Details List */}
                    <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Name</span>
                            <span className="font-bold text-gray-800">{userData.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Phone</span>
                            <span className="font-bold text-gray-800">{userData.phone}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Date</span>
                            <span className="font-bold text-gray-800">{userData.date}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Event Type</span>
                            <span className="font-bold text-gray-800">{userData.eventType}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Guests</span>
                            <span className="font-bold text-gray-800">{userData.guests}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <span className="text-gray-500 font-medium">Total Est.</span>
                        <span className="text-2xl font-bold text-amber-600">Rs. {price.toLocaleString()}</span>
                    </div>

                    <button 
                        onClick={handleConfirm}
                        className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg"
                    >
                        Confirm Now
                    </button>
                </div>
            ) : (
                // --- SUCCESS SCREEN ---
                <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                        ✓
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Booking Requested!</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Thank you, {userData.name}. <br/>
                        We have sent the details to the vendor. They will contact you at <span className="font-bold text-black">{userData.phone}</span> shortly.
                    </p>
                    <button onClick={onClose} className="px-8 py-3 bg-amber-500 text-white rounded-full font-bold hover:bg-amber-600 text-sm">
                        Back to Venue
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default BookingModal
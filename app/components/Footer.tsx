import React from 'react'
import Search from "./Search"
import { subscribeField } from '../data/inputField'; 
// 1. Import the data
import { links, events } from '../data/footerLinks'; 

const Footer = () => {
  return (
    <footer className="w-full">
        
        <div className="bg-white py-10 flex flex-col items-center justify-center">
            <h1 className="">
                Subscribe to Newsletter
            </h1>
            <div className="w-full max-w-4xl px-4">
                <Search {...subscribeField} />
            </div>
        </div>

        <div className="bg-amber-500 pt-16 pb-6 px-8 text-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-amber-500 font-bold text-xl font-serif">
                                VH
                            </div>
                            <span className="text-3xl font-normal text-black font-sans">VenueHub</span>
                        </div>
                        <p className="text-sm font-bold text-amber-800">Find Your Perfect Space</p>
                        <p className="text-gray-800 text-sm leading-relaxed mt-2">
                            Your trusted partner in finding and booking the perfect venue for every occasion.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-normal text-gray-800 mb-6">Quick Links</h3>
                        <ul className="space-y-2 text-gray-800">
                            {Object.entries(links).map(([name, url], index) => (
                                <li key={index} className="hover:underline cursor-pointer flex gap-2 capitalize">
                                    <span>•</span> 
                                    <a href={url}>{name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-normal text-gray-800 mb-6">Event Types</h3>
                        <ul className="space-y-2 text-gray-800">
                            {/* Standard Array Map */}
                            {events.map((event) => (
                                <li key={event.id} className="hover:underline cursor-pointer flex gap-2">
                                    <span>•</span> 
                                    {event.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-normal text-gray-800 mb-6">Contact Us</h3>
                        <ul className="space-y-3 text-gray-800">
                            <li className="flex gap-2"><span>•</span> 123 Main Street, <br/> Karachi, Pakistan</li>
                            <li className="flex gap-2"><span>•</span> +92 300 1234567</li>
                            <li className="flex gap-2"><span>•</span> info@venuehub.com</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-amber-600/30 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700">
                    <p>© 2024 VenueHub. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0 underline decoration-amber-600/0 hover:decoration-gray-700 transition">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Cookie Policy</span>
                    </div>
                </div>

            </div>
        </div>
    </footer>
  )
}

export default Footer
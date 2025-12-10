"use client"
import React from 'react'
import Link from 'next/link'

interface NavbarProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
  user?: any; 
  onLogout: () => void; 
  onAddVenueClick?: () => void; // <--- 1. NEW PROP
}

const Navbar = ({ onSignUpClick, onLoginClick, user, onLogout, onAddVenueClick }: NavbarProps) => {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-8 py-5 bg-black text-amber-500 gap-4 md:gap-0">
        
        {/* Added Link to Logo so clicking it goes Home */}
        <div className="text-3xl font-normal tracking-tight cursor-pointer">
            <Link href={'/'}>VenueHub</Link>
        </div>

        <ul className="flex flex-wrap justify-center gap-4 md:gap-8 text-lg font-bold">
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/Venues'}>Venues</Link></li>
            <li><Link href={'/Services'}>Services</Link></li>
            <li><Link href={'/Packages'}>Packages</Link></li>
            <li><Link href={'/About'}>About</Link></li>
            <li><Link href={'/Contact'}>Contact</Link></li>
        </ul>

        {/* LOGIC: CHECK IF USER EXISTS */}
        <div className="flex gap-4 items-center">
            
            {user ? (
                // --- IF LOGGED IN ---
                <>
                    {/* 2. CHECK IF VENDOR -> SHOW ADD BUTTON */}
                    {user.role === 'VENDOR' && (
                        <button 
                            onClick={onAddVenueClick}
                            className="bg-amber-600 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-amber-500 shadow-md transition border border-amber-400 mr-2"
                        >
                            + Add Venue
                        </button>
                    )}

                    <div className="flex flex-col items-end mr-2">
                        <span className="text-white font-bold">{user.name}</span>
                        <span className="text-xs text-amber-500 uppercase">{user.role}</span>
                    </div>
                    <button 
                        onClick={onLogout}
                        className="px-6 py-2 rounded-full border border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-white transition text-sm"
                    >
                        Logout
                    </button>
                </>
            ) : (
                // --- IF LOGGED OUT ---
                <>
                    <button 
                        onClick={onLoginClick}
                        className="px-6 py-2 rounded-full border border-amber-500 text-white font-bold hover:bg-amber-500/10 transition"
                    >
                        Login
                    </button>
                    
                    <button 
                        onClick={onSignUpClick}
                        className="px-6 py-2 rounded-full bg-amber-600 text-white font-bold hover:bg-amber-500 transition"
                    >
                        Sign Up
                    </button>
                </>
            )}
        </div>

    </nav>
  )
}

export default Navbar
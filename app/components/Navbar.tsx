"use client";
import React from "react";
import Link from "next/link";

interface NavbarProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
  user?: any;
  onLogout: () => void;
  onAddVenueClick?: () => void;
}

const Navbar = ({
  onSignUpClick,
  onLoginClick,
  user,
  onLogout,
  onAddVenueClick,
}: NavbarProps) => {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-8 py-5 bg-black text-amber-500 gap-4 md:gap-0">
      {/* Logo */}
      <div className="text-3xl font-normal tracking-tight cursor-pointer">
        <Link href={"/"}>VenueHub</Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-wrap justify-center gap-4 md:gap-8 text-lg font-bold">
        <li>
          <Link href={"/"} className="hover:text-white transition">
            Home
          </Link>
        </li>
        <li>
          <Link href={"/Venues"} className="hover:text-white transition">
            Venues
          </Link>
        </li>
        <li>
          <Link href={"/Services"} className="hover:text-white transition">
            Services
          </Link>
        </li>
        <li>
          <Link href={"/Packages"} className="hover:text-white transition">
            Packages
          </Link>
        </li>
        <li>
          <Link href={"/About"} className="hover:text-white transition">
            About
          </Link>
        </li>
        <li>
          <Link href={"/Contact"} className="hover:text-white transition">
            Contact
          </Link>
        </li>
      </ul>

      {/* User Actions Section */}
      <div className="flex gap-4 items-center">
        {user ? (
          // --- IF LOGGED IN ---
          <>
            {/* 1. ADMIN BUTTON (New) */}
            {user.role === "ADMIN" && (
              <Link href="/admin">
                <button className="bg-red-700 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-red-600 shadow-md transition border border-red-500 mr-2">
                  Dashboard
                </button>
              </Link>
            )}

            {/* 2. VENDOR BUTTON */}
            {user.role === "VENDOR" && (
              <button
                onClick={onAddVenueClick}
                className="bg-amber-600 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-amber-500 shadow-md transition border border-amber-400 mr-2"
              >
                + Add Venue
              </button>
            )}

            {/* User Info & Logout */}
            <div className="flex flex-col items-end mr-2">
              <span className="text-white font-bold">{user.name}</span>
              <span className="text-xs text-amber-500 uppercase">
                {user.role}
              </span>
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
  );
};

export default Navbar;

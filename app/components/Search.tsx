"use client" // 1. Needs to be client side to handle user input
import React, { useState } from 'react'
import { useRouter } from 'next/navigation' // Import router

interface SearchProps {
    placeholder: string;
    buttonName: string; 
}

const Search = ({placeholder, buttonName}: SearchProps) => {
  const [term, setTerm] = useState(''); // Store what user types
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Stop page refresh

    if (term) {
      // 2. Update URL to /?q=karachi
      router.push(`/?q=${term}`); 
    } else {
      // If empty, go back to home (show all)
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSearch} className='flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-3xl'>
        
        <input 
            type="text" 
            placeholder={placeholder}
            value={term}
            onChange={(e) => setTerm(e.target.value)} // Update state on typing
            className='w-full sm:flex-1 px-6 py-4 rounded-full bg-white/90 text-gray-800 outline-none focus:ring-4 focus:ring-amber-500/50 transition shadow-lg placeholder-gray-500 text-lg'
        />
        
        <button 
            type="submit" 
            className='w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg border border-amber-500/50 text-lg whitespace-nowrap'
        >
            {buttonName}
        </button>
    </form>
  )
}

export default Search
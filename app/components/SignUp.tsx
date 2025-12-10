"use client"
import React, { useState } from 'react';
import { registerUser } from '../action/register'; // Import the action we just made

interface SignUpProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignUp = ({ onClose, onSwitchToLogin }: SignUpProps) => { 
  
  // 1. STATE VARIABLES (To store user input)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("Select");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roles = ["Customer", "Vendor"];

  // Helper to update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    setIsOpen(false);
  };

  // 2. SUBMIT FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page refresh
    setError("");
    setLoading(true);

    // Prepare data
    const dataToSend = { ...formData, role };

    // Call the Server Action
    const result = await registerUser(dataToSend);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      // Success! Close Sign up and open Login
      alert("Account created successfully! Please Login.");
      onSwitchToLogin();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4">
      
      <div className="absolute inset-0" onClick={onClose}></div>

      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white text-4xl font-bold z-50 transition"
      >
        &times;
      </button>

      <div className="relative w-full max-w-md p-1 bg-gradient-to-br from-white/20 to-amber-900/30 rounded-tl-3xl rounded-tr-[6rem] rounded-br-3xl rounded-bl-[6rem] backdrop-blur-md shadow-2xl animate-in zoom-in-95 duration-300 border border-white/10">
        
        {/* Inner Container */}
        <div className="bg-white/5 rounded-tl-3xl rounded-tr-[6rem] rounded-br-3xl rounded-bl-[6rem] p-8 md:p-12">
          
          <h2 className="text-4xl font-bold text-center mb-6 text-amber-500 uppercase tracking-wider drop-shadow-md">
            Sign up
          </h2>

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-500/20 text-red-200 text-sm text-center py-2 rounded-lg mb-4 border border-red-500/50">
                {error}
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <input 
              name="username"
              type="text" 
              placeholder="Username" 
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 rounded-full bg-white/90 text-gray-800 outline-none focus:ring-4 focus:ring-amber-500/40 transition shadow-inner"
            />
            
            <input 
              name="email"
              type="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 rounded-full bg-white/90 text-gray-800 outline-none focus:ring-4 focus:ring-amber-500/40 transition shadow-inner"
            />
            
            <input 
              name="phone"
              type="tel" 
              placeholder="Phone" 
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-6 py-3 rounded-full bg-white/90 text-gray-800 outline-none focus:ring-4 focus:ring-amber-500/40 transition shadow-inner"
            />
            
            <input 
              name="password"
              type="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 rounded-full bg-white/90 text-gray-800 outline-none focus:ring-4 focus:ring-amber-500/40 transition shadow-inner"
            />

            {/* Role Selector */}
            <div className="relative z-50">
                <button 
                  type="button"
                  onClick={toggleDropdown}
                  className="w-full px-6 py-3 rounded-full bg-white/90 text-gray-500 flex justify-between items-center shadow-inner focus:outline-none focus:ring-4 focus:ring-amber-500/40"
                >
                  <span className={role === "Select" ? "text-gray-400" : "text-gray-800"}>
                    {role}
                  </span>
                  <div className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-amber-800 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></div>
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl overflow-hidden shadow-xl">
                    <ul className="text-gray-700">
                       {roles.map((item, index) => (
                         <li 
                            key={index}
                            className="px-6 py-3 hover:bg-amber-100 cursor-pointer font-medium"
                            onClick={() => handleSelect(item)}
                         >
                            {item}
                         </li>
                       ))}
                    </ul>
                  </div>
                )}
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-black via-amber-800 to-amber-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all border border-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="text-center mt-2 text-white/70 font-medium text-sm">
               Already have an account? <span className="underline cursor-pointer hover:text-white transition font-bold" onClick={onSwitchToLogin}>Login</span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
"use client";
import React, { useState, useEffect } from "react"; // 1. Import useEffect
import Navbar from "./Navbar";
import SignUp from "./SignUp";
import Login from "./Login";
// import Footer from './Footer' // Uncomment if you use it inside wrapper
import AddVenueModal from "./AddVenueModal";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddVenueOpen, setIsAddVenueOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<any>(null);

  // 2. LOAD USER FROM STORAGE ON STARTUP
  useEffect(() => {
    const storedUser = localStorage.getItem("venueHubUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }
  }, []);

  const openLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };
  const openSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  // 3. HANDLE LOGIN (Save to State + Storage)
  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
    localStorage.setItem("venueHubUser", JSON.stringify(user));
  };

  // 4. HANDLE LOGOUT (Clear State + Storage)
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("venueHubUser");
    // Optional: Redirect to home to be safe
    // window.location.href = '/';
  };

  return (
    <main className="relative">
      <Navbar
        onSignUpClick={openSignUp}
        onLoginClick={openLogin}
        user={currentUser}
        onLogout={handleLogout}
        onAddVenueClick={() => setIsAddVenueOpen(true)}
      />

      {children}

      {/* --- ADD VENUE MODAL --- */}
      {isAddVenueOpen && currentUser && (
        <AddVenueModal
          userEmail={currentUser.email}
          onClose={() => setIsAddVenueOpen(false)}
        />
      )}

      {isSignUpOpen && (
        <SignUp
          onClose={() => setIsSignUpOpen(false)}
          onSwitchToLogin={openLogin}
        />
      )}

      {isLoginOpen && (
        <Login
          onClose={() => setIsLoginOpen(false)}
          onSwitchToSignUp={openSignUp}
          // 5. Use the new handler here
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </main>
  );
};

export default PageWrapper;

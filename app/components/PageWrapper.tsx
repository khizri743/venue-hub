"use client"
import React, { useState } from 'react'
import Navbar from './Navbar'
import SignUp from './SignUp'
import Login from './Login'
import Footer from './Footer'
import AddVenueModal from './AddVenueModal' // Import the new Modal

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAddVenueOpen, setIsAddVenueOpen] = useState(false); // <--- NEW STATE
  
  const [currentUser, setCurrentUser] = useState<any>(null);

  const openLogin = () => { setIsSignUpOpen(false); setIsLoginOpen(true); };
  const openSignUp = () => { setIsLoginOpen(false); setIsSignUpOpen(true); };
  
  const handleLogout = () => { setCurrentUser(null); };

  return (
    <main className="relative">
        <Navbar 
            onSignUpClick={openSignUp} 
            onLoginClick={openLogin} 
            user={currentUser}
            onLogout={handleLogout}
            onAddVenueClick={() => setIsAddVenueOpen(true)} // <--- Pass function
        />

        {children}

        {/* --- ADD VENUE MODAL --- */}
        {/* Only show if open AND user exists */}
        {isAddVenueOpen && currentUser && (
            <AddVenueModal 
                userEmail={currentUser.email} // Pass email for ID lookup
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
                onLoginSuccess={(user) => setCurrentUser(user)}
            />
        )}
    </main>
  )
}

export default PageWrapper
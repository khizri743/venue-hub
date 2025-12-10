import React from 'react'
import Search from './Search'
import { searchField } from '../data/inputField';

const Hero = () => {
  return (
    <section 
      className='relative h-[600px] flex flex-col justify-center items-center text-center px-4 bg-cover bg-center'
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')" 
      }}
    >
        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black/70'></div>

        {/* Content Wrapper */}
        <div className='relative z-10 max-w-5xl mx-auto'>
            
            {/* Main Headings */}
            <h1 className='text-5xl md:text-6xl font-extrabold text-amber-500 mb-4 tracking-tight drop-shadow-md'>
                Plan your event venue
            </h1>
            <h3 className='text-2xl md:text-4xl font-bold text-white mb-8 tracking-wide'>
                Anytime, Anywhere
            </h3>
            
            {/* Description Text (Fixed Typos) */}
            <p className='text-white text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed font-light'>
                Plan your event whether it’s a wedding or a party, with Hamara Venue. 
                Being the leading wedding planner in Pakistan, we give you access to the 
                best event venues, wedding halls, mehndi artists, catering services, 
                and many others.
            </p>

            {/* Search Bar Section */}
            <div className='w-full flex justify-center'>
                <Search 
                    placeholder={searchField.placeholder} 
                    buttonName={searchField.buttonName}
                />
            </div>
        </div>
    </section>
  )
}

export default Hero
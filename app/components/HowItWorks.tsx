import React from 'react'

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "Search",
            description: "Browse through hundreds of verified venues in your area using smart filters"
        },
        {
            id: 2,
            title: "Compare Venues",
            description: "Compare prices, amenities, and reviews to find the perfect match for your event"
        },
        {   
            id: 3,
            title: "Book Online",
            description: "Secure your booking with just a few clicks and get instant confirmation"
        },
        {
            id: 4,
            title: "Enjoy Your Event",
            description: "Relax and enjoy your special day at your perfect venue worry-free"
        }
    ];

  return (
    <section className='py-16 px-4 bg-white'>
        
        {/* Header Section */}
        <div className='text-center mb-16'>
            <h1 className='text-4xl font-bold text-amber-500 mb-4'>How It Works</h1>
            <div className='text-black font-bold text-lg leading-tight'>
                <p>Finding and booking your perfect venue has never been easier.</p>
                <p>Follow these simple steps.</p>
            </div>
        </div>

        {/* Cards Container */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
            {steps.map((step, index) => (
                
                // The Card (Relative Parent)
                // We add 'mt-6' to create space for the floating bubble at the top
                <div 
                    key={index} 
                    className='relative mt-6 border border-amber-300 rounded-2xl p-6 pt-12 text-center bg-white hover:shadow-lg transition-shadow duration-300'
                >
                    {/* The Floating Number Badge */}
                    <div className='absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-md'>
                        {step.id}
                    </div>

                    {/* Content */}
                    <h1 className='font-bold text-amber-500 mb-3'>
                        {step.title}
                    </h1>
                    <p className='text-gray-500 text-2xl font-bold'>
                        {step.description}
                    </p>
                </div>

            ))}
        </div>
    </section>
  )
}

export default HowItWorks
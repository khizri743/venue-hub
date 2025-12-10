import React from 'react'

const EventCategory = () => {
  const categories = [
    { 
      title: "Birthdays", 
      image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      title: "Corporate", 
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      title: "Engagement", 
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2000&auto=format&fit=crop"
    },
    { 
      title: "Baby Shower", 
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2000&auto=format&fit=crop"
    },
    { 
      title: "Weddings", 
      image: "https://images.unsplash.com/photo-1519225468359-299651df6250?q=80&w=2000&auto=format&fit=crop" 
    },
    { 
      title: "Concerts", 
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2000&auto=format&fit=crop"
    },
  ];

  return (
    <section className='py-16 px-4 bg-white'>
        
        {/* Header Section */}
        <div className='text-center mb-12'>
            <h1>
                Popular Event Category
            </h1>
            <p className='text-black font-semibold text-lg max-w-2xl mx-auto'>
                Browse our curated selection of venues for every occasion. Find the perfect space that matches your vision.
            </p>
        </div>

        {/* Grid Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
            {categories.map((category, index) => (
                <div 
                    key={index} 
                    className='relative h-64 rounded-md overflow-hidden group cursor-pointer'
                >
                    {/* Background Image */}
                    <div 
                        className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110'
                        style={{ backgroundImage: `url('${category.image}')` }}
                    ></div>

                    {/* Dark Overlay (Essential for text readability) */}
                    <div className='absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors'></div>

                    {/* Text Content */}
                    <div className='relative z-10 h-full flex items-center justify-center'>
                        <h3 className='text-white text-3xl font-normal tracking-wide'>
                            {category.title}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default EventCategory
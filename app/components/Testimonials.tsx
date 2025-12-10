import React from 'react'
import Image from 'next/image'
import { prisma } from '../lib/prisma' // 1. Import DB

// 2. Make Async
const Testimonials = async () => {

    // 3. Fetch Data from DB
    const reviews = await prisma.review.findMany({
        take: 3, // Fetch top 3 reviews
        orderBy: { createdAt: 'desc' },
        include: {
            user: true // We need this to get the Name and Image of the reviewer
        }
    });

  return (
    <section className='py-16 px-4 bg-white'>

        <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-amber-500 mb-4'>What Our Clients Say</h1>
            <p className='text-black font-bold text-lg max-w-2xl mx-auto leading-tight'>
                Don't just take our word for it - hear from our happy customers who found their perfect venues
            </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            {reviews.map((review) => (
                
                <div key={review.id} className='bg-white p-8 rounded-2xl shadow-[0_3px_15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col justify-between h-full'>
                    
                    <div>
                        <div className='flex items-center gap-4 mb-6'>
                            <div className='relative w-16 h-16 shrink-0'>
                                <Image 
                                    // Use DB image, or a fallback if they don't have one
                                    src={review.user.image || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200"} 
                                    alt={review.user.name || "User"}
                                    fill
                                    className='rounded-full object-cover border-2 border-white shadow-sm'
                                />
                            </div>
                            <div>
                                <h3 className='text-xl font-bold text-amber-500 leading-none mb-1'>
                                    {review.user.name}
                                </h3>
                                <p className='text-gray-600 font-bold text-sm'>
                                    {/* DB doesn't have specific job titles yet, so we use a nice default */}
                                    Verified Client
                                </p>
                            </div>
                        </div>

                        {/* Testimonial Text */}
                        <p className='text-gray-500 leading-relaxed mb-6'>
                            {review.comment}
                        </p>
                    </div>

                    {/* Star Logic: Loop based on review.rating */}
                    <div className='flex justify-center gap-1 border-t border-transparent pt-2'>
                        {[...Array(review.rating)].map((_, i) => (
                            <svg key={i} className="w-6 h-6 text-amber-500 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    </section>
  )
}

export default Testimonials
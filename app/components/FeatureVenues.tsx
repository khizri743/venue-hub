import React from 'react'
import Image from 'next/image'
import Link from 'next/link' // 1. Import Link
import { prisma } from '../lib/prisma'

const FeatureVenues = async ({ query }: { query?: string }) => {
    
    // ... (Keep your existing Prisma logic here) ...
    const whereClause = query ? {
        OR: [
            { city: { contains: query, mode: 'insensitive' as const } },
            { address: { contains: query, mode: 'insensitive' as const } },
            { name: { contains: query, mode: 'insensitive' as const } },
        ]
    } : {}; 

    const venues = await prisma.venue.findMany({
        where: whereClause,
        take: 6,
        orderBy: { createdAt: 'desc' }
    });

  return (
    <section className='py-16 px-4 bg-white'>
        {/* ... (Keep your Header logic) ... */}
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            {venues.map((venue) => (
                <div key={venue.id} className='bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100'>
                    
                    {/* ... (Keep your Image logic) ... */}
                    <div className='relative h-64 w-full group'>
                        <Image src={venue.coverImage} alt={venue.name} fill className='object-cover' />
                        {/* ... rating ... */}
                    </div>

                    <div className='p-6 text-left'>
                        <h3 className='text-xl font-bold text-amber-500 mb-3'>{venue.name}</h3>
                        {/* ... location and capacity ... */}
                        
                        <div className='flex justify-between items-center pt-4 border-t border-gray-100'>
                            <div>
                                <p className='text-amber-500 font-bold text-lg'>Rs. {venue.price}</p>
                                <p className='text-gray-400 text-xs'>per Event</p>
                            </div>
                            
                            {/* 2. CHANGE BUTTON TO LINK */}
                            <Link href={`/venues/${venue.id}`}>
                                <button className='bg-yellow-700 hover:bg-yellow-800 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md transition-colors'>
                                    View Details
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default FeatureVenues
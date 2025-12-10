import React from 'react'
import { prisma } from '../../lib/prisma'
import VenueDetailsClient from '../../components/VenueDetailsClient'
import Navbar from '../../components/Navbar' // Reuse your Navbar
import Footer from '../../components/Footer' // Reuse your Footer

// In Next.js 15, params is a Promise
interface PageProps {
    params: Promise<{ id: string }>
}

const VenuePage = async ({ params }: PageProps) => {
    // 1. Await params
    const { id } = await params;

    // 2. Fetch the specific venue
    const venue = await prisma.venue.findUnique({
        where: { id: id }
    });

    if (!venue) {
        return <div className="text-center py-20 text-2xl">Venue not found</div>
    }

    return (
        <>
            {/* Note: We manually add Navbar/Footer here since we aren't using PageWrapper 
                (PageWrapper creates a conflict with the server-side params logic for now) */}
            
            {/* You might need a simplified Navbar here or pass empty props if it requires them */}
            <div className="bg-black">
               {/* Just a placeholder nav bar for this page, or import your real one */}
               <nav className="text-amber-500 font-bold p-4 text-2xl text-center">VenueHub</nav>
            </div>

            <VenueDetailsClient venue={venue} />
            
            <Footer />
        </>
    )
}

export default VenuePage
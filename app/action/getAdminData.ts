"use server"
import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getAdminDashboardData() {
  try {
    const [users, venues, bookings, stats] = await Promise.all([
      // 1. Users
      prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
      
      // 2. Venues
      prisma.venue.findMany({ 
        orderBy: { createdAt: 'desc' },
        include: { vendor: { select: { name: true } } }
      }),

      // 3. BOOKINGS (New) - Include related User and Venue info
      prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: { select: { name: true, email: true } },
            venue: { select: { name: true } }
        }
      }),

      // 4. Stats
      {
        totalUsers: await prisma.user.count(),
        totalVendors: await prisma.user.count({ where: { role: 'VENDOR' } }),
        totalCustomers: await prisma.user.count({ where: { role: 'CUSTOMER' } }),
        totalVenues: await prisma.venue.count(),
        totalBookings: await prisma.booking.count()
      }
    ]);

    return { success: true, users, venues, bookings, stats };

  } catch (error) {
    console.error("Admin Fetch Error:", error);
    return { success: false, error: "Failed to load data" };
  }
}

// Action to Delete a User (Admin Power)
export async function deleteUser(userId: string) {
    try {
        // First delete related data to avoid foreign key errors
        await prisma.venue.deleteMany({ where: { vendorId: userId }});
        await prisma.review.deleteMany({ where: { userId: userId }});
        await prisma.booking.deleteMany({ where: { userId: userId }});
        
        await prisma.user.delete({ where: { id: userId } });
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete user" };
    }
}

// Action to Delete a Venue (Admin Power)
export async function deleteVenue(venueId: string) {
    try {
        await prisma.venue.delete({ where: { id: venueId } });
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete venue" };
    }
}

export async function updateBookingStatus(bookingId: string, status: 'CONFIRMED' | 'CANCELLED') {
    try {
        await prisma.booking.update({
            where: { id: bookingId },
            data: { status }
        });
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update booking" };
    }
}
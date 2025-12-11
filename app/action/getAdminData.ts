"use server"
import { prisma } from '../lib/prisma';

export async function getAdminDashboardData() {
  try {
    // Run all queries in parallel for speed
    const [users, venues, stats] = await Promise.all([
      // 1. Get All Users (sorted by newest)
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, createdAt: true }
      }),
      
      // 2. Get All Venues
      prisma.venue.findMany({
        orderBy: { createdAt: 'desc' },
        include: { vendor: { select: { name: true } } } // Include vendor name
      }),

      // 3. Calculate Counts
      {
        totalUsers: await prisma.user.count(),
        totalVendors: await prisma.user.count({ where: { role: 'VENDOR' } }),
        totalCustomers: await prisma.user.count({ where: { role: 'CUSTOMER' } }),
        totalVenues: await prisma.venue.count(),
        totalBookings: await prisma.booking.count()
      }
    ]);

    return { success: true, users, venues, stats };

  } catch (error) {
    console.error("Admin Fetch Error:", error);
    return { success: false, error: "Failed to load admin data" };
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
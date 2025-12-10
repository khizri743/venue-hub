"use server"
import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addVenue(formData: any, userEmail: string) {
  try {
    // 1. Find the Vendor ID based on the logged-in email
    const vendor = await prisma.user.findUnique({
        where: { email: userEmail }
    });

    if (!vendor || vendor.role !== 'VENDOR') {
        return { error: "Unauthorized. Only vendors can add venues." };
    }

    // 2. Find a category (For now, we default to 'Weddings' if not selected, 
    // or you can add a select dropdown in the form later)
    const category = await prisma.category.findFirst({
        where: { name: formData.category || 'Weddings' }
    });

    if (!category) return { error: "Category not found." };

    // 3. Create the Venue
    await prisma.venue.create({
      data: {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        capacity: parseInt(formData.capacity),
        price: parseFloat(formData.price),
        coverImage: formData.coverImage, // Ensure this is a valid URL
        vendorId: vendor.id,
        categoryId: category.id
      }
    });

    // 4. Refresh the page data so the new venue shows up immediately
    revalidatePath('/');

    return { success: true };

  } catch (error) {
    console.error("Add Venue Error:", error);
    return { error: "Failed to add venue. Ensure all fields are correct." };
  }
}
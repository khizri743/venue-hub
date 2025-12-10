"use server"
import { prisma } from '../lib/prisma'

export async function registerUser(formData: any) {
  const { username, email, phone, password, role } = formData;

  // 1. Validation
  if (!email || !password || !username) {
    return { error: "Please fill in all required fields." };
  }

  if (role === "Select") {
    return { error: "Please select a role (Customer or Vendor)." };
  }

  try {
    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      return { error: "User with this email already exists." };
    }

    // 3. Create the User in Database
    // Note: In a real app, you should hash the password using 'bcrypt' before saving.
    await prisma.user.create({
      data: {
        name: username,
        email: email,
        phone: phone,
        password: password, // Saving plain text for now (for learning purposes)
        role: role.toUpperCase() // "Customer" -> "CUSTOMER"
      }
    });

    return { success: true };

  } catch (error) {
    console.error("Registration Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
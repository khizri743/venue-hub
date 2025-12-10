"use server"
import { prisma } from '../lib/prisma'

export async function loginUser(formData: any) {
  const { email, password } = formData;

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  try {
    // 1. Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    // 2. Check if user exists
    if (!user) {
      return { error: "No account found with this email." };
    }

    // 3. Check password 
    // (Note: In a real app, use bcrypt.compare here. Since we saved plain text in register.ts, we compare plain text)
    if (user.password !== password) {
      return { error: "Incorrect password." };
    }

    // 4. Success
    // We return the user info (excluding the password)
    return { 
      success: true, 
      user: { name: user.name, email: user.email, role: user.role } 
    };

  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Something went wrong." };
  }
}
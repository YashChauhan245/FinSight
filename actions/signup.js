"use server";

import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const accountExists = "An account with this email already exists. Please sign in instead.";

export async function registerUser(formData) {
  try {
    const validatedData = registerSchema.parse({
      name: formData.name,
      email: formData.email?.toLowerCase().trim(),
      password: formData.password,
    });

    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email },
      select: { id: true },
    });

    if (existingUser) return { success: false, error: accountExists };

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = await db.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
      select: { id: true, email: true, name: true },
    });

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || "Validation failed" };
    }
    if (error?.code === "P2002") return { success: false, error: accountExists };
    console.error("registerUser error:", error);
    return { success: false, error: "Could not create your account. Please try again." };
  }
}

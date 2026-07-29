"use server";

import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { seedTransactionsForUser } from "@/actions/seed";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerUser(formData) {
  try {
    const validatedData = registerSchema.parse({
      name: formData.name,
      email: formData.email?.toLowerCase().trim(),
      password: formData.password,
    });

    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email },
      include: { _count: { select: { accounts: true } } },
    });

    if (existingUser && existingUser.password) {
      return {
        success: false,
        error: "An account with this email already exists. Please sign in instead.",
      };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    let user;
    if (existingUser) {
      // User registered via OAuth earlier, attach password and update name if needed
      user = await db.user.update({
        where: { email: validatedData.email },
        data: {
          password: hashedPassword,
          name: existingUser.name || validatedData.name,
        },
        include: { _count: { select: { accounts: true } } },
      });
    } else {
      user = await db.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          password: hashedPassword,
        },
        include: { _count: { select: { accounts: true } } },
      });
    }

    // Fire auto-seeding asynchronously in the background
    if (user && user._count.accounts === 0) {
      seedTransactionsForUser(user.id).catch((err) =>
        console.error("Auto-seed error in registerUser:", err)
      );
    }

    return {
      success: true,
      data: { id: user.id, email: user.email, name: user.name },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || "Validation failed" };
    }
    console.error("registerUser error:", error);
    return { success: false, error: error.message || "Failed to register user" };
  }
}

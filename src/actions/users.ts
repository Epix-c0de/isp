"use server";

import { z } from "zod";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  location: z.string().optional(),
});

export async function createUser(prevState: any, formData: FormData) {
  const result = createUserSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, phone, password, location } = result.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a default account number (e.g., based on timestamp for simplicity)
    const accountNumber = `ACC${Date.now().toString().slice(-6)}`;

    await db.insert(users).values({
      name,
      email,
      phone,
      password: hashedPassword,
      accountNumber,
      location: location || "",
      status: "active",
      balance: 0,
      role: "user",
    });

    revalidatePath("/dashboard/users");
  } catch (error) {
    console.error("Create user error:", error);
    return {
      message: "An error occurred while creating the customer.",
    };
  }

  redirect("/dashboard/users");
}

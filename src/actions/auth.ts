"use server";

import { z } from "zod";
import { db } from "../../db/drizzle";
import { admins } from "../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export async function login(prevState: any, formData: FormData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { email, password } = result.data;

    try {
        const user = await db.select().from(admins).where(eq(admins.email, email)).limit(1);

        if (user.length === 0) {
            return {
                message: "Invalid credentials",
            };
        }

        const passwordsMatch = await bcrypt.compare(password, user[0].password);

        if (!passwordsMatch) {
            return {
                message: "Invalid credentials",
            };
        }

        await createSession(user[0].id.toString());
    } catch (error) {
        console.error("Login error:", error); // Log the actual error for debugging
        return {
            message: "An error occurred. Please try again.",
        };
    }

    redirect("/dashboard");
}

export async function logout() {
    await deleteSession();
}

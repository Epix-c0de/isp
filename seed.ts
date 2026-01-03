
import * as dotenv from "dotenv";
import { hash } from "bcryptjs";

// Load environment variables *before* importing the DB
dotenv.config({ path: ".env.local" });

async function main() {
    console.log("🌱 Seeding database...");

    // Dynamic imports to ensure env vars are loaded first
    const { db } = await import("./db/drizzle");
    const { admins } = await import("./db/schema");

    const password = await hash("admin123", 10);

    try {
        console.log("Connecting to database...");

        await db.insert(admins).values({
            name: "Admin User",
            email: "admin@example.com",
            password: password,
            role: "admin",
        }).onConflictDoNothing();

        console.log("✅ Admin user created successfully");
        console.log("📧 Email: admin@example.com");
        console.log("🔑 Password: admin123");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    }

    // Force exit to prevent hanging on open connections
    process.exit(0);
}

main();

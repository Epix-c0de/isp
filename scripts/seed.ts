
import { db } from "../src/db/drizzle"; // Adjusted path import
import { admins } from "../src/db/schema";
import { hash } from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
    console.log("🌱 Seeding database...");

    const password = await hash("admin123", 10);

    try {
        await db.insert(admins).values({
            name: "Admin User",
            email: "admin@example.com",
            password: password,
            role: "admin",
        }).onConflictDoNothing(); // Prevent error if run multiple times

        console.log("✅ Admin user created successfully");
        console.log("📧 Email: admin@example.com");
        console.log("🔑 Password: admin123");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    }

    process.exit(0);
}

main();

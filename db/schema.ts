import { pgTable, serial, text, varchar, timestamp, integer, boolean, decimal, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const userTypeEnum = pgEnum("user_type", ["hotspot", "pppoe"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "completed", "failed"]);
export const notificationStatusEnum = pgEnum("notification_status", ["pending", "sent", "failed"]);

// Users table - for storing customer details
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
    email: varchar("email", { length: 255 }),
    userType: userTypeEnum("user_type").notNull(),
    username: varchar("username", { length: 100 }), // For hotspot/PPPoE login
    password: varchar("password", { length: 255 }), // For hotspot/PPPoE login
    packageId: integer("package_id"), // Reference to packages table
    isActive: boolean("is_active").default(true),
    bandwidthLimit: varchar("bandwidth_limit", { length: 50 }), // e.g., "10M/10M"
    dataLimit: varchar("data_limit", { length: 50 }), // e.g., "100GB"
    nextDisconnectionDate: timestamp("next_disconnection_date"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Payments table - for tracking transactions
export const payments = pgTable("payments", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    paymentMethod: varchar("payment_method", { length: 50 }).notNull(), // e.g., "M-Pesa"
    transactionId: varchar("transaction_id", { length: 255 }).unique(),
    status: paymentStatusEnum("status").notNull().default("pending"),
    paymentDate: timestamp("payment_date"),
    nextDueDate: timestamp("next_due_date"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Routers table - for managing MikroTik devices
export const routers = pgTable("routers", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    ipAddress: varchar("ip_address", { length: 50 }).notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    isOnline: boolean("is_online").default(true),
    location: varchar("location", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Notifications table - for SMS and email messages
export const notifications = pgTable("notifications", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    type: varchar("type", { length: 50 }).notNull(), // e.g., "payment_reminder", "disconnection_alert"
    message: text("message").notNull(),
    status: notificationStatusEnum("status").notNull().default("pending"),
    sentAt: timestamp("sent_at"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Packages table - for managing internet packages (Phase 2)
export const packages = pgTable("packages", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    speed: varchar("speed", { length: 50 }).notNull(), // e.g., "10Mbps"
    dataLimit: varchar("data_limit", { length: 50 }), // e.g., "Unlimited" or "100GB"
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    duration: integer("duration").notNull(), // in days
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Invoices table - for generating and tracking invoices
export const invoices = pgTable("invoices", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    paymentId: integer("payment_id").references(() => payments.id),
    invoiceNumber: varchar("invoice_number", { length: 100 }).notNull().unique(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    pdfUrl: text("pdf_url"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Admin users table - for system administrators
export const admins = pgTable("admins", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 50 }).notNull().default("admin"),
    twoFactorEnabled: boolean("two_factor_enabled").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Type exports for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type Router = typeof routers.$inferSelect;
export type NewRouter = typeof routers.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;


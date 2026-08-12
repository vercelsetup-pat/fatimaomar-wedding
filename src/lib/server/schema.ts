import {
    pgTable,
    bigserial,
    varchar,
    integer,
    text,
    timestamp,
    pgEnum
} from "drizzle-orm/pg-core";

export const attendanceEnum = pgEnum("attendance", [
    "accepted",
    "rejected"
]);

export const rsvps = pgTable("rsvps", {
    id: bigserial("id", { mode: "number" }).primaryKey(),

    fullName: varchar("full_name", {
        length: 255
    }).notNull(),

    // Optional
    email: varchar("email", {
        length: 255
    }),

    // Optional
    phoneNumber: varchar("phone_number", {
        length: 50
    }),

    attendance: attendanceEnum("attendance")
        .notNull()
        .default("accepted"),

    // 0 when rejected, 1+ when accepted
    guestNumber: integer("guest_number")
        .notNull()
        .default(1),

    // Optional
    message: text("message"),

    createdAt: timestamp("created_at", {
        withTimezone: true
    })
        .notNull()
        .defaultNow()
});
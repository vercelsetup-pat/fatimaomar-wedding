import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { rsvps } from '$lib/server/schema';

export async function POST({ request }) {
    try {
        const data = await request.json();

        const {
            fullName,
            email,
            phoneNumber,
            attendance,
            guestNumber,
            message
        } = data;

        // -------------------------
        // Name is required
        // -------------------------
        if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
            return json(
                {
                    success: false,
                    message: 'Full name is required.'
                },
                { status: 400 }
            );
        }

        // -------------------------
        // Attendance is required
        // -------------------------
        if (
            attendance !== 'accepted' &&
            attendance !== 'rejected'
        ) {
            return json(
                {
                    success: false,
                    message: 'Please select your attendance.'
                },
                { status: 400 }
            );
        }

        // -------------------------
        // Guest number
        // -------------------------
        let finalGuestNumber = 0;

        if (attendance === 'accepted') {
            const guests = Number(guestNumber);

            if (!Number.isInteger(guests) || guests < 1) {
                return json(
                    {
                        success: false,
                        message: 'Number of guests must be at least 1.'
                    },
                    { status: 400 }
                );
            }

            finalGuestNumber = guests;
        }

        // -------------------------
        // Optional fields
        // -------------------------
        const finalEmail =
            typeof email === 'string' && email.trim()
                ? email.trim()
                : null;

        const finalPhoneNumber =
            typeof phoneNumber === 'string' && phoneNumber.trim()
                ? phoneNumber.trim()
                : null;

        const finalMessage =
            attendance === 'accepted' &&
            typeof message === 'string' &&
            message.trim()
                ? message.trim()
                : null;

        // -------------------------
        // Save to Neon
        // -------------------------
        const [rsvp] = await db
            .insert(rsvps)
            .values({
                fullName: fullName.trim(),
                email: finalEmail,
                phoneNumber: finalPhoneNumber,
                attendance,
                guestNumber: finalGuestNumber,
                message: finalMessage
            })
            .returning();

        // -------------------------
        // Success
        // -------------------------
        return json(
            {
                success: true,
                message:
                    attendance === 'accepted'
                        ? 'RSVP submitted successfully.'
                        : 'Thank you for letting us know.',
                data: rsvp
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('RSVP API error:', error);

        return json(
            {
                success: false,
                message: 'Failed to save RSVP.'
            },
            { status: 500 }
        );
    }
}
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { rsvps } from '$lib/server/schema';

export async function DELETE({ params }) {
    try {
        const id = Number(params.id);

        if (!Number.isInteger(id) || id < 1) {
            return json(
                {
                    success: false,
                    message: 'Invalid RSVP id.'
                },
                { status: 400 }
            );
        }

        const [deleted] = await db
            .delete(rsvps)
            .where(eq(rsvps.id, id))
            .returning();

        if (!deleted) {
            return json(
                {
                    success: false,
                    message: 'RSVP not found.'
                },
                { status: 404 }
            );
        }

        return json(
            {
                success: true,
                message: 'RSVP deleted successfully.',
                data: deleted
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('RSVP delete API error:', error);

        return json(
            {
                success: false,
                message: 'Failed to delete RSVP.'
            },
            { status: 500 }
        );
    }
}
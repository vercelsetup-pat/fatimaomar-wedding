import { db } from '$lib/server/db';
import { rsvps } from '$lib/server/schema';
import { desc } from 'drizzle-orm';

export const load = async () => {
	const data = await db
		.select()
		.from(rsvps)
		.orderBy(desc(rsvps.createdAt));

	return {
		reservations: data
	};
};
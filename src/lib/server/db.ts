import { DATABASE_URL } from '$env/static/private';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
	connectionString: DATABASE_URL
});

export const db = drizzle(pool);
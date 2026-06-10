import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env, isProduction } from '../config/env.js';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: isProduction ? true : { rejectUnauthorized: false },
});

export const db = drizzle(pool);

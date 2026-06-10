import 'dotenv/config';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';

async function deleteUsers() {
  try {
    await db.delete(users);

    console.log('Users deleteed');
  } catch (error) {
    console.error('User Deletion failed', error);
    process.exit(1);
  }
}

await deleteUsers();
process.exit(0);

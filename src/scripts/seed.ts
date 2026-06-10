import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { mockUsers } from '../features/users/user.mock.js';

async function seed() {
  try {
    await db
      .insert(users)
      .values(
        mockUsers.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: new Date(user.createdAt),
          lastLoginAt: new Date(user.lastLoginAt),
          status: user.status,
        })),
      )
      .onConflictDoNothing({
        target: users.email,
      });

    console.log('Seed complete');
  } catch (error) {
    console.error('Seed failed', error);
    process.exit(1);
  }
}

await seed();
process.exit(0);

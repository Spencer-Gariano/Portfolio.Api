import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { users } from './user.schema.js';
import type { CreateUserInput, UpdateUserInput } from './user.type.js';

export async function getUsers() {
  return db.select().from(users);
}

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));

  return user;
}

export async function createUser(data: CreateUserInput) {
  const [createdUser] = await db
    .insert(users)
    .values({ ...data, status: 'pending' })
    .returning();
  return createdUser;
}

export async function updateUser(id: string, data: UpdateUserInput) {
  const [updatedUser] = await db.update(users).set(data).where(eq(users.id, id)).returning();
  return updatedUser;
}

export async function deleteUser(id: string) {
  await db.delete(users).where(eq(users.id, id));
}

export const userService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

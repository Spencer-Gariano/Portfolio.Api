import { asc, desc, eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { users } from './user.schema.js';
import type { CreateUserInput, IGetUserParams, UpdateUserInput } from './user.type.js';
import { logger } from '../../lib/logger.js';

export async function getUsers({ sort, order }: IGetUserParams) {
  const isDesc = order === 'desc';
  const baseQuery = db.select().from(users);

  const orderMap = {
    firstName: users.firstName,
    lastName: users.lastName,
  };

  switch (sort) {
    case 'fullName':
      return baseQuery.orderBy(
        isDesc ? desc(users.firstName) : asc(users.firstName),
        isDesc ? desc(users.lastName) : asc(users.lastName),
      );
    default:
      return baseQuery.orderBy(
        isDesc ? desc(orderMap[sort ?? 'firstName']) : asc(orderMap[sort ?? 'firstName']),
      );
  }
}

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  if (!user) {
    logger.warn('User not found', { id });
  }

  return user;
}

export async function createUser(data: CreateUserInput) {
  try {
    const [createdUser] = await db
      .insert(users)
      .values({ ...data, status: 'pending' })
      .returning();
    logger.info('User created', { id: createdUser?.id, email: createdUser?.email });

    return createdUser;
  } catch (err) {
    logger.error('Failed to create user', {
      error: err,
      data,
    });

    throw err;
  }
}

export async function updateUser(id: string, data: UpdateUserInput) {
  try {
    const [updatedUser] = await db.update(users).set(data).where(eq(users.id, id)).returning();

    if (!updatedUser) {
      logger.warn('Update attempted on missing user', { id });
    }
    logger.info('User updated', { id: id, email: updatedUser?.email });

    return updatedUser;
  } catch (err) {
    logger.error('Failed to update user', {
      id,
      error: err,
      data,
    });

    throw err;
  }
}

export async function deleteUser(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id));

    logger.info('User deleted', { id });
  } catch (err) {
    logger.error('Failed to delete user', { id, error: err });

    throw err;
  }
}

export const userService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

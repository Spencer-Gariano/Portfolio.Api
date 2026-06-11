import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { users } from './user.schema.js';
import type { createUserSchema, updateUserSchema } from './user.validation.js';
import { z } from 'zod';

export type UserDb = InferSelectModel<typeof users>;
export type NewUserDb = InferInsertModel<typeof users>;
export const UserStatus = ['active', 'pending'] as const;
export type UserStatus = (typeof UserStatus)[number];

export type UserSort = 'firstName' | 'lastName' | 'fullName';
export type OrderBy = 'asc' | 'desc';

export interface IGetUserParams {
  sort: UserSort;
  order: OrderBy;
}

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

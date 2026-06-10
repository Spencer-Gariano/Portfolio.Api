import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { users } from './user.schema.js';
import type { createUserSchema, updateUserSchema } from './user.validation.js';
import { z } from 'zod';

export type UserDb = InferSelectModel<typeof users>;
export const UserStatus = ['active', 'inactive', 'suspended'] as const;
export type UserStatus = (typeof UserStatus)[number];

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

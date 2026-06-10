import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { UserStatus } from './user.type.js';

extendZodWithOpenApi(z);

export const uuidSchema = z.uuid();

export const userSchema = z.object({
  id: z.uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  status: z.enum(UserStatus),
  createdAt: z.date(),
  lastLoginAt: z.date(),
});

export const singleResourceUserParams = z
  .object({
    id: z.uuid(),
  })
  .openapi('UserParams');

export const createUserResponseSchema = z.object({
  user: userSchema,
});

export const updateUserResponseSchema = z.object({
  user: userSchema,
});

export const createUserSchema = z
  .object({
    firstName: z.string().openapi({ example: 'John' }),
    lastName: z.string().openapi({ example: 'Smith' }),
    email: z.email().openapi({ example: 'john@email.com' }),
  })
  .openapi('CreateUser');

export const updateUserSchema = createUserSchema.partial().openapi('UpdateUser');

import { createUserSchema, updateUserSchema, uuidSchema } from './user.validation.js';
import type { Request, Response } from 'express';
import { userService } from './user.service.js';
import type { OrderBy, UserSort } from './user.type.js';

export async function getUsers(req: Request, res: Response) {
  const sort = (req.query.sort as UserSort) ?? 'firstName';
  const order = (req.query.order as OrderBy) ?? 'asc';

  const users = await userService.getUsers({ sort, order });

  return res.status(200).json(users);
}

export async function getUserById(req: Request, res: Response) {
  const id = uuidSchema.parse(req.params.id);
  const user = await userService.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).json(user);
}

export async function createUser(req: Request, res: Response) {
  const data = createUserSchema.parse(req.body);

  const user = await userService.createUser(data);

  return res.status(201).json(user);
}

export async function updateUser(req: Request, res: Response) {
  const id = uuidSchema.parse(req.params.id);
  const data = updateUserSchema.parse(req.body);

  const updatedUser = await userService.updateUser(id, data);

  return res.status(200).json(updatedUser);
}

export async function deleteUser(req: Request, res: Response) {
  const id = uuidSchema.parse(req.params.id);

  await userService.deleteUser(id);

  return res.sendStatus(204);
}

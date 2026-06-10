import { createUserSchema, updateUserSchema, uuidSchema } from './user.validation.js';
import type { Request, Response } from 'express';
import { userService } from './user.service.js';

export async function getUsers(reg: Request, res: Response) {
  const users = await userService.getUsers();

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

import * as userController from './user.controller.js';
import { createFeatureRouter } from '../../api/routes/create.feature.router.js';
import { registerRoute } from '../../api/routes/register.route.js';
import {
  createUserResponseSchema,
  createUserSchema,
  singleResourceUserParams,
  updateUserResponseSchema,
  updateUserSchema,
  userSchema,
} from './user.validation.js';
import { z } from 'zod';

const users = createFeatureRouter('/users');
const base = '/';
const singleResource = '/:id';

/**
 ** Base Routes
 ** /users
 **/
// GET /users
registerRoute(
  users,
  {
    method: 'get',
    path: base,
    summary: 'Get users',
    responses: {
      200: {
        description: 'Users fetched',
        content: {
          'application/json': {
            schema: z.array(userSchema),
          },
        },
      },
    },
  },
  userController.getUsers,
);
// POST /users
registerRoute(
  users,

  {
    method: 'post',
    path: base,
    summary: 'Create user',
    request: {
      body: { content: { 'application/json': { schema: createUserSchema } }, required: true },
    },
    responses: {
      201: {
        description: 'User created',
        content: {
          'application/json': {
            schema: createUserResponseSchema,
          },
        },
      },
    },
  },

  userController.createUser,
);

/**
 ** Single Resource Routes
 ** /users/:id
 **/
// Get /users/:id
registerRoute(
  users,
  {
    method: 'get',
    path: singleResource,
    summary: 'Get user by id',
    request: {
      params: singleResourceUserParams,
    },
    responses: {
      200: {
        description: 'User found',
        content: {
          'application/json': {
            schema: userSchema,
          },
        },
      },
      404: {
        description: 'User not found',
      },
    },
  },
  userController.getUserById,
);
// PUT /users/:id
registerRoute(
  users,
  {
    method: 'put',
    path: singleResource,
    summary: 'Update user',
    request: {
      params: singleResourceUserParams,
      body: { content: { 'application/json': { schema: updateUserSchema } }, required: true },
    },
    responses: {
      200: {
        description: 'User updated',
        content: {
          'application/json': {
            schema: updateUserResponseSchema,
          },
        },
      },
    },
  },
  userController.updateUser,
);
// DELETE /users/:id
registerRoute(
  users,
  {
    method: 'delete',
    path: singleResource,
    summary: 'Delete user',
    request: {
      params: singleResourceUserParams,
    },
    responses: {
      204: {
        description: 'User deleted',
      },
    },
  },
  userController.deleteUser,
);

export default users.router;

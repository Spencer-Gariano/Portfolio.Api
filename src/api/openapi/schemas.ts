import {
  createUserSchema,
  singleResourceUserParams,
  updateUserSchema,
} from '../../features/users/user.validation.js';
import { registry } from './registry.js';

let registered = false;

export function registerSchemas() {
  if (registered) return;
  registered = true;
  registry.register('CreateUser', createUserSchema);
  registry.register('UpdateUser', updateUserSchema);
  registry.register('UserParams', singleResourceUserParams);
}

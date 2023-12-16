import { Router } from 'express';
import { usersController } from './users.controller';
import {
  checkEmailValidationRules,
  loginValidationRules,
  regValidationRules,
  updateUserValidationRules,
} from './users.validation';
import { validate } from '../middleware/validate';
import { authMiddleware } from '../middleware/authMiddleware';
import { param } from 'express-validator';

const usersRoutes = new (Router as any)();

usersRoutes.post(
  '/auth/registration',
  regValidationRules,
  validate,
  usersController.registration
);
usersRoutes.put(
  '/auth/login',
  loginValidationRules,
  validate,
  usersController.login
);
usersRoutes.get(
  '/auth/check_email/:email',
  checkEmailValidationRules,
  validate,
  usersController.checkEmail
);
usersRoutes.put('/auth/logout', authMiddleware, usersController.logout);
usersRoutes.post('/auth/activate/:link');
usersRoutes.get('/users', authMiddleware, usersController.getAll);
usersRoutes.get('/user', authMiddleware, usersController.getUser);
usersRoutes.patch(
  '/user',
  authMiddleware,
  updateUserValidationRules,
  validate,
  usersController.updateUser
);
usersRoutes.get(
  '/user/check_username/:username',
  authMiddleware,
  [param('username').isString()],
  validate,
  usersController.checkUsername
);

export default usersRoutes;

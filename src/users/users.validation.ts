import { body, param } from 'express-validator';

export const regValidationRules = [
  body('email').isEmail(),
  body('username').isString(),
  body('password').isString().isLength({ min: 5, max: 30 }),
  body('confirmPassword').isString().isLength({ min: 5, max: 30 }),
];
export const loginValidationRules = [
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 30 }).withMessage('PASSWORD_LENGTH'),
];
export const checkEmailValidationRules = [param('email').isEmail()];

export const updateUserValidationRules = [
  body('name').optional().isString().isLength({ min: 1, max: 64 }),
  body('surname').optional().isString().isLength({ max: 64 }),
  body('username').optional().isString().isLength({ min: 5, max: 32 }),
  body('bio').optional().isString().isLength({ max: 70 }),
  body('password').optional().isString().isLength({ min: 5, max: 32 }),
  body('email').optional().isEmail(),
];

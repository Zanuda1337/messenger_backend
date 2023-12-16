import { type NextFunction, type Request, type Response } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api-error';

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(ApiError.BadRequest('VALIDATION_ERROR', errors.array()));
  }
  next();
};

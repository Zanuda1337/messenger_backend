import { type NextFunction, type Request, type Response } from 'express';
import { ApiError } from '../exceptions/api-error';

export const authMiddleware = (
  res: Request,
  req: Response,
  next: NextFunction
): void => {
  try {
    const { user } = res.session;
    if (user === undefined) {
      next(ApiError.UnauthorizedError());
    }
    next();
  } catch (e) {
    next(ApiError.UnauthorizedError());
  }
};

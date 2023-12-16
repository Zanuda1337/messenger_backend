import { type NextFunction, type Request, type Response } from 'express';
import { ApiError } from '../exceptions/api-error';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> => {
  console.error(err);
  if (err instanceof ApiError) {
    console.log('STATUS', err.status);
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'UNEXPECTED_ERROR' });
};

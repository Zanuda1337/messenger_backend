import { Error } from 'mongoose';

export class ApiError extends Error {
  status;
  errors;
  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(): ApiError {
    return new ApiError(401, 'UNAUTHORIZED');
  }

  static BadRequest(message: string, errors: any[] = []): ApiError {
    return new ApiError(400, message, errors);
  }
}

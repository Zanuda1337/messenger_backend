import { type NextFunction, type Request, type Response } from 'express';
import { type UserDto } from '../dto/user-dto';

export interface Controller
  extends Record<
    any,
    (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<Response<any, Record<string, any>> | undefined>
  > {}

export interface Model {
  _id: string;
}

declare module 'express-session' {
  interface SessionData {
    user: UserDto | undefined;
  }
}

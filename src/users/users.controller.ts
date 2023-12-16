import { usersService } from './users.service';
import { type Request, type Response, type NextFunction } from 'express';
import {
  type EmailParam,
  type LoginBody,
  type RegistrationBody,
  type UpdateBody,
} from './users.types';
import UserModel from '../models/user.model';

class UsersController {
  async registration(
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      RegistrationBody
    >,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<any, any>> | undefined> {
    try {
      const { user } = await usersService.registration(req.body);
      req.session.user = user;
      return res.json({ user });
    } catch (e) {
      next(e);
    }
  }

  async login(
    req: Request<Record<string, unknown>, Record<string, unknown>, LoginBody>,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<any, any>> | undefined> {
    try {
      const { user } = await usersService.login(req.body);
      req.session.user = user;
      return res.json({ user });
    } catch (e) {
      next(e);
    }
  }

  async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<any, any>> | undefined> {
    try {
      req.session.destroy(() => {});
      return res.status(200).json();
    } catch (e) {
      next(e);
    }
  }

  async checkEmail(
    req: Request<EmailParam>,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<any, any>> | undefined> {
    const isExist = await usersService.checkEmail(req.params.email);
    try {
      return res.status(200).json({ isExist });
    } catch (e) {
      next(e);
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<any, any>> | undefined> {
    try {
      const users = await UserModel.find();
      return res.json({ users });
    } catch (e) {
      next(e);
    }
  }

  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<any, any>> | undefined> {
    try {
      const id = req.session.user?.id;
      const user = await usersService.getOne(id);
      return res.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  }

  async updateUser(
    req: Request<Record<string, unknown>, Record<string, unknown>, UpdateBody>,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<any, any>> | undefined> {
    try {
      const id = req.session.user?.id;
      const user = await usersService.updateOne(id, req.body);
      return res.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  }

  async checkUsername(
    req: Request<{ username: string }>,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<any, any>> | undefined> {
    try {
      const id = req.session.user?.id;
      const isTaken = await usersService.checkUsername(id, req.params.username);
      return res.status(200).json({ isTaken });
    } catch (e) {
      next(e);
    }
  }
}

export const usersController = new UsersController();

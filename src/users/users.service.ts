import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import UserModel from '../models/user.model';
import { mailService } from '../services/mail.service';
import { UserDto } from '../dto/user-dto';
import { ApiError } from '../exceptions/api-error';
import {
  type LoginBody,
  type RegistrationBody,
  type UpdateBody,
} from './users.types';

export const usersService = {
  registration: async ({
    email,
    password,
    username,
    confirmPassword,
  }: RegistrationBody) => {
    if (password !== confirmPassword) {
      throw ApiError.BadRequest('PASSWORDS_NOT_EQUAL');
    }
    const candidate = await UserModel.findOne({ email });
    if (candidate !== null) {
      throw ApiError.BadRequest('USER_WITH_THIS_EMAIL_EXISTS');
    }
    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      username,
      name: username,
      activationLink,
    });
    await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(user);
    return {
      user: userDto,
    };
  },
  login: async ({ email, password }: LoginBody) => {
    const user = await UserModel.findOne({ email });
    if (user == null) {
      throw ApiError.BadRequest('WRONG_EMAIL_OR_PASSWORD');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiError.BadRequest('WRONG_EMAIL_OR_PASSWORD');
    }
    return {
      user: new UserDto(user),
    };
  },
  checkEmail: async (email: string) => {
    const user = await UserModel.findOne({ email });
    return user !== null;
  },
  checkUsername: async (id: string | undefined, username: string) => {
    const user = await UserModel.findOne({ username, _id: { $ne: id } });
    return user !== null;
  },
  getOne: async (id: string | undefined) => {
    const user = await UserModel.findOne({ _id: id });
    if (user === null) throw ApiError.BadRequest('USER_DOESNT_EXIST');
    return user;
  },
  updateOne: async (id: string | undefined, body: UpdateBody) => {
    const user = await UserModel.findByIdAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (user === null) throw ApiError.BadRequest('USER_DOESNT_EXIST');
    return user;
  },
};

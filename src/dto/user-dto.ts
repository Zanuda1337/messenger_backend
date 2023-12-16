import { type User } from '../models/user.model';

export class UserDto {
  email;
  id;
  isActivated;
  constructor (user: User) {
    this.id = user._id;
    this.email = user.email;
    this.isActivated = user.isActivated;
  }
}

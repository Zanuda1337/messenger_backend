import { model, Schema } from 'mongoose';
import { type Model } from '../types';
export interface User extends Model {
  email: string;
  username: string;
  name: string;
  surname?: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
  bio?: string;
}
const UserSchema = new Schema<User>({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  surname: { type: String },
  bio: { type: String },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

export default model('User', UserSchema);

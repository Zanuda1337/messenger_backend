export interface LoginBody {
  email: string;
  password: string;
}
export interface RegistrationBody extends LoginBody {
  confirmPassword: string;
  username: string;
}

export interface EmailParam {
  email: string;
}

export interface UpdateBody {
  name?: string;
  surname?: string;
  username?: string;
  bio?: string;
  password?: string;
  email?: string;
}

import { User } from 'src/users/user.entity';

export interface UserLogin extends User {
  token: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  email: string;
  name: string;
};

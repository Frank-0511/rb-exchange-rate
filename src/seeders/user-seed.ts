import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

export const seedUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const user = new User();
  user.name = name;
  user.email = email;
  user.password = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_OR_ROUNDS),
  );
  return user;
};

export const usersToSeed = [
  { name: 'John Doe', email: 'john.doe@example.com', password: '123456' },
  { name: 'Jane Doe', email: 'jane.doe@example.com', password: '123456' },
  { name: 'John Smith', email: 'john.smith@example.com', password: '123456' },
];

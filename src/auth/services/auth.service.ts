import * as bcrypt from 'bcrypt';

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../models/token.model';
import { User } from '../../users/user.entity';
import { UserLogin } from '../models/login.model';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const userPublic = {
        email: user.email,
        name: user.name,
      };
      return userPublic;
    } catch (error) {
      throw error;
    }
  }

  generateJWT(user: User): UserLogin {
    const payload: PayloadToken = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      ...user,
    };
  }
}

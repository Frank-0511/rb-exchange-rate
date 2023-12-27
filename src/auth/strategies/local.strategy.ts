import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './../services/auth.service';
import { InvalidCustomException } from '../exceptions/custom.exception';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    try {
      if (
        typeof email !== 'string' ||
        !email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
      ) {
        throw new InvalidCustomException(
          'email',
          'Invalid email format. Please provide a valid email address.',
        );
      }
      if (typeof password !== 'string' || password.length < 6) {
        throw new InvalidCustomException(
          'password',
          'Password must be at least 6 characters long.',
        );
      }

      const user = await this.authService.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException('not allow');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

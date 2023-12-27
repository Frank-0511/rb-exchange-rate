import {
  Controller,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/user.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthSwagger } from './auth.swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation(AuthSwagger.login)
  @ApiBody(AuthSwagger.body)
  @ApiResponse(AuthSwagger.response)
  async login(@Req() req: Request) {
    try {
      const user = req.user as User;
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return this.authService.generateJWT(user);
    } catch (error) {
      throw error;
    }
  }
}

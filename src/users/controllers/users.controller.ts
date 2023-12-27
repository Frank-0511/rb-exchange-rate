import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiKeyGuard } from 'src/auth/guard/api-key.guard';
import { CreateUserDto } from '../user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(ApiKeyGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiOperation({
    summary: 'Create',
    description: 'Create a user',
    tags: ['User'],
  })
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }
}

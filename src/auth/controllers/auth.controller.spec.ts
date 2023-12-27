import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/services/users.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService, JwtService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          database: 'database',
          username: 'root',
          password: '123456',
          port: 3306,
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(authService, 'generateJWT').mockImplementation(() => {
        throw new NotFoundException('User not found');
      });

      await expect(
        async () => await controller.login({} as any),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should call generateJWT and return result if user is found', async () => {
      const mockUser = new User();
      jest
        .spyOn(authService, 'generateJWT')
        .mockReturnValue('mockToken' as any);

      const result = await controller.login({ user: mockUser } as any);

      expect(authService.generateJWT).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual('mockToken');
    });
  });
});

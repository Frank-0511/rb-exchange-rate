import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user',
  })
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @ApiProperty({
    example: 'hola1234',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty()
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

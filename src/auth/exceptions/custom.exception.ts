import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCustomException extends HttpException {
  constructor(field: string, message: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: {
          field,
          message,
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

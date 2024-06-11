
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message, statusCode);
  }
}

export class DatabaseException extends CustomException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class AuthenticationException extends CustomException {
  constructor(message: string,status:HttpStatus) {
    super(message,status);
  }
}

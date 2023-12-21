import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorMessage } from 'src/common/constant/error-message';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(ErrorMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class UserAlreadyExistedException extends HttpException {
  constructor() {
    super(ErrorMessage.USER_ALREADY_EXISTED, HttpStatus.CONFLICT);
  }
}
export class PhoneAlreadyExistedException extends HttpException {
  constructor() {
    super(ErrorMessage.PHONE_ALREADY_EXISTED, HttpStatus.CONFLICT);
  }
}

export class UserIsNotActiveException extends UnauthorizedException {
  constructor() {
    super(ErrorMessage.USER_NOT_ACTIVE);
  }
}

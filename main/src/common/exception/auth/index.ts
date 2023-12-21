import { UnauthorizedException } from '@nestjs/common';
import { ErrorMessage } from 'src/common/constant/error-message';

export class InvalidTokenException extends UnauthorizedException {
  constructor() {
    super(ErrorMessage.INVALID_TOKEN);
  }
}

export class IncorrectPasswordException extends UnauthorizedException {
  constructor() {
    super(ErrorMessage.INCORRECT_PASSWORD);
  }
}

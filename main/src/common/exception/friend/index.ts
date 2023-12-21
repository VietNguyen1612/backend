import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendAlreadyException extends HttpException {
  constructor() {
    super(`Friend already`, HttpStatus.BAD_REQUEST);
  }
}

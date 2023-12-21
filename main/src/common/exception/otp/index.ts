import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessage } from 'src/common/constant/error-message';

export class OtpInvalidException extends HttpException {
  constructor() {
    super(ErrorMessage.INVALID_OTP, HttpStatus.BAD_REQUEST);
  }
}

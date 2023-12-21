import { PhoneVerifyService } from './phone-verify.service';
import { Controller, Post } from '@nestjs/common';

@Controller('phone-verify')
export class PhoneVerifyController {
  constructor(private readonly phoneVerifyService: PhoneVerifyService) {}
  @Post()
  async verifyOTP() {
    console.log(process.env.TWILIO_PHONE_NUMBER);
    return this.phoneVerifyService.sendSMS(
      '+1 555-867-5309',
      '+1 555-867-5309',
    );
  }
}

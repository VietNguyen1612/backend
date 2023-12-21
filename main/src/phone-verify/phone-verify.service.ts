import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class PhoneVerifyService {
  constructor(private readonly twilioService: TwilioService) {}
  async sendSMS(
    fromPhoneNumber: string,
    toPhoneNumber: string,
    message: string = null,
  ) {
    return this.twilioService.client.messages.create({
      body: message || `SMS Body, sent to the phone!`,
      from: fromPhoneNumber,
      to: toPhoneNumber,
    });
  }
}

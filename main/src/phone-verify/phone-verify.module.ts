import { Module } from '@nestjs/common';
import { PhoneVerifyController } from './phone-verify.controller';
import { PhoneVerifyService } from './phone-verify.service';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        accountSid: configService.get('TWILIO_ACCOUNT_SID'),
        authToken: configService.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PhoneVerifyController],
  providers: [PhoneVerifyService],
})
export class PhoneVerifyModule {}

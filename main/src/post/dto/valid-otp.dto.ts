import { IsNotEmpty } from 'class-validator';

export class ValidOtpDto {
  @IsNotEmpty()
  otp: string;
  @IsNotEmpty()
  phoneNumber: string;
}

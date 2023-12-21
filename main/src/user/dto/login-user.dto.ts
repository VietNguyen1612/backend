import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  usernameOrPhone: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  type: 'username' | 'phone';
}

export class LoginUserByOtpDto {
  @IsNotEmpty()
  phoneNumber: string;
}

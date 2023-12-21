import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Body,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidOtpDto } from 'src/post/dto/valid-otp.dto';
import { User } from 'src/common/model/user.model';
import { CurrentUser } from 'src/common/decorator/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('valid-otp')
  @HttpCode(HttpStatus.OK)
  async validOtp(@Body() validOtpDto: ValidOtpDto) {
    return await this.authService.validUserOtp(validOtpDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return await this.authService.refreshTokenRequest(refreshToken);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@CurrentUser() currentUser: User) {
    await this.authService.logout(currentUser);
    return {
      statusCode: 200,
    };
  }

  @Post('search')
  @UseGuards(AuthGuard('jwt'))
  async search(@CurrentUser() currentUser: User) {
    await this.authService.logout(currentUser);
    return {
      statusCode: 200,
    };
  }
}

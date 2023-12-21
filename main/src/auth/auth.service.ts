import { User } from '../common/model/user.model';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenReposity } from 'src/common/repository/refresh-token.repository';
import * as bcrypt from 'bcrypt';
import { OtpInvalidException } from 'src/common/exception/otp';
import { ValidOtpDto } from 'src/post/dto/valid-otp.dto';
import { InvalidTokenException } from 'src/common/exception/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenReposity,
  ) { }

  async validateUser(username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;

    return user;
  }
  async validUserOtp({ otp, phoneNumber }: ValidOtpDto) {
    const user = await this.usersService.findByPhone(phoneNumber);
    const isValidOtp = await this.validOtp(otp, user.otp);
    if (!isValidOtp) {
      throw new OtpInvalidException();
    }
    await this.usersService.activeUser(user._id);
  }

  async validOtp(otp: string, hashedOtp: string) {
    return await bcrypt.compareSync(otp, hashedOtp);
  }

  async login(userDTO: LoginUserDto) {
    const user = await this.usersService.findByLogin(userDTO);
    const token = await this._generateToken(user);
    user.password = undefined;

    return {
      user,
      ...token,
    };
  }

  async register(userDTO: CreateUserDto) {
    const user = await this.usersService.create(userDTO);
    const token = await this._generateToken(user);

    return {
      user,
      ...token,
    };
  }

  async refreshTokenRequest(refreshToken: string) {
    const decodeToken = await this.validateRefreshToken(refreshToken);
    if (!decodeToken) {
      throw new InvalidTokenException();
    }
    const { user } = await this.usersService.findUserByRefreshToken(
      refreshToken,
    );
    const newToken = await this._generateToken(user, false);

    return {
      username: user.username,
      ...newToken,
      refreshToken,
    };
  }

  async validateRefreshToken(refreshToken: string) {
    const refreshTokenExisted =
      await this.refreshTokenRepository.findByCondition({
        refreshToken,
      });

    if (!refreshTokenExisted) return null;

    const decodedToken = await this.jwtService.verify(refreshToken, {
      secret: `${process.env.JWT_SECRET_KEY_REFRESH}`,
    });
    if (!decodedToken) return null;
    if (refreshTokenExisted.expiryDate < new Date()) {
      await refreshTokenExisted.remove();
      return null;
    }

    return decodedToken;
  }

  async createRefreshToken(user: User) {
    const { username, friends, _id } = user;
    const refreshToken = this.jwtService.sign(
      {
        _id,
        username,
        friends,
      },
      {
        secret: `${process.env.JWT_SECRET_KEY_REFRESH}`,
        expiresIn: `${process.env.EXPIRES_REFRESH_TOKEN}`,
      },
    );
    // 7 means 7day
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // const _refreshToken = await this.refreshTokenRepository.create({
    //   refreshToken,
    //   expiryDate,
    //   user,
    // });
    const _refreshToken = await this.refreshTokenRepository.createRefreshToken(
      user,
      refreshToken,
      expiryDate,
    );

    return _refreshToken.refreshToken;
  }

  private async _generateToken(user: User, refresh = true) {
    const { username, friends, _id } = user;
    const accessToken = this.jwtService.sign({
      _id,
      username,
      friends,
    });
    if (refresh) {
      const refreshToken = await this.createRefreshToken(user);
      return {
        expiresIn: `${process.env.EXPIRES_TOKEN}`,
        accessToken,
        refreshToken,
        expireInRefresh: `${process.env.EXPIRES_REFRESH_TOKEN}`,
      };
    }

    return {
      expiresIn: `${process.env.EXPIRES_TOKEN}`,
      accessToken,
    };
  }

  async logout(user: User) {
    const refreshToken = await this.refreshTokenRepository.findByCondition({
      user: user._id,
    });
    await refreshToken.delete();
  }
}

import {
  UserNotFoundException,
  PhoneAlreadyExistedException,
} from '../common/exception/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserReposity } from 'src/common/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenReposity } from 'src/common/repository/refresh-token.repository';
import { User } from 'src/common/model/user.model';
import { Types } from 'mongoose';
import { IncorrectPasswordException } from 'src/common/exception/auth';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserReposity,
    private readonly refreshTokenRepository: RefreshTokenReposity,
  ) { }

  async create({ password, phoneNumber }: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // const otp = generate(6, {
    //   digits: true,
    //   lowerCaseAlphabets: false,
    //   upperCaseAlphabets: false,
    //   specialChars: false,
    // });
    const otp = '111111';
    const otpHashed = await bcrypt.hash(otp, salt);
    console.log(otp);
    const phoneExisted = await this.userRepository.findByPhone(phoneNumber);

    if (phoneExisted) {
      throw new PhoneAlreadyExistedException();
    }

    return await this.userRepository.create({
      password: hashedPassword,
      phoneNumber,
      otp: otpHashed,
    });
  }

  async findAll() {
    return (await this.userRepository.findAll()) as User[];
  }

  async activeUser(id: Types.ObjectId) {
    return await this.userRepository.activeUser(id);
  }
  async findUserByRefreshToken(refreshToken: string) {
    const userByToken = await (
      await this.refreshTokenRepository.findByCondition({ refreshToken })
    ).populate('user', '-password');

    return userByToken;
  }

  async findByPhone(phoneNumber: string) {
    return await this.userRepository.findByPhone(phoneNumber);
  }

  async findByLogin({ usernameOrPhone, password, type }: LoginUserDto) {
    let user = {} as User;
    if (type === 'username') {
      user = await (
        await this.userRepository.findByCondition(
          {
            username: usernameOrPhone,
          },
          '+password',
        )
      ).populate({
        path: 'friends',
        select: ['_id', 'avatarUrl', 'phoneNumber', 'username'],
      });
    } else {
      user = await (
        await this.userRepository.findByCondition(
          {
            phoneNumber: usernameOrPhone,
          },
          '+password',
        )
      ).populate({
        path: 'friends',
        select: ['_id', 'avatarUrl', 'phoneNumber', 'username'],
      });
    }
    if (!user) {
      throw new UserNotFoundException();
    }

    const is_equal = bcrypt.compareSync(password, user.password);

    if (!is_equal) {
      throw new IncorrectPasswordException();
    }

    return user;
  }

  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  // async addRefreshToken(username: string, refreshToken: RefreshToken) {
  //   return await this.userRepository.findByConditionAndUpdate(
  //     { username: { $eq: username } },
  //     { $push: { refreshTokens: refreshToken } },
  //   );
  // }

  async getFriendList(userId: string) {
    return (await this.userRepository.findById(userId)).friends;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

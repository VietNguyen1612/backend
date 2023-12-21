import {
  RefreshToken,
  RefreshTokenSchema,
} from '../common/model/refresh-token.model';
import { RefreshTokenReposity } from '../common/repository/refresh-token.repository';
import { UserReposity } from 'src/common/repository/user.repository';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/common/model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserReposity, RefreshTokenReposity],
  exports: [UserService, UserReposity],
})
export class UsersModule {
  // constructor(private usersService: UsersService) {}
}

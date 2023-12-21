import { ExceptionLoggerFilter } from './common/utils/exception-logger.filter';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { PhoneVerifyModule } from './phone-verify/phone-verify.module';
import { TripModule } from './trip/trip.module';
import { FriendModule } from './friend/friend.module';
import { LocationModule } from './location/location.module';
import { ChatModule } from './chat/chat.module';
import { ArchiveModule } from './archive/archive.module';
import { PlaceModule } from './place/place.module';
@Module({
  imports: [
    ChatModule,
    UsersModule,
    AuthModule,
    PostModule,
    CommentModule,
    PhoneVerifyModule,
    TripModule,
    FriendModule,
    LocationModule,
    ArchiveModule,
    PlaceModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionLoggerFilter,
    },
  ],
})
export class AppModule {}

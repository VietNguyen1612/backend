import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from 'src/common/model/friend.model';
import { User, UserSchema } from 'src/common/model/user.model';
import { FriendRepository } from 'src/common/repository/friend.repository';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    ChatModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Friend.name, schema: FriendSchema },
    ]),
  ],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository],
})
export class FriendModule { }

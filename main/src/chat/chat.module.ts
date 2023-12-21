import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './entities/room.entity';
import { ChatRepository } from 'src/common/repository/message.repository';
import { ChatController } from './chat.controller';
import { UsersModule } from 'src/user/user.module';
@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      // { name: 'message', schema: MessageSchema },
    ]),
  ],
  providers: [ChatGateway, ChatService, ChatRepository],
  controllers: [ChatController],
  exports: [ChatRepository, ChatService]
})
export class ChatModule { }

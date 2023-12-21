import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './entities/room.entity';
import { MessageSchema } from './entities/message.entity';
import mongoose from 'mongoose';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: 'chat_room', schema: RoomSchema },
          { name: 'message', schema: MessageSchema },
        ]),
      ],
      providers: [ChatGateway, ChatService, MongooseModule],
    }).compile();
    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

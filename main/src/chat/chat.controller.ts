import { Controller, Body, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorator/user.decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('room')
  async getRoom(@CurrentUser() user) {
    return await this.chatService.getUserRoomList(user._id.toString());
  }
}

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { decodeToken } from '../common/utils';
import { ChatService } from './chat.service';
import { Message } from './entities/message.entity';
import { UnauthorizedException } from '@nestjs/common';
interface SocketUser {
  username: string;
  _id: string;
  socket: Socket;
}
// chua dung toi
@WebSocketGateway(2609, { cors: false, transports: ['websocket'] })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer() server: Server;
  afterInit() {
    console.log('websocket initialized');
  }
  async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    const authHeader = client.handshake.headers.authorization;
    // const decode = decodeToken(authHeader)
    //check UseGuards AuthGuard jwt
    if (!authHeader) {
      client.disconnect();
      console.log('disconnect');
      throw new UnauthorizedException();
    }
    const user = decodeToken(authHeader);
    client.emit('session', {
      sessionID: client.id,
      userId: user['_id'],
    });
    client['username'] = user['username'];
    client['userId'] = user['_id'];
    const room = client.handshake.query.room;
    await this.chatService.createNewRoom(room as string);
    await this.chatService.joinRoom(room as string, client);
    await this.chatService.getHistoryMessage(room, client);
  }

  handleDisconnect(client: Socket) {
    client.disconnect();
  }
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    const time = new Date();
    const room = client.handshake.query.room;
    console.log(client['userId']);
    console.log('message', message);
    await this.chatService.sendMessage(
      { message, time, userId: client['userId'], status: 'sent' } as Message,
      room,
      client,
    );
  }
}

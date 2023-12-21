import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { decodeToken } from 'src/common/utils';

interface Data {
  latitude: string;
  longitude: string;
  user: any;
}

@WebSocketGateway()
export class LocationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  userLocations: { [userId: string]: { lat: number; lng: number } } = {};

  connectedUsers = new Map<string, Socket>();

  // // User A is friends with B and C
  // connectedUsers.set('userA', ['userB', 'userC']);

  // // User B is friends with A and C
  // connectedUsers.set('userB', ['userA', 'userC']);

  // // User C is friends with A and B
  // connectedUsers.set('userC', ['userA', 'userB']);

  handleConnection(@ConnectedSocket() socket: Socket) {
    // const decoded = decodeToken(token);
    const authHeader = socket.handshake.headers.authorization;
    if (!authHeader) socket.disconnect();
    const decodeUser = decodeToken(authHeader);
    this.connectedUsers.set(decodeUser['_id'], socket);
    // this.connectedUsers.set(, []);
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    const authHeader = socket.handshake.headers.authorization;
    const decodeUser = decodeToken(authHeader);
  }
  @SubscribeMessage('sendLocation')
  handleUpdateLocation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: Data,
  ) {
    // this.connectedUsers.set(client.)
    // this.userLocations[client.id] = data;
    // Broadcast the updated location to all connected clients
    // logic
    // this.connectedUsers[]
    const decodeUser = decodeToken(client.handshake.headers.authorization);
    for (const friend of decodeUser['friends']) {
      const friendSocket = this.connectedUsers.get(friend);
      if (friendSocket) {
        friendSocket.emit('locationUpdated', data);
        console.log([data.latitude, data.longitude]);
      } else {
        console.log(`friend ${friend} is not connected`);
      }
    }
  }
}

import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';
import { ChatRepository } from 'src/common/repository/message.repository';
import { UserReposity } from 'src/common/repository/user.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserReposity,
  ) {}
  //send message with the information of who sent the message and who received the message
  async createNewRoom(room: string | string[]): Promise<Room> {
    if (room instanceof Array) room = room.join('');
    const result = await this.chatRepository.findByName(room);
    //check if room exist
    if (result) return null;
    else {
      //create new room and save to database
      return this.chatRepository.createNewRoom(room);
    }
  }
  async joinRoom(room: string | string[], client: Socket): Promise<Room> {
    //check if user already in room
    client.join(room);
    if (room instanceof Array) room = room.join('');
    const result = await this.chatRepository.findByName(room);
    if (result.users.includes(client['userId'])) return null;
    else {
      const user = this.chatRepository.joinRoom(room, client['userId']);
      return user;
    }
    //add user to room
  }
  async sendMessage(message: Message, room, client: Socket): Promise<Room> {
    // console.log('send message', message);
    await client.broadcast
      .to(room)
      .emit('message', message, client['username']);
    const save = await this.chatRepository.sendMessage(message, room);
    console.log(save);
    return save;
  }

  async getHistoryMessage(room: string | string[], client: Socket) {
    const message = await this.chatRepository.getHistoryMessage(room);
    client.emit('historyMessage', message);
    //get message from database
  }
  async getUserRoomList(userId: string) {
    const roomList = await this.chatRepository.getUserRoomList(userId);
    let usersInfo = [];
    let i = 0;
    while (i < roomList.length) {
      for (let j = 0; j < roomList[i].users.length; j++) {
        const user = await this.userRepository.findById(roomList[i].users[j]);
        if (user._id.toString() !== userId) {
          usersInfo.push(user);
        }
      }
      roomList[i].users = usersInfo;
      usersInfo = [];
      i++;
    }

    return roomList;
  }
}

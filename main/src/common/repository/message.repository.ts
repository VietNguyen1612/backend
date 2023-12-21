import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/chat/entities/room.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class ChatRepository extends BaseRepository<RoomDocument> {
  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
  ) {
    super(roomModel);
  }
  async findByName(name: string): Promise<Room> {
    return await this.roomModel.findOne({ name }).lean();
  }
  async createNewRoom(room: string | string[]): Promise<Room> {
    return await this.roomModel.create({ name: room, users: [], messages: [] });
  }
  async joinRoom(room: string | string[], userId: string): Promise<Room> {
    return await this.roomModel.findOneAndUpdate(
      { name: room },
      { $push: { users: userId } },
      { new: true },
    );
  }
  async sendMessage(message: any, room: string | string[]): Promise<Room> {
    return await this.roomModel.findOneAndUpdate(
      { name: room },
      { $push: { messages: message } },
      { new: true },
    );
  }
  async getHistoryMessage(room: string | string[]) {
    return await this.roomModel.find({ name: room });
  }
  async getUserRoomList(userId: string) {
    //return room name and id only
    const list = await this.roomModel.find(
      { users: userId },
      { name: 1, users: 2 },
    );

    return list;
  }
}

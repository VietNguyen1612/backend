import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Message } from './message.entity';

export type RoomDocument = HydratedDocument<Room> & Room;

@Schema()
export class Room {
  @Prop()
  name: string;
  @Prop({ required: true })
  users: string[];
  @Prop()
  messages: Message[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);

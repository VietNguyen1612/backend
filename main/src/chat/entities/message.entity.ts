import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message> & Message;

@Schema()
export class Message {
  @Prop({ required: true })
  userId: string;
  @Prop()
  status: 'sent' | 'received' | 'seen';
  @Prop()
  message: string;
  @Prop({ required: true })
  time: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

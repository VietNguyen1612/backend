import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type FriendDocument = HydratedDocument<Friend>;

enum FriendStatus {
  'ADD_FRIEND',
  'REQUESTED',
  'FRIENDS',
}

@Schema({ timestamps: true })
export class Friend {
  _id: ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  requester: ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recipient: ObjectId;
  @Prop({ default: FriendStatus.ADD_FRIEND })
  status: FriendStatus;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);

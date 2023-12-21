import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.model';

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post_id: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: string;
  _id: Types.ObjectId;
  @Prop({ required: true })
  content: string;
  @Prop({ default: Date.now, type: Date })
  createdDate: Date;
  @Prop({ default: Date.now, type: Date })
  lastUpdated: Date;
  @Prop({ default: false, type: Boolean })
  isUpdated: boolean;
  @Prop({ default: 0, type: Number })
  commentCount: number;
  @Prop({ default: [], type: [Types.ObjectId] })
  likedBy: string[];
  @Prop({ type: [String] })
  assests: string[];
  @Prop({ default: 0, type: Number })
  reactionCount: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);

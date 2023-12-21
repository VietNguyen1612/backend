import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;
@Schema({ timestamps: true })
export class Comment {
  _id: Types.ObjectId;
  @Prop({ required: true })
  content: string; // desc of the text
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  postId: string; // post_id
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  authorId: string; // author of this comment
  @Prop({ default: Date.now, type: Date })
  createdDate: Date;
  @Prop({ default: Date.now, type: Date })
  lastUpdated: Date;
  @Prop({ default: false, type: Boolean })
  isUpdated: boolean;
  @Prop({ default: 0, type: Number})
  like: number;
  // @Prop({ default: 0, type: Number })
  // score: number; // cham diem dua tren tieu chi
  // @Prop({ default: Date.now, type: Date })
  // posted: Date;
  // @Prop({ required: true, type: String })
  // slug: string;
  // @Prop({ required: true, type: String })
  // full_slug: string; // combine posted + slug, dung de vua co the search theo slug va date dc
  // @Prop({ required: true, type: String })
  // parent_slug: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

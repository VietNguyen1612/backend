import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Place } from 'src/place/model/place.model';

export type ArchiveDocument = HydratedDocument<Archive>;

@Schema({ timestamps: true })
export class Archive {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: string;

  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: [Types.ObjectId], default: [], ref: 'Place' })
  places: Array<Place>;

  @Prop({ type: Boolean, default: true, select: false })
  isDraft: boolean;

  @Prop({ type: Boolean, default: false, select: false })
  isPublish: boolean;

  @Prop({ type: Number, default: 0 })
  placesNumber: number;
}

export const ArchiveSchema = SchemaFactory.createForClass(Archive);

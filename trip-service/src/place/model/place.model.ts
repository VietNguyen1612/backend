import { HydratedDocument, Types } from 'mongoose';
import { PlaceCategory } from '../../trip/types/trip.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PlaceDocument = HydratedDocument<Place>;

@Schema({ timestamps: true })
export class Place {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  placeId: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  website: string;

  @Prop({ type: Object })
  operatingHours: Record<string, string>;

  @Prop({
    type: String,
    default:
      'https://cdn4.iconfinder.com/data/icons/user-interface-131/32/sad_store-512.png',
  })
  thumbnail: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;

  @Prop({ type: Number })
  latitudeDelta: number;

  @Prop({ type: Number })
  longtitudeDelta: number;

  @Prop({ type: Number, default: 0 })
  rating: number;

  @Prop({ type: String, enum: PlaceCategory, default: PlaceCategory.UNKOWN })
  category: string;

  @Prop({ type: Number, default: 0 })
  reviews: number;

  @Prop({ type: Number, default: 0 })
  viewCount: number;

  @Prop({ type: Object })
  serviceOptions: Record<string, boolean>;

  @Prop({ type: String, required: true })
  province: string;

  @Prop({ type: String })
  city: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);

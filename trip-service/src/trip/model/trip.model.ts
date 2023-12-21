import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Vehicle } from '../types/trip.type';
import { Place } from '../../place/model/place.model';

export type TripDocument = HydratedDocument<Trip>;

@Schema({ timestamps: true })
export class Trip {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: string;
  _id: Types.ObjectId;
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: Date })
  startDate: Date;
  @Prop({ type: Date })
  endDate: Date;
  @Prop({ type: String, enum: Vehicle, default: Vehicle.BIKE })
  vehicle: Vehicle;
  @Prop({ type: [String], default: [] })
  provinces: Array<string>;
  @Prop({ type: [Types.ObjectId], default: [], ref: 'Place' })
  places: Array<Place>;
  @Prop({ type: Number, default: 0 })
  viewCount: number;
  @Prop({ type: Boolean, default: true, select: false })
  isDraft: boolean;
  @Prop({ type: Boolean, default: false, select: false })
  isPublish: boolean;
}

export const TripSchema = SchemaFactory.createForClass(Trip);

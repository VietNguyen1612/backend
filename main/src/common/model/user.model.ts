import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;
  @Prop({
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuIGBpSqN8Z68NA-PZJjIYQNIAzJosw4YWig&usqp=CAU',
  })
  avatarUrl: string;
  @Prop({ required: true })
  phoneNumber: string;
  @Prop()
  username: string;
  @Prop({ required: true, select: false })
  password: string;
  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;
  @Prop({ type: String, required: true })
  otp: string;
  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  friends: Array<String>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  this.username = this.phoneNumber;
  next();
});
// Define the virtual property on the schema

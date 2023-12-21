import { User, UserDocument } from '../model/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserReposity extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
  async findByPhone(phoneNumber: string) {
    return await this.userModel.findOne({ phoneNumber }).lean();
  }
  async findByUsername(username: string) {
    return await this.userModel.findOne({ username }).lean();
  }
  async activeUser(id: Types.ObjectId) {
    return await this.userModel
      .findByIdAndUpdate(id, {
        isActive: true,
      })
      .lean();
  }
}

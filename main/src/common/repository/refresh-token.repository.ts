import {
  RefreshToken,
  RefreshTokenDocument,
} from '../model/refresh-token.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from './base.repository';
import { User } from '../model/user.model';

@Injectable()
export class RefreshTokenReposity extends BaseRepository<RefreshTokenDocument> {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
  ) {
    super(refreshTokenModel);
  }
  async createRefreshToken(
    user: User,
    refreshToken: string,
    expiryDate: Date,
  ): Promise<RefreshToken> {
    const filter = {
      user,
    };
    const options = {
      upsert: true,
      new: true,
    };
    const update = {
      refreshToken,
      expiryDate,
    };
    const token = await this.refreshTokenModel
      .findOneAndUpdate(filter, update, options)
      .lean();
    return token;
  }
}

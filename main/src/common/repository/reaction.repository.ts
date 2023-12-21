import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from '../model/like.model';
import { BaseRepository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class ReactionRepository extends BaseRepository<LikeDocument> {
  constructor(
    @InjectModel(Like.name) private readonly likeModel: Model<LikeDocument>,
  ) {
    super(likeModel);
  }
}

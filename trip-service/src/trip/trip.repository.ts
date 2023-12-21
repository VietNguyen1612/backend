import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/utils/base.repository';
import { Trip, TripDocument } from './model/trip.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TripRepository extends BaseRepository<TripDocument> {
  constructor(
    @InjectModel(Trip.name) private readonly tripModel: Model<TripDocument>,
  ) {
    super(tripModel);
  }
  async findAllByAuthorId(authorId: string) {
    return await this.tripModel.find({ authorId }).populate('places').lean();
  }
}

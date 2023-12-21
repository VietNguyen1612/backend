import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/utils/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Archive, ArchiveDocument } from './model/archive.model';
import { GrpcInvalidArgumentException } from 'nestjs-grpc-exceptions';
import { Place } from 'src/place/model/place.model';

@Injectable()
export class ArchiveRepository extends BaseRepository<ArchiveDocument> {
  constructor(
    @InjectModel(Archive.name)
    private readonly archiveModel: Model<ArchiveDocument>,
  ) {
    super(archiveModel);
  }

  async deletePlaceFromArchive(placeId: string, archiveId: string) {
    try {
      await this.archiveModel.updateOne(
        {
          _id: archiveId,
        },
        {
          $pull: {
            places: placeId,
          },
          $inc: {
            placesNumber: -1,
          },
        },
      );
      console.log('success');
    } catch (error) {
      throw new GrpcInvalidArgumentException(error?.message);
    }
  }

  async findArchiveDetailById(archiveId: string) {
    const archive = await this.archiveModel.findById(archiveId);
    if (!archive) {
      throw new GrpcInvalidArgumentException('Archive not found');
    }
    const data = await archive.populate({
      path: 'places',
      select: ['name', 'rating', 'reviews', 'thumbnail', 'province', 'city'],
    })
    return data;
  }

  async findAllByAuthorId(authorId: string) {
    return await this.archiveModel.find({ authorId }).lean();
  }

  async addOnePlaceToArchive(placeId: string, archiveId: string) {
    await this.archiveModel
      .findOneAndUpdate(
        { _id: archiveId },
        {
          $addToSet: { places: placeId },
          $inc: { placesNumber: 1 },
        },
      )
      .lean();
  }
  async findPlaceInArchive(placeId: string, archiveId: string) {
    return await this.archiveModel
      .find({
        _id: archiveId,
        places: {
          $in: [placeId],
        },
      })
      .lean();
  }
}

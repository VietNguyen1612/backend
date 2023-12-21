import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/utils/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Place, PlaceDocument } from './model/place.model';

@Injectable()
export class PlaceRepository extends BaseRepository<PlaceDocument> {
  constructor(
    @InjectModel(Place.name) private readonly placeModel: Model<PlaceDocument>,
  ) {
    super(placeModel);
  }
  async findAllPlacesLimit(pageSize: number, lastId: string = null) {
    let placeList: any;
    if (!lastId) {
      placeList = (await this.placeModel.find().limit(pageSize).lean()) as Place[];
    } else {
      placeList = (await this.placeModel
        .find({ lastId })
        .limit(pageSize)
        .lean()) as Place[];
    }
    const last_id: string = placeList[placeList.length - 1]?.place_id;
    return {
      data: placeList,
      lastId: last_id,
    };
  }
}

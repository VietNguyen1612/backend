import { CreatePlaceDto } from './dto/create-place.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PlaceRepository } from './place.repository';
import { errorMessage } from 'src/common/constant/error';
import { GrpcInvalidArgumentException } from 'nestjs-grpc-exceptions';
import { GetAllPlacesResponse } from './place.interface';

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) { }
  async addPlace(createPlaceDto: CreatePlaceDto) {
    const placeExisted = await this.placeRepository.findByCondition({
      placeId: createPlaceDto.placeId,
    });
    if (placeExisted)
      throw new BadRequestException(errorMessage.PLACE_ALREADY_EXISTED);
    return await this.placeRepository.create(createPlaceDto);
  }
  async getPlaceByPlaceId(placeId: string) {
    const place = await this.placeRepository.findByCondition({
      placeId: placeId,
    });

    if (!place)
      throw new GrpcInvalidArgumentException(errorMessage.PLACE_NOT_FOUND);
    return place;
  }

  async getAllPlacesPaginate(
    pageSize: number,
    lastId: string
  ): Promise<GetAllPlacesResponse> {
    const data = await this.placeRepository.findAllPlacesLimit(pageSize, lastId);
    return data;
  }
}

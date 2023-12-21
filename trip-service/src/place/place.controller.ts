import { Controller } from '@nestjs/common';
import { Place } from './model/place.model';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { GetPlaceByPlaceIdDto } from './dto/get-place-by-id.dto';
import { GetAllPlacesResponse, GetPlaceByPlaceIdResponse } from './place.interface';
import { GetPlacesPaginateDto } from './dto/get-places-pagination.dto';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) { }

  async addPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    return await this.placeService.addPlace(createPlaceDto);
  }
  @GrpcMethod('PlaceService', 'getPlaceByPlaceId')
  async getPlaceByPlaceId({
    placeId,
  }: GetPlaceByPlaceIdDto): Promise<GetPlaceByPlaceIdResponse> {

    return {
      data: await this.placeService.getPlaceByPlaceId(placeId),
    };
  }

  @GrpcMethod('PlaceService', 'getAllPlaces')
  async getAllPlaces(getPlacesPaginateDto: GetPlacesPaginateDto): Promise<GetAllPlacesResponse> {
    const { pageSize, lastId } = getPlacesPaginateDto;
    const data = await this.placeService.getAllPlacesPaginate(pageSize, lastId);
    console.log(data)
    return data;
  }
}

import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import PlaceInterface, { GetAllPlacesRequest } from './place.interface';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class PlaceService {
  private grpcPlaceService: PlaceInterface;
  constructor(@Inject('PLACE_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.grpcPlaceService =
      this.client.getService<PlaceInterface>('PlaceService');
  }

  // async addPlace(createPlaceDto: CreatePlaceDto) {
  //   const placeExisted = await this.placeRepository.findByCondition({
  //     placeId: createPlaceDto.placeId,
  //   });
  //   if (placeExisted)
  //     throw new BadRequestException(errorMessage.PLACE_ALREADY_EXISTED);
  //   return await this.placeRepository.create(createPlaceDto);
  // }

  @UseInterceptors(GrpcToHttpInterceptor)
  async getPlaceByPlaceId(placeId: string) {
    return await this.grpcPlaceService.getPlaceByPlaceId({ placeId });
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  async getAllPlaces(pageSize: number, lastId: string) {
    const getAllPlacesRequest: GetAllPlacesRequest = {
      pageSize,
      lastId,
    };
    return await this.grpcPlaceService.getAllPlaces(getAllPlacesRequest);
  }
}

import { PlaceService } from './place.service';
import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  // async addPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
  //   return await this.placeService.addPlace(createPlaceDto);
  // }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getPlaceByPlaceId(@Param('id') placeId: string) {
    return this.placeService.getPlaceByPlaceId(placeId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllPlaces(
    @Query('pageSize') pageSize: number,
    @Query('lastId') lastId: string,
  ) {
    return this.placeService.getAllPlaces(pageSize, lastId);
  }
}

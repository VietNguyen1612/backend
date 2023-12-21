import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateTripPlanResponse,
  GetAllTripByUserIdResponse,
} from './trip.interface';
import { GetAllTripPlanDto } from './dto/get-all-trip-plan.dto';
import { CreateTripPlanDto } from './dto/create-trip-plan.dto';
import { TripService } from './trip.service';
import { CreateTripPlanByArchiveIdDto } from './dto/create-trip-plan-by-archive-id.dto';
import { Trip } from './model/trip.model';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) { }

  @GrpcMethod('TripService', 'getAllTripByUserId')
  async getAllTripByUserId(
    getAllTripPlanDto: GetAllTripPlanDto,
  ): Promise<GetAllTripByUserIdResponse> {
    return {
      data: await this.tripService.getAllTripByUserId(getAllTripPlanDto)
    };
  }
  @GrpcMethod('TripService', 'createTripPlan')
  async createTripPlan(
    createTripPlanDto: CreateTripPlanDto,
  ): Promise<CreateTripPlanResponse> {
    return {
      data: {} as Trip,
    };
  }

  @GrpcMethod('TripService', 'createTripPlanByArchiveId')
  async createTripPlanByArchiveId(
    createTripPlanByArchiveIdDto: CreateTripPlanByArchiveIdDto
  ): Promise<CreateTripPlanResponse> {
    return { data: await this.tripService.createTripPlanByArchiveId(createTripPlanByArchiveIdDto) };
  }
}

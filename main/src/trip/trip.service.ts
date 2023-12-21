import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import TripInterface from './trip.interface';
import { CreateTripPlanByArchiveIdDto } from './dto/create-trip-plan-by-archive-id.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { GetAllTripPlanDto } from './dto/get-all-trip-plan.dto';
import { GetTripDetailByIdDto } from './dto/get-trip-detail-by-id.dto';

@Injectable()
export class TripService {
  private grpcTripService: TripInterface;
  constructor(@Inject('TRIP_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.grpcTripService = this.client.getService<TripInterface>('TripService');
  }

  // async createPlace() {
  //   return;
  // }
  @UseInterceptors(GrpcToHttpInterceptor)
  async getAllTripByUserId(getAllTripPlanDto: GetAllTripPlanDto) {
    return await this.grpcTripService.getAllTripByUserId(getAllTripPlanDto);
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  async getAllTripByParticipateId(getAllTripPlanDto: GetAllTripPlanDto) {
    return await this.grpcTripService.getAllTripByParticipateId(
      getAllTripPlanDto,
    );
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  async createTripPlanByArchiveId(
    createTripPlanByArchiveIdDto: CreateTripPlanByArchiveIdDto,
  ) {
    return await this.grpcTripService.createTripPlanByArchiveId(
      createTripPlanByArchiveIdDto,
    );
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  async getTripDetailById(getTripDetailByIdDto: GetTripDetailByIdDto) {
    return await this.grpcTripService.getTripDetailById(getTripDetailByIdDto);
  }
}

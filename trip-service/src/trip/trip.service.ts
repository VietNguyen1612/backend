import { Injectable } from '@nestjs/common';
import { TripRepository } from './trip.repository';
import { ArchiveRepository } from 'src/archive/archive.repository';
import { GrpcInvalidArgumentException } from 'nestjs-grpc-exceptions';
import { CreateTripPlanByArchiveIdDto } from './dto/create-trip-plan-by-archive-id.dto';
import { GetAllTripPlanDto } from './dto/get-all-trip-plan.dto';

@Injectable()
export class TripService {
  constructor(
    private readonly tripRepository: TripRepository,
    private readonly archiveRepository: ArchiveRepository,
  ) { }

  async createPlace() {
    return;
  }

  async createTripPlanByArchiveId({ archiveId, authorId, title }: CreateTripPlanByArchiveIdDto) {
    if (!(await this.archiveRepository.findArchiveDetailById(archiveId))) {
      throw new GrpcInvalidArgumentException('Bad request');
    }
    const { places } = await this.archiveRepository.findById(archiveId)

    try {
      return await this.tripRepository.create({ authorId, title, places });
    } catch (error) {
      throw new GrpcInvalidArgumentException(error?.message);
    }
  }

  async getAllTripByUserId({ userId }: GetAllTripPlanDto) {
    return await this.tripRepository.findAllByAuthorId(userId);
  }
}

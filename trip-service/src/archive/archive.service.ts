import { PlaceRepository } from './../place/place.repository';
import { Injectable } from '@nestjs/common';
import { ArchiveRepository } from './archive.repository';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { GrpcInvalidArgumentException } from 'nestjs-grpc-exceptions';
import { AddPlaceToArchive } from './dto/add-place-to-archive.dto';
import { GetArchiveByIdDto } from './dto/get-archive-by-id.dto';
import { GetAllArchiveByUserIdDto } from './dto/get-all-archive-by-userId.dto';
import { DeletePlaceFromArchive } from './dto/delete-place-from-archive.dto';

@Injectable()
export class ArchiveService {
  constructor(
    private readonly archiveRepository: ArchiveRepository,
    private readonly placeRepository: PlaceRepository,
  ) {}
  async deletePlaceFromArchive({ placeId, archiveId }: DeletePlaceFromArchive) {
    await this.archiveRepository.deletePlaceFromArchive(placeId, archiveId);
  }
  async getAllArchiveByUserId({ userId }: GetAllArchiveByUserIdDto) {
    return await this.archiveRepository.findAllByAuthorId(userId);
  }
  async getArchiveById({ archiveId }: GetArchiveByIdDto) {
    return await this.archiveRepository.findArchiveDetailById(archiveId);
  }

  async addPlaceToArchive({ placeId, archiveId }: AddPlaceToArchive) {
    if (!(await this.placeRepository.findById(placeId))) {
      throw new GrpcInvalidArgumentException('Bad request');
    }
    // TODO: check founded valid place

    if (!(await this.archiveRepository.findById(archiveId))) {
      throw new GrpcInvalidArgumentException('Wrong archiveId');
    }

    const foundedPlaceInArchive =
      await this.archiveRepository.findPlaceInArchive(placeId, archiveId);

    if (foundedPlaceInArchive.length > 0)
      throw new GrpcInvalidArgumentException('Already in');
    await this.archiveRepository.addOnePlaceToArchive(placeId, archiveId);
  }

  async createArchive(createArchiveDto: CreateArchiveDto) {
    try {
      return await this.archiveRepository.create({
        ...createArchiveDto,
        placesNumber: createArchiveDto.places?.length || 0,
      });
    } catch (error) {
      throw new GrpcInvalidArgumentException(error?.message);
    }
  }
}

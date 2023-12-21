import { Controller } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { AddPlaceToArchive } from './dto/add-place-to-archive.dto';
import {
  AddPlaceToArchiveResponse,
  CreateArchiveResponse,
  DeletePlaceFromArchiveResponse,
  GetAllArchiveByUserIdResponse,
  GetArchiveByIdResponse,
} from './archive.interface';
import { GetArchiveByIdDto } from './dto/get-archive-by-id.dto';
import { GetAllArchiveByUserIdDto } from './dto/get-all-archive-by-userId.dto';
import { DeletePlaceFromArchive } from './dto/delete-place-from-archive.dto';

@Controller('archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @GrpcMethod('ArchiveService', 'deletePlaceFromArchive')
  async deletePlaceFromArchive(
    deletePlaceFromArchive: DeletePlaceFromArchive,
  ): Promise<DeletePlaceFromArchiveResponse> {
    await this.archiveService.deletePlaceFromArchive(deletePlaceFromArchive);
    return {
      message: 'Delete successfully',
    };
  }

  @GrpcMethod('ArchiveService', 'getAllArchiveByUserId')
  async getAllArchiveByUserId(
    getAllArchiveByUserIdDto: GetAllArchiveByUserIdDto,
  ): Promise<GetAllArchiveByUserIdResponse> {
    return {
      data: await this.archiveService.getAllArchiveByUserId(
        getAllArchiveByUserIdDto,
      ),
    };
  }

  @GrpcMethod('ArchiveService', 'getArchiveById')
  async getArchiveById(
    getArchiveByIdDto: GetArchiveByIdDto,
  ): Promise<GetArchiveByIdResponse> {
    return {
      data: await this.archiveService.getArchiveById(getArchiveByIdDto),
    };
  }

  @GrpcMethod('ArchiveService', 'addPlaceToArchive')
  async addPlaceToArchive(
    addPlaceToArchive: AddPlaceToArchive,
  ): Promise<AddPlaceToArchiveResponse> {
    await this.archiveService.addPlaceToArchive(addPlaceToArchive);
    return {
      message: 'Successfully',
    };
  }

  @GrpcMethod('ArchiveService', 'createArchive')
  async createArchive(
    createArchiveDto: CreateArchiveDto,
  ): Promise<CreateArchiveResponse> {
    return {
      data: await this.archiveService.createArchive(createArchiveDto),
    };
  }
}

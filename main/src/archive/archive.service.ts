import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import ArchiveInterface from './archive.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { Place } from 'src/common/types';
import { CreateArchiveDto } from './dto/create-archive.dto';

@Injectable()
export class ArchiveService {
  private grpcArchiveService: ArchiveInterface;

  constructor(@Inject('ARCHIVE_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.grpcArchiveService =
      this.client.getService<ArchiveInterface>('ArchiveService');
  }
  @UseInterceptors(GrpcToHttpInterceptor)
  async getAllArchiveByUserId(userId: string) {
    return await this.grpcArchiveService.getAllArchiveByUserId({ userId });
  }
  @UseInterceptors(GrpcToHttpInterceptor)
  async getArchiveById(archiveId: string) {
    return await this.grpcArchiveService.getArchiveById({ archiveId });
  }
  @UseInterceptors(GrpcToHttpInterceptor)
  async addPlaceToArchive(archiveId: string, placeId: string) {
    return await this.grpcArchiveService.addPlaceToArchive({
      archiveId,
      placeId,
    });
  }
  @UseInterceptors(GrpcToHttpInterceptor)
  async createArchive(createArchiveDto: CreateArchiveDto, authorId: string) {
    return await this.grpcArchiveService.createArchive({
      authorId,
      ...createArchiveDto,
    });
  }
}

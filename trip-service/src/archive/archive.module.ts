import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Archive, ArchiveSchema } from './model/archive.model';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';
import { ArchiveController } from './archive.controller';
import { ArchiveService } from './archive.service';
import { ArchiveRepository } from './archive.repository';
import { PlaceRepository } from 'src/place/place.repository';
import { Place, PlaceSchema } from 'src/place/model/place.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Archive.name,
        schema: ArchiveSchema,
      },
      {
        name: Place.name,
        schema: PlaceSchema,
      },
    ]),
  ],
  controllers: [ArchiveController],
  providers: [
    ArchiveService,
    ArchiveRepository,
    PlaceRepository,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class ArchiveModule {}

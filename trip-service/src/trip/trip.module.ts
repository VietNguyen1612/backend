import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './model/trip.model';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';
import { TripRepository } from './trip.repository';
import { ArchiveRepository } from 'src/archive/archive.repository';
import { Archive, ArchiveSchema } from 'src/archive/model/archive.model';
import { Place, PlaceSchema } from 'src/place/model/place.model';
import { PlaceRepository } from 'src/place/place.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Trip.name,
        schema: TripSchema,
      }, {
        name: Archive.name,
        schema: ArchiveSchema,
      }, , {
        name: Place.name,
        schema: PlaceSchema,
      },
    ]),
  ],
  controllers: [TripController],
  providers: [
    TripService,
    TripRepository,
    ArchiveRepository,
    PlaceRepository,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class TripModule { }

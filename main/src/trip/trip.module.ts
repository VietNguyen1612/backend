import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TripService } from './trip.service';

@Module({
  controllers: [TripController],
  providers: [
    ConfigService,
    TripService,
    {
      provide: 'TRIP_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'proto',
            protoPath: join(process.cwd(), 'src/trip/trip.proto'),
            url: configService.get('TRIP_SERVICE_URL'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class TripModule {}

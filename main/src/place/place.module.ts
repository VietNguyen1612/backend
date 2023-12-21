import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PlaceService } from './place.service';

@Module({
  controllers: [PlaceController],
  providers: [
    {
      provide: 'PLACE_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'proto',
            protoPath: join(process.cwd(), 'src/place/place.proto'),
            url: configService.get('TRIP_SERVICE_URL'),
          },
        });
      },
      inject: [ConfigService],
    },
    ConfigService,
    PlaceService,
  ],
})
export class PlaceModule {}

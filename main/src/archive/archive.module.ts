import { Module } from '@nestjs/common';
import { ArchiveController } from './archive.controller';
import { ArchiveService } from './archive.service';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  controllers: [ArchiveController],
  providers: [
    {
      provide: 'ARCHIVE_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'proto',
            protoPath: join(process.cwd(), 'src/archive/archive.proto'),
            url: configService.get('TRIP_SERVICE_URL'),
          },
        });
      },
      inject: [ConfigService],
    },
    ConfigService,
    ArchiveService,
  ],
})
export class ArchiveModule {}

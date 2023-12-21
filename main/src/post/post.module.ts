import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [
    ConfigService,
    PostService,
    {
      provide: 'POST_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'post',
            protoPath: join(process.cwd(), 'src/post/post.proto'),
            url: configService.get('POST_SERVICE_URL'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class PostModule {}

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommentController } from './comment.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CommentService } from './comment.service';
import { PostService } from 'src/post/post.service';
import { UsersModule } from 'src/user/user.module';
import { TransformInterceptor } from 'src/common/utils/transform.interceptor';
@Module({
  imports: [UsersModule],
  controllers: [CommentController],
  providers: [
    ConfigService,
    CommentService,
    PostService,
    {
      provide: 'COMMENT_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'comment',
            protoPath: join(process.cwd(), 'src/comment/comment.proto'),
            url: configService.get('COMMENT_SERVICE_URL'),
          },
        });
      },
      inject: [ConfigService],
    },
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
export class CommentModule {}

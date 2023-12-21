import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
const microserviceOption: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'comment',
    protoPath: join(process.cwd(), 'src/comment/comment.proto'),
    url: process.env.COMMENT_SERVICE_URL,
  },
};
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceOption,
  );
  await app.listen();
}
bootstrap();

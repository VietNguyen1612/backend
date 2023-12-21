import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const microserviceOption: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'post',
    protoPath: join(process.cwd(), 'src/post/post.proto'),
    url: process.env.POST_SERVICE_URL,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceOption,
  );
  console.log(microserviceOption.options);
  await app.listen();
}
bootstrap();

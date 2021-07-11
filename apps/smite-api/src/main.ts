import { NestFactory } from '@nestjs/core';
import { SmiteApiModule } from './smite-api.module';

async function bootstrap() {
  const app = await NestFactory.create(SmiteApiModule, { cors: true });
  await app.listen(3000);
}
bootstrap();

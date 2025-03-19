import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core/core.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();

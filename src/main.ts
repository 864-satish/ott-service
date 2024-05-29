import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const port: number = parseInt(process.env.PORT, 10) || 3030;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`🚀 ott-service ready @ http://localhost:${port}`);
}
bootstrap();

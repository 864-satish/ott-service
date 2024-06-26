import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MigrationService } from './database/migration/migration.service';
import { Authorization } from './auth/auth.guard';

const port: number = parseInt(process.env.PORT, 10) || 3002;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const migrationService = app.get(MigrationService);
  await migrationService.runMigrationScript();
  
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalGuards(new Authorization());
  await app.listen(port);
  console.log(`🚀 ott-service ready @ http://localhost:${port}`);
}
bootstrap();

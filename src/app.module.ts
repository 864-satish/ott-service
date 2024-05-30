import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyListModule } from './mylist/mylist.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { TvShowModule } from './tvshow/tvshow.module';
import { DatabaseModule } from './database/database.module';
import { MigrationModule } from './database/migration/migration.module';
import { APP_GUARD } from '@nestjs/core';
import { Authorization } from './auth/auth.guard';

@Module({
  imports: [
    DatabaseModule,
    MigrationModule,

    MyListModule,
    UserModule,
    MovieModule,
    TvShowModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: Authorization,
    }
  ],
})
export class AppModule { }

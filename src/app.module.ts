import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyListModule } from './mylist/mylist.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { TvShowModule } from './tvshow/tvshow.module';
import { DatabaseModule } from './database/database.module';
import { MigrationModule } from './database/migration/migration.module';

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
  providers: [AppService],
})
export class AppModule { }

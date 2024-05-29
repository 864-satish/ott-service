import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyListModule } from './my-list/my-list.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { TvShowModule } from './tv-show/tv-show.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [MyListModule, UserModule, MovieModule, TvShowModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

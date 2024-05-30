import { Module } from '@nestjs/common';
import { TvShowService } from './tvshow.service';
import { TvShowController } from './tvshow.controller';

@Module({
  controllers: [TvShowController],
  providers: [TvShowService],
})
export class TvShowModule {}

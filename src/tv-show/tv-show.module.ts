import { Module } from '@nestjs/common';
import { TvShowService } from './tv-show.service';
import { TvShowController } from './tv-show.controller';

@Module({
  controllers: [TvShowController],
  providers: [TvShowService],
})
export class TvShowModule {}

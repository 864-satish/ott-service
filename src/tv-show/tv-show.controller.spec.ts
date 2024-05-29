import { Test, TestingModule } from '@nestjs/testing';
import { TvShowController } from './tv-show.controller';
import { TvShowService } from './tv-show.service';

describe('TvShowController', () => {
  let controller: TvShowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TvShowController],
      providers: [TvShowService],
    }).compile();

    controller = module.get<TvShowController>(TvShowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

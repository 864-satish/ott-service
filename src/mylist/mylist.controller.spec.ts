import { Test, TestingModule } from '@nestjs/testing';
import { MyListController } from './mylist.controller';
import { MyListService } from './mylist.service';

describe('MyListController', () => {
  let controller: MyListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyListController],
      providers: [MyListService],
    }).compile();

    controller = module.get<MyListController>(MyListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

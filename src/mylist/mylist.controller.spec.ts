import { Test, TestingModule } from '@nestjs/testing';
import { MyListController } from './mylist.controller';
import { MyListService } from './mylist.service';
import { HttpStatus } from '@nestjs/common';
import { MyList } from 'src/database/schemas/mylist.schema';

describe('MyListController', () => {
  let controller: MyListController;
  let service: MyListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyListController],
      providers: [MyListService],
    }).compile();

    controller = module.get<MyListController>(MyListController);
    service = module.get<MyListService>(MyListService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user\'s list', async () => {
    const userId = 'exampleUserId';
    const myList: MyList = {
      "userId": "e5bf94e2-11be-4004-98fd-28c2f8284f11",
      "items": [
        {
          "contentId": "e25022ec-c569-4c02-80b6-cf19b0b843d3",
          "type": "MOVIE",
          "addedOn": new Date()
        },
        {
          "contentId": "e25022ec-c569-4c02-80b6-cf19b0b843d4",
          "type": "MOVIE",
          "addedOn": new Date()
        }
      ]
    };

    jest.spyOn(service, 'getMyList').mockResolvedValue(myList);

    const response = await controller.getMyList(userId, {}, {});
    expect(response).toEqual(myList);
  });

  it('should handle error when getting user\'s list', async () => {
    const userId = 'exampleUserId';

    jest.spyOn(service, 'getMyList').mockRejectedValue(new Error('Test error'));

    const response = await controller.getMyList(userId, {}, {});
    expect(response).toMatchObject({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Test error',
    });
  });

  it('should add an item to the list', async () => {
    const addToMyListDto = { userId: 'exampleUserId', contentId: 'exampleContentId', type: 'MOVIE' };

    jest.spyOn(service, 'addToList').mockResolvedValue(undefined);

    const response = await controller.addToList(addToMyListDto, {});
    expect(response).toMatchObject({
      status: HttpStatus.CREATED,
      message: 'Item added to list',
    });
  });

  it('should handle error when adding an item to the list', async () => {
    const addToMyListDto = { userId: 'exampleUserId', contentId: 'exampleContentId', type: 'MOVIE' };

    jest.spyOn(service, 'addToList').mockRejectedValue(new Error('Test error'));

    const response = await controller.addToList(addToMyListDto, {});
    expect(response).toMatchObject({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Test error',
    });
  });

  it('should delete an item from the list', async () => {
    const deleteFromMyListDto = { userId: 'exampleUserId', contentId: 'exampleContentId' };

    jest.spyOn(service, 'deleteFromList').mockResolvedValue(undefined);

    const response = await controller.deleteFromList(deleteFromMyListDto, {});
    expect(response).toMatchObject({
      status: HttpStatus.OK,
      message: 'Item removed from list',
    });
  });

  it('should handle error when deleting an item from the list', async () => {
    const deleteFromMyListDto = { userId: 'exampleUserId', contentId: 'exampleContentId' };

    jest.spyOn(service, 'deleteFromList').mockRejectedValue(new Error('Test error'));

    const response = await controller.deleteFromList(deleteFromMyListDto, {});
    expect(response).toMatchObject({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Test error',
    });
  });
});

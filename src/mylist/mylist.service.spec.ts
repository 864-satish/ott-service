import { Test, TestingModule } from '@nestjs/testing';
import { MyListService } from './mylist.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyListDocument, MyList } from 'src/database/schemas/mylist.schema';
import { ContentType } from './mylist.interface';

describe('MyListService', () => {
  let service: MyListService;
  let model: Model<MyListDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyListService,
        {
          provide: getModelToken(MyList.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<MyListService>(MyListService);
    model = module.get<Model<MyListDocument>>(getModelToken(MyList.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMyList', () => {
    it('should return the user\'s list', async () => {
      const userId = 'exampleUserId';
      const query = { contentType: ContentType.MOVIE, limit: 10, offset: 0 };
      const myList = [{ contentId: 'e5bf94e2-11be-4004-98fd-28c2f8284f11', type: 'MOVIE', addedOn: new Date() }]; // Mocked myList data

      jest.spyOn(model, 'findOne').mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(myList) } as any);

      const result = await service.getMyList(userId, query);
      expect(result).toEqual(myList);
    });

    it('should cache the user\'s list', async () => {
      const userId = 'exampleUserId';
      const query = { contentType: ContentType.MOVIE, limit: 10, offset: 0 };
      const myList = [{ contentId: '1', type: ContentType.MOVIE, addedOn: new Date() }]; // Mocked myList data

      jest.spyOn(model, 'findOne').mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(myList) } as any);
      jest.spyOn(service['cache'], 'set');

      await service.getMyList(userId, query);
      expect(service['cache'].set).toHaveBeenCalled();
    });

    it('should handle error when fetching user\'s list', async () => {
      const userId = 'exampleUserId';
      const query = { contentType: ContentType.MOVIE, limit: 10, offset: 0 };

      jest.spyOn(model, 'findOne').mockRejectedValue(new Error('Test error'));

      await expect(service.getMyList(userId, query)).rejects.toThrow('Test error');
    });
  });

  describe('addToList', () => {
    it('should add an item to the user\'s list', async () => {
      const userId = 'exampleUserId';
      const contentId = 'exampleContentId';
      const type = 'MOVIE';

      jest.spyOn(model, 'findOne').mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(null) } as any);
      jest.spyOn(model.prototype, 'save');

      await service.addToList(userId, contentId, type);
      expect(model.prototype.save).toHaveBeenCalled();
    });

    it('should update addedOn when item exists in list', async () => {
      const userId = 'exampleUserId';
      const contentId = 'existingContentId';
      const type = 'MOVIE';
      const existingList = { userId, items: [{ contentId, type, addedOn: new Date() }] };

      jest.spyOn(model, 'findOne').mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(existingList) } as any);
      jest.spyOn(model.prototype, 'save');

      await service.addToList(userId, contentId, type);
      expect(model.prototype.save).toHaveBeenCalled();
      expect(existingList.items[0].addedOn).not.toEqual(new Date());
    });

    it('should create a new list if user has no list', async () => {
      const userId = 'exampleUserId';
      const contentId = 'exampleContentId';
      const type = 'MOVIE';

      jest.spyOn(model, 'findOne').mockReturnValueOnce({ exec: jest.fn().mockResolvedValue(null) } as any);
      jest.spyOn(model.prototype, 'save');

      await service.addToList(userId, contentId, type);
      expect(model.prototype.save).toHaveBeenCalled();
    });
  });

  describe('deleteFromList', () => {
    it('should delete an item from the user\'s list', async () => {
      const userId = 'exampleUserId';
      const contentId = 'exampleContentId';

      jest.spyOn(model, 'updateOne').mockResolvedValue({} as any);

      await service.deleteFromList(userId, contentId);
      expect(model.updateOne).toHaveBeenCalled();
    });

    it('should handle error when deleting an item from the list', async () => {
      const userId = 'exampleUserId';
      const contentId = 'exampleContentId';

      jest.spyOn(model, 'updateOne').mockRejectedValue(new Error('Test error'));

      await expect(service.deleteFromList(userId, contentId)).rejects.toThrow('Test error');
    });
  });
});


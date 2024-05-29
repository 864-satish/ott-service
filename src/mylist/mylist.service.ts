import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyList, MyListDocument } from '../database/schemas/mylist.schema';

@Injectable()
export class MyListService {
  constructor(
    @InjectModel(MyList.name) private myListModel: Model<MyListDocument>,
  ) { }

  async getMyList(userId: string): Promise<MyList> {
    return this.myListModel.findOne({ userId }).exec();
  }

  async addToList(userId: string, contentId: string, type: string): Promise<void> {
    const list = await this.myListModel.findOne({ userId }).exec();
    if (list) {
      list.items.push({ contentId, type, addedOn: new Date() });
      await list.save();
    } else {
      const newList = new this.myListModel({
        userId,
        items: [{ contentId, type, addedOn: new Date() }],
      });
      await newList.save();
    }
  }

  async deleteFromList(userId: string, contentId: string): Promise<void> {
    await this.myListModel.updateOne(
      { userId },
      { $pull: { items: { contentId } } },
    ).exec();
  }
}

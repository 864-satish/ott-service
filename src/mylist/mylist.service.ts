import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyList, MyListDocument, MyListItem } from '../database/schemas/mylist.schema';
import * as NodeCache from 'node-cache';
import { ContentType, MyListQuery } from './mylist.interface';
import { Movie } from 'src/database/schemas/movie.schema';
import { TVShow } from 'src/database/schemas/tvshow.schema';

@Injectable()
export class MyListService {
  private cache: NodeCache;
  constructor(
    @InjectModel(MyList.name) private myListModel: Model<MyListDocument>,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(TVShow.name) private tvShowModel: Model<TVShow>,
  ) {
    this.cache = new NodeCache({ stdTTL: 3600 });
  }

  async getMyList(userId: string, query: MyListQuery): Promise<MyList> {
    const { contentType, limit = 100, offset = 0 } = query;
    const cacheKey = contentType ? `${userId}_${limit}_${offset}_${contentType}` : `${userId}_${limit}_${offset}`;

    const cachedData: MyList = this.cache.get(cacheKey) as MyList;
    if (cachedData) {
      return cachedData;
    }

    const myListQuery = this.myListModel.findOne({ userId });

    if (contentType && Object.keys(ContentType).includes(contentType)) {
      myListQuery.where('items.type').equals(contentType);
    }
    myListQuery.sort({ 'items.addedOn': -1 }).skip(offset).limit(limit);

    const myList = await myListQuery.exec();
    myList.items = await this.populateContentTitles(myList.items);
    this.cache.set(cacheKey, myList);
    return myList;
  }

  async addToList(userId: string, contentId: string, type: string): Promise<void> {
    const list = await this.myListModel.findOne({ userId }).exec();
    if (list) {
      const existingItem = list?.items?.find(item => item?.contentId === contentId);
      if (existingItem) {
        existingItem.addedOn = new Date();
      } else {
        list.items.push({ contentId, type, addedOn: new Date() });
      }
      await list.save();
    } else {
      const newList = new this.myListModel({
        userId,
        items: [{ contentId, type, addedOn: new Date() }],
      });
      await newList.save();
    }
    this.deleteCacheByPrefix(userId);
  }

  async deleteFromList(userId: string, contentId: string): Promise<void> {
    await this.myListModel.updateOne(
      { userId },
      { $pull: { items: { contentId } } },
    ).exec();
    this.deleteCacheByPrefix(userId);
  }

  private async deleteCacheByPrefix(prefix: string) {
    const keys = await this.cache.keys();
    keys.forEach(key => {
      if (key.startsWith(prefix)) {
        this.cache.del(key);
      }
    });
  }

  private async populateContentTitles(myListItems: MyListItem[]): Promise<MyListItem[]> {
    const movieIds = [], tvShowIds = [];
    myListItems?.forEach(item => {
      if (item.type == ContentType.MOVIE) {
        movieIds.push(item.contentId);
      } else if (item.type == ContentType.TV_SHOW) {
        movieIds.push(item.contentId);
      }
    });
    const [movieList, tvShowList] = await Promise.all([
      this.movieModel.find({ _id: { $in: movieIds } }).select('_id title').exec(),
      this.tvShowModel.find({ _id: { $in: tvShowIds } }).select('_id title').exec(),
    ]);
    const movieIdTitleMap = movieList.reduce((map, movie) => {
      map[movie._id] = movie.title;
      return map;
    }, {});
    const tvShowIdTitleMap = tvShowList.reduce((map, tvShow) => {
      map[tvShow._id] = tvShow.title;
      return map;
    }, {});

    return myListItems.map((item) => {
      const title: string = (item.type = ContentType.MOVIE)
        ? movieIdTitleMap[item.contentId]
        : tvShowIdTitleMap[item.contentId]

      item['title'] = title || '';
      return item;
    });
  }
}

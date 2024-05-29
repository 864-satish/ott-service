import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyList, MyListSchema } from './schemas/mylist.schema';
import { User, UserSchema } from './schemas/user.schema';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { TVShow, TVShowSchema } from './schemas/tvshow.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    MongooseModule.forRoot(
      process.env.MONGO_DB_HOST,
      { dbName: process.env.MONGO_DB_NAME }
    ),
    MongooseModule.forFeature([
      { name: MyList.name, schema: MyListSchema },
      { name: User.name, schema: UserSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: TVShow.name, schema: TVShowSchema },
    ]),
  ],
  exports: [
    MongooseModule,
  ],
})
export class DatabaseModule { }

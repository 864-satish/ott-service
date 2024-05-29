import { Module } from '@nestjs/common';
import { MyListService } from './mylist.service';
import { MyListController } from './mylist.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MyListController],
  providers: [MyListService],
})
export class MyListModule {}

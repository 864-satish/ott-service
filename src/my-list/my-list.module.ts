import { Module } from '@nestjs/common';
import { MyListService } from './my-list.service';
import { MyListController } from './my-list.controller';

@Module({
  controllers: [MyListController],
  providers: [MyListService],
})
export class MyListModule {}

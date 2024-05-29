import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MyListService } from './my-list.service';
import { CreateMyListDto } from './dto/create-my-list.dto';
import { UpdateMyListDto } from './dto/update-my-list.dto';

@Controller('my-list')
export class MyListController {
  constructor(private readonly myListService: MyListService) {}

  @Post()
  create(@Body() createMyListDto: CreateMyListDto) {
    return this.myListService.create(createMyListDto);
  }

  @Get()
  findAll() {
    return this.myListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyListDto: UpdateMyListDto) {
    return this.myListService.update(+id, updateMyListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myListService.remove(+id);
  }
}

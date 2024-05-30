import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TvShowService } from './tvshow.service';
import { CreateTvShowDto } from './dto/create-tvshow.dto';
import { UpdateTvShowDto } from './dto/update-tvshow.dto';

@Controller('tv-show')
export class TvShowController {
  constructor(private readonly tvShowService: TvShowService) {}

  @Post()
  create(@Body() createTvShowDto: CreateTvShowDto) {
    return this.tvShowService.create(createTvShowDto);
  }

  @Get()
  findAll() {
    return this.tvShowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tvShowService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTvShowDto: UpdateTvShowDto) {
    return this.tvShowService.update(+id, updateTvShowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tvShowService.remove(+id);
  }
}

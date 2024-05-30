import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  ValidationPipe,
  Res,
  HttpStatus,
  Logger,
  Query
} from '@nestjs/common';
import { MyListService } from './mylist.service';
import { AddToMyListDto } from './dto/add-to-mylist.dto';
import { DeleteFromMyListDto } from './dto/delete-from-mylist.dto';
import { MyListQuery } from './mylist.interface';

@Controller('mylist')
export class MyListController {
  private logger: Logger
  constructor(private readonly myListService: MyListService) {
    this.logger = new Logger(MyListController.name);
  }

  @Get('/:userId')
  async getMyList(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() query: MyListQuery,
     @Res() res
    ) {
    try {
      const myList = await this.myListService.getMyList(userId, query);
      return res.status(HttpStatus.OK).json(myList);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }

  @Post()
  async addToList(@Body(ValidationPipe) addToMyListDto: AddToMyListDto, @Res() res) {
    try {
      await this.myListService.addToList(addToMyListDto.userId, addToMyListDto.contentId, addToMyListDto.type);
      return res.status(HttpStatus.CREATED).json({ message: 'Item added to list' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        error,
      });
    }
  }

  @Delete()
  async deleteFromList(@Body(ValidationPipe) deleteMyListItemDto: DeleteFromMyListDto, @Res() res) {
    try {
      await this.myListService.deleteFromList(deleteMyListItemDto.userId, deleteMyListItemDto.contentId);
      return res.status(HttpStatus.OK).json({ message: 'Item removed from list' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        error,
      });
    }
  }
}

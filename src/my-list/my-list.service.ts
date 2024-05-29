import { Injectable } from '@nestjs/common';
import { CreateMyListDto } from './dto/create-my-list.dto';
import { UpdateMyListDto } from './dto/update-my-list.dto';

@Injectable()
export class MyListService {
  create(createMyListDto: CreateMyListDto) {
    return 'This action adds a new myList';
  }

  findAll() {
    return `This action returns all myList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myList`;
  }

  update(id: number, updateMyListDto: UpdateMyListDto) {
    return `This action updates a #${id} myList`;
  }

  remove(id: number) {
    return `This action removes a #${id} myList`;
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateMyListDto } from './create-my-list.dto';

export class UpdateMyListDto extends PartialType(CreateMyListDto) {}

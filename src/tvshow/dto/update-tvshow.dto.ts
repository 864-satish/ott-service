import { PartialType } from '@nestjs/mapped-types';
import { CreateTvShowDto } from './create-tvshow.dto';

export class UpdateTvShowDto extends PartialType(CreateTvShowDto) {}

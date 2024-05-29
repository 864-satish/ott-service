import { IsString, IsUUID } from 'class-validator';

export class AddToMyListDto {
  @IsUUID()
  userId: string;

  @IsString()
  contentId: string;

  @IsString()
  type: string;
}

import { IsString, IsUUID } from 'class-validator';

export class DeleteFromMyListDto {
  @IsUUID()
  userId: string;

  @IsString()
  contentId: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class GetAllArchiveByUserIdDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}

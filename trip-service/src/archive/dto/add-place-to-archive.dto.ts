import { IsNotEmpty, IsString } from 'class-validator';

export class AddPlaceToArchive {
  @IsNotEmpty()
  @IsString()
  placeId: string;

  @IsNotEmpty()
  @IsString()
  archiveId: string;
}

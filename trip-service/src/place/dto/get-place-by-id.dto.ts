import { IsNotEmpty, IsString } from 'class-validator';

export class GetPlaceByPlaceIdDto {
  @IsNotEmpty()
  @IsString()
  placeId: string;
}

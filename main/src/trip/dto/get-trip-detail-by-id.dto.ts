import { IsNotEmpty } from 'class-validator';

export class GetTripDetailByIdDto {
  @IsNotEmpty()
  tripId: string;
}

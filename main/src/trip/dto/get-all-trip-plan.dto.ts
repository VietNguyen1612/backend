import { IsNotEmpty } from 'class-validator';

export class GetAllTripPlanDto {
  @IsNotEmpty()
  userId: string;
}

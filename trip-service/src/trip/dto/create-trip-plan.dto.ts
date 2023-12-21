import { IsNotEmpty } from 'class-validator';

export class CreateTripPlanDto {
  @IsNotEmpty()
  authorId: string;
  @IsNotEmpty()
  title: string;
}

import { IsNotEmpty } from 'class-validator';

export class CreateTripPlanDto {
  authorId: string;
  @IsNotEmpty()
  title: string;
}
